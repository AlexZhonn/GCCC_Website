# GCCC Gainesville Website — CLAUDE.md

## Project Overview

This is the official website for **Gainesville Chinese Christian Church (甘城華人教會 / GCCC)**, a bilingual (English/Mandarin Chinese) church site serving the Gainesville, FL community with particular outreach to University of Florida students and scholars.

**Live stack:** React 19 + TypeScript + Vite + Tailwind CSS 4  
**CMS:** Payload CMS 3.x — schema defined in `cms/`, seed script ready, frontend fetch helpers in `src/lib/cms.ts`  
**Tests:** Vitest (unit + component + integration) + Playwright (E2E) — configs and test files in `tests/`

---

## Tech Stack

| Layer | Tool | Version |
|---|---|---|
| UI Framework | React | 19.0.1 |
| Language | TypeScript | 5.8.2 |
| Bundler | Vite | 6.2.3 |
| Styling | Tailwind CSS | 4.1.14 |
| Animations | Motion (Framer) | 12.23.24 |
| Icons | Lucide React | 0.546.0 |
| AI | @google/genai (Gemini) | 2.4.0 |
| Server | Express | 4.21.2 |
| CMS (planned) | Payload CMS | 3.x |

---

## Commands

```bash
# Frontend dev server (port 3000)
npm run dev

# TypeScript type check (no emit)
npm run lint

# Production build → dist/
npm run build

# Preview production build
npm run preview

# CMS dev server (after Payload setup, port 3001)
npm run cms:dev

# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run e2e tests
npm run test:e2e
```

---

## Project Structure

```
GCCC_Website/
├── src/                        # Frontend React app
│   ├── App.tsx                 # Main SPA component (sections: hero, about, sermons, fellowships, calendar, contact)
│   ├── main.tsx                # React root renderer
│   ├── types.ts                # TypeScript interfaces (Sermon, Fellowship, SiteSettings, Language)
│   ├── data.ts                 # Static data fixtures (migrate → Payload)
│   ├── index.css               # Global Tailwind + CSS theme variables
│   └── components/
│       ├── Header.tsx          # Sticky nav, language toggle (EN/ZH), mobile hamburger
│       ├── GcccIntro.tsx       # Session-once SVG stroke-drawing intro animation
│       ├── GcccIntro.css       # Intro keyframe animations
│       ├── GcccMark.tsx        # Reusable SVG logo component
│       ├── SermonPlayer.tsx    # Video/audio player + sermon archive list
│       ├── FellowshipGrid.tsx  # Photo grid + detail modals for fellowship groups
│       └── CalendarEmbed.tsx   # Weekly schedule cards + Google Calendar iframe embed
├── cms/                        # Payload CMS app (to be created)
│   ├── payload.config.ts       # Payload root config
│   ├── collections/            # Content type definitions
│   │   ├── Sermons.ts
│   │   ├── Fellowships.ts
│   │   ├── Speakers.ts
│   │   └── SermonSeries.ts
│   ├── globals/                # Singleton documents
│   │   └── SiteSettings.ts
│   └── seed/                   # Data migration scripts
│       └── index.ts
├── tests/                      # All test files
│   ├── unit/                   # Vitest unit tests
│   ├── integration/            # API integration tests
│   └── e2e/                    # Playwright end-to-end tests
├── CLAUDE.md                   # This file
├── package.json                # Frontend deps
├── tsconfig.json               # TypeScript config
└── vite.config.ts              # Vite config
```

---

## Architecture

### Bilingual Content Pattern

All user-facing strings use the `{ [key in Language]: string }` pattern where `Language = 'en' | 'zh'`. The active language is held in `App.tsx` state and passed as a `currentLang` prop throughout the tree.

```typescript
// Example — always use this pattern for bilingual fields
const title: { en: string; zh: string } = {
  en: "English text",
  zh: "中文内容",
};
```

### Navigation

Single Page App with anchor-based navigation. No React Router. Smooth scroll to `#hero`, `#about`, `#sermons`, `#fellowships`, `#calendar`, `#contact`.

### State Management

Local React `useState` / `useEffect` only — no Redux or Context API. `sessionStorage` is used to track whether the intro animation has already played this session.

---

## CMS Integration Plan

### Why Payload CMS

Payload 3.x was chosen over Strapi for this project:

