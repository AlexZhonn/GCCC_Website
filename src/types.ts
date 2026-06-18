export type Language = 'en' | 'zh';

export interface SiteSettings {
  churchName: { [key in Language]: string };
  tagline: { [key in Language]: string };
  welcomeBlurbSubject: { [key in Language]: string };
  welcomeBlurbText: { [key in Language]: string };
  welcomeHistoryText: { [key in Language]: string };
  address: { [key in Language]: string };
  phone: string;
  email: string;
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
  audioLink?: string;
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
}
