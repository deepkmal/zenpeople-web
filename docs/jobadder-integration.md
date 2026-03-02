# JobAdder ↔ Sanity Integration Guide

## Part 1: Email Reply (copy and paste this)

---

Hi,

Confirmed — we have experience implementing OAuth2 authorization code flow.

We'll have ZenPeople contact your support team at support.jobadder.com to set up the website job board portal. We'll provide the board ID once we have it.

Understood regarding the SEEK integration — we won't be attempting to post to SEEK via the API.

Two questions:

1. Does editing a live job ad trigger a new `jobad_posted` webhook event, or is there no notification for ad updates?
2. What data is included in the `jobad_posted` and `jobad_expired` webhook payloads — just the ad ID, or the full ad object?

Please send through the developer instructions and credentials when ready.

Thanks

---

## Part 2: JobAdder → Sanity (pulling jobs into the website)

The goal: when a job ad is created, updated, or removed in JobAdder, the website reflects it.

### Initial sync (one-time, on setup)

Fetch every active job ad from your board and create a Sanity document for each one.

| Step | API call | What it does |
|------|----------|--------------|
| 1 | `GET /jobboards` | Get your board ID (you should already have this from support) |
| 2 | `GET /jobboards/{boardId}/ads?Limit=50&Offset=0` | Fetch page 1 of active ads. Keep paginating until you've got them all |
| 3 | For each ad: Sanity HTTP API `POST /v2021-06-07/data/mutate/{dataset}` | Create or update a `job` document in Sanity for each ad |

### Ongoing sync (real-time via webhooks)

Register two webhook subscriptions with JobAdder.

**When a job ad is posted** → `jobad_posted` event fires → your Worker receives it → fetch the full ad details → create or update the Sanity document.

| Step | API call | What it does |
|------|----------|--------------|
| 1 | Receive `jobad_posted` webhook at `POST /webhooks/jobadder` | JobAdder pushes the event to your Worker |
| 2 | `GET /jobboards/{boardId}/ads/{adId}` | Fetch the full ad details (webhook payload may only have the ID) |
| 3 | Sanity HTTP API: create or update the job document | Upsert the job in your CMS |

**When a job ad expires or is removed** → `jobad_expired` event fires → your Worker receives it → delete or unpublish the Sanity document.

| Step | API call | What it does |
|------|----------|--------------|
| 1 | Receive `jobad_expired` webhook at `POST /webhooks/jobadder` | JobAdder pushes the event to your Worker |
| 2 | Sanity HTTP API: delete or unpublish the job document | Remove the job from the website |

**When a job ad is edited** → there is NO webhook event for this. Two options:

- **Option A**: Ask the API team if edits re-trigger `jobad_posted`. If yes, you're covered.
- **Option B**: Run a cron job on the Worker (e.g. every 15 minutes) that calls `GET /jobboards/{boardId}/ads?UpdatedAt.After={lastSyncTime}` and updates any changed ads in Sanity.

### JobAdder endpoints used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/jobboards` | List available boards |
| `GET` | `/jobboards/{boardId}/ads` | List all active ads on your board (paginated) |
| `GET` | `/jobboards/{boardId}/ads/{adId}` | Get a single ad's full details |

## Part 3: Sanity → JobAdder (sending applications to the CRM)

The goal: when someone applies for a job on the website, the application ends up in JobAdder.

### Flow

A candidate fills out the application form → the form creates a `jobApplication` document in Sanity → Sanity fires a webhook to your Worker → your Worker submits the application to JobAdder.

| Step | What happens | API call |
|------|-------------|----------|
| 1 | Candidate submits form on website | Your frontend creates a Sanity document |
| 2 | Sanity webhook fires | `POST /webhooks/sanity` on your Worker (already built) |
| 3 | Worker receives the application data | `handleApplication()` in `worker/api/webhooks/sanity.ts` |
| 4 | Worker submits to JobAdder | `POST /jobboards/{boardId}/ads/{adId}/applications` with candidate name, email, etc. |
| 5 | Worker attaches resume (if any) | `POST /jobboards/{boardId}/ads/{adId}/applications/{applicationId}/Resume` — must be within 5 minutes of step 4 |

