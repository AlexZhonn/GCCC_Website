"use client";

import { Language } from "../types";
import { CalendarDays } from "lucide-react";

interface CalendarPageProps {
  currentLang: Language;
}

const GOOGLE_CALENDAR_SRC = "https://calendar.google.com/calendar/embed?src=0iit1vrp7ifu6cf1sn9tsaapek%40group.calendar.google.com&ctz=America%2FNew_York";

export default function CalendarPage({ currentLang }: CalendarPageProps) {
  const t = {
    heading: { en: "Church Calendar", zh: "教會行事曆" },
    sub: {
      en: "Stay up to date with upcoming services, events, and gatherings.",
      zh: "掌握教會主日崇拜、各項活動及聚會的最新行程安排。",
    },
    placeholder: {
      en: "Google Calendar will appear here.",
      zh: "Google 日曆即將嵌入此處。",
    },
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#33271E] mb-3">
        {t.heading[currentLang]}
      </h1>
      <p className="text-base text-[#6F685B] font-serif mb-12">
        {t.sub[currentLang]}
      </p>

      <div className="w-full rounded-2xl overflow-hidden border border-black/8 shadow-sm bg-white min-h-150">
        {GOOGLE_CALENDAR_SRC ? (
          <iframe
            src={GOOGLE_CALENDAR_SRC}
            title={t.heading[currentLang]}
            className="w-full h-full min-h-150"
            frameBorder="0"
            scrolling="no"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-150 gap-4 text-[#6F685B]">
            <CalendarDays className="w-12 h-12 opacity-20" />
            <p className="text-sm font-serif opacity-50">
              {t.placeholder[currentLang]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
