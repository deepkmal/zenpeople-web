import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig, type Plugin } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { resendAdapter } from '@payloadcms/email-resend'

import { Jobs, Applications, Leads, Users } from './collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Only include S3 storage plugin if R2 credentials are configured
const plugins: Plugin[] = []
if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_ENDPOINT) {
  plugins.push(
    s3Storage({
      collections: {
        applications: {
          prefix: 'application-resumes',
        },
        leads: {
          prefix: 'lead-resumes',
        },
      },
      bucket: process.env.R2_BUCKET || 'zenpeople-uploads',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
        endpoint: process.env.R2_ENDPOINT,
        region: 'auto',
      },
    }),
  )
}

export default buildConfig({
  // Server URL for admin panel
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // CORS configuration
  cors: [
    'https://zenpeople.com',
    'https://www.zenpeople.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:3002',
  ],

  // CSRF protection
  csrf: [
    'https://zenpeople.com',
    'https://www.zenpeople.com',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:3002',
  ],

  // Admin panel configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Zenpeople Admin',
    },
  },

  // Collections
  collections: [Jobs, Applications, Leads, Users],

  // Rich text editor
  editor: lexicalEditor(),

  // Secret for JWT tokens
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',

  // TypeScript output
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Database adapter - SQLite for local dev, D1 for production
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload.db',
    },
  }),

  // Email adapter
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'noreply@zenpeople.com',
    defaultFromName: 'Zenpeople',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  // Plugins (S3 storage only if R2 credentials are configured)
  plugins,
})
