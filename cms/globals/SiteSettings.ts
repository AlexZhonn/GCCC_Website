import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Configuration',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ─── Church Identity ──────────────────────────────────────────────────────
    {
      name: 'churchName',
      type: 'text',
      required: true,
      localized: true,
      // en: "Gainesville Chinese Christian Church"  zh: "甘城華人教會"
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      // en: "Experiencing Christ's Love, Sharing the Eternal Truth"
      // zh: "經歷福杯滿溢的基督之愛，同享恆久不變的福音真理"
    },

    // ─── Welcome / About Content ──────────────────────────────────────────────
    {
      name: 'welcomeBlurbSubject',
      type: 'text',
      localized: true,
      admin: { description: 'Heading for the welcome blurb, e.g. "Welcome to Our Family"' },
    },
    {
      name: 'welcomeBlurbText',
      type: 'richText',
      localized: true,
      admin: { description: 'Main welcome paragraph shown in the About section.' },
    },
    {
      name: 'welcomeHistoryText',
      type: 'richText',
      localized: true,
      admin: { description: 'Founding / history paragraph shown below the welcome blurb.' },
    },

    // ─── Contact Details ──────────────────────────────────────────────────────
    {
      name: 'address',
      type: 'text',
      localized: true,
      // en: "3425 SW 2nd Ave, Gainesville, FL 32607"
      // zh: "3425 SW 2nd Ave, Gainesville, FL 32607 (UF校園旁)"
    },
    {
      name: 'phone',
      type: 'text',
      // e.g. "(352) 378-0554" — not localized
    },
    {
      name: 'email',
      type: 'email',
      // gcccfl@gmail.com
    },

    // ─── External Links ───────────────────────────────────────────────────────
    {
      name: 'youtubeLiveUrl',
      type: 'text',
      admin: { description: 'YouTube channel or live stream URL' },
    },
    {
      name: 'googleCalendarId',
      type: 'text',
      admin: { description: 'Google Calendar embed ID (found in Calendar settings > Embed)' },
    },
    {
      name: 'googleMapsEmbedUrl',
      type: 'text',
      admin: { description: 'Full Google Maps iframe src URL for the contact section embed' },
    },
  ],
}
