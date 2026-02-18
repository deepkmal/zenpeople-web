import { X } from 'lucide-react'
import { employmentTypeLabels, sectorLabels } from '../../utils/api'

interface FilterChipsProps {
  city?: string
  sector?: string
  employmentType?: string
  keyword?: string
  onRemoveCity: () => void
  onRemoveSector: () => void
  onRemoveEmploymentType: () => void
  onRemoveKeyword: () => void
  onClearAll: () => void
}

export function FilterChips({
  city,
  sector,
  employmentType,
  keyword,
  onRemoveCity,
  onRemoveSector,
  onRemoveEmploymentType,
  onRemoveKeyword,
  onClearAll,
}: FilterChipsProps) {
  const hasFilters = city || sector || employmentType || keyword

  if (!hasFilters) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {keyword && (
        <Chip label={`"${keyword}"`} onRemove={onRemoveKeyword} />
      )}
      {city && (
        <Chip label={city} onRemove={onRemoveCity} />
      )}
      {sector && (
        <Chip label={sectorLabels[sector] || sector} onRemove={onRemoveSector} />
      )}
      {employmentType && (
        <Chip label={employmentTypeLabels[employmentType] || employmentType} onRemove={onRemoveEmploymentType} />
      )}
      <button
        type="button"
        onClick={onClearAll}
        className="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Clear all
      </button>
    </div>
  )
}

interface ChipProps {
  label: string
  onRemove: () => void
}

function Chip({ label, onRemove }: ChipProps) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#2175D9] text-sm text-white rounded-full">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="p-0.5 hover:bg-white/20 rounded-full"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}
