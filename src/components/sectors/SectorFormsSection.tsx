import { useState, useMemo, useRef } from 'react';
import { ChevronDown, Paperclip, X } from 'lucide-react';

// Quote Form Data Types
interface QuoteFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
}

interface QuoteFormErrors {
  firstName?: string;
  lastName?: string;
  company?: string;
  contact?: string;
  email?: string;
}

// Resume Form Data Types
interface ResumeFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  additionalInfo: string;
}

interface ResumeFormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  file?: string;
}

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

export function SectorFormsSection() {
  // Mobile accordion state - both open by default, independent of each other
  const [isQuoteOpen, setIsQuoteOpen] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(true);

  // Quote form state
  const [quoteFormData, setQuoteFormData] = useState<QuoteFormData>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
  });
  const [quoteIsSubmitting, setQuoteIsSubmitting] = useState(false);
  const [quoteSubmitStatus, setQuoteSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [quoteHasAttemptedSubmit, setQuoteHasAttemptedSubmit] = useState(false);

  // Resume form state
  const [resumeFormData, setResumeFormData] = useState<ResumeFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    additionalInfo: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [resumeIsSubmitting, setResumeIsSubmitting] = useState(false);
  const [resumeSubmitStatus, setResumeSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resumeHasAttemptedSubmit, setResumeHasAttemptedSubmit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Quote form validation
  const quoteErrors = useMemo<QuoteFormErrors>(() => {
    const newErrors: QuoteFormErrors = {};
    if (!quoteFormData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!quoteFormData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!quoteFormData.company.trim()) newErrors.company = 'Company is required';
    if (!quoteFormData.email.trim() && !quoteFormData.phone.trim()) {
      newErrors.contact = 'Please provide either email or phone';
    }
    if (quoteFormData.email.trim() && !validateEmail(quoteFormData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  }, [quoteFormData]);

  const quoteIsFormValid = Object.keys(quoteErrors).length === 0;

  // Resume form validation
  const resumeErrors = useMemo<ResumeFormErrors>(() => {
    const newErrors: ResumeFormErrors = {};
    if (!resumeFormData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!resumeFormData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!resumeFormData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!resumeFormData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(resumeFormData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!file) newErrors.file = 'Resume is required';
    return newErrors;
  }, [resumeFormData, file]);

  const resumeIsFormValid = Object.keys(resumeErrors).length === 0;

  // Quote form handlers
  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'email' ? value.toLowerCase() : value;
    setQuoteFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteHasAttemptedSubmit(true);
    if (!quoteIsFormValid) return;
    setQuoteIsSubmitting(true);
    try {
      console.log('Quote form submitted:', quoteFormData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setQuoteSubmitStatus('success');
      setQuoteFormData({ firstName: '', lastName: '', company: '', email: '', phone: '' });
      setQuoteHasAttemptedSubmit(false);
    } catch {
      setQuoteSubmitStatus('error');
    } finally {
      setQuoteIsSubmitting(false);
    }
  };

  // Resume form handlers
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'email' ? value.toLowerCase() : value;
    setResumeFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    if (selectedFile) {
      const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
      const isValidType = ALLOWED_FILE_TYPES.includes(selectedFile.type) ||
                          ALLOWED_EXTENSIONS.includes(fileExtension);
      if (!isValidType) {
        setFileError('Please upload a PDF, DOC, or DOCX file');
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResumeHasAttemptedSubmit(true);
    if (!resumeIsFormValid) return;
    setResumeIsSubmitting(true);
    try {
      console.log('Resume form submitted:', { ...resumeFormData, file: file?.name });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResumeSubmitStatus('success');
      setResumeFormData({ firstName: '', lastName: '', phone: '', email: '', additionalInfo: '' });
      setFile(null);
      setResumeHasAttemptedSubmit(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      setResumeSubmitStatus('error');
    } finally {
      setResumeIsSubmitting(false);
    }
  };

  const toggleQuoteAccordion = () => setIsQuoteOpen(!isQuoteOpen);
  const toggleResumeAccordion = () => setIsResumeOpen(!isResumeOpen);

  return (
    <section className="bg-gray-100">
      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:grid lg:grid-cols-2">
        {/* Quote Form */}
        <div className="bg-[#2175D9] px-10 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:pr-16 py-16 lg:py-20">
          <div className="max-w-md ml-auto">
            <h3 className="text-2xl font-semibold text-white mb-2">Get a quote</h3>
            <p className="text-white/80 mb-6">I'm a potential client and I'd like a recruitment quote</p>
            {quoteSubmitStatus === 'success' ? (
              <div className="bg-white/10 p-8 text-center">
                <h4 className="text-xl font-semibold text-white mb-2">Thank you!</h4>
                <p className="text-white/80">We'll be in touch within 24 hours.</p>
                <button
                  onClick={() => setQuoteSubmitStatus('idle')}
                  className="mt-4 text-sky-200 hover:text-white transition-colors underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={quoteFormData.firstName}
                      onChange={handleQuoteChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        quoteHasAttemptedSubmit && quoteErrors.firstName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="First name"
                    />
                    {quoteHasAttemptedSubmit && quoteErrors.firstName && (
                      <p className="mt-1 text-sm text-red-300">{quoteErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={quoteFormData.lastName}
                      onChange={handleQuoteChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        quoteHasAttemptedSubmit && quoteErrors.lastName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Last name"
                    />
                    {quoteHasAttemptedSubmit && quoteErrors.lastName && (
                      <p className="mt-1 text-sm text-red-300">{quoteErrors.lastName}</p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    value={quoteFormData.company}
                    onChange={handleQuoteChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                      quoteHasAttemptedSubmit && quoteErrors.company ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Company"
                  />
                  {quoteHasAttemptedSubmit && quoteErrors.company && (
                    <p className="mt-1 text-sm text-red-300">{quoteErrors.company}</p>
                  )}
                </div>
                {quoteHasAttemptedSubmit && quoteErrors.contact && (
                  <p className="text-sm text-red-300">{quoteErrors.contact}</p>
                )}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={quoteFormData.email}
                    onChange={handleQuoteChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                      quoteHasAttemptedSubmit && quoteErrors.email ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Email"
                  />
                  {quoteHasAttemptedSubmit && quoteErrors.email && (
                    <p className="mt-1 text-sm text-red-300">{quoteErrors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={quoteFormData.phone}
                    onChange={handleQuoteChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy"
                    placeholder="Phone"
                  />
                </div>
                {quoteSubmitStatus === 'error' && (
                  <p className="text-red-300 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={quoteIsSubmitting || !quoteIsFormValid}
                  className="w-full px-6 py-3 bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quoteIsSubmitting ? 'Sending...' : 'Get quote'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Resume Form */}
        <div className="bg-gray-100 px-10 xl:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:pl-16 py-16 lg:py-20">
          <div className="max-w-md">
            <h3 className="text-2xl font-semibold text-navy mb-2">Register your resume</h3>
            <p className="text-gray-600 mb-6">I'm a potential candidate and I'd like to register my resume</p>
            {resumeSubmitStatus === 'success' ? (
              <div className="bg-white p-8 text-center">
                <h4 className="text-xl font-semibold text-navy mb-2">Thank you for registering!</h4>
                <p className="text-gray-600">We'll review your resume and be in touch if we have suitable opportunities.</p>
                <button
                  onClick={() => setResumeSubmitStatus('idle')}
                  className="mt-4 text-[#2175D9] hover:text-navy transition-colors underline"
                >
                  Submit another resume
                </button>
              </div>
            ) : (
              <form onSubmit={handleResumeSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={resumeFormData.firstName}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        resumeHasAttemptedSubmit && resumeErrors.firstName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="First name"
                    />
                    {resumeHasAttemptedSubmit && resumeErrors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{resumeErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={resumeFormData.lastName}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        resumeHasAttemptedSubmit && resumeErrors.lastName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Last name"
                    />
                    {resumeHasAttemptedSubmit && resumeErrors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{resumeErrors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={resumeFormData.phone}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        resumeHasAttemptedSubmit && resumeErrors.phone ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Phone"
                    />
                    {resumeHasAttemptedSubmit && resumeErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">{resumeErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={resumeFormData.email}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                        resumeHasAttemptedSubmit && resumeErrors.email ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Email"
                    />
                    {resumeHasAttemptedSubmit && resumeErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{resumeErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#2175D9] text-white font-medium hover:bg-[#1a62b8] transition-colors">
                      <Paperclip className="w-4 h-4" />
                      <span>Upload resume</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {file && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        <button type="button" onClick={handleRemoveFile} className="text-gray-400 hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {!file && !fileError && <span className="text-sm text-gray-400">PDF, DOC, or DOCX</span>}
                  </div>
                  {fileError && <p className="mt-1 text-sm text-red-500">{fileError}</p>}
                  {resumeHasAttemptedSubmit && resumeErrors.file && !fileError && (
                    <p className="mt-1 text-sm text-red-500">{resumeErrors.file}</p>
                  )}
                </div>
                <div>
                  <textarea
                    name="additionalInfo"
                    value={resumeFormData.additionalInfo}
                    onChange={handleResumeChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy resize-none"
                    placeholder="Additional information (optional)"
                  />
                </div>
                {resumeSubmitStatus === 'error' && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={resumeIsSubmitting || !resumeIsFormValid}
                  className="w-full px-6 py-3 bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resumeIsSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Accordions */}
      <div className="lg:hidden">
        {/* Quote Accordion */}
        <div className="border-b border-gray-200">
          <button
            onClick={toggleQuoteAccordion}
            className="w-full flex items-center justify-between px-6 py-5 bg-[#2175D9] text-white"
          >
            <span className="text-lg font-semibold">Get a quote</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isQuoteOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isQuoteOpen ? 'max-h-[800px]' : 'max-h-0'
            }`}
          >
            <div className="bg-[#2175D9] px-6 pt-4 pb-6">
              <p className="text-white/80 text-sm mb-4">I'm a potential client and I'd like a recruitment quote</p>
              {quoteSubmitStatus === 'success' ? (
                <div className="bg-white/10 p-6 text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Thank you!</h4>
                  <p className="text-white/80 text-sm">We'll be in touch within 24 hours.</p>
                  <button
                    onClick={() => setQuoteSubmitStatus('idle')}
                    className="mt-4 text-sky-200 hover:text-white transition-colors underline text-sm"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={quoteFormData.firstName}
                        onChange={handleQuoteChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                          quoteHasAttemptedSubmit && quoteErrors.firstName ? 'ring-2 ring-red-400' : ''
                        }`}
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={quoteFormData.lastName}
                        onChange={handleQuoteChange}
                        className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                          quoteHasAttemptedSubmit && quoteErrors.lastName ? 'ring-2 ring-red-400' : ''
                        }`}
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="company"
                    value={quoteFormData.company}
                    onChange={handleQuoteChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                      quoteHasAttemptedSubmit && quoteErrors.company ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Company"
                  />
                  <input
                    type="email"
                    name="email"
                    value={quoteFormData.email}
                    onChange={handleQuoteChange}
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                      quoteHasAttemptedSubmit && quoteErrors.email ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={quoteFormData.phone}
                    onChange={handleQuoteChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm"
                    placeholder="Phone"
                  />
                  <button
                    type="submit"
                    disabled={quoteIsSubmitting || !quoteIsFormValid}
                    className="w-full px-6 py-3 bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {quoteIsSubmitting ? 'Sending...' : 'Get quote'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Resume Accordion */}
        <div>
          <button
            onClick={toggleResumeAccordion}
            className="w-full flex items-center justify-between px-6 py-5 bg-gray-100 text-navy"
          >
            <span className="text-lg font-semibold">Register your resume</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isResumeOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isResumeOpen ? 'max-h-[900px]' : 'max-h-0'
            }`}
          >
            <div className="bg-gray-100 px-6 pt-4 pb-6">
              <p className="text-gray-600 text-sm mb-4">I'm a potential candidate and I'd like to register my resume</p>
              {resumeSubmitStatus === 'success' ? (
                <div className="bg-white p-6 text-center">
                  <h4 className="text-lg font-semibold text-navy mb-2">Thank you for registering!</h4>
                  <p className="text-gray-600 text-sm">We'll review your resume and be in touch if we have suitable opportunities.</p>
                  <button
                    onClick={() => setResumeSubmitStatus('idle')}
                    className="mt-4 text-[#2175D9] hover:text-navy transition-colors underline text-sm"
                  >
                    Submit another resume
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResumeSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      value={resumeFormData.firstName}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                        resumeHasAttemptedSubmit && resumeErrors.firstName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={resumeFormData.lastName}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                        resumeHasAttemptedSubmit && resumeErrors.lastName ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Last name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="tel"
                      name="phone"
                      value={resumeFormData.phone}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                        resumeHasAttemptedSubmit && resumeErrors.phone ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Phone"
                    />
                    <input
                      type="email"
                      name="email"
                      value={resumeFormData.email}
                      onChange={handleResumeChange}
                      className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy text-sm ${
                        resumeHasAttemptedSubmit && resumeErrors.email ? 'ring-2 ring-red-400' : ''
                      }`}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#2175D9] text-white font-medium hover:bg-[#1a62b8] transition-colors text-sm">
                        <Paperclip className="w-4 h-4" />
                        <span>Upload resume</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {file && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-sm truncate">{file.name}</span>
                          <button type="button" onClick={handleRemoveFile} className="text-gray-400 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {!file && !fileError && <span className="text-xs text-gray-400">PDF, DOC, or DOCX</span>}
                    </div>
                    {fileError && <p className="mt-1 text-xs text-red-500">{fileError}</p>}
                    {resumeHasAttemptedSubmit && resumeErrors.file && !fileError && (
                      <p className="mt-1 text-xs text-red-500">{resumeErrors.file}</p>
                    )}
                  </div>
                  <textarea
                    name="additionalInfo"
                    value={resumeFormData.additionalInfo}
                    onChange={handleResumeChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy resize-none text-sm"
                    placeholder="Additional information (optional)"
                  />
                  <button
                    type="submit"
                    disabled={resumeIsSubmitting || !resumeIsFormValid}
                    className="w-full px-6 py-3 bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resumeIsSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
