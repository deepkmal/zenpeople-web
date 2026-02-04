import { Hono } from 'hono';
import type { Env, QuoteFormData } from '../types';
import {
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
  quoteConfirmationEmail,
} from '../email-utils';

const quote = new Hono<{ Bindings: Env }>();

quote.post('/', async (c) => {
  console.log('[Quote] Form submission received');

  try {
    const data: QuoteFormData = await c.req.json();
    console.log(`[Quote] From: ${data.email}, Company: ${data.company}`);

    // Validate required fields
    if (!data.firstName || !data.lastName) {
      return c.json({ error: 'First name and last name are required' }, 400);
    }

    if (!data.company) {
      return c.json({ error: 'Company name is required' }, 400);
    }

    if (!data.email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    // Build notification email content
    const notificationRows =
      tableRow('Name', `${data.firstName} ${data.lastName}`) +
      tableRow('Company', data.company) +
      tableRow('Email', data.email, true) +
      optionalTableRow('Phone', data.phone, true) +
      optionalTableRow('Sector', data.sector);

    const notificationHtml = emailWrapper(
      'New Quote Request',
      notificationTable(notificationRows)
    );

    // Send notification email to ZenPeople
    const notificationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: 'noreply@zenpeople.com.au',
      to: c.env.DESTINATION_EMAIL,
      subject: `New Quote Request - ${data.company}`,
      html: notificationHtml,
      replyTo: data.email,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    // Confirmation email to user (disabled for now)
    // const confirmationResult = await sendEmail(c.env.RESEND_API_KEY, {
    //   from: 'noreply@zenpeople.com.au',
    //   to: data.email,
    //   subject: 'Thank You for Your Quote Request - ZenPeople',
    //   html: quoteConfirmationEmail(data.firstName, data.company),
    // });
    //
    // if (!confirmationResult.ok) {
    //   console.error('Failed to send confirmation email:', confirmationResult.error);
    // }

    return c.json({ success: true, message: "Thank you for your quote request. We'll send you a tailored proposal within 24 hours!" });
  } catch (error) {
    console.error('Quote form error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default quote;
