import { Hono } from 'hono';
import type { Env, EmailAttachment } from '../types';
import {
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
} from '../email-utils';
import {
  sanitize,
  validateEmail,
  validatePhone,
  validateRequired,
  validateOptional,
  validateFile,
  MAX_LENGTHS,
  FILE_VALIDATION,
} from '../validation';
import { checkRateLimit, getClientIP } from '../rate-limit';

const resume = new Hono<{ Bindings: Env }>();

// Helper to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

resume.post('/', async (c) => {
  const host = c.req.header('host') || '';
  const origin = c.req.header('origin') || '';
  console.log(`[Resume] Form submission received - host: ${host}, origin: ${origin}`);

  try {
    // Rate limiting
    const clientIP = getClientIP(c.req.raw);
    console.log(`[Resume] Client IP: ${clientIP}`);
    const rateLimit = checkRateLimit(`resume:${clientIP}`, { maxRequests: 5, windowMs: 60000 });

    if (!rateLimit.allowed) {
      console.log(`[Resume] Rate limit exceeded for IP: ${clientIP}`);
      return c.json({ error: 'Too many requests. Please try again later.' }, 429);
    }

    const contentType = c.req.header('content-type') || '';
    console.log(`[Resume] Content-Type: ${contentType}`);

    let firstName: string;
    let lastName: string;
    let phone: string;
    let email: string;
    let additionalInfo: string | undefined;
    let file: File | null = null;
    let fileAttachment: EmailAttachment | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await c.req.formData();
      firstName = formData.get('firstName') as string;
      lastName = formData.get('lastName') as string;
      phone = formData.get('phone') as string;
      email = formData.get('email') as string;
      additionalInfo = formData.get('additionalInfo') as string | undefined;
      file = formData.get('file') as File | null;
    } else {
      const data = await c.req.json();
      firstName = data.firstName;
      lastName = data.lastName;
      phone = data.phone;
      email = data.email;
      additionalInfo = data.additionalInfo;
    }

    // Sanitize inputs
    firstName = sanitize(firstName);
    lastName = sanitize(lastName);
    phone = sanitize(phone);
    email = sanitize(email)?.toLowerCase();
    additionalInfo = additionalInfo ? sanitize(additionalInfo) : undefined;

    // Validate required fields
    const firstNameValidation = validateRequired(firstName, 'First name', MAX_LENGTHS.firstName);
    if (!firstNameValidation.valid) {
      return c.json({ error: firstNameValidation.error }, 400);
    }

    const lastNameValidation = validateRequired(lastName, 'Last name', MAX_LENGTHS.lastName);
    if (!lastNameValidation.valid) {
      return c.json({ error: lastNameValidation.error }, 400);
    }

    const phoneValidation = validatePhone(phone, true);
    if (!phoneValidation.valid) {
      return c.json({ error: phoneValidation.error }, 400);
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return c.json({ error: emailValidation.error }, 400);
    }

    // Validate optional fields
    const additionalInfoValidation = validateOptional(additionalInfo, 'Additional information', MAX_LENGTHS.additionalInfo);
    if (!additionalInfoValidation.valid) {
      return c.json({ error: additionalInfoValidation.error }, 400);
    }

    // Validate file (required for resume form)
    const fileValidation = validateFile(file, true);
    if (!fileValidation.valid) {
      return c.json({ error: fileValidation.error }, 400);
    }

    // Process file attachment
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const base64Content = arrayBufferToBase64(arrayBuffer);
      fileAttachment = {
        filename: file.name,
        content: base64Content,
      };
    }

    console.log(`[Resume] From: ${email}, Name: ${firstName} ${lastName}, File: ${fileAttachment ? fileAttachment.filename : 'none'}`);

    // Build notification email content
    const notificationRows =
      tableRow('Name', `${firstName} ${lastName}`) +
      tableRow('Email', email, true) +
      tableRow('Phone', phone, true) +
      optionalTableRow('Additional Information', additionalInfo) +
      (fileAttachment ? tableRow('Resume', `${fileAttachment.filename} (attached)`) : '');

    const notificationHtml = emailWrapper(
      'New Resume Registration',
      notificationTable(notificationRows)
    );

    // Send notification email to ZenPeople (with attachment if present)
    const notificationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: 'noreply@zenpeople.com.au',
      to: c.env.DESTINATION_EMAIL,
      subject: `New Resume Registration - ${firstName} ${lastName}`,
      html: notificationHtml,
      replyTo: email,
      attachments: fileAttachment ? [fileAttachment] : undefined,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    return c.json({ success: true, message: "Thank you for registering! We'll contact you when we have suitable opportunities." });
  } catch (error) {
    console.error('[Resume] Error:', error instanceof Error ? error.message : error);
    console.error('[Resume] Stack:', error instanceof Error ? error.stack : 'N/A');
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default resume;
