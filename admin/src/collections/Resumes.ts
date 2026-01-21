import type { CollectionConfig } from 'payload'

export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: {
    useAsTitle: 'filename',
    description: 'Uploaded resume files',
  },
  access: {
    read: () => true, // Public read for download
    create: () => true, // Public can upload via application
    update: ({ req }) => !!req.user, // Admin only
    delete: ({ req }) => !!req.user, // Admin only
  },
  upload: {
    staticDir: 'resumes',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [],
  timestamps: true,
}
