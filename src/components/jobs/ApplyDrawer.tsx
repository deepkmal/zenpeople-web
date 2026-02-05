import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { ApplicationForm } from './ApplicationForm'

interface ApplyDrawerProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  jobSlug: string
  onSuccess: () => void
  onError: (message: string) => void
}

export function ApplyDrawer({
  isOpen,
  onClose,
  jobTitle,
  jobSlug,
  onSuccess,
  onError,
}: ApplyDrawerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Handle mount/unmount with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Trigger animation after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else {
      setIsVisible(false)
      // Wait for exit animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 200) // Match the faster exit duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!shouldRender) {
    return null
  }

  return (
    <>
      {/* Backdrop - z-[100] to cover nav */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity ${
          isVisible ? 'bg-black/50 duration-300' : 'bg-black/0 duration-200'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer - z-[101] above backdrop */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[101] bg-white rounded-t-2xl shadow-xl transform transition-transform ${
          isVisible ? 'translate-y-0 duration-300 ease-out' : 'translate-y-full duration-200 ease-in'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-navy">Apply</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
          <ApplicationForm
            jobTitle={jobTitle}
            jobSlug={jobSlug}
            onSuccess={() => {
              onSuccess()
              onClose()
            }}
            onError={onError}
          />
        </div>
      </div>
    </>
  )
}
