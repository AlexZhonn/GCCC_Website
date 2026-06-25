export type Language = "en" | "zh";

export type Page =
  | "home"
  | "about"
  | "sermons"
  | "fellowships"
  | "calendar"
  | "contact"
  | "give"
  | "announcements"
  | "prayer"
  | "gainesville-dew"
  | "leadership";

export type MinistryCategory =
  | "kids"
  | "youth"
  | "college"
  | "adults"
  | "senior-adults"
  | "discipleship";

export interface MinistryCategoryInfo {
  id: MinistryCategory;
  label: { [key in Language]: string };
  ageRange: { [key in Language]: string };
  description: { [key in Language]: string };
  bannerImageUrl: string;
  color: string; // accent color class
}

export interface Leader {
  id: string;
  name: { [key in Language]: string };
  title: { [key in Language]: string };
  bio?: { [key in Language]: string };
  imageUrl?: string;
  email?: string;
}

export interface SiteSettings {
  churchName: { [key in Language]: string };
  tagline: { [key in Language]: string };
  welcomeBlurbSubject: { [key in Language]: string };
  welcomeBlurbText: { [key in Language]: string };
  welcomeHistoryText: { [key in Language]: string };
  address: { [key in Language]: string };
  phone: string;
  email: string;
  pastor: { name: string; email: string; cell: string };
  youtubeLiveUrl: string;
}

export interface Sermon {
  id: string;
  title: { [key in Language]: string };
  speaker: { [key in Language]: string };
  scripture: string;
  date: string;
  series?: { [key in Language]: string };
  youtubeLink?: string;
  englishYoutubeLink?: string;
}

export interface Activity {
  id: string;
  fellowship: { [key in Language]: string };
  title: { [key in Language]: string };
  description?: { [key in Language]: string };
  date: string; // YYYY-MM-DD
  time?: string; // e.g. "6:30 PM"
  location?: { [key in Language]: string };
  photos: string[]; // first photo is the hero
}

export interface Fellowship {
  id: string;
  name: { [key in Language]: string };
  schedule: { [key in Language]: string };
  location: { [key in Language]: string };
  contact: { [key in Language]: string };
  description: { [key in Language]: string };
  imageUrl: string;
  isFeatured?: boolean;
  instagramUrl?: string;
  ministryCategory?: MinistryCategory;
}
