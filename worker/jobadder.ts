// Lightweight JobAdder HTTP client for Cloudflare Workers

import type { Env } from './types'

const JOBADDER_API_BASE = 'https://api.jobadder.com/v2'
const JOBADDER_AUTH_BASE = 'https://id.jobadder.com/connect'

interface TokenData {
  access_token: string
  refresh_token: string
  expires_at: number // unix timestamp in ms
}

interface JobAdderTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number // seconds
}

// --- Token management ---

export async function getTokens(kv: KVNamespace): Promise<TokenData | null> {
  const raw = await kv.get('tokens')
  if (!raw) return null
  return JSON.parse(raw) as TokenData
}

export async function saveTokens(kv: KVNamespace, tokens: TokenData): Promise<void> {
  await kv.put('tokens', JSON.stringify(tokens))
}

export async function refreshAccessToken(env: Env): Promise<TokenData> {
  const existing = await getTokens(env.JOBADDER_TOKENS)
  if (!existing?.refresh_token) {
    throw new Error('No refresh token available. Complete the OAuth flow first via /api/jobadder/authorize')
  }

  const response = await fetch(`${JOBADDER_AUTH_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: existing.refresh_token,
      client_id: env.JOBADDER_CLIENT_ID,
      client_secret: env.JOBADDER_CLIENT_SECRET,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`JobAdder token refresh failed (${response.status}): ${text}`)
  }

  const data = (await response.json()) as JobAdderTokenResponse
  const tokens: TokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  }

  await saveTokens(env.JOBADDER_TOKENS, tokens)
  return tokens
}

// --- Authenticated fetch wrapper ---

export async function jobadderFetch(
  env: Env,
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  let tokens = await getTokens(env.JOBADDER_TOKENS)
  if (!tokens) {
    throw new Error('No JobAdder tokens. Complete the OAuth flow first via /api/jobadder/authorize')
  }

  // Proactively refresh if token expires within 60 seconds
  if (tokens.expires_at < Date.now() + 60_000) {
    tokens = await refreshAccessToken(env)
  }

  const url = path.startsWith('http') ? path : `${JOBADDER_API_BASE}${path}`
  const headers = new Headers(options.headers)
  headers.set('Authorization', `Bearer ${tokens.access_token}`)

  let response = await fetch(url, { ...options, headers })

  // Auto-refresh on 401 and retry once
  if (response.status === 401) {
    tokens = await refreshAccessToken(env)
    headers.set('Authorization', `Bearer ${tokens.access_token}`)
    response = await fetch(url, { ...options, headers })
  }

  return response
}

// --- JobAdder API methods ---

interface JobAdderAd {
  adId: number
  title: string
  [key: string]: unknown
}

interface JobAdderPaginatedResponse {
  items: JobAdderAd[]
  links?: { next?: string }
}

export async function fetchAllAds(env: Env): Promise<JobAdderAd[]> {
  const ads: JobAdderAd[] = []
  let url: string | null = `/jobboards/${env.JOBADDER_BOARD_ID}/ads?limit=50`

  while (url) {
    const response = await jobadderFetch(env, url)
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`JobAdder fetchAllAds failed (${response.status}): ${text}`)
    }

    const data = (await response.json()) as JobAdderPaginatedResponse
    ads.push(...data.items)
    url = data.links?.next ?? null
  }

  return ads
}

export async function fetchAd(env: Env, adId: number): Promise<JobAdderAd> {
  const response = await jobadderFetch(env, `/jobboards/${env.JOBADDER_BOARD_ID}/ads/${adId}`)
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`JobAdder fetchAd failed (${response.status}): ${text}`)
  }

  return (await response.json()) as JobAdderAd
}

interface ApplicationResponse {
  applicationId: number
  [key: string]: unknown
}

export async function submitApplication(
  env: Env,
  adId: number,
  data: {
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
): Promise<ApplicationResponse> {
  const response = await jobadderFetch(
    env,
    `/jobboards/${env.JOBADDER_BOARD_ID}/ads/${adId}/applications`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`JobAdder submitApplication failed (${response.status}): ${text}`)
  }

  return (await response.json()) as ApplicationResponse
}

export async function submitApplicationAttachment(
  env: Env,
  adId: number,
  applicationId: number,
  file: { buffer: ArrayBuffer; filename: string; contentType: string }
): Promise<void> {
  const formData = new FormData()
  formData.append(
    'fileUpload',
    new Blob([file.buffer], { type: file.contentType }),
    file.filename
  )

  const response = await jobadderFetch(
    env,
    `/jobboards/${env.JOBADDER_BOARD_ID}/ads/${adId}/applications/${applicationId}/Resume`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`JobAdder submitApplicationAttachment failed (${response.status}): ${text}`)
  }
}

// --- OAuth helpers ---

export function getAuthorizationUrl(env: Env, redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: env.JOBADDER_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'read write offline_access',
    state,
  })
  return `${JOBADDER_AUTH_BASE}/authorize?${params}`
}

export async function exchangeCodeForTokens(
  env: Env,
  code: string,
  redirectUri: string
): Promise<TokenData> {
  const response = await fetch(`${JOBADDER_AUTH_BASE}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: env.JOBADDER_CLIENT_ID,
      client_secret: env.JOBADDER_CLIENT_SECRET,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`JobAdder token exchange failed (${response.status}): ${text}`)
  }

  const data = (await response.json()) as JobAdderTokenResponse
  const tokens: TokenData = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  }

  await saveTokens(env.JOBADDER_TOKENS, tokens)
  return tokens
}
