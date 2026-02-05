import { useState, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Paperclip, FileText, X } from 'lucide-react';
import { submitResumeForm } from '../../utils/api';
import { Toast } from '../ui/Toast';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  additionalInfo: string;
}

interface FormErrors {
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

interface ResumeUploadSectionProps {
  id?: string;
}

export function ResumeUploadSection({ id }: ResumeUploadSectionProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    additionalInfo: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!file) {
      newErrors.file = 'Resume is required';
    }

    return newErrors;
  }, [formData, file]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const processedValue = name === 'email' ? value.toLowerCase() : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
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
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      const result = await submitResumeForm({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        additionalInfo: formData.additionalInfo || undefined,
        file: file || undefined,
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', phone: '', email: '', additionalInfo: '' });
        setFile(null);
        setHasAttemptedSubmit(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setShowToast(true);
      } else {
        console.error('Resume form error:', result.error);
        setSubmitError(result.error || 'Something went wrong');
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        message="Thank you for registering! We'll review your details and contact you for suitable opportunities."
        isVisible={showToast}
        onClose={handleCloseToast}
      />
      <section id={id} className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch scroll-mt-16 lg:scroll-mt-20">
        {/* Left side - Text and CTA */}
      <div className="bg-white flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16 xl:pr-20 py-12 sm:py-16 lg:py-24">
        <div className="max-w-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy mb-6 tracking-tight">
            Browse current opportunities
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
            View our latest facade and glazing roles across Australia. From project managers to estimators, engineers to installers — find your next career move.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-3 bg-[#141B2D] text-white px-6 py-4 font-semibold hover:bg-[#141B2D]/90 transition-colors group"
          >
            <span>Show me what's available</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Right side - Resume Upload Form */}
      <div className="bg-gray-100 flex items-center px-6 sm:px-10 lg:pl-16 xl:pl-20 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] py-12 sm:py-16 lg:py-24">
        <div className="w-full max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-semibold text-navy mb-6">
            Match me with employment opportunities
          </h3>

          {submitStatus === 'success' ? (
            <div className="bg-white p-8 text-center">
              <h4 className="text-xl font-semibold text-navy mb-2">
                Thank you for registering!
              </h4>
              <p className="text-gray-600">
                We'll review your resume and be in touch if we have suitable opportunities.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="mt-4 text-[#2175D9] hover:text-navy transition-colors underline"
              >
                Submit another resume
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name */}
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
                    className={`w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy ${
                      hasAttemptedSubmit && errors.lastName ? 'ring-2 ring-red-400' : ''
                    }`}
                    placeholder="Last name *"
                  />
                  {hasAttemptedSubmit && errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
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
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
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
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                {!file ? (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#141B2D] text-white font-medium hover:bg-[#141B2D]/90 transition-colors">
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
                    {!fileError && (
                      <span className="text-sm text-gray-400">PDF, DOC, or DOCX</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 bg-white px-4 py-3">
                    <FileText className="w-5 h-5 text-[#2175D9] flex-shrink-0" />
                    <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {fileError && (
                  <p className="mt-1 text-sm text-red-500">{fileError}</p>
                )}
                {hasAttemptedSubmit && errors.file && !fileError && (
                  <p className="mt-1 text-sm text-red-500">{errors.file}</p>
                )}
              </div>

              {/* Additional Info */}
              <div>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy resize-none"
                  placeholder="Additional information (optional)"
                />
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-500 text-sm">
                  {submitError || 'Something went wrong. Please try again.'}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full px-6 py-3 bg-navy text-white font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
          </div>
        </div>
      </section>
    </>
  );
}
