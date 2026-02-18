import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { Container } from '../components/ui/Container'
import {
  JobCard,
  JobSkeletonList,
  JobFilters,
  FilterChips,
  LoadMoreButton,
} from '../components/jobs'
import { useJobs } from '../hooks/useJobs'
import type { JobFilters as JobFiltersType } from '../utils/api'

// Default cities list (in production, this could be fetched from API)
const DEFAULT_CITIES = [
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Adelaide',
  'Hobart',
  'Darwin',
  'Canberra',
]

export function JobBoardPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Local filter state (used for inputs before search is triggered)
  const [localKeyword, setLocalKeyword] = useState(searchParams.get('keyword') || '')
  const [localCity, setLocalCity] = useState(searchParams.get('city') || '')
  const [localSector, setLocalSector] = useState(searchParams.get('sector') || '')
  const [localEmploymentType, setLocalEmploymentType] = useState(searchParams.get('type') || '')
  const [localSort, setLocalSort] = useState(searchParams.get('sort') || 'newest')

  // Active filters (what's actually being used for the query)
  const [activeFilters, setActiveFilters] = useState<JobFiltersType>({
    keyword: searchParams.get('keyword') || '',
    city: searchParams.get('city') || '',
    sector: searchParams.get('sector') || '',
    employment_type: searchParams.get('type') || '',
    sort: (searchParams.get('sort') as 'newest' | 'oldest') || 'newest',
  })

  // Fetch jobs with active filters
  const { jobs, loading, error, totalJobs, loadMore } = useJobs(activeFilters)

  // Update URL when active filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (activeFilters.keyword) params.set('keyword', activeFilters.keyword)
    if (activeFilters.city) params.set('city', activeFilters.city)
    if (activeFilters.sector) params.set('sector', activeFilters.sector)
    if (activeFilters.employment_type) params.set('type', activeFilters.employment_type)
    if (activeFilters.sort && activeFilters.sort !== 'newest') params.set('sort', activeFilters.sort)

    setSearchParams(params, { replace: true })
  }, [activeFilters, setSearchParams])

  // Handle search (apply local filters to active filters)
  const handleSearch = useCallback(() => {
    setActiveFilters({
      keyword: localKeyword,
      city: localCity,
      sector: localSector,
      employment_type: localEmploymentType,
      sort: localSort as 'newest' | 'oldest',
    })
  }, [localKeyword, localCity, localSector, localEmploymentType, localSort])

  // Apply filter changes immediately for dropdown selections
  const handleCityChange = useCallback((value: string) => {
    setLocalCity(value)
    setActiveFilters((prev) => ({ ...prev, city: value }))
  }, [])

  const handleSectorChange = useCallback((value: string) => {
    setLocalSector(value)
    setActiveFilters((prev) => ({ ...prev, sector: value }))
  }, [])

  const handleEmploymentTypeChange = useCallback((value: string) => {
    setLocalEmploymentType(value)
    setActiveFilters((prev) => ({ ...prev, employment_type: value }))
  }, [])

  const handleSortChange = useCallback((value: string) => {
    setLocalSort(value)
    setActiveFilters((prev) => ({ ...prev, sort: value as 'newest' | 'oldest' }))
  }, [])

  // Clear all filters
  const handleClearAll = useCallback(() => {
    setLocalKeyword('')
    setLocalCity('')
    setLocalSector('')
    setLocalEmploymentType('')
    setLocalSort('newest')
    setActiveFilters({
      keyword: '',
      city: '',
      sector: '',
      employment_type: '',
      sort: 'newest',
    })
  }, [])

  // Remove individual filters
  const handleRemoveKeyword = useCallback(() => {
    setLocalKeyword('')
    setActiveFilters((prev) => ({ ...prev, keyword: '' }))
  }, [])

  const handleRemoveCity = useCallback(() => {
    setLocalCity('')
    setActiveFilters((prev) => ({ ...prev, city: '' }))
  }, [])

  const handleRemoveSector = useCallback(() => {
    setLocalSector('')
    setActiveFilters((prev) => ({ ...prev, sector: '' }))
  }, [])

  const handleRemoveEmploymentType = useCallback(() => {
    setLocalEmploymentType('')
    setActiveFilters((prev) => ({ ...prev, employment_type: '' }))
  }, [])

  const showEmptyState = !loading && jobs.length === 0
  const hasActiveFilters =
    activeFilters.keyword ||
    activeFilters.city ||
    activeFilters.sector ||
    activeFilters.employment_type

  return (
    <section className="py-4 lg:py-8 bg-gray-50 min-h-screen pt-20 lg:pt-24">
      <Container>
        {/* Filters */}
        <div className="sticky top-16 lg:top-20 z-30 bg-gray-50 py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <JobFilters
            keyword={localKeyword}
            city={localCity}
            sector={localSector}
            employmentType={localEmploymentType}
            sort={localSort}
            cities={DEFAULT_CITIES}
            onKeywordChange={setLocalKeyword}
            onCityChange={handleCityChange}
            onSectorChange={handleSectorChange}
            onEmploymentTypeChange={handleEmploymentTypeChange}
            onSortChange={handleSortChange}
            onSearch={handleSearch}
            onClearAll={handleClearAll}
            disabled={loading && jobs.length === 0}
          />

          {/* Filter Chips */}
          <div className="mt-4">
            <FilterChips
              keyword={activeFilters.keyword}
              city={activeFilters.city}
              sector={activeFilters.sector}
              employmentType={activeFilters.employment_type}
              onRemoveKeyword={handleRemoveKeyword}
              onRemoveCity={handleRemoveCity}
              onRemoveSector={handleRemoveSector}
              onRemoveEmploymentType={handleRemoveEmploymentType}
              onClearAll={handleClearAll}
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              type="button"
              onClick={handleClearAll}
              className="px-4 py-2 bg-[#141B2D] text-white text-sm font-medium hover:bg-[#141B2D]/90 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {showEmptyState && !error && (
          <div className="text-center py-16">
            <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-navy mb-2">
              No jobs match your filters
            </h2>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or clearing filters
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAll}
                className="px-6 py-2.5 bg-[#141B2D] text-white text-sm font-medium hover:bg-[#141B2D]/90 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Job List */}
        <div className="mt-2 w-full lg:w-3/4">
          {/* Loading State (initial) */}
          {loading && jobs.length === 0 && <JobSkeletonList count={3} />}

          {/* Jobs */}
          {jobs.length > 0 && (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          {/* Load More */}
          {jobs.length > 0 && (
            <LoadMoreButton
              onClick={loadMore}
              loading={loading}
              remaining={totalJobs - jobs.length}
              total={totalJobs}
            />
          )}
        </div>
      </Container>
    </section>
  )
}
