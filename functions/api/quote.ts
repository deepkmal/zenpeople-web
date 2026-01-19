import type { Env, QuoteFormData } from './_shared/types';
import {
  handleOptions,
  successResponse,
  errorResponse,
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
  quoteConfirmationEmail,
} from './_shared/email-utils';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const data: QuoteFormData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName) {
      return errorResponse('First name and last name are required');
    }

    if (!data.company) {
      return errorResponse('Company name is required');
    }

    if (!data.email) {
      return errorResponse('Email is required');
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
    const notificationResult = await sendEmail(env.RESEND_API_KEY, {
      from: env.SOURCE_EMAIL,
      to: 'hello@zenpeople.com.au',
      subject: `New Quote Request - ${data.company}`,
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
      subject: 'Thank You for Your Quote Request - ZenPeople',
      html: quoteConfirmationEmail(data.firstName, data.company),
    });

    if (!confirmationResult.ok) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
      // Don't fail the request if confirmation email fails
    }

    return successResponse('Thank you for your quote request. We\'ll send you a tailored proposal within 24 hours!');
  } catch (error) {
    console.error('Quote form error:', error);
    return errorResponse('Internal server error', 500);
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return handleOptions();
};
