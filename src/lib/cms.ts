/**
 * Typed fetch helpers for the Payload CMS REST API.
 *
 * Usage:
 *   import { getSermons, getFellowships, getSiteSettings } from '@/lib/cms'
 *
 * All functions accept a `locale` parameter ('en' | 'zh') and return
 * data shaped to match the existing TypeScript interfaces in src/types.ts,
 * so the rest of the app requires no changes once the CMS is running.
 *
 * When VITE_CMS_URL is not set (e.g. during static builds without CMS),
 * functions return an empty array / null and log a warning.
 */

import type { Language, Sermon, Fellowship, SiteSettings } from '../types'

const CMS_URL = import.meta.env.VITE_CMS_URL ?? ''

// ─── Internal helpers ─────────────────────────────────────────────────────────

function cmsUrl(path: string): string {
  if (!CMS_URL) {
    console.warn('[cms] VITE_CMS_URL is not set. Falling back to static data.')
    return ''
  }
  return `${CMS_URL}${path}`
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  if (!url) return null
  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error(`[cms] fetch failed: ${res.status} ${url}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(`[cms] network error for ${url}:`, err)
    return null
  }
}

// ─── Payload REST response shapes ────────────────────────────────────────────

interface PayloadList<T> {
  docs: T[]
  totalDocs: number
  page: number
  totalPages: number
}

interface PayloadSpeaker {
  id: number
  name: string   // already resolved for requested locale
  title?: string
}

interface PayloadSermonSeries {
  id: number
  name: string   // already resolved for requested locale
}

interface PayloadSermon {
  id: number
  title: string
  speaker: PayloadSpeaker | number
  scripture: string
  date: string
  series?: PayloadSermonSeries | number | null
  youtubeLink?: string
  audioLink?: string
  isFeatured?: boolean
}

interface PayloadFellowship {
  id: number
  slug: string
  name: string
  schedule: string
  location: string
  contact: string
  description: { root: unknown } | string  // Lexical richText or plain text
  image?: { url: string } | null
  isFeatured?: boolean
  isActive?: boolean
  order?: number
}

interface PayloadSiteSettings {
  churchName: string
  tagline?: string
  welcomeBlurbSubject?: string
  welcomeBlurbText?: { root: unknown } | string
  welcomeHistoryText?: { root: unknown } | string
  address?: string
  phone?: string
  email?: string
  youtubeLiveUrl?: string
}

// ─── Converters: Payload shape → existing TypeScript interfaces ───────────────

/**
 * Converts a Payload sermon doc (for one locale) into the bilingual Sermon
 * interface by fetching both locales and merging them.
 */
function mergeSermon(en: PayloadSermon, zh: PayloadSermon): Sermon {
  const speakerEn = typeof en.speaker === 'object' ? en.speaker.name : String(en.speaker)
  const speakerZh = typeof zh.speaker === 'object' ? zh.speaker.name : speakerEn
  const seriesEn = en.series && typeof en.series === 'object' ? en.series.name : undefined
  const seriesZh = zh.series && typeof zh.series === 'object' ? zh.series.name : seriesEn

  return {
    id: String(en.id),
    title: { en: en.title, zh: zh.title },
    speaker: { en: speakerEn, zh: speakerZh },
    scripture: en.scripture,
    date: en.date,
    series: seriesEn ? { en: seriesEn, zh: seriesZh ?? seriesEn } : undefined,
    youtubeLink: en.youtubeLink,
    audioLink: en.audioLink,
  }
}

function mergeFellowship(en: PayloadFellowship, zh: PayloadFellowship): Fellowship {
  // Payload richText returns a Lexical JSON object; convert to plain string for now.
  // Replace with a proper Lexical → HTML serializer when rich formatting is needed.
  const descEn = typeof en.description === 'string'
    ? en.description
    : '[Rich text — see CMS]'
  const descZh = typeof zh.description === 'string'
    ? zh.description
    : descEn

  return {
    id: en.slug,
    name: { en: en.name, zh: zh.name },
    schedule: { en: en.schedule, zh: zh.schedule },
    location: { en: en.location, zh: zh.location },
    contact: { en: en.contact, zh: zh.contact },
    description: { en: descEn, zh: descZh },
    imageUrl: en.image?.url ?? '',
    isFeatured: en.isFeatured ?? false,
  }
}

function mergeSiteSettings(en: PayloadSiteSettings, zh: PayloadSiteSettings): SiteSettings {
  return {
    churchName: { en: en.churchName, zh: zh.churchName },
    tagline: { en: en.tagline ?? '', zh: zh.tagline ?? en.tagline ?? '' },
    welcomeBlurbSubject: { en: en.welcomeBlurbSubject ?? '', zh: zh.welcomeBlurbSubject ?? en.welcomeBlurbSubject ?? '' },
    welcomeBlurbText: {
      en: typeof en.welcomeBlurbText === 'string' ? en.welcomeBlurbText : '',
      zh: typeof zh.welcomeBlurbText === 'string' ? zh.welcomeBlurbText : '',
    },
    welcomeHistoryText: {
      en: typeof en.welcomeHistoryText === 'string' ? en.welcomeHistoryText : '',
      zh: typeof zh.welcomeHistoryText === 'string' ? zh.welcomeHistoryText : '',
    },
    address: { en: en.address ?? '', zh: zh.address ?? en.address ?? '' },
    phone: en.phone ?? '',
    email: en.email ?? '',
    youtubeLiveUrl: en.youtubeLiveUrl ?? '',
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch all sermons, newest first, with both locales merged into the
 * bilingual Sermon interface.
 */
export async function getSermons(): Promise<Sermon[]> {
  const [enList, zhList] = await Promise.all([
    fetchJSON<PayloadList<PayloadSermon>>(
      cmsUrl('/api/sermons?sort=-date&depth=1&locale=en&limit=100'),
    ),
    fetchJSON<PayloadList<PayloadSermon>>(
      cmsUrl('/api/sermons?sort=-date&depth=1&locale=zh&limit=100'),
    ),
  ])

  if (!enList) return []

  const zhMap = new Map((zhList?.docs ?? []).map((d) => [d.id, d]))
  return enList.docs.map((en) => mergeSermon(en, zhMap.get(en.id) ?? en))
}

/**
 * Fetch all active fellowships in display order, with both locales merged.
 */
export async function getFellowships(): Promise<Fellowship[]> {
  const query = 'where[isActive][equals]=true&sort=order&depth=1&limit=50'
  const [enList, zhList] = await Promise.all([
    fetchJSON<PayloadList<PayloadFellowship>>(
      cmsUrl(`/api/fellowships?${query}&locale=en`),
    ),
    fetchJSON<PayloadList<PayloadFellowship>>(
      cmsUrl(`/api/fellowships?${query}&locale=zh`),
    ),
  ])

  if (!enList) return []

  const zhMap = new Map((zhList?.docs ?? []).map((d) => [d.id, d]))
  return enList.docs.map((en) => mergeFellowship(en, zhMap.get(en.id) ?? en))
}

/**
 * Fetch the site-settings global with both locales merged.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const [en, zh] = await Promise.all([
    fetchJSON<PayloadSiteSettings>(cmsUrl('/api/globals/site-settings?locale=en')),
    fetchJSON<PayloadSiteSettings>(cmsUrl('/api/globals/site-settings?locale=zh')),
  ])

  if (!en) return null
  return mergeSiteSettings(en, zh ?? en)
}
