import { Link } from 'react-router-dom'
import type { Job, RichTextNode } from '../../utils/payload-api'
import { employmentTypeLabels, sectorLabels } from '../../utils/payload-api'

interface JobCardProps {
  job: Job
}

// Format date as "15 JANUARY 2026" (desktop)
function formatDateLong(dateString: string): string {
  const date = new Date(dateString)
  return date
    .toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase()
}

// Format date as "21/01/26" (mobile)
function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString().slice(-2)
  return `${day}/${month}/${year}`
}

// Get simplified employment type (just first part)
function getSimpleEmploymentType(type: string): string {
  const label = employmentTypeLabels[type] || type
  if (label.startsWith('Permanent')) return 'Permanent'
  if (label.startsWith('Contract')) return 'Contract'
  return label
}

// Extract plain text from rich text content (skip headings)
function extractPlainText(nodes: RichTextNode[] | undefined, maxLength = 200): string {
  if (!nodes) return ''

  let text = ''
  for (const node of nodes) {
    // Skip headings
    if (node.type === 'heading') continue

    if (node.type === 'text' && node.text) {
      text += node.text + ' '
    }
    if (node.children) {
      text += extractPlainText(node.children, maxLength)
    }
    if (text.length >= maxLength) break
  }

  text = text.trim()
  if (text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...'
  }
  return text
}

export function JobCard({ job }: JobCardProps) {
  const sectorLabel = sectorLabels[job.sector] || job.sector
  const employmentType = getSimpleEmploymentType(job.employment_type)
  const description = extractPlainText(job.role_desc?.root?.children, 180)

  return (
    <Link
      to={`/jobs/${job.slug}`}
      className="block bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow"
    >
      {/* Top Row: Sector & Date */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {sectorLabel}
        </span>
        <span className="text-xs text-gray-400">
          <span className="sm:hidden">{formatDateShort(job.createdAt)}</span>
          <span className="hidden sm:inline uppercase">{formatDateLong(job.createdAt)}</span>
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-navy mb-3">{job.title}</h3>

      {/* Description from role_desc */}
      <p className="text-gray-600 text-sm mb-6 line-clamp-2">{description}</p>

      {/* Bottom Row: Metadata & Button */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div>
            <span className="block text-xs text-gray-400 uppercase mb-1">Type</span>
            <span className="text-sm font-medium text-gray-900">{employmentType}</span>
          </div>
          <div>
            <span className="block text-xs text-gray-400 uppercase mb-1">Location</span>
            <span className="text-sm font-medium text-gray-900">{job.city}</span>
          </div>
          {job.salary && (
            <div>
              <span className="block text-xs text-gray-400 uppercase mb-1">Salary</span>
              <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{job.salary}</span>
            </div>
          )}
        </div>
        <span className="bg-[#141B2D] text-white text-sm font-medium px-5 py-2.5 text-center sm:text-left shrink-0">
          Learn more
        </span>
      </div>
    </Link>
  )
}
