import { Hono } from 'hono';
import type { Env } from '../types';
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
  MAX_LENGTHS,
} from '../validation';
import { checkRateLimit, getClientIP } from '../rate-limit';

const quote = new Hono<{ Bindings: Env }>();

quote.post('/', async (c) => {
  const host = c.req.header('host') || '';
  const origin = c.req.header('origin') || '';
  console.log(`[Quote] Form submission received - host: ${host}, origin: ${origin}`);

  try {
    // Rate limiting
    const clientIP = getClientIP(c.req.raw);
    console.log(`[Quote] Client IP: ${clientIP}`);
    const rateLimit = checkRateLimit(`quote:${clientIP}`, { maxRequests: 5, windowMs: 60000 });

    if (!rateLimit.allowed) {
      console.log(`[Quote] Rate limit exceeded for IP: ${clientIP}`);
      return c.json({ error: 'Too many requests. Please try again later.' }, 429);
    }

    const data = await c.req.json();
    console.log(`[Quote] Request data keys: ${Object.keys(data).join(', ')}`);

    // Sanitize inputs
    const firstName = sanitize(data.firstName);
    const lastName = sanitize(data.lastName);
    const company = sanitize(data.company);
    const email = sanitize(data.email)?.toLowerCase();
    const phone = sanitize(data.phone);
    const sector = sanitize(data.sector);

    // Validate required fields
    const firstNameValidation = validateRequired(firstName, 'First name', MAX_LENGTHS.firstName);
    if (!firstNameValidation.valid) {
      return c.json({ error: firstNameValidation.error }, 400);
    }

    const lastNameValidation = validateRequired(lastName, 'Last name', MAX_LENGTHS.lastName);
    if (!lastNameValidation.valid) {
      return c.json({ error: lastNameValidation.error }, 400);
    }

    const companyValidation = validateRequired(company, 'Company', MAX_LENGTHS.company);
    if (!companyValidation.valid) {
      return c.json({ error: companyValidation.error }, 400);
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return c.json({ error: emailValidation.error }, 400);
    }

    // Phone is optional for quote form
    const phoneValidation = validatePhone(phone, false);
    if (!phoneValidation.valid) {
      return c.json({ error: phoneValidation.error }, 400);
    }

    // Sector is optional
    const sectorValidation = validateOptional(sector, 'Sector', 100);
    if (!sectorValidation.valid) {
      return c.json({ error: sectorValidation.error }, 400);
    }

    console.log(`[Quote] From: ${email}, Company: ${company}`);

    // Build notification email content
    const notificationRows =
      tableRow('Name', `${firstName} ${lastName}`) +
      tableRow('Company', company) +
      tableRow('Email', email, true) +
      optionalTableRow('Phone', phone, true) +
      optionalTableRow('Sector', sector);

    const notificationHtml = emailWrapper(
      'New Quote Request',
      notificationTable(notificationRows)
    );

    // Send notification email to ZenPeople
    const notificationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: 'noreply@zenpeople.com.au',
      to: c.env.DESTINATION_EMAIL,
      subject: `New Quote Request - ${company}`,
      html: notificationHtml,
      replyTo: email,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    return c.json({ success: true, message: "Thank you for your quote request. We'll send you a tailored proposal within 24 hours!" });
  } catch (error) {
    console.error('[Quote] Error:', error instanceof Error ? error.message : error);
    console.error('[Quote] Stack:', error instanceof Error ? error.stack : 'N/A');
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default quote;
