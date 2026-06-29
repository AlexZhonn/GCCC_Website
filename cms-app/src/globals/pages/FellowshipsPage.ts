import type { GlobalConfig } from "payload";

const localText = (name: string, label?: string, required = false) => ({
  name,
  type: "text" as const,
  label: label ?? name,
  localized: true,
  required,
});

export const FellowshipsPageGlobal: GlobalConfig = {
  slug: "page-fellowships",
  label: "Fellowships / Ministries Page",
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
        localText("heading", "Heading", true),
        localText("subtitle", "Subtitle"),
        localText("learnMoreLabel", "\"Learn More\" button label"),
      ],
    },
  ],
};
