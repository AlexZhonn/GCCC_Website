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

export const AnnouncementsPageGlobal: GlobalConfig = {
  slug: "page-announcements",
  label: "Announcements Page",
  admin: {
    group: "Pages",
  },
  access: { read: () => true },
  fields: [
    localText("heading", "Page Heading"),
    localText("subheading", "Page Subheading"),
    {
      name: "items",
      type: "array",
      label: "Announcements",
      fields: [
        { name: "date", type: "date" as const, label: "Date", required: true },
        localText("title", "Title", true),
        localRich("body", "Body"),
      ],
    },
  ],
};
