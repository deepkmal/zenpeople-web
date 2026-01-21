import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import contact from './api/contact';
import quote from './api/quote';
import resume from './api/resume';

const app = new Hono<{ Bindings: Env }>();

// CORS middleware for API routes
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// API routes
app.route('/api/contact', contact);
app.route('/api/quote', quote);
app.route('/api/resume', resume);

// Serve static assets for all other routes (SPA fallback handled by wrangler.toml)
app.all('*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
