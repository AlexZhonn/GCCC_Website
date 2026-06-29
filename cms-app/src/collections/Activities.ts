import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'fellowship', 'date'],
    group: 'Events',
  },
  access: {
    read: () => true,
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      // en: "He vs. She Cooking Competition"  zh: "男女廚藝大比拼"
    },
    {
      name: 'fellowship',
      type: 'text',
      required: true,
      localized: true,
      // en: "Alpha Fellowship"  zh: "Alpha 團契"
      admin: { description: 'Name of the fellowship group hosting this activity (free text, bilingual).' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
      },
    },
    {
      name: 'time',
      type: 'text',
      admin: { description: 'Display time string, e.g. "6:30 PM"' },
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
      // en: "Church Fellowship Hall"  zh: "教會團契廳"
    },
    {
      name: 'photos',
      type: 'array',
      admin: { description: 'Activity photos — first photo is used as the hero image.' },
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
