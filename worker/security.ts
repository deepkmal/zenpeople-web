// Security middleware stack for API routes

import { createMiddleware } from 'hono/factory'
import type { Env } from './types'

type MiddlewareHandler = ReturnType<typeof createMiddleware<{ Bindings: Env }>>

/**
 * Origin guard — checks Origin/Referer against ALLOWED_ORIGIN env var.
 * Allows localhost origins in dev.
 */
export const originGuard: MiddlewareHandler = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    const origin = c.req.header('origin') || ''
    const referer = c.req.header('referer') || ''
    const allowed = c.env.ALLOWED_ORIGIN || ''

    const isLocalhost =
      origin.includes('localhost') || origin.includes('127.0.0.1') ||
      referer.includes('localhost') || referer.includes('127.0.0.1')

    const originMatches =
      origin.includes(allowed) || referer.includes(allowed)

    if (!isLocalhost && !originMatches) {
      return c.json({ error: 'Forbidden' }, 403)
    }

    await next()
  }
)

/**
 * Content-Type enforcement — rejects POST requests that aren't
 * application/json or multipart/form-data.
 */
export const contentTypeEnforcement: MiddlewareHandler = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    if (c.req.method === 'POST') {
      const contentType = c.req.header('content-type') || ''
      const isJson = contentType.includes('application/json')
      const isMultipart = contentType.includes('multipart/form-data')

      if (!isJson && !isMultipart) {
        return c.json({ error: 'Unsupported Media Type' }, 415)
      }
    }

    await next()
  }
)

/**
 * Request body size limit — rejects requests over 6MB.
 */
export const bodySizeLimit: MiddlewareHandler = createMiddleware<{ Bindings: Env }>(
  async (c, next) => {
    const contentLength = c.req.header('content-length')
    const MAX_SIZE = 6 * 1024 * 1024 // 6MB

    if (contentLength && parseInt(contentLength, 10) > MAX_SIZE) {
      return c.json({ error: 'Payload Too Large' }, 413)
    }

    await next()
  }
)

