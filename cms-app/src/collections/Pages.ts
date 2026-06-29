import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

// ─── Reusable localised text field ───────────────────────────────────────────
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

// ─── Blocks ──────────────────────────────────────────────────────────────────

/** Hero banner with background image and headline */
const HeroBlock = {
  slug: "hero",
  labels: { singular: "Hero Banner", plural: "Hero Banners" },
  fields: [
    {
      name: "backgroundImage",
      type: "upload" as const,
      relationTo: "media" as const,
      label: "Background Image",
    },
    localText("eyebrow", "Eyebrow label (small text above heading)"),
    localText("heading", "Heading", true),
    localText("subheading", "Subheading / schedule line"),
  ],
};

/** Sunday service info card */
const SundayServiceBlock = {
  slug: "sundayService",
  labels: { singular: "Sunday Service Card", plural: "Sunday Service Cards" },
  fields: [
    {
      name: "image",
      type: "upload" as const,
      relationTo: "media" as const,
      label: "Panel Image",
    },
    localText("eyebrow", "Eyebrow (small label)"),
    localText("heading", "Heading", true),
    localRich("body", "Body paragraph"),
    {
      name: "scheduleItems",
      type: "array" as const,
      label: "Schedule Items",
      fields: [
        localText("time", "Time", true),
        localText("label", "Label", true),
        localText("sub", "Sub-label"),
      ],
    },
    localText("watchLiveUrl", "Watch Live URL (YouTube)"),
    localText("watchLiveLabel", "Watch Live button label"),
    localText("findUsLabel", "Find Us button label"),
    localText("addressLine", "Address display line"),
  ],
};

/** Prayer requests feature card */
const PrayerFeatureBlock = {
  slug: "prayerFeature",
  labels: { singular: "Prayer Feature Card", plural: "Prayer Feature Cards" },
  fields: [
    {
      name: "image",
      type: "upload" as const,
      relationTo: "media" as const,
      label: "Panel Image",
    },
    localText("eyebrow", "Eyebrow"),
    localText("heading", "Heading", true),
    localRich("body", "Body paragraph"),
    localText("ctaLabel", "Button label"),
  ],
};

/** UF / campus-focus section */
const CampusFocusBlock = {
  slug: "campusFocus",
  labels: { singular: "Campus Focus Section", plural: "Campus Focus Sections" },
  fields: [
    localText("sectionTitle", "Section Title", true),
    localText("sectionDesc", "Section Description"),
    localText("directionsTitle", "Directions heading"),
    {
      name: "directionItems",
      type: "array" as const,
      label: "Direction items (walk / bus / car etc.)",
      fields: [
        localText("icon", "Icon key (walk | bus | car)"),
        localText("label", "Label", true),
      ],
    },
  ],
};

/** Activities / recent events section */
const ActivitiesBlock = {
  slug: "activities",
  labels: { singular: "Activities Section", plural: "Activities Sections" },
  fields: [
    localText("heading", "Section Heading", true),
    {
      name: "items",
      type: "array" as const,
      label: "Activity Cards",
      fields: [
        localText("fellowship", "Fellowship name (e.g. Alpha Fellowship)"),
        localText("title", "Activity title", true),
        localText("dateLabel", "Date label (e.g. Jun 2025)"),
        localRich("description", "Description"),
        {
          name: "photos",
          type: "array" as const,
          label: "Photos",
          fields: [
            {
              name: "photo",
              type: "upload" as const,
              relationTo: "media" as const,
              required: true,
            },
          ],
        },
        // Fallback for legacy local paths (will be deprecated once media uploads are used)
        {
          name: "legacyPhotoPaths",
          type: "array" as const,
          label: "Legacy photo paths (temporary — use Photos above instead)",
          fields: [{ name: "path", type: "text" as const }],
          admin: { description: "Only used while migrating images to the media library." },
        },
      ],
    },
  ],
};

/** About / church history section */
const ChurchHistoryBlock = {
  slug: "churchHistory",
  labels: { singular: "Church History Section", plural: "Church History Sections" },
  fields: [
    {
      name: "churchPortrait",
      type: "upload" as const,
      relationTo: "media" as const,
      label: "Church Portrait Photo",
    },
    localRich("proclamationOfFaith", "Proclamation of Faith"),
    localText("historyHeading", "History Section Heading"),
    localRich("historyBody", "Church History Body"),
    {
      name: "documents",
      type: "array" as const,
      label: "Downloadable Documents (e.g. commemorative issues)",
      fields: [
        localText("label", "Document label", true),
        localText("year", "Year"),
        localText("description", "Short description"),
        {
          name: "file",
          type: "upload" as const,
          relationTo: "media" as const,
          label: "PDF File",
        },
        // Fallback for PDFs not yet in media library
        { name: "legacyPdfPath", type: "text" as const, label: "Legacy PDF path (e.g. /pdfs/20th_anniversary.pdf)" },
      ],
    },
  ],
};

