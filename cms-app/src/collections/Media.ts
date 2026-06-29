import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // Files stored in cms/media/ directory
    staticDir: 'media',
    // Serve images at /media/*

    imageSizes: [
      // Thumbnail for admin UI and sermon archive list
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      // Card image for fellowship grid
      {
        name: 'card',
        width: 600,
        height: 400,
        position: 'centre',
      },
      // Full-width hero banner
      {
        name: 'hero',
        width: 1200,
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: { description: 'Alt text for accessibility (bilingual)' },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
