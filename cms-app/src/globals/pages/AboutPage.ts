import type { GlobalConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const localText = (name: string, label?: string, required = false) => ({
  name,
  type: "text" as const,
  label: label ?? name,
  localized: true,
  required,
});

const localRich = (name: string, label?: string) => ({
  name,
  type: "richText" as const,
  label: label ?? name,
  localized: true,
  editor: lexicalEditor({}),
});

export const AboutPageGlobal: GlobalConfig = {
  slug: "page-about",
  label: "About Page",
  admin: {
    group: "Pages",
  },
  access: { read: () => true },
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    {
      name: "hero",
      type: "group",
      label: "Hero Banner",
      fields: [
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media" as const,
          label: "Background Image",
        },
        localText("eyebrow", "Eyebrow (small text above heading)"),
        localText("heading", "Heading", true),
      ],
    },

    // ── Church History ───────────────────────────────────────────────────────
    {
      name: "churchHistory",
      type: "group",
      label: "Church History Section",
      fields: [
        {
          name: "churchPortrait",
          type: "upload",
          relationTo: "media" as const,
          label: "Church Portrait Photo",
        },
        localRich("proclamationOfFaith", "Proclamation of Faith"),
        localText("historyHeading", "History Section Heading"),
        localRich("historyBody", "Church History Body"),
        {
          name: "documents",
          type: "array",
          label: "Downloadable Documents (e.g. commemorative issues)",
          fields: [
            localText("label", "Document label", true),
            localText("year", "Year"),
            localText("description", "Short description"),
            {
              name: "file",
              type: "upload",
              relationTo: "media" as const,
              label: "PDF File",
            },
            {
              name: "legacyPdfPath",
              type: "text" as const,
              label: "Legacy PDF path (e.g. /pdfs/20th_anniversary.pdf)",
            },
          ],
        },
      ],
    },
  ],
};
