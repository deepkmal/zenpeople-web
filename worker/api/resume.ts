import { Hono } from 'hono';
import type { Env, ResumeFormData } from '../types';
import {
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
  resumeConfirmationEmail,
} from '../email-utils';

const resume = new Hono<{ Bindings: Env }>();

resume.post('/', async (c) => {
  try {
    const data: ResumeFormData = await c.req.json();

    // Validate required fields
    if (!data.firstName || !data.lastName) {
      return c.json({ error: 'First name and last name are required' }, 400);
    }

    if (!data.phone) {
      return c.json({ error: 'Phone number is required' }, 400);
    }

    if (!data.email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    // Build notification email content
    const notificationRows =
      tableRow('Name', `${data.firstName} ${data.lastName}`) +
      tableRow('Email', data.email, true) +
      tableRow('Phone', data.phone, true) +
      optionalTableRow('Additional Information', data.additionalInfo);

    const notificationHtml = emailWrapper(
      'New Resume Registration',
      notificationTable(notificationRows)
    );

    // Send notification email to ZenPeople
    const notificationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: c.env.SOURCE_EMAIL,
      to: 'hello@zenpeople.com.au',
      subject: `New Resume Registration - ${data.firstName} ${data.lastName}`,
      html: notificationHtml,
      replyTo: data.email,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    // Send confirmation email to user
    const confirmationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: c.env.SOURCE_EMAIL,
      to: data.email,
      subject: 'Welcome to ZenPeople',
      html: resumeConfirmationEmail(data.firstName),
    });

    if (!confirmationResult.ok) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
    }

    return c.json({ success: true, message: "Thank you for registering! We'll contact you when we have suitable opportunities." });
  } catch (error) {
    console.error('Resume form error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default resume;
