import { useState, useMemo } from 'react';
import { Phone, Mail } from 'lucide-react';
import { Container } from '../components/ui/Container';

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const errors = useMemo<FormErrors>(() => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Convert email to lowercase
    const processedValue = name === 'email' ? value.toLowerCase() : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    // Placeholder submission - replace with actual API call
    try {
      console.log('Form submitted:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', company: '', email: '', phone: '', message: '' });
      setHasAttemptedSubmit(false);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50 pt-32 lg:pt-40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-start">
          {/* Left Column - Text */}
          <div className="text-navy text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get in touch.
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Whether you're hiring or looking for work, we're here to help.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a
                href="tel:+61272284676"
                className="flex items-center gap-3 text-navy hover:text-[#2175D9] transition-colors justify-center lg:justify-start"
              >
                <Phone className="w-5 h-5" />
                <span>+61 2 7228 4676</span>
              </a>
              <a
                href="mailto:recruitment@zenpeople.com.au"
                className="flex items-center gap-3 text-navy hover:text-[#2175D9] transition-colors justify-center lg:justify-start"
              >
                <Mail className="w-5 h-5" />
                <span>recruitment@zenpeople.com.au</span>
              </a>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-600 mb-3">Follow us on:</p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://linkedin.com/company/zenpeople"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-[#2175D9] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/zenpeople"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-[#2175D9] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@zenpeople"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-[#2175D9] transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {submitStatus === 'success' ? (
              <div className="bg-navy/10 p-8 text-center">
                <h3 className="text-xl font-semibold text-navy mb-2">
                  Thank you for your message!
                </h3>
                <p className="text-gray-600">
                  We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 text-[#2175D9] hover:text-navy transition-colors underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name & Last Name - stacked on mobile, side by side on larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy border border-gray-200 ${
                        hasAttemptedSubmit && errors.firstName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="First name *"
                    />
                    {hasAttemptedSubmit && errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy border border-gray-200 ${
                        hasAttemptedSubmit && errors.lastName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Last name *"
                    />
                    {hasAttemptedSubmit && errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy border border-gray-200"
                    placeholder="Company (optional)"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy border border-gray-200 ${
                      hasAttemptedSubmit && errors.email ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Email *"
                  />
                  {hasAttemptedSubmit && errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy border border-gray-200 ${
                      hasAttemptedSubmit && errors.phone ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Phone *"
                  />
                  {hasAttemptedSubmit && errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy resize-none border border-gray-200 ${
                      hasAttemptedSubmit && errors.message ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Message *"
                  />
                  {hasAttemptedSubmit && errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="w-full px-6 py-3 bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
