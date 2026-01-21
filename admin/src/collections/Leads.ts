import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'type', 'status', 'createdAt'],
    description: 'Contact form and quote request submissions',
  },
  access: {
    read: ({ req }) => !!req.user, // Admin only
    create: () => true, // Public can submit forms
    update: ({ req }) => !!req.user, // Admin only
    delete: ({ req }) => !!req.user, // Admin only
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Quote Request', value: 'quote' },
        { label: 'Resume Submission', value: 'resume' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
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
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resumes',
      admin: {
        description: 'Uploaded resume file',
        condition: (data) => data?.type === 'resume',
      },
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
      admin: {
        description: 'Additional information (for resume submissions)',
        condition: (data) => data?.type === 'resume',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes',
      },
    },
  ],
  timestamps: true,
}
