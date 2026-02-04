import { Hono } from 'hono';
import type { Env, EmailAttachment } from '../types';
import {
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
  resumeConfirmationEmail,
} from '../email-utils';

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
  try {
    const contentType = c.req.header('content-type') || '';

    let firstName: string;
    let lastName: string;
    let phone: string;
    let email: string;
    let additionalInfo: string | undefined;
    let fileAttachment: EmailAttachment | undefined;

    if (contentType.includes('multipart/form-data')) {
      // Parse FormData
      const formData = await c.req.formData();
      firstName = formData.get('firstName') as string;
      lastName = formData.get('lastName') as string;
      phone = formData.get('phone') as string;
      email = formData.get('email') as string;
      additionalInfo = formData.get('additionalInfo') as string | undefined;

      // Handle file attachment
      const file = formData.get('file') as File | null;
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const base64Content = arrayBufferToBase64(arrayBuffer);
        fileAttachment = {
          filename: file.name,
          content: base64Content,
        };
      }
    } else {
      // Parse JSON (backwards compatible)
      const data = await c.req.json();
      firstName = data.firstName;
      lastName = data.lastName;
      phone = data.phone;
      email = data.email;
      additionalInfo = data.additionalInfo;
    }

    // Validate required fields
    if (!firstName || !lastName) {
      return c.json({ error: 'First name and last name are required' }, 400);
    }

    if (!phone) {
      return c.json({ error: 'Phone number is required' }, 400);
    }

    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

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
      from: c.env.SOURCE_EMAIL,
      to: c.env.DESTINATION_EMAIL,
      subject: `New Resume Registration - ${firstName} ${lastName}`,
      html: notificationHtml,
      replyTo: email,
      attachments: fileAttachment ? [fileAttachment] : undefined,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    // Confirmation email to user (disabled for now)
    // const confirmationResult = await sendEmail(c.env.RESEND_API_KEY, {
    //   from: c.env.SOURCE_EMAIL,
    //   to: email,
    //   subject: 'Welcome to ZenPeople',
    //   html: resumeConfirmationEmail(firstName),
    // });
    //
    // if (!confirmationResult.ok) {
    //   console.error('Failed to send confirmation email:', confirmationResult.error);
    // }

    return c.json({ success: true, message: "Thank you for registering! We'll contact you when we have suitable opportunities." });
  } catch (error) {
    console.error('Resume form error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default resume;
