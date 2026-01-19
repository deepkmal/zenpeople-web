import type { Env, ResumeFormData } from './_shared/types';
import {
  handleOptions,
  successResponse,
  errorResponse,
  sendEmail,
  tableRow,
  optionalTableRow,
  emailWrapper,
  notificationTable,
  resumeConfirmationEmail,
} from './_shared/email-utils';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const data: ResumeFormData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName) {
      return errorResponse('First name and last name are required');
    }

    if (!data.phone) {
      return errorResponse('Phone number is required');
    }

    if (!data.email) {
      return errorResponse('Email is required');
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
    const notificationResult = await sendEmail(env.RESEND_API_KEY, {
      from: env.SOURCE_EMAIL,
      to: 'hello@zenpeople.com.au',
      subject: `New Resume Registration - ${data.firstName} ${data.lastName}`,
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
      subject: 'Welcome to ZenPeople',
      html: resumeConfirmationEmail(data.firstName),
    });

    if (!confirmationResult.ok) {
      console.error('Failed to send confirmation email:', confirmationResult.error);
      // Don't fail the request if confirmation email fails
    }

    return successResponse('Thank you for registering! We\'ll contact you when we have suitable opportunities.');
  } catch (error) {
    console.error('Resume form error:', error);
    return errorResponse('Internal server error', 500);
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return handleOptions();
};
