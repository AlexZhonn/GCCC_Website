import type { GlobalConfig } from "payload";

const localText = (name: string, label?: string, required = false) => ({
  name,
  type: "text" as const,
  label: label ?? name,
  localized: true,
  required,
});

export const LeadershipPageGlobal: GlobalConfig = {
  slug: "page-leadership",
  label: "Leadership Page",
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

    // ── Intro copy ───────────────────────────────────────────────────────────
    localText("introParagraph", "Intro paragraph (shown below the grid heading)"),
  ],
};
