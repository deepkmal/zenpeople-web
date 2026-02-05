// Shared validation utilities for worker endpoints

// Australian phone number regex
// Accepts: 04XX XXX XXX, +614XX XXX XXX, 0X XXXX XXXX, etc.
const AU_PHONE_REGEX = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;

// Email regex - more strict than basic check
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Max lengths for fields
export const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 20,
  company: 200,
  message: 5000,
  additionalInfo: 5000,
  jobTitle: 200,
  jobSlug: 200,
};

// File validation constants
export const FILE_VALIDATION = {
  maxSize: 5 * 1024 * 1024, // 5MB
  maxCount: 1,
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  allowedExtensions: ['.pdf', '.doc', '.docx'],
};

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Sanitize a string by removing potentially dangerous characters
 * Strips HTML tags and trims whitespace
 */
export function sanitize(input: string | undefined | null): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .trim();
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const sanitized = sanitize(email).toLowerCase();

  if (!sanitized) {
    return { valid: false, error: 'Email is required' };
  }

  if (sanitized.length > MAX_LENGTHS.email) {
    return { valid: false, error: `Email must be less than ${MAX_LENGTHS.email} characters` };
  }

  if (!EMAIL_REGEX.test(sanitized)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

/**
 * Validate Australian phone number
 */
export function validatePhone(phone: string, required = true): ValidationResult {
  const sanitized = sanitize(phone).replace(/\s/g, ''); // Remove spaces for validation

  if (!sanitized) {
    if (required) {
      return { valid: false, error: 'Phone number is required' };
    }
    return { valid: true };
  }

  if (sanitized.length > MAX_LENGTHS.phone) {
    return { valid: false, error: `Phone must be less than ${MAX_LENGTHS.phone} characters` };
  }

  if (!AU_PHONE_REGEX.test(sanitized)) {
    return { valid: false, error: 'Please enter a valid Australian phone number' };
  }

  return { valid: true };
}

/**
 * Validate a required string field
 */
export function validateRequired(value: string, fieldName: string, maxLength?: number): ValidationResult {
  const sanitized = sanitize(value);

  if (!sanitized) {
    return { valid: false, error: `${fieldName} is required` };
  }

  if (maxLength && sanitized.length > maxLength) {
    return { valid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }

  return { valid: true };
}

/**
 * Validate an optional string field
 */
export function validateOptional(value: string | undefined, fieldName: string, maxLength?: number): ValidationResult {
  if (!value) return { valid: true };

  const sanitized = sanitize(value);

  if (maxLength && sanitized.length > maxLength) {
    return { valid: false, error: `${fieldName} must be less than ${maxLength} characters` };
  }

  return { valid: true };
}

/**
 * Validate file upload
 */
export function validateFile(file: File | null, required = false): ValidationResult {
  if (!file) {
    if (required) {
      return { valid: false, error: 'File is required' };
    }
    return { valid: true };
  }

  // Check file size
  if (file.size > FILE_VALIDATION.maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  // Check file type
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  const isValidType = FILE_VALIDATION.allowedTypes.includes(file.type) ||
                      FILE_VALIDATION.allowedExtensions.includes(ext);

  if (!isValidType) {
    return { valid: false, error: 'Only PDF, DOC, and DOCX files are allowed' };
  }

  return { valid: true };
}

/**
 * Validate Turnstile token with Cloudflare
 */
export async function validateTurnstile(
  token: string,
  secretKey: string,
  ip?: string
): Promise<ValidationResult> {
  if (!token) {
    return { valid: false, error: 'Security verification required' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json() as { success: boolean; 'error-codes'?: string[] };

    if (!result.success) {
      console.error('Turnstile validation failed:', result['error-codes']);
      return { valid: false, error: 'Security verification failed. Please try again.' };
    }

    return { valid: true };
  } catch (error) {
    console.error('Turnstile validation error:', error);
    return { valid: false, error: 'Security verification failed. Please try again.' };
  }
}
