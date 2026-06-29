import type { CollectionConfig } from 'payload'

export const Speakers: CollectionConfig = {
  slug: 'speakers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      // en: "Pastor Samuel Cheng"  zh: "鄭牧師"
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      // en: "Senior Pastor"  zh: "主任牧師"
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
  ],
}
