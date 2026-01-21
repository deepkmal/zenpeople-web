import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'job', 'status', 'createdAt'],
    description: 'Job applications submitted by candidates',
  },
  access: {
    read: ({ req }) => !!req.user, // Admin only - protect applicant data
    create: () => true, // Public can submit applications
    update: ({ req }) => !!req.user, // Admin only
    delete: ({ req }) => !!req.user, // Admin only
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'Mobile/phone number',
      },
    },
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      required: true,
      admin: {
        description: 'The job this application is for',
      },
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resumes',
      required: true,
      admin: {
        description: 'Uploaded resume file',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Interviewed', value: 'interviewed' },
        { label: 'Offered', value: 'offered' },
        { label: 'Hired', value: 'hired' },
        { label: 'Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this application',
      },
    },
  ],
  timestamps: true,
}
