/**
 * src/gccc/data.ts
 *
 * All content is now managed via Payload CMS.
 * This file is kept as a thin re-export shim so any remaining import
 * sites compile without errors while the migration is in progress.
 *
 * Do NOT add hardcoded data here — edit content in the CMS admin at /admin.
 */

export type {
  Sermon,
  Fellowship,
  SiteSettings,
  Activity,
  Leader,
  MinistryCategoryInfo,
} from "./types";
