const API_BASE = '';

interface ApiResponse {
  success?: boolean;
  error?: string;
  message?: string;
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

async function submitForm(endpoint: string, data: object): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || 'Failed to submit form' };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Form submission error:', error);
    return { error: 'Network error. Please try again.' };
  }
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  return submitForm('contact', data);
}

export async function submitQuoteForm(data: QuoteFormData): Promise<ApiResponse> {
  return submitForm('quote', data);
}

export async function submitResumeForm(data: ResumeFormData): Promise<ApiResponse> {
  return submitForm('resume', data);
}
