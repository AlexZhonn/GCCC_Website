import type { CollectionConfig } from 'payload'

export const Sermons: CollectionConfig = {
  slug: 'sermons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'speaker', 'date', 'isFeatured'],
    // Sort newest first by default
    listSearchableFields: ['title', 'scripture'],
  },
  access: {
    read: () => true,
  },
  // Default sort newest first
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      // en: "Abiding in the Vine: True Spiritual Fruitfulness"
      // zh: "常在葡萄樹上：結出豐盛的生命果子"
    },
    {
      name: 'speaker',
      type: 'relationship',
      relationTo: 'speakers',
      required: true,
    },
    {
      name: 'scripture',
      type: 'text',
      required: true,
      // Bilingual in one field: "John 15:1-8 (約翰福音 15:1-8)"
      admin: { description: 'Include both English and Chinese references, e.g. "John 15:1-8 (約翰福音 15:1-8)"' },
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
      name: 'series',
      type: 'relationship',
      relationTo: 'sermon-series',
      required: false,
    },
    {
      name: 'youtubeLink',
      type: 'text',
      admin: { description: 'Full YouTube embed URL, e.g. https://www.youtube.com/embed/XXXXX' },
    },
    {
      name: 'audioLink',
      type: 'text',
      admin: { description: 'Direct link to MP3 or podcast episode' },
    },
    {
      name: 'notes',
      type: 'richText',
      localized: true,
      admin: { description: 'Optional sermon notes or outline (bilingual)' },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Custom thumbnail; falls back to YouTube thumbnail if omitted' },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Pin this sermon to the top of the archive' },
    },
  ],
}
