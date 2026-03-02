import {defineType, defineField} from 'sanity'

export const job = defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'employment_type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Permanent/Full-time', value: 'permanent-full-time'},
          {title: 'Permanent/Part-time', value: 'permanent-part-time'},
          {title: 'Contract/Full-time', value: 'contract-full-time'},
          {title: 'Contract/Part-time', value: 'contract-part-time'},
          {title: 'Casual', value: 'casual'},
        ],
      },
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          {title: 'Engineering, Design & Consulting', value: 'engineering-design-consulting'},
          {title: 'Facade Manufacturing & Supply', value: 'facade-manufacturing-supply'},
          {title: 'Remedial Construction', value: 'remedial-construction'},
          {title: 'Sales & Marketing', value: 'sales-marketing'},
          {title: 'Business Support & Admin', value: 'business-support-admin'},
          {title: 'Executive Search', value: 'executive-search'},
        ],
      },
    }),
    defineField({
      name: 'salary',
      title: 'Salary',
      type: 'string',
    }),
    defineField({
      name: 'company_desc',
      title: 'Company Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'role_desc',
      title: 'Role Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'role_requirements',
      title: 'Role Requirements',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'jobAdderId',
      title: 'JobAdder Ad ID',
      type: 'string',
      readOnly: true,
      hidden: ({document}) => !document?.jobAdderId,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'city',
    },
  },
})
