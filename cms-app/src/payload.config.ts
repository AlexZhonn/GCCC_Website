import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Speakers } from './collections/Speakers'
import { Leaders } from './collections/Leaders'
import { SermonSeries } from './collections/SermonSeries'
import { Sermons } from './collections/Sermons'
import { Fellowships } from './collections/Fellowships'
import { Activities } from './collections/Activities'
import { MinistryCategories } from './collections/MinistryCategories'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— GCCC Admin',
    },
  },

  // ─── Localization ─────────────────────────────────────────────────────────
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: '中文', code: 'zh' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  collections: [
    Users,
    Media,
    Speakers,
    Leaders,
    SermonSeries,
    Sermons,
    Fellowships,
    Activities,
    MinistryCategories,
  ],

  globals: [SiteSettings],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:../cms-app.db',
    },
  }),

  // ─── CORS ─────────────────────────────────────────────────────────────────
  cors: [
    'http://localhost:3000',
    process.env.APP_URL ?? '',
  ].filter(Boolean),

  sharp,
  plugins: [],
})
