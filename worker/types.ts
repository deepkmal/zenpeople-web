export interface Env {
  RESEND_API_KEY: string;
  SOURCE_EMAIL: string;
  DESTINATION_EMAIL: string;
  ASSETS: Fetcher;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
}

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone?: string;
  sector?: string;
}

export interface ResumeFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  additionalInfo?: string;
}

export interface EmailAttachment {
  filename: string;
  content: string; // base64 encoded
}

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}
