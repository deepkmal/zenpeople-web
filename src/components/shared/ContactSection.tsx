import { useState } from 'react';
import { Container } from '../ui/Container';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder submission - replace with actual API call
    try {
      console.log('Form submitted:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-navy">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Text */}
          <div className="text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ready to get started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              whether you're hiring or looking for work, we're here to help.
            </p>

            <div className="space-y-3">
              <p>
                <a
                  href="tel:0731855006"
                  className="text-sky-300 hover:text-white transition-colors"
                >
                  07 3185 5006
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@zenpeople.com.au"
                  className="text-sky-300 hover:text-white transition-colors"
                >
                  hello@zenpeople.com.au
                </a>
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            {submitStatus === 'success' ? (
              <div className="bg-white/10 rounded-lg p-8 text-center">
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-white mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-white mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-white mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange"
                    placeholder="0400 000 000"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-white mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange resize-none"
                    placeholder="How can we help?"
                  />
                </div>

                {submitStatus === 'error' && (
                  <p className="text-red-300 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-white text-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
