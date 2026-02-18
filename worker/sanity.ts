// Lightweight Sanity HTTP client for Cloudflare Workers (no @sanity/client)

interface SanityConfig {
  projectId: string
  dataset: string
  apiToken: string
}

interface SanityMutation {
  create?: Record<string, unknown>
  createOrReplace?: Record<string, unknown>
  patch?: Record<string, unknown>
}

interface SanityAssetResponse {
  document: {
    _id: string
    _type: string
  }
}

/**
 * Create a document in Sanity via the Mutations API
 */
export async function createDocument(
  config: SanityConfig,
  doc: Record<string, unknown>
): Promise<{ id: string }> {
  const mutations: SanityMutation[] = [{ create: doc }]

  const response = await fetch(
    `https://${config.projectId}.api.sanity.io/v2024-01-01/data/mutate/${config.dataset}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiToken}`,
      },
      body: JSON.stringify({ mutations }),
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Sanity create failed (${response.status}): ${text}`)
  }

  const result = await response.json() as { results: { id: string }[] }
  return { id: result.results[0]?.id ?? '' }
}

/**
 * Upload a file asset to Sanity, returns a file reference
 */
export async function uploadAsset(
  config: SanityConfig,
  fileBuffer: ArrayBuffer,
  filename: string,
  contentType: string
): Promise<{ _type: 'file'; asset: { _type: 'reference'; _ref: string } }> {
  const response = await fetch(
    `https://${config.projectId}.api.sanity.io/v2024-01-01/assets/files/${config.dataset}?filename=${encodeURIComponent(filename)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${config.apiToken}`,
      },
      body: fileBuffer,
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Sanity asset upload failed (${response.status}): ${text}`)
  }

  const result = (await response.json()) as SanityAssetResponse
  return {
    _type: 'file',
    asset: {
      _type: 'reference',
      _ref: result.document._id,
    },
  }
}

/**
 * Query Sanity using GROQ (for server-side use)
 */
export async function querySanity<T = unknown>(
  config: SanityConfig,
  groq: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  const searchParams = new URLSearchParams({ query: groq })
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(`$${key}`, JSON.stringify(value))
  }

  const response = await fetch(
    `https://${config.projectId}.api.sanity.io/v2024-01-01/data/query/${config.dataset}?${searchParams}`,
    {
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
      },
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Sanity query failed (${response.status}): ${text}`)
  }

  const result = (await response.json()) as { result: T }
  return result.result
}
