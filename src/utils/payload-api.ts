// Payload CMS API client

import { jobs } from '../data/jobs'

const API_BASE = 'https://zenpeople-admin.fly.dev'

// Types
export interface Job {
  id: string
  title: string
  slug: string
  summary: string
  city: string
  employment_type: string
  sector: string
  salary?: string
  company_desc?: RichTextContent
  role_desc: RichTextContent
  role_requirements?: RichTextContent
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface RichTextContent {
  root: {
    type: string
    children: RichTextNode[]
  }
}

export interface RichTextNode {
  type: string
  text?: string
  tag?: string
  listType?: string
  children?: RichTextNode[]
}

export interface JobsResponse {
  docs: Job[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
}

export interface JobFilters {
  keyword?: string
  city?: string
  sector?: string
  employment_type?: string
  sort?: 'newest' | 'oldest'
}

export interface ApplicationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  resume?: File
  job: string // job id
}

export interface LeadData {
  type: 'contact' | 'quote' | 'resume'
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message?: string
  resume?: File
  additionalInfo?: string
}

// Employment type display mapping
export const employmentTypeLabels: Record<string, string> = {
  'permanent-full-time': 'Permanent/Full-time',
  'permanent-part-time': 'Permanent/Part-time',
  'contract-full-time': 'Contract/Full-time',
  'contract-part-time': 'Contract/Part-time',
  'casual': 'Casual',
}

// Sector display mapping
export const sectorLabels: Record<string, string> = {
  'engineering-design-consulting': 'Engineering, Design & Consulting',
  'facade-manufacturing-supply': 'Facade Manufacturing & Supply',
  'remedial-construction': 'Remedial Construction',
  'sales-marketing': 'Sales & Marketing',
  'business-support-admin': 'Business Support & Admin',
  'executive-search': 'Executive Search',
}

// Fetch paginated jobs with filters (from static data)
export async function fetchJobs(
  filters: JobFilters = {},
  page = 1
): Promise<JobsResponse> {
  const limit = 20

  // Start with active jobs only
  let filteredJobs = jobs.filter(job => job.isActive)

  // Keyword search on title and summary (case-insensitive)
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase()
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(keyword) ||
      job.summary.toLowerCase().includes(keyword)
    )
  }

  // City filter (exact match)
  if (filters.city) {
    filteredJobs = filteredJobs.filter(job => job.city === filters.city)
  }

  // Sector filter (exact match)
  if (filters.sector) {
    filteredJobs = filteredJobs.filter(job => job.sector === filters.sector)
  }

  // Employment type filter (exact match)
  if (filters.employment_type) {
    filteredJobs = filteredJobs.filter(job => job.employment_type === filters.employment_type)
  }

  // Sort by createdAt
  filteredJobs.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return filters.sort === 'oldest' ? dateA - dateB : dateB - dateA
  })

  // Calculate pagination
  const totalDocs = filteredJobs.length
  const totalPages = Math.ceil(totalDocs / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex)

  return {
    docs: paginatedJobs,
    totalDocs,
    totalPages,
    page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    limit,
  }
}

// Fetch single job by slug (from static data)
export async function fetchJobBySlug(slug: string): Promise<Job | null> {
  const job = jobs.find(j => j.slug === slug && j.isActive)
  return job || null
}

// Fetch featured jobs (3 most recent from static data)
export async function fetchFeaturedJobs(): Promise<Job[]> {
  const activeJobs = jobs.filter(job => job.isActive)

  // Sort by createdAt descending (newest first)
  activeJobs.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return dateB - dateA
  })

  // Return top 3
  return activeJobs.slice(0, 3)
}

// Submit job application (with optional resume upload)
export async function submitApplication(data: ApplicationData): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData()
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email.toLowerCase())
    formData.append('phone', data.phone)
    formData.append('job', data.job)

    // Add resume file if provided
    if (data.resume) {
      formData.append('file', data.resume)
    }

    const response = await fetch(`${API_BASE}/api/applications`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, error: errorData.message || 'Failed to submit application' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to submit application. Please try again.' }
  }
}

// Submit lead (contact/quote/resume form)
export async function submitLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData()
    formData.append('type', data.type)
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email.toLowerCase())

    if (data.phone) formData.append('phone', data.phone)
    if (data.company) formData.append('company', data.company)
    if (data.message) formData.append('message', data.message)
    if (data.additionalInfo) formData.append('additionalInfo', data.additionalInfo)

    // Add resume file if provided
    if (data.resume) {
      formData.append('file', data.resume)
    }

    const response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, error: errorData.message || 'Failed to submit form' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to submit form. Please try again.' }
  }
}

// Helper to format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 14) {
    return '1 week ago'
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`
  } else if (diffDays < 60) {
    return '1 month ago'
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months ago`
  } else {
    return `${Math.floor(diffDays / 365)} years ago`
  }
}

// Get unique cities from jobs (from static data)
export async function fetchCities(): Promise<string[]> {
  const activeJobs = jobs.filter(job => job.isActive)
  const cities = [...new Set(activeJobs.map(job => job.city))].sort()
  return cities
}
