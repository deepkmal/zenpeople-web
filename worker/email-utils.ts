import type { EmailOptions } from './types';

// Send email via Resend API
export async function sendEmail(
  apiKey: string,
  options: EmailOptions
): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', errorData);
      return { ok: false, error: errorData };
    }

    return { ok: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { ok: false, error: String(error) };
  }
}

// HTML table row helper
export function tableRow(label: string, value: string, isLink: boolean = false): string {
  const cellStyle = 'padding: 8px; border: 1px solid #ddd;';
  const content = isLink
    ? `<a href="${value.includes('@') ? 'mailto:' : 'tel:'}${value}">${value}</a>`
    : value;

  return `
    <tr>
      <td style="${cellStyle} font-weight: bold;">${label}</td>
      <td style="${cellStyle}">${content}</td>
    </tr>
  `;
}

// Optional table row helper (only renders if value exists)
export function optionalTableRow(label: string, value: string | undefined, isLink: boolean = false): string {
  if (!value) return '';
  return tableRow(label, value, isLink);
}

// Email wrapper template
export function emailWrapper(title: string, content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1E3A5F; margin-bottom: 20px;">${title}</h2>
        ${content}
        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          Submitted from zenpeople.com.au
        </p>
      </div>
    </body>
    </html>
  `;
}

// Notification email table template
export function notificationTable(rows: string): string {
  return `
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      ${rows}
    </table>
  `;
}

// Confirmation email template for contact form
export function contactConfirmationEmail(firstName: string): string {
  return emailWrapper(
    'Thank You for Contacting ZenPeople',
    `
      <p>Hi ${firstName},</p>
      <p>Thank you for reaching out to us. We've received your message and one of our team members will get back to you within 24 hours.</p>
      <p>In the meantime, feel free to browse our <a href="https://zenpeople.com.au/jobs" style="color: #E86A33;">current job listings</a>.</p>
      <p>Best regards,<br>The ZenPeople Team</p>
    `
  );
}

// Confirmation email template for quote request
export function quoteConfirmationEmail(firstName: string, company: string): string {
  return emailWrapper(
    'Thank You for Your Quote Request',
    `
      <p>Hi ${firstName},</p>
      <p>Thank you for your quote request from ${company}. We appreciate your interest in our recruitment services.</p>
      <p>Our team will review your requirements and prepare a tailored proposal for you within 24 hours.</p>
      <p>If you have any urgent questions, please don't hesitate to call us.</p>
      <p>Best regards,<br>The ZenPeople Team</p>
    `
  );
}

// Confirmation email template for resume registration
export function resumeConfirmationEmail(firstName: string): string {
  return emailWrapper(
    'Welcome to ZenPeople',
    `
      <p>Hi ${firstName},</p>
      <p>Thank you for registering with ZenPeople. We're excited to help you find your next opportunity in the facade and glazing industry.</p>
      <p>Our team will review your details and reach out to you when we have suitable opportunities that match your profile.</p>
      <p>In the meantime, you can view our <a href="https://zenpeople.com.au/jobs" style="color: #E86A33;">current job listings</a>.</p>
      <p>Best regards,<br>The ZenPeople Team</p>
    `
  );
}
