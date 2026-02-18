// API client

import { sanityFetch } from './sanity'
import { JOBS_QUERY, JOB_BY_SLUG_QUERY, FEATURED_JOBS_QUERY, CITIES_QUERY } from './sanity-queries'

// Types (existing Lexical-style rich text format — unchanged)
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
  url?: string
  format?: string
  children?: RichTextNode[]
}

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

// Sanity Portable Text types (what comes back from CDN)
interface PTBlock {
  _type: string
  _key?: string
  style?: string
  listItem?: string
  level?: number
  children?: PTSpan[]
  markDefs?: PTMarkDef[]
}

interface PTSpan {
  _type: string
  _key?: string
  text?: string
  marks?: string[]
}

interface PTMarkDef {
  _type: string
  _key: string
  href?: string
}

// Raw Sanity job shape (before normalization)
interface SanityJob {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: string
  summary: string
  city: string
  employment_type: string
  sector: string
  salary?: string
  company_desc?: PTBlock[]
  role_desc: PTBlock[]
  role_requirements?: PTBlock[]
  isActive: boolean
}

/**
 * Convert Sanity Portable Text blocks → existing Lexical-style RichTextContent.
 * This keeps the RichTextRenderer and all styling completely unchanged.
 */
function portableTextToRichText(blocks: PTBlock[] | undefined): RichTextContent | undefined {
  if (!blocks || blocks.length === 0) return undefined

  const children: RichTextNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    // List items — group consecutive list items into a list node
    if (block.listItem) {
      const listType = block.listItem === 'number' ? 'number' : 'bullet'
      const listChildren: RichTextNode[] = []

      while (i < blocks.length && blocks[i].listItem === block.listItem) {
        listChildren.push({
          type: 'listitem',
          children: convertSpans(blocks[i]),
        })
        i++
      }

      children.push({
        type: 'list',
        tag: listType === 'number' ? 'ol' : 'ul',
        listType,
        children: listChildren,
      })
      continue
    }

    // Headings
    if (block.style && block.style !== 'normal' && block.style !== 'blockquote') {
      children.push({
        type: 'heading',
        tag: block.style,
        children: convertSpans(block),
      })
      i++
      continue
    }

    // Blockquote
    if (block.style === 'blockquote') {
      children.push({
        type: 'quote',
        children: convertSpans(block),
      })
      i++
      continue
    }

    // Normal paragraph
    children.push({
      type: 'paragraph',
      children: convertSpans(block),
    })
    i++
  }

  return { root: { type: 'root', children } }
}

/**
 * Convert a single Portable Text block's spans into RichTextNode children.
 * Handles marks (strong, em, link) by wrapping text in appropriate nodes.
 */
function convertSpans(block: PTBlock): RichTextNode[] {
  if (!block.children) return [{ type: 'text', text: '' }]

  const markDefs = block.markDefs || []
  const nodes: RichTextNode[] = []

  for (const span of block.children) {
    if (span._type !== 'span') continue

    const text = span.text || ''
    const marks = span.marks || []

    if (marks.length === 0) {
      nodes.push({ type: 'text', text })
      continue
    }

    // Check for link marks (references to markDefs)
    const linkMark = marks.find((m) => markDefs.some((md) => md._key === m))
    const linkDef = linkMark ? markDefs.find((md) => md._key === linkMark) : undefined

    // Build text node with formatting
    let node: RichTextNode = { type: 'text', text }

    // Wrap in bold if needed
    if (marks.includes('strong')) {
      node = { type: 'bold', children: [node] }
    }

    // Wrap in italic if needed
    if (marks.includes('em')) {
      node = { type: 'italic', children: [node] }
    }

    // Wrap in link if needed
    if (linkDef) {
      node = { type: 'link', url: linkDef.href, children: [node] }
    }

    nodes.push(node)
  }

  return nodes.length > 0 ? nodes : [{ type: 'text', text: '' }]
}

