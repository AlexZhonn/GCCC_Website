"use client";

import { Language, MinistryCategory } from "../types";
import { ministryCategoriesData } from "../data";
import { ChevronRight } from "lucide-react";

interface FellowshipsPageProps {
  currentLang: Language;
  onSelectCategory: (category: MinistryCategory) => void;
}

const t = {
  title: { en: "Ministries", zh: "事工" },
  subtitle: {
    en: "Find your community. Every stage of life has a place here.",
    zh: "在每個人生階段，都有屬於你的團契家庭。",
  },
  learnMore: { en: "Learn More", zh: "了解更多" },
};

export default function FellowshipsPage({
  currentLang,
  onSelectCategory,
}: FellowshipsPageProps) {
  return (
    <>
      {/* HERO BANNER */}
      <section
        className="relative h-[55vh] min-h-85 flex items-end pt-20 bg-cover bg-center"
        style={{
          backgroundImage: `url("/images/gccc_campus_1781744441184.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-neutral-900/50" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {t.title[currentLang]}
          </h1>
          <p className="mt-3 text-white/75 text-base sm:text-lg font-sans">
            {t.subtitle[currentLang]}
          </p>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="py-16 bg-[#eeecec] px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministryCategoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative rounded-2xl overflow-hidden shadow-md aspect-square text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
            >
              {/* Background image */}
              <img
                src={cat.bannerImageUrl}
                alt={cat.label[currentLang]}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/40 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col justify-end text-white z-10">
                <h3 className="font-serif text-3xl font-bold leading-tight group-hover:text-amber-100 transition-colors">
                  {cat.label[currentLang]}
                </h3>
                <div className="mt-3 flex items-center text-xs font-semibold text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                  <span>{t.learnMore[currentLang]}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
