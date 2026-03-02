import { Hono } from 'hono';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { Env } from '../../types';
import { querySanity } from '../../sanity';
import { submitApplication, submitApplicationAttachment } from '../../jobadder';

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
      c.executionCtx.waitUntil(handleApplication(payload, c.env));
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

async function handleApplication(payload: Record<string, unknown>, env: Env) {
  console.log('Job application received', {
    name: `${payload.firstName} ${payload.lastName}`,
    email: payload.email,
    jobTitle: payload.jobTitle,
  });

  const jobSlug = payload.jobSlug as string | undefined;
  if (!jobSlug) {
    console.log('[Application→JA] No jobSlug in payload, skipping JobAdder forwarding');
    return;
  }

  // Look up the job document in Sanity to find the JobAdder ad ID
  const sanityConfig = {
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET,
    apiToken: env.SANITY_API_TOKEN,
  };

  try {
    const job = await querySanity<{ _id: string } | null>(
      sanityConfig,
      `*[_type == "job" && slug.current == $slug][0]{ _id }`,
      { slug: jobSlug }
    );

    if (!job || !job._id.startsWith('jobadder-')) {
      console.log('[Application→JA] Job is not a JobAdder-synced job, skipping forwarding');
      return;
    }

    const adId = parseInt(job._id.replace('jobadder-', ''), 10);
    if (isNaN(adId)) {
      console.error('[Application→JA] Could not parse adId from job _id:', job._id);
      return;
    }

    // Submit application to JobAdder
    const result = await submitApplication(env, adId, {
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      email: payload.email as string,
      phone: payload.phone as string | undefined,
    });

    console.log('[Application→JA] Application submitted, applicationId:', result.applicationId);

    // If there's a resume file, download from Sanity and attach
    const resumeFile = payload.resumeFile as { asset?: { _ref?: string } } | undefined;
    if (resumeFile?.asset?._ref) {
      try {
        const assetId = resumeFile.asset._ref;
        // Fetch the file from Sanity CDN
        const fileUrl = `https://cdn.sanity.io/files/${env.SANITY_PROJECT_ID}/${env.SANITY_DATASET}/${assetId.replace('file-', '').replace(/-([^-]+)$/, '.$1')}`;
        const fileResponse = await fetch(fileUrl);

        if (fileResponse.ok) {
          const buffer = await fileResponse.arrayBuffer();
          const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream';
          const filename = `resume.${contentType.includes('pdf') ? 'pdf' : 'doc'}`;

          await submitApplicationAttachment(env, adId, result.applicationId, {
            buffer,
            filename,
            contentType,
          });
          console.log('[Application→JA] Resume attached successfully');
        }
      } catch (attachErr) {
        console.error('[Application→JA] Resume attachment failed:', attachErr instanceof Error ? attachErr.message : attachErr);
      }
    }
  } catch (err) {
    console.error('[Application→JA] Failed to forward application:', err instanceof Error ? err.message : err);
  }
}

export default sanityWebhook;
