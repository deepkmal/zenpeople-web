export interface Env {
  RESEND_API_KEY: string;
  SOURCE_EMAIL: string;
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

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}
