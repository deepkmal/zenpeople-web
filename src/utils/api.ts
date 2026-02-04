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
  file?: File;
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
  try {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    if (data.additionalInfo) {
      formData.append('additionalInfo', data.additionalInfo);
    }
    if (data.file) {
      formData.append('file', data.file);
    }

    const response = await fetch(`${API_BASE}/api/resume`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || 'Failed to submit form' };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Resume form submission error:', error);
    return { error: 'Network error. Please try again.' };
  }
}
