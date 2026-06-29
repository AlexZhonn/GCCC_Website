import type { CollectionConfig } from 'payload'

export const Fellowships: CollectionConfig = {
  slug: 'fellowships',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isFeatured', 'isActive', 'order'],
  },
  access: {
    read: () => true,
  },
  // Default sort by manual order field
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      // en: "Campus Student Fellowship (UF & SFC)"
      // zh: "校園學生團契 (UF & SFC)"
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier, e.g. "campus", "friday-bible-study". Auto-fill from name.',
      },
      // Matches existing id values from data.ts: "campus", "friday-bible-study", etc.
    },
    {
      name: 'schedule',
      type: 'text',
      required: true,
      localized: true,
      // en: "Fridays at 7:30 PM (Dinner at 6:30 PM)"
      // zh: "每週五晚 7:30 (傍晚 6:30 供應學生愛宴)"
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'contact',
      type: 'text',
      required: true,
      localized: true,
      // en: "Brother Ethan / Sister Grace"  zh: "Ethan 弟兄 / Grace 姊妹"
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show this fellowship as the hero/banner card at the top of the grid.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 99,
      admin: { description: 'Lower numbers appear first. Use to manually sort the fellowship grid.' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to hide this fellowship without deleting it.' },
    },
    {
      name: 'ministryCategory',
      type: 'select',
      options: [
        { label: 'Kids', value: 'kids' },
        { label: 'Youth', value: 'youth' },
        { label: 'College', value: 'college' },
        { label: 'Adults', value: 'adults' },
        { label: 'Senior Adults', value: 'senior-adults' },
        { label: 'Discipleship', value: 'discipleship' },
      ],
      admin: { description: 'Life-stage category this fellowship belongs to (used for filtering).' },
    },
    {
      name: 'instagramUrl',
      type: 'text',
      admin: { description: 'Optional Instagram profile URL, e.g. https://www.instagram.com/gccc_alpha/' },
    },
  ],
}
