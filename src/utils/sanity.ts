// Lightweight Sanity CDN fetch client (no @sanity/client — just fetch)

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

/**
 * Fetch data from Sanity CDN using GROQ.
 * CDN reads on public datasets require no authentication.
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params: Record<string, string | number | boolean> = {}
): Promise<T> {
  if (!projectId) {
    throw new Error('VITE_SANITY_PROJECT_ID is not configured')
  }

  const searchParams = new URLSearchParams({ query })
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(`$${key}`, JSON.stringify(value))
  }

  const url = `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?${searchParams}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Sanity fetch failed (${response.status})`)
  }

  const data = (await response.json()) as { result: T }
  return data.result
}
