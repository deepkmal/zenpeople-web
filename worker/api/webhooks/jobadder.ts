import { Hono } from 'hono'
import type { Env } from '../../types'
import { syncSingleJob, removeJob } from '../../job-sync'

const jobadderWebhook = new Hono<{ Bindings: Env }>()

/**
 * Verify the webhook signature.
 * JobAdder webhook auth may use a shared secret in a header or HMAC signature.
 * This is a placeholder — update once JobAdder confirms their webhook auth mechanism.
 */
async function verifyWebhookSignature(
  body: string,
  secret: string,
  signatureHeader: string | undefined
): Promise<boolean> {
  if (!signatureHeader) return false

  // HMAC-SHA256 verification (common pattern)
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  const expected = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return signatureHeader === expected
}

jobadderWebhook.post('/', async (c) => {
  const body = await c.req.text()
  const signature = c.req.header('x-jobadder-signature') ?? c.req.header('x-webhook-signature')

  const isValid = await verifyWebhookSignature(body, c.env.JOBADDER_WEBHOOK_SECRET, signature)
  if (!isValid) {
    console.warn('[JobAdder Webhook] Invalid signature')
    return c.json({ error: 'Unauthorized' }, 401)
  }

  let payload: Record<string, unknown>
  try {
    payload = JSON.parse(body)
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  const event = payload.event as string | undefined
  const adId = (payload.adId ?? payload.resourceId ?? payload.id) as number | undefined

  if (!event || !adId) {
    console.warn('[JobAdder Webhook] Missing event or adId', { event, adId })
    return c.json({ error: 'Missing event or adId' }, 400)
  }

  switch (event) {
    case 'jobad_posted':
      c.executionCtx.waitUntil(
        syncSingleJob(c.env, adId).catch((err) =>
          console.error('[JobAdder Webhook] syncSingleJob failed:', err instanceof Error ? err.message : err)
        )
      )
      break

    case 'jobad_expired':
      c.executionCtx.waitUntil(
        removeJob(c.env, adId).catch((err) =>
          console.error('[JobAdder Webhook] removeJob failed:', err instanceof Error ? err.message : err)
        )
      )
      break

    default:
      console.log('[JobAdder Webhook] Unhandled event:', event)
  }

  return c.json({ ok: true })
})

export default jobadderWebhook