- **TypeScript-native** — schema is code, not YAML/JSON. Matches this project's typed data model perfectly.
- **Bilingual fields** — Payload's built-in localization supports `en` + `zh` locales at the field level, replacing the manual `{ en, zh }` pattern.
- **Embedded or standalone** — can run inside the same monorepo without a separate database server (SQLite for local, Postgres for production).
- **No license restrictions** — MIT licensed, no commercial tier needed.
- **Payload 3 = Next.js app** — admin UI served from `/cms/admin`, REST API at `/cms/api`, GraphQL at `/cms/api/graphql`.

### Monorepo Layout (target state)

```
GCCC_Website/
├── src/               # React frontend (existing)
├── cms/               # Payload CMS app (new)
│   ├── payload.config.ts
│   ├── collections/
│   └── globals/
└── package.json       # Root workspace (add workspaces field)
```

The frontend fetches content from the Payload REST API (`/api/sermons`, `/api/fellowships`, `/api/globals/site-settings`) at build time (SSG) or runtime.

---

## Payload CMS Schema

### Locales

```typescript
// payload.config.ts
localization: {
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  fallback: true,   // fall back to 'en' if 'zh' is missing
}
```

---

### Collection: `speakers`

Normalized speaker records referenced by sermons.

| Field | Type | Localized | Notes |
|---|---|---|---|
| `name` | text | yes | "Pastor Samuel Cheng" / "鄭牧師" |
| `title` | text | yes | "Senior Pastor" / "主任牧師" |
| `bio` | richText | yes | Optional biography |
| `photo` | upload | no | Headshot image |

---

### Collection: `sermon-series`

Groups of related sermons.

| Field | Type | Localized | Notes |
|---|---|---|---|
| `name` | text | yes | "The Gospel of John" / "約翰福音系列" |
| `description` | richText | yes | Series overview |
| `coverImage` | upload | no | Series artwork |
| `startDate` | date | no | First sermon date |
| `isActive` | checkbox | no | Whether series is ongoing |

---

### Collection: `sermons`

| Field | Type | Localized | Notes |
|---|---|---|---|
| `title` | text | yes | Bilingual sermon title |
| `speaker` | relationship | no | → `speakers` collection |
| `scripture` | text | no | e.g. "John 15:1-8 (約翰福音 15:1-8)" |
| `date` | date | no | YYYY-MM-DD |
| `series` | relationship | no | → `sermon-series` (optional) |
| `youtubeLink` | text | no | Full YouTube embed URL |
| `audioLink` | text | no | MP3 or podcast URL |
| `notes` | richText | yes | Optional sermon notes/outline |
| `thumbnail` | upload | no | Custom thumbnail (fallback: YouTube) |
| `isFeatured` | checkbox | no | Pin to top of archive |

**Access:** public read. Admin write.

---

### Collection: `fellowships`

| Field | Type | Localized | Notes |
|---|---|---|---|
| `name` | text | yes | Fellowship group name |
| `slug` | text | no | URL-safe identifier (auto-generated) |
| `schedule` | text | yes | "Fridays at 7:30 PM" / "每週五晚 7:30" |
| `location` | text | yes | Meeting location |
| `contact` | text | yes | Coordinator name |
| `description` | richText | yes | Full group description |
| `image` | upload | no | Group photo |
| `isFeatured` | checkbox | no | Show as banner/hero card |
| `order` | number | no | Manual display sort order |
| `isActive` | checkbox | no | Hide without deleting |

**Access:** public read. Admin write.

---

### Global: `site-settings`

Singleton document for church-wide configuration (no versioning needed for most fields).

| Field | Type | Localized | Notes |
|---|---|---|---|
| `churchName` | text | yes | Full church name |
| `tagline` | text | yes | Mission statement |
| `welcomeBlurbSubject` | text | yes | "Welcome to Our Family" heading |
| `welcomeBlurbText` | richText | yes | Main welcome paragraph |
| `welcomeHistoryText` | richText | yes | Founding/history paragraph |
| `address` | group | — | Contains `en` + `zh` via localization |
| `phone` | text | no | Church phone |
| `email` | email | no | Church email |
| `youtubeLiveUrl` | text | no | YouTube channel URL |
| `googleCalendarId` | text | no | Calendar embed ID |
| `googleMapsEmbedUrl` | text | no | Maps iframe src |

