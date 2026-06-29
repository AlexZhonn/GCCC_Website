/**
 * src/gccc/lib/cms.ts
 *
 * All Payload REST API calls live here. Components import typed helpers and
 * never construct URLs or fetch directly.
 *
 * When data is missing from the CMS, functions return null (or empty arrays)
 * and the caller renders a "Not available" placeholder — no hardcoded fallbacks.
 */

import { Language } from "../types";

const CMS_URL =
  typeof window !== "undefined"
    ? // client: same origin (cms-app serves both admin and frontend)
      ""
    : // server: explicit env var or localhost
      (process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001");

// ─── Generic fetcher ─────────────────────────────────────────────────────────

async function cmsGet<T>(
  path: string,
  locale: Language,
  params: Record<string, string> = {},
): Promise<T | null> {
  // Build query string manually so we can use a relative path on the client
  const qs = new URLSearchParams({ locale, fallbackLocale: "en", ...params });
  const href = `${CMS_URL}/api${path}?${qs.toString()}`;

  try {
    const res = await fetch(href, {
      // Next.js: don't cache in dev, ISR-friendly in prod
      next: { revalidate: 60 },
    } as RequestInit);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ─── Types mirroring Payload responses ───────────────────────────────────────

export interface CmsMediaDoc {
  id: string;
  url?: string;
  filename?: string;
  alt?: string;
  width?: number;
  height?: number;
}

// ── Block shapes (each blockType matches the slug in Pages.ts) ───────────────

export interface HeroBlockData {
  blockType: "hero";
  backgroundImage?: CmsMediaDoc;
  eyebrow?: string;
  heading: string;
  subheading?: string;
}

export interface ScheduleItem {
  id?: string;
  time: string;
  label: string;
  sub?: string;
}

export interface SundayServiceBlockData {
  blockType: "sundayService";
  image?: CmsMediaDoc;
  eyebrow?: string;
  heading: string;
  body?: unknown; // Lexical rich text
  scheduleItems?: ScheduleItem[];
  watchLiveUrl?: string;
  watchLiveLabel?: string;
  findUsLabel?: string;
  addressLine?: string;
}

export interface PrayerFeatureBlockData {
  blockType: "prayerFeature";
  image?: CmsMediaDoc;
  eyebrow?: string;
  heading: string;
  body?: unknown;
  ctaLabel?: string;
}

export interface DirectionItem {
  id?: string;
  icon?: string;
  label: string;
}

export interface CampusFocusBlockData {
  blockType: "campusFocus";
  sectionTitle: string;
  sectionDesc?: string;
  directionsTitle?: string;
  directionItems?: DirectionItem[];
}

export interface ActivityPhoto {
  photo?: CmsMediaDoc;
}

export interface LegacyPhotoPath {
  path: string;
}

export interface ActivityItem {
  id?: string;
  fellowship?: string;
  title: string;
  dateLabel?: string;
  description?: unknown;
  photos?: ActivityPhoto[];
  legacyPhotoPaths?: LegacyPhotoPath[];
}

export interface ActivitiesBlockData {
  blockType: "activities";
  heading: string;
  items?: ActivityItem[];
}

export interface DocumentItem {
  id?: string;
  label: string;
  year?: string;
  description?: string;
  file?: CmsMediaDoc;
  legacyPdfPath?: string;
}

export interface ChurchHistoryBlockData {
  blockType: "churchHistory";
  churchPortrait?: CmsMediaDoc;
  proclamationOfFaith?: unknown;
  historyHeading?: string;
  historyBody?: unknown;
  documents?: DocumentItem[];
}

export interface RichTextBlockData {
  blockType: "richText";
  heading?: string;
  body?: unknown;
}

export interface AnnouncementItem {
  id?: string;
  date: string;
  title: string;
  body?: unknown;
}

export interface AnnouncementsBlockData {
  blockType: "announcementsList";
  heading?: string;
  subheading?: string;
  items?: AnnouncementItem[];
}

export interface NewsletterIssue {
  id?: string;
  title: string;
  date: string;
  description?: string;
  file?: CmsMediaDoc;
  legacyPdfPath?: string;
}

export interface NewsletterBlockData {
  blockType: "newsletter";
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  issues?: NewsletterIssue[];
}

export interface GiveMethod {
  id?: string;
  icon?: string;
  title: string;
  description?: unknown;
  detail?: string;
}

export interface GiveBlockData {
  blockType: "give";
  heading?: string;
  subheading?: string;
  methods?: GiveMethod[];
  taxNote?: unknown;
  scripture?: unknown;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer?: unknown;
}

export interface VisitorFaqBlockData {
  blockType: "visitorFaq";
  modalTitle: string;
  modalSubtitle?: string;
  introText?: unknown;
  faqs?: FaqItem[];
  closingNote?: string;
  closeButtonLabel?: string;
}

export interface FooterLink {
  id?: string;
  label: string;
  page?: string;
}

export interface FooterBlockData {
  blockType: "footer";
  worshipTimesLine?: string;
  instagramUrl?: string;
  whoWeAreLinks?: FooterLink[];
  getConnectedLinks?: FooterLink[];
}

export type PageBlock =
  | HeroBlockData
  | SundayServiceBlockData
  | PrayerFeatureBlockData
  | CampusFocusBlockData
  | ActivitiesBlockData
  | ChurchHistoryBlockData
  | RichTextBlockData
  | AnnouncementsBlockData
  | NewsletterBlockData
  | GiveBlockData
  | VisitorFaqBlockData
  | FooterBlockData;

export interface CmsPageDoc {
  id: string;
  slug: string;
  title?: string;
  blocks?: PageBlock[];
}

// ─── Page Global shapes ───────────────────────────────────────────────────────

export interface HomePageGlobalDoc {
  hero?: { backgroundImage?: CmsMediaDoc; eyebrow?: string; heading?: string; subheading?: string };
  sundayService?: {
    image?: CmsMediaDoc; eyebrow?: string; heading?: string; body?: unknown;
    scheduleItems?: ScheduleItem[]; watchLiveUrl?: string; watchLiveLabel?: string;
    findUsLabel?: string; addressLine?: string;
  };
  prayerFeature?: { image?: CmsMediaDoc; eyebrow?: string; heading?: string; body?: unknown; ctaLabel?: string };
  campusFocus?: { sectionTitle?: string; sectionDesc?: string; directionsTitle?: string; directionItems?: DirectionItem[] };
  activities?: { heading?: string; items?: ActivityItem[] };
}

export interface AboutPageGlobalDoc {
  hero?: { backgroundImage?: CmsMediaDoc; eyebrow?: string; heading?: string };
  churchHistory?: {
    churchPortrait?: CmsMediaDoc; proclamationOfFaith?: unknown;
    historyHeading?: string; historyBody?: unknown; documents?: DocumentItem[];
  };
}

export interface AnnouncementsPageGlobalDoc {
  heading?: string;
  subheading?: string;
  items?: AnnouncementItem[];
}

export interface GivePageGlobalDoc {
  heading?: string;
  subheading?: string;
  methods?: GiveMethod[];
  taxNote?: unknown;
  scripture?: unknown;
}

export interface GainsvilleDewPageGlobalDoc {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  issues?: NewsletterIssue[];
}

export interface FellowshipsPageGlobalDoc {
  hero?: { backgroundImage?: CmsMediaDoc; heading?: string; subtitle?: string; learnMoreLabel?: string };
}

export interface LeadershipPageGlobalDoc {
  hero?: { backgroundImage?: CmsMediaDoc; eyebrow?: string; heading?: string };
  introParagraph?: string;
}

export interface ContactPageGlobalDoc {
  hero?: { backgroundImage?: CmsMediaDoc; heading?: string; subheading?: string };
  form?: { sectionHeading?: string; submitLabel?: string; successMessage?: string };
}

// ─── SiteSettings ─────────────────────────────────────────────────────────────

export interface CmsSiteSettings {
  churchName?: string;
  tagline?: string;
  welcomeBlurbSubject?: string;
  welcomeBlurbText?: unknown;
  welcomeHistoryText?: unknown;
  address?: string;
  phone?: string;
  email?: string;
  pastor?: { name?: string; email?: string; cell?: string };
  youtubeLiveUrl?: string;
  googleCalendarId?: string;
  googleMapsEmbedUrl?: string;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch a single page document by slug from the Pages collection. */
export async function fetchPage(
  slug: string,
  locale: Language,
): Promise<CmsPageDoc | null> {
  const data = await cmsGet<{ docs: CmsPageDoc[]; totalDocs: number }>(
    "/pages",
    locale,
    { "where[slug][equals]": slug, limit: "1", depth: "2" },
  );
  return data?.docs?.[0] ?? null;
}

/**
 * Fetch a dedicated page global by its slug (e.g. "page-home", "page-about").
 * Returns the raw document so each page component can type it as needed.
 */
export async function fetchPageGlobal<T = Record<string, unknown>>(
  globalSlug: string,
  locale: Language,
): Promise<T | null> {
  return cmsGet<T>(`/globals/${globalSlug}`, locale, { depth: "2" });
}

/** Convenience: find the first block of a given blockType on a page. */
export function findBlock<T extends PageBlock>(
  page: CmsPageDoc | null,
  blockType: T["blockType"],
): T | null {
  if (!page?.blocks) return null;
  return (page.blocks.find((b) => b.blockType === blockType) as T) ?? null;
}

/** Find all blocks of a given blockType. */
export function findBlocks<T extends PageBlock>(
  page: CmsPageDoc | null,
  blockType: T["blockType"],
): T[] {
  if (!page?.blocks) return [];
  return page.blocks.filter((b) => b.blockType === blockType) as T[];
}

/** Fetch the SiteSettings global. */
export async function fetchSiteSettings(
  locale: Language,
): Promise<CmsSiteSettings | null> {
  return cmsGet<CmsSiteSettings>("/globals/site-settings", locale, {
    depth: "1",
  });
}

/** Resolve a media doc URL — returns null if the doc or url is absent. */
export function mediaUrl(doc?: CmsMediaDoc | null): string | null {
  if (!doc?.url) return null;
  // Payload returns absolute URLs when storage is remote, relative when local.
  if (doc.url.startsWith("http")) return doc.url;
  return `${CMS_URL}${doc.url}`;
}
