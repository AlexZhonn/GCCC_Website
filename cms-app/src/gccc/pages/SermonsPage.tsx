"use client";

import { Language } from "../types";
import SermonPlayer from "../components/SermonPlayer";

interface SermonsPageProps {
  currentLang: Language;
}

export default function SermonsPage({ currentLang }: SermonsPageProps) {
  return (
    <section id="sermons" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col gap-10">
        <div className="text-center md:text-left">
          <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-widest font-bold block mb-1">
            {currentLang === "en" ? "Spiritual Nourishment" : "主日神話語的造就"}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
            {currentLang === "en" ? "Bilingual Sermons Archive" : "中英講道錄影與音頻文庫"}
          </h2>
          <p className="text-[#6F685B] text-sm mt-2 max-w-3xl leading-relaxed font-serif italic">
            每一步信仰路都是真理的沉澱。我們的主日講道均進行普通話與英文雙語聯合播講，幫助雙語背景的人士一同汲取生命甘露。
          </p>
        </div>
        <SermonPlayer currentLang={currentLang} />
      </div>
    </section>
  );
}
