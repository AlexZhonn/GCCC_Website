import type { CollectionConfig } from 'payload'

export const SermonSeries: CollectionConfig = {
  slug: 'sermon-series',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isActive', 'startDate'],
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
      // en: "The Gospel of John"  zh: "約翰福音系列"
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'yyyy-MM-dd' },
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to archive this series without deleting it.' },
    },
  ],
}
