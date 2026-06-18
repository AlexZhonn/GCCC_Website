/**
 * Unit tests for src/lib/cms.ts
 *
 * Tests the fetch helpers and data converters in isolation using
 * vi.stubGlobal to mock fetch — no real network calls.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getSermons, getFellowships, getSiteSettings } from '../../../src/lib/cms'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mockFetch(responses: Record<string, unknown>) {
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) => {
      // Match by substring so query params don't matter for key lookup
      const key = Object.keys(responses).find((k) => url.includes(k))
      if (!key) {
        return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve(null) })
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(responses[key]),
      })
    }),
  )
}

const enSermonDoc = {
  id: 1,
  title: 'Abiding in the Vine',
  speaker: { id: 1, name: 'Pastor Samuel Cheng' },
  scripture: 'John 15:1-8 (約翰福音 15:1-8)',
  date: '2026-06-14',
  series: { id: 1, name: 'The Gospel of John' },
  youtubeLink: 'https://www.youtube.com/embed/abc',
  audioLink: 'https://example.com/audio.mp3',
}

const zhSermonDoc = {
  ...enSermonDoc,
  title: '常在葡萄樹上：結出豐盛的生命果子',
  speaker: { id: 1, name: '鄭牧師' },
  series: { id: 1, name: '約翰福音系列' },
}

// ─── getSermons ───────────────────────────────────────────────────────────────

describe('getSermons', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CMS_URL', 'http://localhost:3001')
  })

  it('returns empty array when CMS_URL is not set', async () => {
    vi.stubEnv('VITE_CMS_URL', '')
    const result = await getSermons()
    expect(result).toEqual([])
  })

  it('merges en and zh sermon docs into bilingual Sermon interface', async () => {
    mockFetch({
      'locale=en': { docs: [enSermonDoc], totalDocs: 1 },
      'locale=zh': { docs: [zhSermonDoc], totalDocs: 1 },
    })

    const sermons = await getSermons()
    expect(sermons).toHaveLength(1)

    const s = sermons[0]
    expect(s.id).toBe('1')
    expect(s.title.en).toBe('Abiding in the Vine')
    expect(s.title.zh).toBe('常在葡萄樹上：結出豐盛的生命果子')
    expect(s.speaker.en).toBe('Pastor Samuel Cheng')
    expect(s.speaker.zh).toBe('鄭牧師')
    expect(s.series?.en).toBe('The Gospel of John')
    expect(s.series?.zh).toBe('約翰福音系列')
    expect(s.scripture).toBe('John 15:1-8 (約翰福音 15:1-8)')
    expect(s.date).toBe('2026-06-14')
  })

  it('falls back to en values when zh fetch fails', async () => {
    mockFetch({
      'locale=en': { docs: [enSermonDoc], totalDocs: 1 },
    })

    const sermons = await getSermons()
    expect(sermons[0].title.zh).toBe('Abiding in the Vine') // en value used
  })

  it('returns empty array when en fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network error'))))
    const sermons = await getSermons()
    expect(sermons).toEqual([])
  })
})

// ─── getFellowships ───────────────────────────────────────────────────────────

const enFellowshipDoc = {
  id: 1,
  slug: 'campus',
  name: 'Campus Student Fellowship',
  schedule: 'Fridays at 7:30 PM',
  location: 'Church Fellowship Hall',
  contact: 'Brother Ethan',
  description: 'A great fellowship for students.',
  image: { url: 'http://localhost:3001/media/campus.jpg' },
  isFeatured: true,
  order: 1,
  isActive: true,
}

const zhFellowshipDoc = {
  ...enFellowshipDoc,
  name: '校園學生團契',
  schedule: '每週五晚 7:30',
  location: '教會副堂',
  contact: 'Ethan 弟兄',
  description: '專為學生打造的社區。',
}

describe('getFellowships', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CMS_URL', 'http://localhost:3001')
  })

  it('merges en and zh fellowship docs into bilingual Fellowship interface', async () => {
    mockFetch({
      'locale=en': { docs: [enFellowshipDoc], totalDocs: 1 },
      'locale=zh': { docs: [zhFellowshipDoc], totalDocs: 1 },
    })

    const fellowships = await getFellowships()
    expect(fellowships).toHaveLength(1)

    const f = fellowships[0]
    expect(f.id).toBe('campus')
    expect(f.name.en).toBe('Campus Student Fellowship')
    expect(f.name.zh).toBe('校園學生團契')
    expect(f.schedule.zh).toBe('每週五晚 7:30')
    expect(f.isFeatured).toBe(true)
    expect(f.imageUrl).toBe('http://localhost:3001/media/campus.jpg')
  })

  it('uses empty string imageUrl when no image is attached', async () => {
    const noImage = { ...enFellowshipDoc, image: null }
    mockFetch({
      'locale=en': { docs: [noImage], totalDocs: 1 },
      'locale=zh': { docs: [zhFellowshipDoc], totalDocs: 1 },
    })

    const fellowships = await getFellowships()
    expect(fellowships[0].imageUrl).toBe('')
  })
})

// ─── getSiteSettings ──────────────────────────────────────────────────────────

const enSettings = {
  churchName: 'Gainesville Chinese Christian Church',
  tagline: "Experiencing Christ's Love",
  welcomeBlurbSubject: 'Welcome to Our Family',
  welcomeBlurbText: 'We are a Bible-centered fellowship.',
  welcomeHistoryText: 'Founded near UF.',
  address: '3425 SW 2nd Ave, Gainesville, FL 32607',
  phone: '(352) 378-0554',
  email: 'gcccfl@gmail.com',
  youtubeLiveUrl: 'https://www.youtube.com/@GCCC',
}

const zhSettings = {
  ...enSettings,
  churchName: '甘城華人教會',
  tagline: '經歷福杯滿溢的基督之愛',
  welcomeBlurbSubject: '歡迎來到我們的屬靈大家庭',
  welcomeBlurbText: '甘城華人教會是以聖經真理為核心的群體。',
  welcomeHistoryText: '由佛羅里達大學的學生創立。',
  address: '3425 SW 2nd Ave, Gainesville, FL 32607 (UF校園旁)',
}

describe('getSiteSettings', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CMS_URL', 'http://localhost:3001')
  })

  it('returns null when CMS_URL is not set', async () => {
    vi.stubEnv('VITE_CMS_URL', '')
    const result = await getSiteSettings()
    expect(result).toBeNull()
  })

  it('merges en and zh settings into bilingual SiteSettings', async () => {
    mockFetch({
      'locale=en': enSettings,
      'locale=zh': zhSettings,
    })

    const settings = await getSiteSettings()
    expect(settings).not.toBeNull()
    expect(settings!.churchName.en).toBe('Gainesville Chinese Christian Church')
    expect(settings!.churchName.zh).toBe('甘城華人教會')
    expect(settings!.address.zh).toBe('3425 SW 2nd Ave, Gainesville, FL 32607 (UF校園旁)')
    expect(settings!.phone).toBe('(352) 378-0554')
    expect(settings!.email).toBe('gcccfl@gmail.com')
  })
})
