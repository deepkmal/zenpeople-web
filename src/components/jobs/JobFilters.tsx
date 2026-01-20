import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { MultiSelectDropdown } from './MultiSelectDropdown'
import { FilterSheet } from './FilterSheet'
import { employmentTypeLabels, sectorLabels } from '../../utils/payload-api'

interface JobFiltersProps {
  keyword: string
  city: string
  sector: string
  employmentType: string
  sort: string
  cities: string[]
  onKeywordChange: (value: string) => void
  onCityChange: (value: string) => void
  onSectorChange: (value: string) => void
  onEmploymentTypeChange: (value: string) => void
  onSortChange: (value: string) => void
  onSearch: () => void
  onClearAll: () => void
  disabled?: boolean
}

export function JobFilters({
  keyword,
  city,
  sector,
  employmentType,
  sort,
  cities,
  onKeywordChange,
  onCityChange,
  onSectorChange,
  onEmploymentTypeChange,
  onSortChange,
  onSearch,
  onClearAll,
  disabled = false,
}: JobFiltersProps) {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  const sectorOptions = Object.entries(sectorLabels).map(([value, label]) => ({
    value,
    label,
  }))

  const employmentOptions = Object.entries(employmentTypeLabels).map(([value, label]) => ({
    value,
    label,
  }))

  const cityOptions = cities.map((c) => ({ value: c, label: c }))

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className={`space-y-4 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center bg-white border border-gray-200 px-3">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={onSearch}
          className="px-4 py-2.5 bg-[#2175D9] text-white hover:bg-[#1a62b8] transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Mobile filter button */}
        <button
          type="button"
          onClick={() => setIsFilterSheetOpen(true)}
          className="sm:hidden px-4 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:flex flex-wrap gap-2">
        <MultiSelectDropdown
          label="Location"
          options={cityOptions}
          value={city}
          onChange={onCityChange}
          placeholder="All Locations"
        />
        <MultiSelectDropdown
          label="Sector"
          options={sectorOptions}
          value={sector}
          onChange={onSectorChange}
          placeholder="All Sectors"
        />
        <MultiSelectDropdown
          label="Type"
          options={employmentOptions}
          value={employmentType}
          onChange={onEmploymentTypeChange}
          placeholder="All Types"
        />
        <MultiSelectDropdown
          label="Sort"
          options={sortOptions}
          value={sort || 'newest'}
          onChange={onSortChange}
          placeholder="Newest First"
        />
      </div>

      {/* Mobile Filter Sheet */}
      <FilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        city={city}
        sector={sector}
        employmentType={employmentType}
        sort={sort || 'newest'}
        onCityChange={onCityChange}
        onSectorChange={onSectorChange}
        onEmploymentTypeChange={onEmploymentTypeChange}
        onSortChange={onSortChange}
        onApply={onSearch}
        onClearAll={onClearAll}
        cities={cities}
      />
    </div>
  )
}