/** Simple rich-text content block */
const RichTextBlock = {
  slug: "richText",
  labels: { singular: "Rich Text Block", plural: "Rich Text Blocks" },
  fields: [
    localText("heading", "Optional heading"),
    localRich("body", "Body content"),
  ],
};

/** Hardcoded announcements list */
const AnnouncementsBlock = {
  slug: "announcementsList",
  labels: { singular: "Announcements List", plural: "Announcements Lists" },
  fields: [
    localText("heading", "Page Heading"),
    localText("subheading", "Page subheading"),
    {
      name: "items",
      type: "array" as const,
      label: "Announcements",
      fields: [
        { name: "date", type: "date" as const, label: "Date", required: true },
        localText("title", "Title", true),
        localRich("body", "Body"),
      ],
    },
  ],
};

/** Newsletter (Gainesville Dew) issues */
const NewsletterBlock = {
  slug: "newsletter",
  labels: { singular: "Newsletter Issues List", plural: "Newsletter Issues Lists" },
  fields: [
    localText("eyebrow", "Eyebrow (e.g. Newsletter)"),
    localText("heading", "Page Heading"),
    localText("subheading", "Page subheading"),
    {
      name: "issues",
      type: "array" as const,
      label: "Issues",
      fields: [
        localText("title", "Title", true),
        { name: "date", type: "date" as const, label: "Date", required: true },
        localText("description", "Short description"),
        {
          name: "file",
          type: "upload" as const,
          relationTo: "media" as const,
          label: "PDF File",
        },
        { name: "legacyPdfPath", type: "text" as const, label: "Legacy PDF path" },
      ],
    },
  ],
};

/** Give / Offering page content */
const GiveBlock = {
  slug: "give",
  labels: { singular: "Give Page Content", plural: "Give Page Content" },
  fields: [
    localText("heading", "Page Heading"),
    localText("subheading", "Subheading"),
    {
      name: "methods",
      type: "array" as const,
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

/** Visitor modal / new-here FAQ */
const VisitorFaqBlock = {
  slug: "visitorFaq",
  labels: { singular: "Visitor FAQ (New Here Modal)", plural: "Visitor FAQ Blocks" },
  fields: [
    localText("modalTitle", "Modal Title", true),
    localText("modalSubtitle", "Modal Subtitle"),
    localRich("introText", "Intro paragraph inside modal"),
    {
      name: "faqs",
      type: "array" as const,
      label: "FAQ Items",
      fields: [
        localText("question", "Question", true),
        localRich("answer", "Answer"),
      ],
    },
    localText("closingNote", "Closing note (dress code etc.)"),
    localText("closeButtonLabel", "Close button label"),
  ],
};

/** Footer content */
const FooterBlock = {
  slug: "footer",
  labels: { singular: "Footer Content", plural: "Footer Content" },
  fields: [
    localText("worshipTimesLine", "Worship times line (center text)"),
    localText("instagramUrl", "Instagram URL"),
    {
      name: "whoWeAreLinks",
      type: "array" as const,
      label: "Who We Are column links",
      fields: [
        localText("label", "Label", true),
        { name: "page", type: "text" as const, label: "Page key (home | about | fellowships | announcements …)" },
      ],
    },
    {
      name: "getConnectedLinks",
      type: "array" as const,
      label: "Get Connected column links",
      fields: [
        localText("label", "Label", true),
        { name: "page", type: "text" as const, label: "Page key" },
      ],
    },
  ],
};

// ─── Collection ───────────────────────────────────────────────────────────────

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    useAsTitle: "slug",
    defaultColumns: ["slug", "title", "updatedAt"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "URL key for this page. Use: home | about | fellowships | sermons | calendar | contact | give | announcements | prayer | gainesville-dew | leadership",
      },
    },
    localText("title", "Page Title (internal label)"),
    {
      name: "blocks",
      type: "blocks",
      label: "Content Blocks",
      blocks: [
        HeroBlock,
        SundayServiceBlock,
        PrayerFeatureBlock,
        CampusFocusBlock,
        ActivitiesBlock,
        ChurchHistoryBlock,
        RichTextBlock,
        AnnouncementsBlock,
        NewsletterBlock,
        GiveBlock,
        VisitorFaqBlock,
        FooterBlock,
      ],
    },
  ],
};
