import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'city', 'sector', 'isActive', 'updatedAt'],
    description: 'Manage job listings',
  },
  access: {
    read: () => true, // Public can view jobs
    create: ({ req }) => !!req.user, // Admin only
    update: ({ req }) => !!req.user, // Admin only
    delete: ({ req }) => !!req.user, // Admin only
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title (e.g., "Senior Facade Engineer")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., "senior-facade-engineer-sydney")',
      },
    },
    {
      name: 'summary',
      type: 'text',
      required: true,
      admin: {
        description: 'Brief job summary (1-2 sentences) - used for search and SEO',
      },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      admin: {
        description: 'City location (e.g., "Sydney", "Melbourne")',
      },
    },
    {
      name: 'employment_type',
      type: 'select',
      required: true,
      options: [
        { label: 'Permanent/Full-time', value: 'permanent-full-time' },
        { label: 'Permanent/Part-time', value: 'permanent-part-time' },
        { label: 'Contract/Full-time', value: 'contract-full-time' },
        { label: 'Contract/Part-time', value: 'contract-part-time' },
        { label: 'Casual', value: 'casual' },
      ],
      defaultValue: 'permanent-full-time',
    },
    {
      name: 'sector',
      type: 'select',
      required: true,
      options: [
        { label: 'Engineering, Design & Consulting', value: 'engineering-design-consulting' },
        { label: 'Facade Manufacturing & Supply', value: 'facade-manufacturing-supply' },
        { label: 'Remedial Construction', value: 'remedial-construction' },
        { label: 'Sales & Marketing', value: 'sales-marketing' },
        { label: 'Business Support & Admin', value: 'business-support-admin' },
        { label: 'Executive Search', value: 'executive-search' },
      ],
    },
    {
      name: 'salary',
      type: 'text',
      admin: {
        description: 'Salary range (e.g., "$120k - $140k + super")',
      },
    },
    {
      name: 'company_desc',
      type: 'richText',
      admin: {
        description: 'Description of the company (optional)',
      },
    },
    {
      name: 'role_desc',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full description of the role',
      },
    },
    {
      name: 'role_requirements',
      type: 'richText',
      admin: {
        description: 'Requirements for the role (optional)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Toggle to show/hide job from public listings',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
