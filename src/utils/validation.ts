// Frontend validation utilities

// Australian phone number regex
// Accepts: 04XX XXX XXX, +614XX XXX XXX, 0X XXXX XXXX, etc.
const AU_PHONE_REGEX = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;

// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return { valid: false, error: 'Email is required' };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email' };
  }

  return { valid: true };
}

export function validateAustralianPhone(phone: string, required = true): { valid: boolean; error?: string } {
  const cleaned = phone.replace(/\s/g, '');

  if (!cleaned) {
    if (required) {
      return { valid: false, error: 'Phone number is required' };
    }
    return { valid: true };
  }

  if (!AU_PHONE_REGEX.test(cleaned)) {
    return { valid: false, error: 'Please enter a valid Australian phone number' };
  }

  return { valid: true };
}
