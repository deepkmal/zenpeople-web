import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { fetchJobs, type Job, type JobFilters, type JobsResponse } from '../utils/api'

interface UseJobsResult {
  jobs: Job[]
  loading: boolean
  error: string | null
  hasMore: boolean
  totalJobs: number
  loadMore: () => void
  refresh: () => void
}

export function useJobs(filters: JobFilters): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [totalJobs, setTotalJobs] = useState(0)

  // Create a stable filter key for dependency tracking
  const filterKey = useMemo(() => JSON.stringify(filters), [
    filters.keyword,
    filters.city,
    filters.sector,
    filters.employment_type,
    filters.sort,
  ])

  // Store filters in ref to avoid stale closures
  const filtersRef = useRef(filters)
  filtersRef.current = filters

  // Fetch jobs
  const fetchData = useCallback(
    async (pageNum: number, append: boolean = false) => {
      setLoading(true)
      setError(null)

      try {
        const data: JobsResponse = await fetchJobs(filtersRef.current, pageNum)

        if (append) {
          setJobs((prev) => [...prev, ...data.docs])
        } else {
          setJobs(data.docs)
        }

        setHasMore(data.hasNextPage)
        setTotalJobs(data.totalDocs)
        setPage(pageNum)
      } catch (err) {
        setError('Failed to load jobs. Please try again.')
        console.error('Error fetching jobs:', err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Reset and fetch when filters change
  useEffect(() => {
    setJobs([])
    setPage(1)
    fetchData(1, false)
  }, [filterKey, fetchData])

  // Load more jobs
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(page + 1, true)
    }
  }, [loading, hasMore, page, fetchData])

  // Refresh jobs
  const refresh = useCallback(() => {
    setJobs([])
    setPage(1)
    fetchData(1, false)
  }, [fetchData])

  return {
    jobs,
    loading,
    error,
    hasMore,
    totalJobs,
    loadMore,
    refresh,
  }
}
