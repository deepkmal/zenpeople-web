export interface Env {
  RESEND_API_KEY: string;
  DESTINATION_EMAIL: string;
  TURNSTILE_SECRET_KEY: string;
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_TOKEN: string;
  SANITY_WEBHOOK_SECRET: string;
  ALLOWED_ORIGIN: string;
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
