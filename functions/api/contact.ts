import type { Env, ContactFormData } from './_shared/types';
import {
  handleOptions,
  successResponse,
  errorResponse,
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
  contactConfirmationEmail,
} from './_shared/email-utils';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName) {
      return errorResponse('First name and last name are required');
    }

    if (!data.email) {
      return errorResponse('Email is required');
    }

    if (!data.message) {
      return errorResponse('Message is required');
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
    const notificationResult = await sendEmail(env.RESEND_API_KEY, {
      from: env.SOURCE_EMAIL,
      to: 'hello@zenpeople.com.au',
      subject: `New Contact Form Submission - ${data.firstName} ${data.lastName}`,
      html: notificationHtml,
      replyTo: data.email,
    });

    if (!notificationResult.ok) {
      return errorResponse('Failed to send notification email', 500);
    }

    // Send confirmation email to user
    const confirmationResult = await sendEmail(env.RESEND_API_KEY, {
      from: env.SOURCE_EMAIL,
      to: data.email,
      subject: 'Thank You for Contacting ZenPeople',
      html: contactConfirmationEmail(data.firstName),
    });

    if (!confirmationResult.ok) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
      // Don't fail the request if confirmation email fails
    }

    return successResponse('Thank you for your message. We\'ll be in touch soon!');
  } catch (error) {
    console.error('Contact form error:', error);
    return errorResponse('Internal server error', 500);
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return handleOptions();
};
