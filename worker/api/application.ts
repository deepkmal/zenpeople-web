import { Hono } from 'hono';
import type { Env, EmailAttachment } from '../types';
import {
  sendEmail,
  tableRow,
  emailWrapper,
  notificationTable,
} from '../email-utils';
import {
  sanitize,
  validateEmail,
  validatePhone,
  validateRequired,
  validateTurnstile,
  validateFile,
  MAX_LENGTHS,
} from '../validation';
import { checkRateLimit, getClientIP } from '../rate-limit';

const application = new Hono<{ Bindings: Env }>();

// Helper to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

application.post('/', async (c) => {
  const host = c.req.header('host') || '';
  const origin = c.req.header('origin') || '';
  console.log(`[Application] Job application received - host: ${host}, origin: ${origin}`);

  try {
    // Rate limiting
    const clientIP = getClientIP(c.req.raw);
    console.log(`[Application] Client IP: ${clientIP}`);
    const rateLimit = checkRateLimit(`application:${clientIP}`, { maxRequests: 10, windowMs: 60000 });

    if (!rateLimit.allowed) {
      console.log(`[Application] Rate limit exceeded for IP: ${clientIP}`);
      return c.json({ error: 'Too many requests. Please try again later.' }, 429);
    }

    const contentType = c.req.header('content-type') || '';
    console.log(`[Application] Content-Type: ${contentType}`);

    let firstName: string;
    let lastName: string;
    let phone: string;
    let email: string;
    let jobTitle: string;
    let jobSlug: string;
    let turnstileToken: string;
    let file: File | null = null;
    let fileAttachment: EmailAttachment | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await c.req.formData();
      firstName = formData.get('firstName') as string;
      lastName = formData.get('lastName') as string;
      phone = formData.get('phone') as string;
      email = formData.get('email') as string;
      jobTitle = formData.get('jobTitle') as string;
      jobSlug = formData.get('jobSlug') as string;
      turnstileToken = formData.get('turnstileToken') as string;
      file = formData.get('file') as File | null;
    } else {
      const data = await c.req.json();
      firstName = data.firstName;
      lastName = data.lastName;
      phone = data.phone;
      email = data.email;
      jobTitle = data.jobTitle;
      jobSlug = data.jobSlug;
      turnstileToken = data.turnstileToken;
    }

    // Turnstile verification (skip if request comes from localhost)
    const isFromLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    console.log(`[Application] isFromLocalhost: ${isFromLocalhost}, turnstileToken present: ${!!turnstileToken}`);
    if (!isFromLocalhost) {
      const turnstileResult = await validateTurnstile(
        turnstileToken,
        c.env.TURNSTILE_SECRET_KEY,
        clientIP
      );
      console.log(`[Application] Turnstile result: ${JSON.stringify(turnstileResult)}`);
      if (!turnstileResult.valid) {
        console.log(`[Application] Turnstile validation failed: ${turnstileResult.error}`);
        return c.json({ error: turnstileResult.error }, 400);
      }
    } else {
      console.log('[Application] Skipping Turnstile (localhost origin)');
    }

    // Sanitize inputs
    firstName = sanitize(firstName);
    lastName = sanitize(lastName);
    phone = sanitize(phone);
    email = sanitize(email)?.toLowerCase();
    jobTitle = sanitize(jobTitle);
    jobSlug = sanitize(jobSlug);

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

    const jobTitleValidation = validateRequired(jobTitle, 'Job title', MAX_LENGTHS.jobTitle);
    if (!jobTitleValidation.valid) {
      return c.json({ error: jobTitleValidation.error }, 400);
    }

    const jobSlugValidation = validateRequired(jobSlug, 'Job information', MAX_LENGTHS.jobSlug);
    if (!jobSlugValidation.valid) {
      return c.json({ error: jobSlugValidation.error }, 400);
    }

    // Validate file (optional for job applications)
    const fileValidation = validateFile(file, false);
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

    console.log(`[Application] From: ${email}, Name: ${firstName} ${lastName}, Job: ${jobTitle}, File: ${fileAttachment ? fileAttachment.filename : 'none'}`);

    // Build job URL
    const jobUrl = `https://zenpeople.com.au/jobs/${jobSlug}`;

    // Build notification email content
    const notificationRows =
      tableRow('Name', `${firstName} ${lastName}`) +
      tableRow('Email', email, true) +
      tableRow('Phone', phone, true) +
      tableRow('Position', `<a href="${jobUrl}" style="color: #141B2D;">${jobTitle}</a>`) +
      (fileAttachment ? tableRow('Resume', `${fileAttachment.filename} (attached)`) : tableRow('Resume', 'Not provided'));

    const notificationHtml = emailWrapper(
      'New Job Application',
      notificationTable(notificationRows)
    );

    // Send notification email to ZenPeople (with attachment if present)
    const notificationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: 'noreply@zenpeople.com.au',
      to: c.env.DESTINATION_EMAIL,
      subject: `New Application - ${jobTitle} - ${firstName} ${lastName}`,
      html: notificationHtml,
      replyTo: email,
      attachments: fileAttachment ? [fileAttachment] : undefined,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    return c.json({ success: true, message: "Thank you for your application! We'll be in touch soon." });
  } catch (error) {
    console.error('[Application] Error:', error instanceof Error ? error.message : error);
    console.error('[Application] Stack:', error instanceof Error ? error.stack : 'N/A');
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default application;
