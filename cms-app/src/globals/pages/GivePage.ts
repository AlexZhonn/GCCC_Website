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

export const GivePageGlobal: GlobalConfig = {
  slug: "page-give",
  label: "Give Page",
  admin: {
    group: "Pages",
  },
  access: { read: () => true },
  fields: [
    localText("heading", "Page Heading"),
    localText("subheading", "Subheading"),
    {
      name: "methods",
      type: "array",
      label: "Giving Methods",
      fields: [
        localText("icon", "Icon key (zelle | mail | inPerson)"),
        localText("title", "Method Title", true),
        localRich("description", "Description"),
        localText("detail", "Detail line (e.g. address or time)"),
      ],
    },
    localRich("taxNote", "501(c)(3) Tax Note"),
    localRich("scripture", "Scripture Quote"),
  ],
};
