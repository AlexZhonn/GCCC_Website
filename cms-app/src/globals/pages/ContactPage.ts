import type { GlobalConfig } from "payload";

const localText = (name: string, label?: string, required = false) => ({
  name,
  type: "text" as const,
  label: label ?? name,
  localized: true,
  required,
});

export const ContactPageGlobal: GlobalConfig = {
  slug: "page-contact",
  label: "Contact Page",
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
        localText("subheading", "Subheading"),
      ],
    },

    // ── Connect form labels ──────────────────────────────────────────────────
    {
      name: "form",
      type: "group",
      label: "Connect Form Labels",
      admin: { description: "Override default EN/ZH labels on the visitor connect form." },
      fields: [
        localText("sectionHeading", "Section heading (e.g. \"Connect With Us\")"),
        localText("submitLabel", "Submit button label"),
        localText("successMessage", "Success message after submit"),
      ],
    },
  ],
};
