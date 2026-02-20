// JobAdder ad → Sanity job document sync

import type { Env } from './types'
import type { SanityMutation } from './sanity'
import { fetchAllAds, fetchAd } from './jobadder'
import { createOrReplaceDocument, mutate, querySanity } from './sanity'

function getSanityConfig(env: Env) {
  return {
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET,
    apiToken: env.SANITY_API_TOKEN,
  }
}

// Work type mapping from JobAdder values to Sanity employment_type values
const WORK_TYPE_MAP: Record<string, string> = {
  'Permanent': 'permanent-full-time',
  'Full Time': 'permanent-full-time',
  'Permanent/Full-time': 'permanent-full-time',
  'Part Time': 'permanent-part-time',
  'Permanent/Part-time': 'permanent-part-time',
  'Contract': 'contract-full-time',
  'Contract/Full-time': 'contract-full-time',
  'Contract/Part-time': 'contract-part-time',
  'Casual': 'casual',
  'Temp': 'casual',
}

function mapWorkType(workType: unknown): string | undefined {
  if (typeof workType !== 'string') return undefined
  return WORK_TYPE_MAP[workType] ?? undefined
}

/**
 * Convert a plain text string to a minimal portable text block array.
 * Each paragraph (split by double newline) becomes a separate block.
 */
function textToPortableText(text: string): Record<string, unknown>[] {
  if (!text) return []

  const paragraphs = text.split(/\n\n+/).filter(Boolean)
  return paragraphs.map((paragraph, i) => ({
    _type: 'block',
    _key: `block-${i}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span-${i}`,
        text: paragraph.trim(),
        marks: [],
      },
    ],
  }))
}

/**
 * Convert an HTML string to minimal portable text by stripping tags
 * and converting to paragraphs. Best-effort for simple HTML.
 */
function htmlToPortableText(html: string): Record<string, unknown>[] {
  if (!html) return []
  // Strip HTML tags, decode basic entities, split on block-level boundaries
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|h[1-6])[^>]*>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()

  return textToPortableText(text)
}

/**
 * Transform a JobAdder ad object into a Sanity `job` document.
 * Uses deterministic _id of `jobadder-{adId}` so createOrReplace works for upserts.
 */
export function mapAdToSanityJob(ad: Record<string, unknown>): Record<string, unknown> {
  const adId = ad.adId as number
  const title = (ad.title as string) || 'Untitled'

  // Generate slug from title
  const slugValue = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  // Extract location — could be nested object or string
  const location = ad.location as Record<string, unknown> | string | undefined
  const city = typeof location === 'object' && location
    ? (location.city as string) || (location.name as string) || ''
    : typeof location === 'string'
      ? location
      : ''

  // Build description portable text from available fields
  const description = ad.description as string | undefined
  const bulletPoints = ad.bulletPoints as string[] | undefined
  const summary = ad.summary as string | undefined

  // Role description from main description HTML
  const roleDesc = description ? htmlToPortableText(description) : []

  // Summary — use bullet points if available, otherwise summary text
  let summaryText = ''
  if (bulletPoints && bulletPoints.length > 0) {
    summaryText = bulletPoints.join('. ')
  } else if (summary) {
    summaryText = summary
  } else if (typeof ad.standout01 === 'string') {
    summaryText = ad.standout01
  }

  // Work type mapping
  const workType = ad.workType ?? ad.type ?? ad.employmentType
  const employmentType = mapWorkType(workType)

  // Salary
  const salary = ad.salary as string | undefined

  const doc: Record<string, unknown> = {
    _id: `jobadder-${adId}`,
    _type: 'job',
    title,
    slug: { _type: 'slug', current: slugValue },
    isActive: true,
    jobAdderId: String(adId),
  }

  if (summaryText) doc.summary = summaryText
  if (city) doc.city = city
  if (employmentType) doc.employment_type = employmentType
  if (salary) doc.salary = salary
  if (roleDesc.length > 0) doc.role_desc = roleDesc

  return doc
}

/**
 * Fetch all ads from JobAdder and upsert them into Sanity.
 * Also cleans up Sanity docs whose ads are no longer active.
 */
export async function syncAllJobs(env: Env): Promise<{ synced: number; removed: number }> {
  const config = getSanityConfig(env)

  // Fetch all active ads from JobAdder
  const ads = await fetchAllAds(env)
  const activeAdIds = new Set(ads.map((ad) => `jobadder-${ad.adId}`))

  // Upsert all ads to Sanity in batches
  const upsertMutations: SanityMutation[] = ads.map((ad) => ({
    createOrReplace: mapAdToSanityJob(ad as Record<string, unknown>),
  }))

  if (upsertMutations.length > 0) {
    // Batch in groups of 50 to avoid request size limits
    for (let i = 0; i < upsertMutations.length; i += 50) {
      const batch = upsertMutations.slice(i, i + 50)
      await mutate(config, batch)
    }
  }

  // Find existing jobadder-* docs in Sanity that are no longer active
  const existingDocs = await querySanity<{ _id: string }[]>(
    config,
    `*[_type == "job" && _id match "jobadder-*"]{ _id }`
  )

  const toRemove = existingDocs.filter((doc) => !activeAdIds.has(doc._id))
  if (toRemove.length > 0) {
    const deleteMutations: SanityMutation[] = toRemove.map((doc) => ({
      delete: { id: doc._id },
    }))
    await mutate(config, deleteMutations)
  }

  return { synced: ads.length, removed: toRemove.length }
}

/**
 * Fetch a single ad from JobAdder and upsert it to Sanity.
 */
export async function syncSingleJob(env: Env, adId: number): Promise<void> {
  const config = getSanityConfig(env)
  const ad = await fetchAd(env, adId)
  const doc = mapAdToSanityJob(ad as Record<string, unknown>)
  await createOrReplaceDocument(config, doc)
}

/**
 * Deactivate a job in Sanity when the ad expires in JobAdder.
 */
export async function removeJob(env: Env, adId: number): Promise<void> {
  const config = getSanityConfig(env)
  const docId = `jobadder-${adId}`

  // Set isActive to false rather than deleting, so the URL doesn't 404 immediately
  await mutate(config, [
    {
      patch: {
        id: docId,
        set: { isActive: false },
      },
    },
  ])
}
