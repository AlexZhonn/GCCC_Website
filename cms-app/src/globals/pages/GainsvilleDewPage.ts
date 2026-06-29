import type { GlobalConfig } from "payload";

const localText = (name: string, label?: string, required = false) => ({
  name,
  type: "text" as const,
  label: label ?? name,
  localized: true,
  required,
});

export const GainsvilleDewPageGlobal: GlobalConfig = {
  slug: "page-gainesville-dew",
  label: "Gainesville Dew (Newsletter)",
  admin: {
    group: "Pages",
  },
  access: { read: () => true },
  fields: [
    localText("eyebrow", "Eyebrow (e.g. Newsletter)"),
    localText("heading", "Page Heading"),
    localText("subheading", "Page Subheading"),
    {
      name: "issues",
      type: "array",
      label: "Newsletter Issues",
      fields: [
        localText("title", "Title", true),
        { name: "date", type: "date" as const, label: "Date", required: true },
        localText("description", "Short description"),
        {
          name: "file",
          type: "upload",
          relationTo: "media" as const,
          label: "PDF File",
        },
        { name: "legacyPdfPath", type: "text" as const, label: "Legacy PDF path" },
      ],
    },
  ],
};
