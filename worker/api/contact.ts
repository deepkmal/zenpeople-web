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
  validateTurnstile,
  MAX_LENGTHS,
} from '../validation';
import { checkRateLimit, getClientIP } from '../rate-limit';

const contact = new Hono<{ Bindings: Env }>();

contact.post('/', async (c) => {
  const host = c.req.header('host') || '';
  const origin = c.req.header('origin') || '';
  console.log(`[Contact] Form submission received - host: ${host}, origin: ${origin}`);

  try {
    // Rate limiting
    const clientIP = getClientIP(c.req.raw);
    console.log(`[Contact] Client IP: ${clientIP}`);
    const rateLimit = checkRateLimit(`contact:${clientIP}`, { maxRequests: 5, windowMs: 60000 });

    if (!rateLimit.allowed) {
      console.log(`[Contact] Rate limit exceeded for IP: ${clientIP}`);
      return c.json({ error: 'Too many requests. Please try again later.' }, 429);
    }

    const data = await c.req.json();
    console.log(`[Contact] Request data keys: ${Object.keys(data).join(', ')}`);

    // Turnstile verification (skip in non-production)
    const isProduction = host.includes('zenpeople.com.au');
    console.log(`[Contact] isProduction: ${isProduction}, turnstileToken present: ${!!data.turnstileToken}`);
    if (isProduction) {
      const turnstileResult = await validateTurnstile(
        data.turnstileToken,
        c.env.TURNSTILE_SECRET_KEY,
        clientIP
      );
      console.log(`[Contact] Turnstile result: ${JSON.stringify(turnstileResult)}`);
      if (!turnstileResult.valid) {
        console.log(`[Contact] Turnstile validation failed: ${turnstileResult.error}`);
        return c.json({ error: turnstileResult.error }, 400);
      }
    } else {
      console.log('[Contact] Skipping Turnstile (non-production)');
    }

    // Sanitize inputs
    const firstName = sanitize(data.firstName);
    const lastName = sanitize(data.lastName);
    const company = sanitize(data.company);
    const email = sanitize(data.email)?.toLowerCase();
    const phone = sanitize(data.phone);
    const message = sanitize(data.message);

    // Validate required fields
    const firstNameValidation = validateRequired(firstName, 'First name', MAX_LENGTHS.firstName);
    if (!firstNameValidation.valid) {
      return c.json({ error: firstNameValidation.error }, 400);
    }

    const lastNameValidation = validateRequired(lastName, 'Last name', MAX_LENGTHS.lastName);
    if (!lastNameValidation.valid) {
      return c.json({ error: lastNameValidation.error }, 400);
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return c.json({ error: emailValidation.error }, 400);
    }

    const phoneValidation = validatePhone(phone, true);
    if (!phoneValidation.valid) {
      return c.json({ error: phoneValidation.error }, 400);
    }

    const messageValidation = validateRequired(message, 'Message', MAX_LENGTHS.message);
    if (!messageValidation.valid) {
      return c.json({ error: messageValidation.error }, 400);
    }

    // Validate optional fields
    const companyValidation = validateOptional(company, 'Company', MAX_LENGTHS.company);
    if (!companyValidation.valid) {
      return c.json({ error: companyValidation.error }, 400);
    }

    console.log(`[Contact] From: ${email}, Name: ${firstName} ${lastName}`);

    // Build notification email content
    const notificationRows =
      tableRow('Name', `${firstName} ${lastName}`) +
      optionalTableRow('Company', company) +
      tableRow('Email', email, true) +
      optionalTableRow('Phone', phone, true) +
      tableRow('Message', message);

    const notificationHtml = emailWrapper(
      'New Contact Form Submission',
      notificationTable(notificationRows)
    );

    // Send notification email to ZenPeople
    const notificationResult = await sendEmail(c.env.RESEND_API_KEY, {
      from: 'noreply@zenpeople.com.au',
      to: c.env.DESTINATION_EMAIL,
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      html: notificationHtml,
      replyTo: email,
    });

    if (!notificationResult.ok) {
      return c.json({ error: 'Failed to send notification email' }, 500);
    }

    return c.json({ success: true, message: "Thank you for your message. We'll be in touch soon!" });
  } catch (error) {
    console.error('[Contact] Error:', error instanceof Error ? error.message : error);
    console.error('[Contact] Stack:', error instanceof Error ? error.stack : 'N/A');
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default contact;
