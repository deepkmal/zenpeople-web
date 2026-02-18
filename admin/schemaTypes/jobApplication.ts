import {defineType, defineField} from 'sanity'

export const jobApplication = defineType({
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'jobSlug',
      title: 'Job Slug',
      type: 'string',
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume File',
      type: 'file',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      jobTitle: 'jobTitle',
    },
    prepare({firstName, lastName, jobTitle}) {
      return {
        title: `${firstName || ''} ${lastName || ''}`.trim(),
        subtitle: jobTitle,
      }
    },
  },
})
