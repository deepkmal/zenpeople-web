import { useState, useEffect } from 'react'
import { fetchJobBySlug, type Job } from '../utils/api'

interface UseJobResult {
  job: Job | null
  loading: boolean
  error: string | null
}

export function useJob(slug: string | undefined): UseJobResult {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      setError('Job not found')
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchJobBySlug(slug)

        if (data) {
          setJob(data)
        } else {
          setError('Job not found')
        }
      } catch (err) {
        setError('Failed to load job. Please try again.')
        console.error('Error fetching job:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  return {
    job,
    loading,
    error,
  }
}
