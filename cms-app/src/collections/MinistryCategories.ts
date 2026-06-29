import type { CollectionConfig } from 'payload'

export const MinistryCategories: CollectionConfig = {
  slug: 'ministry-categories',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'id', 'order'],
    group: 'Configuration',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'categoryId',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Kids', value: 'kids' },
        { label: 'Youth', value: 'youth' },
        { label: 'College', value: 'college' },
        { label: 'Adults', value: 'adults' },
        { label: 'Senior Adults', value: 'senior-adults' },
        { label: 'Discipleship', value: 'discipleship' },
      ],
      admin: { description: 'Stable ID used by Fellowship.ministryCategory to reference this category.' },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      // en: "Kids"  zh: "兒童"
    },
    {
      name: 'ageRange',
      type: 'text',
      localized: true,
      // en: "Infants – 5th Grade"  zh: "嬰兒至五年級"
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Full-width banner image for the ministry category page.' },
    },
    {
      name: 'color',
      type: 'text',
      admin: { description: 'Hex accent color used for UI highlights, e.g. "#4A90D9"' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: { description: 'Display sort order — lower numbers appear first.' },
    },
  ],
}
