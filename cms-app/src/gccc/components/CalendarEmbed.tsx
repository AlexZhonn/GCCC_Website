"use client";

import { useState } from "react";
import { Language } from "../types";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface CalendarEmbedProps {
  currentLang: Language;
}

export default function CalendarEmbed({ currentLang }: CalendarEmbedProps) {
  const [activeTab, setActiveTab] = useState<"agenda" | "iframe">("agenda");

  // GCCC Canonical events list (Sunday School 9:30 AM, Worship Service 10:50 AM)
  const regularSchedules = [
    {
      title: {
        en: "Adult and Children Sunday School",
        zh: "主日學 (成人、青少年及兒童)",
      },
      time: { en: "Every Sunday at 9:30 AM", zh: "每週日上午 9:30 - 10:30" },
      room: { en: "Classrooms & Fellowship Halls", zh: "各小班教室及副堂" },
      desc: {
        en: "Interactive classes to study scriptures, theology, and discipleship suitable for all age brackets.",
        zh: "專為不同靈命階段設計的小組學堂，涵蓋聖經查考、神學初探與生活實踐。",
      },
      category: "discipleship",
    },
    {
      title: { en: "Bilingual Joint Sunday Worship", zh: "主日聯合崇拜" },
      time: { en: "Every Sunday at 10:50 AM", zh: "每週日上午 10:50 - 12:15" },
      room: {
        en: "Main Sanctuary & Online YouTube Live",
        zh: "教會大禮拜堂 及 官方YouTube直播",
      },
      desc: {
        en: "Our core corporate praise, biblical sermon delivery, Communion, and heartfelt fellowship.",
        zh: "甘城全體會眾合一頌揚基督、領受主言、聖餐擘餅並共享愛宴的重要崇拜。",
      },
      category: "worship",
    },
    {
      title: {
        en: "Friday Fellowship & Bible Studies",
        zh: "週五團契查經與學子愛宴",
      },
      time: {
        en: "Every Friday at 7:30 PM (Dinner at 6:30 PM)",
        zh: "每週五晚 7:30 (傍晚 6:30 愛宴)",
      },
      room: { en: "Entire Church Complex", zh: "教堂大樓各區小組教室" },
      desc: {
        en: "Specialized student food fellowships and cross-generational Bible study discussion rings.",
        zh: "最溫馨的週末補給站。備有家常菜餚，隨後依年齡和小組查經相交。",
      },
      category: "fellowship",
    },
    {
      title: { en: "Weekly Church Prayer Meeting", zh: "每週三守望禱告會" },
      time: { en: "Every Wednesday at 8:00 PM", zh: "每週三晚 8:00 - 9:00" },
      room: { en: "Chapel & Zoom Room Sync", zh: "教堂副堂 及 遠端雲端雲聚" },
      desc: {
        en: "Intercessions for global missionaries, local communities, sickness, and spiritual growth.",
        zh: "為普世福傳、甘城當地復興、生病肢體及個人靈性成長代求守望。",
      },
      category: "prayer",
    },
  ];

  const t = {
    title: { en: "Church Schedule & Calendar", zh: "聚會日程與大日曆" },
    sub: {
      en: "Join Us Throughout the Week",
      zh: "在豐富的聚會日程中經歷主恩隨時相伴",
    },
    tabAgenda: { en: "Weekly Core Schedule", zh: "每週恆常聚會表" },
    tabIframe: {
      en: "Complete Google Calendar",
      zh: "完整 Google Calendar 互動日曆",
    },
    gcalDesc: {
      en: "This calendar tracks all upcoming church events, special retreats, and missions conferences.",
      zh: "日曆中收錄了教會近期所有特別培靈會、聯合宣教大會、特別洗禮及假期活動安排。",
    },
    openWindow: {
      en: "Open Google Calendar in New Tab",
      zh: "在新分頁中打開谷歌大日曆",
    },
  };

  // Google Calendar GCCC FL public embed link
  const gcalEmbedUrl =
    "https://calendar.google.com/calendar/embed?src=0iit1vrp7ifu6cf1sn9tsaapek%40group.calendar.google.com&ctz=America%2FNew_York";
  const gcalPublicUrl =
    "https://calendar.google.com/calendar/r?src=0iit1vrp7ifu6cf1sn9tsaapek%40group.calendar.google.com&ctz=America%2FNew_York";

  return (
    <div
      className="bg-[#FBFBF7] rounded-2xl border border-[#E7B7A0]/30 shadow-lg p-6 md:p-8"
      id="calendar_embed_section"
    >
      {/* Tab controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7B7A0]/20 pb-6 mb-6">
        <div>
          <h4 className="font-serif text-2xl text-[#33271E] font-bold tracking-tight">
            {t.title[currentLang]}
          </h4>
          <p className="text-xs text-[#6F685B] font-mono uppercase tracking-wider mt-1">
            {t.sub[currentLang]}
          </p>
        </div>

        <div className="flex bg-[#E7B7A0]/10 p-1 rounded-lg border border-[#E7B7A0]/20 self-start">
          <button
            onClick={() => setActiveTab("agenda")}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-md transition-all ${
              activeTab === "agenda"
                ? "bg-[#9A2B27] text-white shadow"
                : "text-[#6F685B] hover:text-[#9A2B27]"
            }`}
          >
            <Clock className="w-4 h-4" />
            {t.tabAgenda[currentLang]}
          </button>
          <button
            onClick={() => setActiveTab("iframe")}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-md transition-all ${
              activeTab === "iframe"
                ? "bg-[#9A2B27] text-white shadow"
                : "text-[#6F685B] hover:text-[#9A2B27]"
            }`}
          >
            <Calendar className="w-4 h-4" />
            {t.tabIframe[currentLang]}
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === "agenda" ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          id="schedule-cards-grid"
        >
          {regularSchedules.map((sched, idx) => {
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-[#E7B7A0]/20 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9A2B27]" />
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#9A2B27] font-bold">
                      {sched.category}
                    </span>
                  </div>

                  <h5 className="font-serif text-base font-bold text-[#33271E] leading-snug">
                    {sched.title[currentLang]}
                  </h5>
                  <p className="font-sans text-xs text-[#6F685B] mt-2 line-clamp-2 leading-relaxed">
                    {sched.desc[currentLang]}
                  </p>
                </div>

                <div className="border-t border-[#E7B7A0]/10 pt-4 mt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-[#33271E] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E7B7A0]" />
                    <span>{sched.time[currentLang]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6F685B]">
                    <MapPin className="w-3.5 h-3.5 text-[#E7B7A0]" />
                    <span className="line-clamp-1">
                      {sched.room[currentLang]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4 animate-fade-in">
          <p className="text-sm text-[#6F685B] font-serif italic mb-2">
            {t.gcalDesc[currentLang]}
          </p>
          <div className="aspect-[4/3] sm:aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#E7B7A0]/20 shadow-inner bg-white bg-opacity-5 relative">
            <iframe
              src={gcalEmbedUrl}
              title="GCCC Church Calendar"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              loading="lazy"
            />
          </div>
          <div className="flex justify-end">
            <a
              href={gcalPublicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A2B27] hover:text-[#80221E] hover:underline pt-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t.openWindow[currentLang]}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
