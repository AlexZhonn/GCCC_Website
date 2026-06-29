import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
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
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'
import { HomePageGlobal } from './globals/pages/HomePage'
import { AboutPageGlobal } from './globals/pages/AboutPage'
import { AnnouncementsPageGlobal } from './globals/pages/AnnouncementsPage'
import { GivePageGlobal } from './globals/pages/GivePage'
import { GainsvilleDewPageGlobal } from './globals/pages/GainsvilleDewPage'
import { FellowshipsPageGlobal } from './globals/pages/FellowshipsPage'
import { LeadershipPageGlobal } from './globals/pages/LeadershipPage'
import { ContactPageGlobal } from './globals/pages/ContactPage'

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
    Pages,
  ],

  globals: [
    SiteSettings,
    HomePageGlobal,
    AboutPageGlobal,
    AnnouncementsPageGlobal,
    GivePageGlobal,
    GainsvilleDewPageGlobal,
    FellowshipsPageGlobal,
    LeadershipPageGlobal,
    ContactPageGlobal,
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // ─── CORS ─────────────────────────────────────────────────────────────────
  cors: [
    'http://localhost:3000',
    process.env.APP_URL ?? '',
  ].filter(Boolean),

  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.R2_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
      },
    }),
  ],
})
