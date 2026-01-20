import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Loader2 } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { Toast } from '../components/ui/Toast'
import { ShareButtons, ApplyModal, ApplyDrawer, RichTextRenderer } from '../components/jobs'
import { useJob } from '../hooks/useJob'
import {
  employmentTypeLabels,
  sectorLabels,
  formatRelativeTime,
} from '../utils/payload-api'

export function JobListingPage() {
  const { slug } = useParams<{ slug: string }>()
  const { job, loading, error } = useJob(slug)

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isApplyDrawerOpen, setIsApplyDrawerOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleApplyClick = useCallback(() => {
    // Use modal on desktop (640px+), drawer on mobile
    if (window.innerWidth >= 640) {
      setIsApplyModalOpen(true)
    } else {
      setIsApplyDrawerOpen(true)
    }
  }, [])

  const handleApplySuccess = useCallback(() => {
    setToastMessage('Application submitted successfully!')
    setShowToast(true)
  }, [])

  const handleApplyError = useCallback((message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }, [])

  const handleCloseToast = useCallback(() => setShowToast(false), [])

  // Loading state
  if (loading) {
    return (
      <section className="py-8 lg:py-12 min-h-screen pt-24 lg:pt-28">
        <Container>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        </Container>
      </section>
    )
  }

  // Error state
  if (error || !job) {
    return (
      <section className="py-8 lg:py-12 min-h-screen pt-24 lg:pt-28">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold text-navy mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#141B2D] text-white text-sm font-medium hover:bg-[#141B2D]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to jobs
            </Link>
          </div>
        </Container>
      </section>
    )
  }

  const employmentLabel = employmentTypeLabels[job.employment_type] || job.employment_type
  const sectorLabel = sectorLabels[job.sector] || job.sector

  return (
    <>
      <section className="py-8 lg:py-12 min-h-screen pt-24 lg:pt-28 pb-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to jobs
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-semibold text-navy mb-4">
                {job.title}
              </h1>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {job.city}
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  {employmentLabel}
                </span>
                {job.salary && (
                  <>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      {job.salary}
                    </span>
                  </>
                )}
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Posted {formatRelativeTime(job.createdAt)}
                </span>
              </div>

              {/* Sector badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                  {sectorLabel}
                </span>
              </div>

              {/* Share buttons */}
              <ShareButtons title={job.title} />
            </div>

            {/* Content sections */}
            <div className="space-y-8">
              {/* Summary */}
              {job.summary && (
                <div className="bg-gray-50 p-6 border-l-4 border-[#2175D9]">
                  <p className="text-gray-700">{job.summary}</p>
                </div>
              )}

              {/* Company Description */}
              {job.company_desc && (
                <div>
                  <h2 className="text-xl font-semibold text-navy mb-4">About the Company</h2>
                  <RichTextRenderer content={job.company_desc} />
                </div>
              )}

              {/* Role Description */}
              {job.role_desc && (
                <div>
                  <RichTextRenderer content={job.role_desc} />
                </div>
              )}

              {/* Requirements */}
              {job.role_requirements && (
                <div>
                  <RichTextRenderer content={job.role_requirements} />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Sticky Apply Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 z-40">
        <Container>
          <div className="max-w-4xl mx-auto flex justify-end">
            <button
              type="button"
              onClick={handleApplyClick}
              className="px-8 py-3 bg-[#141B2D] text-white font-medium hover:bg-[#141B2D]/90 transition-colors"
            >
              Apply Now
            </button>
          </div>
        </Container>
      </div>

      {/* Apply Modal (Desktop) */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobId={job.id}
        jobTitle={job.title}
        onSuccess={handleApplySuccess}
        onError={handleApplyError}
      />

      {/* Apply Drawer (Mobile) */}
      <ApplyDrawer
        isOpen={isApplyDrawerOpen}
        onClose={() => setIsApplyDrawerOpen(false)}
        jobId={job.id}
        jobTitle={job.title}
        onSuccess={handleApplySuccess}
        onError={handleApplyError}
      />

      {/* Toast */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </>
  )
}
