import { useState, useMemo } from 'react';
import { Container } from '../ui/Container';

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
  contact?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
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

    // At least one contact method required
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.contact = 'Please provide either email or phone';
    }

    // Validate email format if provided
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
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
    <section className="py-16 lg:py-24 bg-[#2175D9]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 lg:items-start">
          {/* Left Column - Text */}
          <div className="text-white text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get in touch.
            </h2>
            <p className="text-white/80 text-lg">
              Whether you're hiring or looking for work, we're here to help.
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
                {/* First Name & Last Name - side by side */}
                <div className="grid grid-cols-2 gap-4">
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
                      placeholder="First name"
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
                      placeholder="Last name"
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
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy"
                    placeholder="Company (optional)"
                  />
                </div>

                {/* Contact error message */}
                {hasAttemptedSubmit && errors.contact && (
                  <p className="text-sm text-red-300">{errors.contact}</p>
                )}

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
                    placeholder="Email"
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
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy"
                    placeholder="Phone"
                  />
                </div>

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
                    placeholder="Message"
                  />
                  {hasAttemptedSubmit && errors.message && (
                    <p className="mt-1 text-sm text-red-300">{errors.message}</p>
                  )}
                </div>

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
