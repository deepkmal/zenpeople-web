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

// Serve static assets for all other routes, with SPA fallback
app.all('*', async (c) => {
  const response = await c.env.ASSETS.fetch(c.req.raw);

  // If asset not found and not a file request, serve index.html for SPA routing
  if (response.status === 404) {
    const url = new URL(c.req.url);
    // Check if it's not a file request (no extension or common static extensions)
    if (!url.pathname.match(/\.[a-zA-Z0-9]+$/)) {
      const indexRequest = new Request(new URL('/index.html', c.req.url), c.req.raw);
      return c.env.ASSETS.fetch(indexRequest);
    }
  }

  return response;
});

export default app;
