import { Hono } from 'hono'
import type { Env } from '../types'
import { getAuthorizationUrl, exchangeCodeForTokens } from '../jobadder'
import { syncAllJobs } from '../job-sync'

const jobadderRoutes = new Hono<{ Bindings: Env }>()

/**
 * GET /api/jobadder/authorize
 * Redirects to JobAdder OAuth authorization page.
 */
jobadderRoutes.get('/authorize', (c) => {
  const redirectUri = new URL('/api/jobadder/callback', c.req.url).toString()
  const state = crypto.randomUUID()
  const url = getAuthorizationUrl(c.env, redirectUri, state)
  return c.redirect(url)
})

/**
 * GET /api/jobadder/callback
 * Receives the OAuth authorization code from JobAdder and exchanges it for tokens.
 */
jobadderRoutes.get('/callback', async (c) => {
  const code = c.req.query('code')
  const error = c.req.query('error')

  if (error) {
    return c.text(`OAuth error: ${error} — ${c.req.query('error_description') ?? ''}`, 400)
  }

  if (!code) {
    return c.text('Missing authorization code', 400)
  }

  const redirectUri = new URL('/api/jobadder/callback', c.req.url).toString()

  try {
    await exchangeCodeForTokens(c.env, code, redirectUri)
    return c.html(`
      <html>
        <body style="font-family: sans-serif; max-width: 600px; margin: 40px auto; text-align: center;">
          <h1>JobAdder Connected</h1>
          <p>OAuth tokens have been saved. You can now close this window.</p>
          <p>Next step: <code>POST /api/jobadder/sync</code> to run the initial import.</p>
        </body>
      </html>
    `)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return c.text(`Token exchange failed: ${message}`, 500)
  }
})

/**
 * POST /api/jobadder/sync
 * Triggers a full sync of all JobAdder ads into Sanity.
 * Protected by JOBADDER_WEBHOOK_SECRET in the Authorization header.
 */
jobadderRoutes.post('/sync', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (authHeader !== `Bearer ${c.env.JOBADDER_WEBHOOK_SECRET}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const result = await syncAllJobs(c.env)
    return c.json({
      ok: true,
      synced: result.synced,
      removed: result.removed,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[JobAdder Sync] Error:', message)
    return c.json({ error: message }, 500)
  }
})

export default jobadderRoutes