// Normalize Sanity response → Job (with Portable Text → Lexical conversion)
function normalizeJob(doc: SanityJob): Job {
  return {
    id: doc._id,
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    city: doc.city,
    employment_type: doc.employment_type,
    sector: doc.sector,
    salary: doc.salary,
    company_desc: portableTextToRichText(doc.company_desc),
    role_desc: portableTextToRichText(doc.role_desc)!,
    role_requirements: portableTextToRichText(doc.role_requirements),
    isActive: doc.isActive,
    createdAt: doc._createdAt,
    updatedAt: doc._updatedAt,
  }
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
  jobTitle: string
  jobSlug: string
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

// Fetch paginated jobs with filters from Sanity
export async function fetchJobs(
  filters: JobFilters = {},
  page = 1
): Promise<JobsResponse> {
  const limit = 20
  const offset = (page - 1) * limit
  const end = offset + limit

  const result = await sanityFetch<{ docs: SanityJob[]; totalDocs: number }>(
    JOBS_QUERY,
    {
      keyword: filters.keyword || '',
      city: filters.city || '',
      sector: filters.sector || '',
      employment_type: filters.employment_type || '',
      sort: filters.sort || 'newest',
      offset,
      limit: end,
    }
  )

  const totalDocs = result.totalDocs
  const totalPages = Math.ceil(totalDocs / limit)

  return {
    docs: result.docs.map(normalizeJob),
    totalDocs,
    totalPages,
    page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    limit,
  }
}

// Fetch single job by slug from Sanity
export async function fetchJobBySlug(slug: string): Promise<Job | null> {
  const doc = await sanityFetch<SanityJob | null>(JOB_BY_SLUG_QUERY, { slug })
  return doc ? normalizeJob(doc) : null
}

// Fetch featured jobs (3 most recent) from Sanity
export async function fetchFeaturedJobs(): Promise<Job[]> {
  const docs = await sanityFetch<SanityJob[]>(FEATURED_JOBS_QUERY)
  return docs.map(normalizeJob)
}

// Submit job application (with optional resume upload)
export async function submitApplication(data: ApplicationData): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData()
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('email', data.email.toLowerCase())
    formData.append('phone', data.phone)
    formData.append('jobTitle', data.jobTitle)
    formData.append('jobSlug', data.jobSlug)

    // Add resume file if provided
    if (data.resume) {
      formData.append('file', data.resume)
    }

    const response = await fetch('https://api.zenpeople.com.au/api/application', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, error: errorData.error || 'Failed to submit application' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to submit application. Please try again.' }
  }
}

// Submit lead (contact/quote/resume form)
export async function submitLead(data: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    // Determine the correct API endpoint based on type
    const endpointMap = {
      contact: 'https://api.zenpeople.com.au/api/contact',
      quote: 'https://api.zenpeople.com.au/api/quote',
      resume: 'https://api.zenpeople.com.au/api/resume',
    }
    const endpoint = endpointMap[data.type]

    // For resume type, use FormData (multipart for file upload)
    if (data.type === 'resume') {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('email', data.email.toLowerCase())
      if (data.phone) formData.append('phone', data.phone)
      if (data.additionalInfo) formData.append('additionalInfo', data.additionalInfo)
      if (data.resume) formData.append('file', data.resume)

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return { success: false, error: errorData.error || 'Failed to submit form' }
      }

      return { success: true }
    }

    // For contact and quote types, use JSON
    const jsonData: Record<string, string | undefined> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      phone: data.phone,
    }

    if (data.type === 'contact') {
      jsonData.company = data.company
      jsonData.message = data.message
    } else if (data.type === 'quote') {
      jsonData.company = data.company
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return { success: false, error: errorData.error || 'Failed to submit form' }
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

// Get unique cities from active jobs in Sanity
export async function fetchCities(): Promise<string[]> {
  return sanityFetch<string[]>(CITIES_QUERY)
}
