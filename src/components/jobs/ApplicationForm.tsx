import { useState, useMemo, useCallback } from 'react'
import { Upload, X, FileText, Loader2 } from 'lucide-react'
import { submitApplication, type ApplicationData } from '../../utils/payload-api'

interface ApplicationFormProps {
  jobId: string
  jobTitle: string
  onSuccess: () => void
  onError: (message: string) => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  resume: File | null
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function ApplicationForm({ jobId, jobTitle, onSuccess, onError }: ApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Validation
  const errors = useMemo<FormErrors>(() => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    return newErrors
  }, [formData])

  const isFormValid = Object.keys(errors).length === 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const processedValue = name === 'email' ? value.toLowerCase() : value
    setFormData((prev) => ({ ...prev, [name]: processedValue }))
  }

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null)
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    // Check file type
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_FILE_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(ext)) {
      setFileError('Please upload a PDF, DOC, or DOCX file')
      return
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size must be less than 5MB')
      return
    }

    setFormData((prev) => ({ ...prev, resume: file }))
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFormData((prev) => ({ ...prev, resume: null }))
    setFileError(null)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)

    if (!isFormValid) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    const applicationData: ApplicationData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      job: jobId,
      ...(formData.resume && { resume: formData.resume }),
    }

    const result = await submitApplication(applicationData)

    setIsSubmitting(false)

    if (result.success) {
      onSuccess()
    } else {
      const errorMsg = result.error || 'Failed to submit application'
      setSubmitError(errorMsg)
      onError(errorMsg)
    }
  }

  const getFileIcon = () => {
    return <FileText className="w-5 h-5 text-gray-400" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-navy">
        Apply for {jobTitle}
      </h2>

      {/* First Name */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 border text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy ${
            hasAttemptedSubmit && errors.firstName ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'
          }`}
        />
        {hasAttemptedSubmit && errors.firstName && (
          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 border text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy ${
            hasAttemptedSubmit && errors.lastName ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'
          }`}
        />
        {hasAttemptedSubmit && errors.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 border text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy ${
            hasAttemptedSubmit && errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'
          }`}
        />
        {hasAttemptedSubmit && errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-3 py-2.5 border text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy ${
            hasAttemptedSubmit && errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-gray-200'
          }`}
        />
        {hasAttemptedSubmit && errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resume <span className="text-gray-400">(optional)</span>
        </label>
        {formData.resume ? (
          <div className="flex items-center gap-3 p-3 border border-gray-200 bg-gray-50">
            {getFileIcon()}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">{formData.resume.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(formData.resume.size)}</p>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1 text-gray-400 hover:text-gray-600"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500">
              Click to upload (PDF, DOC, DOCX - max 5MB)
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
        {fileError && (
          <p className="mt-1 text-sm text-red-500">{fileError}</p>
        )}
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || (hasAttemptedSubmit && !isFormValid)}
        className="w-full py-3 bg-[#141B2D] text-white font-medium hover:bg-[#141B2D]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Apply now'
        )}
      </button>
    </form>
  )
}
