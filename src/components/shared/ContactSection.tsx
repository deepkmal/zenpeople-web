import { useState, useMemo, useCallback } from 'react';
import { Container } from '../ui/Container';
import { Toast } from '../ui/Toast';
import { submitContactForm } from '../../utils/api';

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
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ContactSectionProps {
  id?: string;
  heading?: string;
  subtitle?: string;
  companyRequired?: boolean;
  hideMessage?: boolean;
  buttonLabel?: string;
}

export function ContactSection({
  id,
  heading = 'Get in touch.',
  subtitle = "Whether you're hiring or looking for work, we're here to help.",
  companyRequired = false,
  hideMessage = false,
  buttonLabel = 'Send Message',
}: ContactSectionProps) {
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
  const [showToast, setShowToast] = useState(false);

  const handleCloseToast = useCallback(() => setShowToast(false), []);

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

    if (companyRequired && !formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!hideMessage && !formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  }, [formData, companyRequired, hideMessage]);

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
    setSubmitStatus('idle');

    try {
      const result = await submitContactForm({
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company || undefined,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', company: '', email: '', phone: '', message: '' });
        setHasAttemptedSubmit(false);
        setShowToast(true);
      } else {
        console.error('Form submission error:', result.error);
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        message="Thank you for your message! We'll be in touch within 24 hours."
        isVisible={showToast}
        onClose={handleCloseToast}
      />
      <section id={id} className="py-16 lg:py-24 bg-[#2175D9] scroll-mt-16 lg:scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-start">
          {/* Left Column - Text */}
          <div className="text-white text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {heading}
            </h2>
            <p className="text-white/80 text-lg">
              {subtitle}
            </p>
          </div>

          {/* Right Column - Form */}
          <div>
            {submitStatus === 'success' ? (
              <div className="bg-white/10 p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Thank you for your message!
                </h3>
                <p className="text-white/80">
                  We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 text-sky-300 hover:text-white transition-colors underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name & Last Name - stacked on mobile, side by side on larger */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        hasAttemptedSubmit && errors.firstName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="First name *"
                    />
                    {hasAttemptedSubmit && errors.firstName && (
                      <p className="mt-1 text-sm text-red-300">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        hasAttemptedSubmit && errors.lastName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Last name *"
                    />
                    {hasAttemptedSubmit && errors.lastName && (
                      <p className="mt-1 text-sm text-red-300">{errors.lastName}</p>
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
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                      hasAttemptedSubmit && errors.company ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder={companyRequired ? 'Company' : 'Company (optional)'}
                  />
                  {hasAttemptedSubmit && errors.company && (
                    <p className="mt-1 text-sm text-red-300">{errors.company}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                      hasAttemptedSubmit && errors.email ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Email *"
                  />
                  {hasAttemptedSubmit && errors.email && (
                    <p className="mt-1 text-sm text-red-300">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                      hasAttemptedSubmit && errors.phone ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Phone *"
                  />
                  {hasAttemptedSubmit && errors.phone && (
                    <p className="mt-1 text-sm text-red-300">{errors.phone}</p>
                  )}
                </div>

                {!hideMessage && (
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy resize-none ${
                        hasAttemptedSubmit && errors.message ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Message *"
                    />
                    {hasAttemptedSubmit && errors.message && (
                      <p className="mt-1 text-sm text-red-300">{errors.message}</p>
                    )}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-300 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="w-full px-6 py-3 bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : buttonLabel}
                </button>
              </form>
            )}
          </div>
        </div>
        </Container>
      </section>
    </>
  );
}
