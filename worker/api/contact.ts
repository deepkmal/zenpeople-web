import { Hono } from 'hono';
import type { Env, ContactFormData } from '../types';
import {
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
  contactConfirmationEmail,
} from '../email-utils';

const contact = new Hono<{ Bindings: Env }>();

contact.post('/', async (c) => {
  console.log('[Contact] Form submission received');

  try {
    const data: ContactFormData = await c.req.json();
    console.log(`[Contact] From: ${data.email}, Name: ${data.firstName} ${data.lastName}`);

    // Validate required fields
    if (!data.firstName || !data.lastName) {
      return c.json({ error: 'First name and last name are required' }, 400);
    }

    if (!data.email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    if (!data.message) {
      return c.json({ error: 'Message is required' }, 400);
    }

    // Build notification email content
    const notificationRows =
      tableRow('Name', `${data.firstName} ${data.lastName}`) +
      optionalTableRow('Company', data.company) +
      tableRow('Email', data.email, true) +
      optionalTableRow('Phone', data.phone, true) +
      tableRow('Message', data.message);

    const notificationHtml = emailWrapper(
      'New Contact Form Submission',
      notificationTable(notificationRows)
    );

    // Send notification email to ZenPeople
    const notificationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: c.env.SOURCE_EMAIL,
      to: c.env.DESTINATION_EMAIL,
      subject: `New Contact Form Submission - ${data.firstName} ${data.lastName}`,
      html: notificationHtml,
      replyTo: data.email,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    // Confirmation email to user (disabled for now)
    // const confirmationResult = await sendEmail(c.env.RESEND_API_KEY, {
    //   from: c.env.SOURCE_EMAIL,
    //   to: data.email,
    //   subject: 'Thank You for Contacting ZenPeople',
    //   html: contactConfirmationEmail(data.firstName),
    // });
    //
    // if (!confirmationResult.ok) {
    //   console.error('Failed to send confirmation email:', confirmationResult.error);
    // }

    return c.json({ success: true, message: "Thank you for your message. We'll be in touch soon!" });
  } catch (error) {
    console.error('Contact form error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default contact;