---

## Migration Plan (data.ts → Payload)

1. Install and configure Payload in `cms/`
2. Define all collections and globals in TypeScript
3. Run `cms/seed/index.ts` to import all existing fixtures from `src/data.ts`
4. Update `src/data.ts` to fetch from Payload REST API instead of hardcoded exports
5. Add a `NEXT_PUBLIC_CMS_URL` / `VITE_CMS_URL` env var pointing at the running Payload instance
6. Remove hardcoded data fixtures after confirming parity

---

## Testing Strategy

### Layers

```
Unit tests (Vitest)          → pure functions, data transforms, utility helpers
Component tests (Vitest)     → React components with @testing-library/react
Integration tests (Vitest)   → API fetch logic against a real Payload test instance
E2E tests (Playwright)       → full browser flows (language toggle, sermon player, fellowship modal)
```

### Unit Tests

- Location: `tests/unit/`
- Runner: Vitest
- Scope: utility functions, data transformers, bilingual string helpers
- Example: `formatSermonDate()`, language fallback logic, scripture reference parser

```bash
npm run test:unit
# Vitest with --run flag for CI
```

### Component Tests

- Location: `tests/unit/components/`
- Runner: Vitest + `@testing-library/react` + `jsdom`
- Scope: render correctness, language switching, modal open/close, intro animation skip
- Key tests:
  - Header renders EN/ZH nav items based on `currentLang`
  - SermonPlayer selects correct sermon on archive click
  - FellowshipGrid opens correct modal for each card
  - GcccIntro skips when `gccc_intro_seen` is in sessionStorage

```bash
npm run test:unit  # includes component tests
```

### Integration Tests

- Location: `tests/integration/`
- Runner: Vitest
- Scope: Payload REST API responses, data shape validation
- Setup: spin up Payload with SQLite in-memory, seed with fixture data, run fetch assertions
- Key tests:
  - `GET /api/sermons` returns expected shape with localized fields
  - `GET /api/fellowships?where[isFeatured][equals]=true` returns campus fellowship
  - `GET /api/globals/site-settings` returns church name in both locales

```bash
npm run test:integration
```

### E2E Tests

- Location: `tests/e2e/`
- Runner: Playwright
- Browsers: Chromium (CI), + Firefox & WebKit (full suite)
- Key flows:
  - Language toggle: EN → ZH changes all visible text
  - Sermon player: click archive item → video/audio updates
  - Fellowship grid: click card → modal appears with correct data
  - "I'm New Here" modal: opens and closes correctly
  - Intro animation: plays on first load, skipped on reload (sessionStorage)
  - Navigation: each header link smooth-scrolls to correct section
  - Contact form: (if added) validates and submits

```bash
npm run test:e2e          # headless
npm run test:e2e -- --ui  # Playwright UI mode
```

### CI Configuration (target)

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    steps:
      - npm ci
      - npm run lint
      - npm run test:unit
      - npm run test:integration
      - npx playwright install --with-deps
      - npm run build
      - npm run test:e2e
```

---

## Environment Variables

| Variable | Used In | Purpose |
|---|---|---|
| `VITE_CMS_URL` | Frontend | Base URL for Payload REST API |
| `PAYLOAD_SECRET` | CMS | JWT signing secret (keep private) |
| `DATABASE_URI` | CMS | Postgres connection string (production) |
| `GEMINI_API_KEY` | Server | Google Gemini AI API key |
| `APP_URL` | Server | Self-referential base URL |

Copy `.env.example` to `.env.local` for local development. Never commit `.env.local`.

---

## Key Design Decisions

- **No React Router** — anchor-scroll SPA is intentional; adding routing requires refactoring `Header.tsx` nav links.
- **Tailwind 4** — uses the new `@theme` directive in `index.css`, not `tailwind.config.js`. Do not add a `tailwind.config.js`.
- **Motion library** — uses the standalone `motion` package (not `framer-motion`). Import from `motion/react`.
- **Bilingual pattern** — before Payload: `{ en: string, zh: string }` objects everywhere. After Payload: Payload's `locale` query param handles this. Keep the frontend `currentLang` → `locale` mapping consistent.
- **Images** — fellowship images mix local assets (`/src/assets/images/`) and placeholder URLs. After CMS integration, all images will be served from Payload's `/media` endpoint.
