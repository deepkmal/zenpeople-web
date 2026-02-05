const API_BASE = 'https://api.zenpeople.com.au';

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
  phone: string;
  message: string;
  turnstileToken?: string;
}

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone?: string;
  sector?: string;
  turnstileToken?: string;
}

export interface ResumeFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  additionalInfo?: string;
  file?: File;
  turnstileToken?: string;
}

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  jobTitle: string;
  jobSlug: string;
  file?: File;
  turnstileToken?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/contact`, {
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
    console.error('Contact form submission error:', error);
    return { error: 'Network error. Please try again.' };
  }
}

export async function submitQuoteForm(data: QuoteFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}/api/quote`, {
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
    console.error('Quote form submission error:', error);
    return { error: 'Network error. Please try again.' };
  }
}

export async function submitResumeForm(data: ResumeFormData): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    if (data.turnstileToken) {
      formData.append('turnstileToken', data.turnstileToken);
    }
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

export async function submitApplicationForm(data: ApplicationFormData): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('jobTitle', data.jobTitle);
    formData.append('jobSlug', data.jobSlug);
    if (data.turnstileToken) {
      formData.append('turnstileToken', data.turnstileToken);
    }
    if (data.file) {
      formData.append('file', data.file);
    }

    const response = await fetch(`${API_BASE}/api/application`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return { error: result.error || 'Failed to submit application' };
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error('Application form submission error:', error);
    return { error: 'Network error. Please try again.' };
  }
}