### JobAdder endpoints used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/jobboards/{boardId}/ads/{adId}/applications` | Submit a job application |
| `POST` | `/jobboards/{boardId}/ads/{adId}/applications/{applicationId}/{attachmentType}` | Attach resume or cover letter (within 5 min) |

## Prerequisites (before any of this works)

| Item | Who does it | Status |
|------|------------|--------|
| Confirm OAuth2 experience to API team | You (send the email above) | Pending |
| Set up website job board portal | ZenPeople contacts support.jobadder.com | Pending |
| Get Board ID from support | ZenPeople | Pending |
| Receive OAuth2 Client ID + Secret | JobAdder API team sends after confirmation | Pending |
| Build OAuth2 callback route on Worker | Developer | Not started |
| Build token storage + auto-refresh | Developer | Not started |

## All endpoints at a glance

| Method | Endpoint | Direction | Purpose |
|--------|----------|-----------|---------|
| `GET` | `/jobboards` | JA → Sanity | List boards |
| `GET` | `/jobboards/{boardId}/ads` | JA → Sanity | List all active ads |
| `GET` | `/jobboards/{boardId}/ads/{adId}` | JA → Sanity | Get single ad details |
| `POST` | `/jobboards/{boardId}/ads/{adId}/applications` | Sanity → JA | Submit application |
| `POST` | `/jobboards/{boardId}/ads/{adId}/applications/{appId}/{type}` | Sanity → JA | Attach resume/cover letter |

All endpoints require `Authorization: Bearer {access_token}` header. The access token comes from the OAuth2 flow. When it expires, use the refresh token to get a new one.

## Setup (step-by-step)

Once you have the JobAdder API credentials and board ID, follow these steps:

### 1. Create the KV namespace for OAuth tokens

```bash
wrangler kv namespace create JOBADDER_TOKENS
```

Copy the `id` from the output into `wrangler.toml` under `[[kv_namespaces]]`.

### 2. Set secrets

```bash
wrangler secret put JOBADDER_CLIENT_ID
wrangler secret put JOBADDER_CLIENT_SECRET
wrangler secret put JOBADDER_WEBHOOK_SECRET
```

For `JOBADDER_WEBHOOK_SECRET`, generate a random string (e.g. `openssl rand -hex 32`) and share it with JobAdder when configuring webhooks.

### 3. Set the board ID

Edit `wrangler.toml` and fill in `JOBADDER_BOARD_ID` under `[vars]` with the board ID from JobAdder support.

### 4. Deploy the worker

```bash
npm run build && wrangler deploy
```

### 5. Complete the OAuth flow

Visit `https://zenpeople.com.au/api/jobadder/authorize` in your browser. This redirects to JobAdder's login page. After authorizing, you'll be redirected back to `/api/jobadder/callback` which saves the OAuth tokens to KV.

### 6. Run the initial bulk import

```bash
curl -X POST https://zenpeople.com.au/api/jobadder/sync \
  -H "Authorization: Bearer YOUR_JOBADDER_WEBHOOK_SECRET"
```

This fetches all active ads from JobAdder and creates corresponding job documents in Sanity.

### 7. Configure JobAdder webhooks

In JobAdder, set up webhooks pointing to `https://zenpeople.com.au/webhooks/jobadder` for:

- `jobad_posted` — triggered when a job ad is created or updated
- `jobad_expired` — triggered when a job ad expires or is removed

Use the same `JOBADDER_WEBHOOK_SECRET` value for webhook signature verification.

### Worker routes summary

| Method | Route | Purpose |
|--------|-------|---------|
| `GET` | `/api/jobadder/authorize` | Start OAuth flow |
| `GET` | `/api/jobadder/callback` | OAuth callback (receives code, exchanges for tokens) |
| `POST` | `/api/jobadder/sync` | Trigger full sync (protected by shared secret) |
| `POST` | `/webhooks/jobadder` | Receive JobAdder webhook events |
