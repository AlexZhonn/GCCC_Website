"use client";

import { Language } from "../types";

interface AnnouncementsPageProps {
  currentLang: Language;
}

const announcements: {
  id: string;
  date: string;
  title: { en: string; zh: string };
  body: { en: string; zh: string };
}[] = [
  {
    id: "1",
    date: "2026-06-22",
    title: {
      en: "Sunday Worship — 10:50 AM",
      zh: "主日崇拜 — 上午 10:50",
    },
    body: {
      en: "Join us every Sunday at 10:50 AM for bilingual worship. A complimentary fellowship lunch follows at 12:15 PM.",
      zh: "歡迎每週日上午 10:50 蒞臨參與雙語崇拜，崇拜結束後（下午 12:15）備有愛宴，歡迎留下共享。",
    },
  },
  {
    id: "2",
    date: "2026-06-20",
    title: {
      en: "Friday Student & Scholar Dinner — 6:30 PM",
      zh: "週五學生學者愛宴 — 下午 6:30",
    },
    body: {
      en: "No sign-up required. Come as you are! Dinner is served in the Fellowship Hall every Friday evening at 6:30 PM.",
      zh: "無需預約，歡迎隨時前來！每週五晚 6:30 於副堂供應家常愛宴，我們期待與您相聚。",
    },
  },
];

export default function AnnouncementsPage({
  currentLang,
}: AnnouncementsPageProps) {
  const t = {
    announcementsHeading: { en: "Announcements", zh: "教會公告" },
    announcementsSub: {
      en: "Stay up to date with the latest news from GCCC.",
      zh: "掌握甘城華人教會最新消息與活動資訊。",
    },
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#33271E] mb-3">
        {t.announcementsHeading[currentLang]}
      </h1>
      <p className="text-base text-[#6F685B] font-serif mb-10">
        {t.announcementsSub[currentLang]}
      </p>

      <div className="space-y-5">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-black/8 shadow-sm p-6 md:p-8"
          >
            <span className="text-[10px] font-mono tracking-widest text-[#9A2B27] uppercase font-semibold">
              {new Date(item.date).toLocaleDateString(
                currentLang === "zh" ? "zh-TW" : "en-US",
                { year: "numeric", month: "long", day: "numeric" },
              )}
            </span>
            <h2 className="font-serif text-xl font-bold text-[#33271E] mt-2 mb-3">
              {item.title[currentLang]}
            </h2>
            <p className="text-sm text-[#6F685B] font-serif leading-relaxed">
              {item.body[currentLang]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
