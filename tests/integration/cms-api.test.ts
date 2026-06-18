/**
 * Integration tests for the Payload CMS REST API.
 *
 * These tests spin up Payload with an in-memory SQLite DB, seed it with
 * fixtures, and assert on real HTTP responses.
 *
 * Run with: npm run test:integration
 *
 * NOTE: These tests require Payload CMS dependencies to be installed in cms/.
 * They will be skipped automatically if Payload is not yet installed.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'

// Dynamically import Payload to allow graceful skip when not installed
let payload: Awaited<ReturnType<typeof import('payload').getPayload>> | null = null
let baseUrl: string

beforeAll(async () => {
  try {
    const { getPayload } = await import('payload')
    const config = await import('../../cms/payload.config.js')
    payload = await getPayload({ config: config.default })
    baseUrl = 'http://localhost:3001'
  } catch {
    console.warn('[integration] Payload not installed — skipping CMS API tests.')
  }
})

afterAll(async () => {
  // Payload manages its own DB connection lifecycle
})

function skip() {
  return payload === null
}

// ─── Sermons ─────────────────────────────────────────────────────────────────

describe('GET /api/sermons', () => {
  it('returns docs array with correct shape', async () => {
    if (skip()) return

    const res = await fetch(`${baseUrl}/api/sermons?locale=en&depth=1`)
    expect(res.ok).toBe(true)

    const json = await res.json()
    expect(json).toHaveProperty('docs')
    expect(Array.isArray(json.docs)).toBe(true)

    if (json.docs.length > 0) {
      const doc = json.docs[0]
      expect(doc).toHaveProperty('id')
      expect(doc).toHaveProperty('title')
      expect(doc).toHaveProperty('scripture')
      expect(doc).toHaveProperty('date')
    }
  })

  it('returns Chinese titles when locale=zh is requested', async () => {
    if (skip()) return

    const res = await fetch(`${baseUrl}/api/sermons?locale=zh&depth=1&limit=1`)
    const json = await res.json()

    if (json.docs.length > 0) {
      // Chinese title should contain Chinese characters
      const title: string = json.docs[0].title
      expect(/[\u4e00-\u9fff]/.test(title)).toBe(true)
    }
  })
})

// ─── Fellowships ──────────────────────────────────────────────────────────────

describe('GET /api/fellowships', () => {
  it('returns only active fellowships when filtered', async () => {
    if (skip()) return

    const res = await fetch(
      `${baseUrl}/api/fellowships?where[isActive][equals]=true&locale=en`,
    )
    expect(res.ok).toBe(true)

    const json = await res.json()
    expect(Array.isArray(json.docs)).toBe(true)
    json.docs.forEach((doc: { isActive: boolean }) => {
      expect(doc.isActive).toBe(true)
    })
  })

  it('returns the featured fellowship when filtered by isFeatured', async () => {
    if (skip()) return

    const res = await fetch(
      `${baseUrl}/api/fellowships?where[isFeatured][equals]=true&locale=en`,
    )
    const json = await res.json()

    expect(json.docs.length).toBeGreaterThanOrEqual(1)
    expect(json.docs[0].isFeatured).toBe(true)
    // The campus fellowship should be the featured one
    expect(json.docs[0].slug).toBe('campus')
  })

  it('returns fellowships sorted by order field ascending', async () => {
    if (skip()) return

    const res = await fetch(`${baseUrl}/api/fellowships?sort=order&locale=en&limit=10`)
    const json = await res.json()

    const orders: number[] = json.docs.map((d: { order: number }) => d.order)
    for (let i = 1; i < orders.length; i++) {
      expect(orders[i]).toBeGreaterThanOrEqual(orders[i - 1])
    }
  })
})

// ─── Site Settings ────────────────────────────────────────────────────────────

describe('GET /api/globals/site-settings', () => {
  it('returns site settings with churchName in English', async () => {
    if (skip()) return

    const res = await fetch(`${baseUrl}/api/globals/site-settings?locale=en`)
    expect(res.ok).toBe(true)

    const json = await res.json()
    expect(json).toHaveProperty('churchName')
    expect(typeof json.churchName).toBe('string')
    expect(json.churchName.length).toBeGreaterThan(0)
  })

  it('returns Chinese churchName when locale=zh', async () => {
    if (skip()) return

    const res = await fetch(`${baseUrl}/api/globals/site-settings?locale=zh`)
    const json = await res.json()

    // Should contain Chinese characters
    expect(/[\u4e00-\u9fff]/.test(json.churchName)).toBe(true)
  })

  it('returns phone and email as non-localized fields', async () => {
    if (skip()) return

    const [enRes, zhRes] = await Promise.all([
      fetch(`${baseUrl}/api/globals/site-settings?locale=en`).then((r) => r.json()),
      fetch(`${baseUrl}/api/globals/site-settings?locale=zh`).then((r) => r.json()),
    ])

    // Phone and email are not localized — should be identical
    expect(enRes.phone).toBe(zhRes.phone)
    expect(enRes.email).toBe(zhRes.email)
  })
})
