import { Hono } from 'hono';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { Env } from '../../types';

const sanityWebhook = new Hono<{ Bindings: Env }>();

sanityWebhook.post('/', async (c) => {
  const signature = c.req.header(SIGNATURE_HEADER_NAME) ?? '';
  const body = await c.req.text();

  if (!(await isValidSignature(body, signature, c.env.SANITY_WEBHOOK_SECRET))) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const payload = JSON.parse(body);
  const { _type } = payload;

  switch (_type) {
    case 'lead': {
      const { leadType } = payload;
      switch (leadType) {
        case 'contact':
          c.executionCtx.waitUntil(handleLeadContact(payload));
          break;
        case 'quote':
          c.executionCtx.waitUntil(handleLeadQuote(payload));
          break;
        case 'resume':
          c.executionCtx.waitUntil(handleLeadResume(payload));
          break;
      }
      break;
    }
    case 'jobApplication':
      c.executionCtx.waitUntil(handleApplication(payload));
      break;
  }

  return c.json({ ok: true });
});

async function handleLeadContact(payload: Record<string, unknown>) {
  console.log('Contact lead received', {
    name: `${payload.firstName} ${payload.lastName}`,
    email: payload.email,
  });
}

async function handleLeadQuote(payload: Record<string, unknown>) {
  console.log('Quote lead received', {
    name: `${payload.firstName} ${payload.lastName}`,
    email: payload.email,
    sector: payload.sector,
  });
}

async function handleLeadResume(payload: Record<string, unknown>) {
  console.log('Resume lead received', {
    name: `${payload.firstName} ${payload.lastName}`,
    email: payload.email,
  });
}

async function handleApplication(payload: Record<string, unknown>) {
  console.log('Job application received', {
    name: `${payload.firstName} ${payload.lastName}`,
    email: payload.email,
    jobTitle: payload.jobTitle,
  });
}

export default sanityWebhook;
