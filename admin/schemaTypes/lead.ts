import {defineType, defineField} from 'sanity'

export const lead = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({
      name: 'leadType',
      title: 'Lead Type',
      type: 'string',
      options: {
        list: [
          {title: 'Contact', value: 'contact'},
          {title: 'Quote', value: 'quote'},
          {title: 'Resume', value: 'resume'},
        ],
      },
    }),
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
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Info',
      type: 'text',
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
      leadType: 'leadType',
    },
    prepare({firstName, lastName, leadType}) {
      return {
        title: `${firstName || ''} ${lastName || ''}`.trim(),
        subtitle: leadType,
      }
    },
  },
})
