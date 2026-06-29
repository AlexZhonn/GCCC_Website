import type { CollectionConfig } from 'payload'

export const Leaders: CollectionConfig = {
  slug: 'leaders',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
    group: 'People',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      // en: "Rev. HongJun Li"  zh: "李洪軍牧師"
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      // en: "Pastor"  zh: "牧師"
    },
    {
      name: 'bio',
      type: 'richText',
      localized: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: { description: 'Lower numbers appear first in the leadership list.' },
    },
  ],
}
