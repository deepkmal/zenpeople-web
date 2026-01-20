import { useState, useEffect } from 'react'
import { fetchFeaturedJobs, type Job } from '../utils/payload-api'

interface UseFeaturedJobsResult {
  jobs: Job[]
  loading: boolean
  error: string | null
}

export function useFeaturedJobs(): UseFeaturedJobsResult {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchFeaturedJobs()
        setJobs(data)
      } catch (err) {
        setError('Failed to load jobs')
        console.error('Error fetching featured jobs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    jobs,
    loading,
    error,
  }
}
