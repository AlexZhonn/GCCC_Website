import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Speakers } from './collections/Speakers.js'
import { SermonSeries } from './collections/SermonSeries.js'
import { Sermons } from './collections/Sermons.js'
import { Fellowships } from './collections/Fellowships.js'
import { Media } from './collections/Media.js'
import { SiteSettings } from './globals/SiteSettings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  // ─── Admin UI ──────────────────────────────────────────────────────────────
  admin: {
    meta: {
      titleSuffix: '— GCCC Admin',
    },
  },

  // ─── Secret (override with PAYLOAD_SECRET env var in production) ───────────
  secret: process.env.PAYLOAD_SECRET ?? 'dev-secret-change-me-in-production',

  // ─── Localization ──────────────────────────────────────────────────────────
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: '中文', code: 'zh' },
    ],
    defaultLocale: 'en',
    fallback: true, // Return English if Chinese content is missing
  },

  // ─── Rich Text Editor ─────────────────────────────────────────────────────
  editor: lexicalEditor({}),

  // ─── Collections ─────────────────────────────────────────────────────────
  collections: [
    Speakers,
    SermonSeries,
    Sermons,
    Fellowships,
    Media,
  ],

  // ─── Globals ─────────────────────────────────────────────────────────────
  globals: [
    SiteSettings,
  ],

  // ─── Database ─────────────────────────────────────────────────────────────
  // SQLite for local dev — swap to @payloadcms/db-postgres for production
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI ?? `file:${path.resolve(__dirname, '../cms.db')}`,
    },
  }),

  // ─── TypeScript output ────────────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // ─── CORS ─────────────────────────────────────────────────────────────────
  // Allow the Vite dev server to fetch from Payload
  cors: [
    'http://localhost:3000', // Vite dev server
    process.env.APP_URL ?? '',
  ].filter(Boolean),

  // ─── Upload ──────────────────────────────────────────────────────────────
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
})
