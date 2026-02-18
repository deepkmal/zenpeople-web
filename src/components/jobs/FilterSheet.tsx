import { useEffect } from 'react'
import { X } from 'lucide-react'
import { employmentTypeLabels, sectorLabels } from '../../utils/api'

interface FilterSheetProps {
  isOpen: boolean
  onClose: () => void
  city: string
  sector: string
  employmentType: string
  sort: string
  onCityChange: (value: string) => void
  onSectorChange: (value: string) => void
  onEmploymentTypeChange: (value: string) => void
  onSortChange: (value: string) => void
  onApply: () => void
  onClearAll: () => void
  cities: string[]
}

export function FilterSheet({
  isOpen,
  onClose,
  city,
  sector,
  employmentType,
  sort,
  onCityChange,
  onSectorChange,
  onEmploymentTypeChange,
  onSortChange,
  onApply,
  onClearAll,
  cities,
}: FilterSheetProps) {
  // Prevent body scroll when sheet is open
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

  if (!isOpen) {
    return null
  }

  const sectorOptions = Object.entries(sectorLabels)
  const employmentOptions = Object.entries(employmentTypeLabels)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-navy">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-130px)] space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy"
            >
              <option value="">All Locations</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector
            </label>
            <select
              value={sector}
              onChange={(e) => onSectorChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy"
            >
              <option value="">All Sectors</option>
              {sectorOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type
            </label>
            <select
              value={employmentType}
              onChange={(e) => onEmploymentTypeChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy"
            >
              <option value="">All Types</option>
              {employmentOptions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-navy focus:border-navy"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClearAll}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={() => {
              onApply()
              onClose()
            }}
            className="flex-1 px-4 py-2.5 bg-[#141B2D] text-white text-sm font-medium hover:bg-[#141B2D]/90 transition-colors"
          >
            Apply filters
          </button>
        </div>
      </div>
    </>
  )
}
