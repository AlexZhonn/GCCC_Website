"use client";

import { useState, useEffect } from "react";
import { Language, MinistryCategory } from "../types";
import { ChevronRight } from "lucide-react";
import { fetchPageGlobal, mediaUrl, type FellowshipsPageGlobalDoc } from "../lib/cms";

const NA = "—";

interface CmsMinistryCategory {
  id: string;
  categoryId: string;
  label: string;
  ageRange?: string;
  description?: string;
  bannerImage?: { url?: string };
  color?: string;
  order?: number;
}

interface FellowshipsPageProps {
  currentLang: Language;
  onSelectCategory: (category: MinistryCategory) => void;
}

export default function FellowshipsPage({ currentLang, onSelectCategory }: FellowshipsPageProps) {
  const [doc, setDoc] = useState<FellowshipsPageGlobalDoc | null>(null);
  const [categories, setCategories] = useState<CmsMinistryCategory[]>([]);

  useEffect(() => {
    fetchPageGlobal<FellowshipsPageGlobalDoc>("page-fellowships", currentLang).then(setDoc);
    const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001");
    fetch(
      `${base}/api/ministry-categories?sort=order&limit=20&locale=${currentLang}&fallbackLocale=en&depth=1`,
      { next: { revalidate: 60 } } as RequestInit,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setCategories(d?.docs ?? []))
      .catch(() => setCategories([]));
  }, [currentLang]);

  const hero = doc?.hero;
  const heroBg = mediaUrl(hero?.backgroundImage);

  const learnMoreLabel = hero?.learnMoreLabel ?? (currentLang === "en" ? "Learn More" : "了解更多");

  return (
    <>
      {/* HERO BANNER */}
      <section
        className="relative h-[55vh] min-h-85 flex items-end pt-20 bg-cover bg-center"
        style={heroBg ? { backgroundImage: `url("${heroBg}")` } : { backgroundImage: `url("/images/gccc_campus_1781744441184.jpg")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/50" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {hero?.heading ?? (currentLang === "en" ? "Ministries" : "事工")}
          </h1>
          <p className="mt-3 text-white/75 text-base sm:text-lg font-sans">
            {hero?.subtitle ?? (currentLang === "en" ? "Find your community. Every stage of life has a place here." : "在每個人生階段，都有屬於你的團契家庭。")}
          </p>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="py-16 bg-[#eeecec] px-4 sm:px-6 lg:px-8 min-h-screen">
        {categories.length === 0 ? (
          <p className="text-center text-neutral-400 font-mono text-sm py-20">{NA}</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const imgUrl = cat.bannerImage?.url
                ? cat.bannerImage.url.startsWith("http")
                  ? cat.bannerImage.url
                  : `${typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "")}${cat.bannerImage.url}`
                : null;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.categoryId as MinistryCategory)}
                  className="group relative rounded-2xl overflow-hidden shadow-md aspect-square text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: cat.color ?? "#33271E" }}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/40 transition-all duration-300" />
                  <div className="absolute inset-x-0 bottom-0 p-7 flex flex-col justify-end text-white z-10">
                    <h3 className="font-serif text-3xl font-bold leading-tight group-hover:text-amber-100 transition-colors">
                      {cat.label}
                    </h3>
                    <div className="mt-3 flex items-center text-xs font-semibold text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      <span>{learnMoreLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
