import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import {
  originGuard,
  contentTypeEnforcement,
  bodySizeLimit,
} from './security';
import contact from './api/contact';
import quote from './api/quote';
import resume from './api/resume';
import application from './api/application';
import sanityWebhook from './api/webhooks/sanity';

const app = new Hono<{ Bindings: Env }>();

// Webhook routes (authenticated via secret, not browser middleware)
app.route('/webhooks/sanity', sanityWebhook);

// CORS middleware for API routes
app.use('/api/*', cors({
  origin: (origin, c) => {
    const allowed = c.env.ALLOWED_ORIGIN || 'https://zenpeople.com.au';
    if (
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin === allowed
    ) {
      return origin;
    }
    return allowed;
  },
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// Security middleware stack for API routes
app.use('/api/*', originGuard);
app.use('/api/*', contentTypeEnforcement);
app.use('/api/*', bodySizeLimit);

// API routes
app.route('/api/contact', contact);
app.route('/api/quote', quote);
app.route('/api/resume', resume);
app.route('/api/application', application);

// Serve static assets for all other routes (SPA fallback handled by wrangler.toml)
app.all('*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
