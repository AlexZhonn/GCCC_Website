"use client";

import { useState, useEffect } from "react";
import { Language, MinistryCategory } from "../types";
import { ArrowLeft, Calendar } from "lucide-react";

const NA = "—";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface CmsMinistryCategory {
  id: string;
  categoryId: string;
  label: string;
  ageRange?: string;
  description?: string;
  color?: string;
}

interface CmsFellowship {
  id: string;
  name: string;
  slug: string;
  schedule?: string;
  location?: string;
  contact?: string;
  description?: string;
  image?: { url?: string };
  instagramUrl?: string;
  ministryCategory?: string;
}

interface MinistryDetailPageProps {
  currentLang: Language;
  category: MinistryCategory;
  onBack: () => void;
}

const t = {
  back: { en: "All Ministries", zh: "所有事工" },
  about: { en: "About This Ministry", zh: "關於此事工" },
  schedule: { en: "Meeting Time", zh: "聚會時段" },
  instagram: { en: "Follow on Instagram", zh: "追蹤 Instagram" },
};

export default function MinistryDetailPage({ currentLang, category, onBack }: MinistryDetailPageProps) {
  const [catInfo, setCatInfo] = useState<CmsMinistryCategory | null>(null);
  const [fellowships, setFellowships] = useState<CmsFellowship[]>([]);

  useEffect(() => {
    const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001");
    const locale = `locale=${currentLang}&fallbackLocale=en`;

    Promise.all([
      fetch(
        `${base}/api/ministry-categories?where[categoryId][equals]=${category}&limit=1&${locale}&depth=1`,
        { next: { revalidate: 60 } } as RequestInit,
      )
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d?.docs?.[0] ?? null)
        .catch(() => null),
      fetch(
        `${base}/api/fellowships?where[ministryCategory][equals]=${category}&sort=order&limit=20&${locale}&depth=1`,
        { next: { revalidate: 60 } } as RequestInit,
      )
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d?.docs ?? [])
        .catch(() => []),
    ]).then(([cat, fships]) => {
      setCatInfo(cat);
      setFellowships(fships);
    });
  }, [currentLang, category]);

  const color = catInfo?.color ?? "#33271E";

  const resolveUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "")}${url}`;
  };

  return (
    <>
      {/* BANNER */}
      <section
        className="relative h-[55vh] min-h-80 flex items-end pt-20 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}dd 0%, ${color}88 55%, #211E18 100%)` }}
      >
        {/* Decorative cross */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="178" y="20" width="44" height="260" rx="10" fill="white" />
          <rect x="60" y="95" width="280" height="44" rx="10" fill="white" />
        </svg>
        {/* Dot grid */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full opacity-[0.08]" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="banner-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.8" fill="white" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#banner-dots)" />
        </svg>
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/10 to-transparent" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm font-sans mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {t.back[currentLang]}
          </button>
          {catInfo?.ageRange && (
            <span className="text-xs uppercase font-mono tracking-widest font-bold mb-2 block" style={{ color }}>
              {catInfo.ageRange}
            </span>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {catInfo?.label ?? NA}
          </h1>
        </div>
      </section>

      <section className="bg-[#eeecec] px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* DESCRIPTION CARD */}
          <div className="bg-white rounded-2xl border border-[#E7B7A0]/20 shadow-sm px-8 py-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#33271E] mb-4">
              {t.about[currentLang]}
            </h2>
            <p className="text-[#33271E] text-base sm:text-lg font-sans leading-relaxed">
              {catInfo?.description ?? NA}
            </p>
          </div>

          {/* FELLOWSHIPS */}
          {fellowships.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7B7A0]/20 p-10 text-center shadow-sm">
              <p className="font-serif text-xl text-[#33271E] font-semibold mb-2">
                {currentLang === "en" ? "Resources Coming Soon" : "資源即將上線"}
              </p>
              <p className="text-sm text-[#6F685B] font-sans leading-relaxed max-w-md mx-auto">
                {currentLang === "en"
                  ? "We are preparing training materials and resources for this ministry. Check back soon!"
                  : "我們正在籌備相關訓練材料與資源，敬請期待！"}
              </p>
            </div>
          ) : (
            fellowships.map((f) => {
              const imgUrl = resolveUrl(f.image?.url);
              return (
                <div key={f.id} className="flex flex-col gap-4">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E7B7A0]/20 flex flex-col sm:flex-row">
                    <div className="relative sm:w-64 lg:w-80 h-52 sm:h-auto shrink-0 overflow-hidden">
                      {imgUrl ? (
                        <img src={imgUrl} alt={f.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 font-mono text-sm">
                          {NA}
                        </div>
                      )}
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col justify-center gap-3 grow">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#33271E] leading-snug">
                        {f.name}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6F685B] font-sans leading-relaxed">
                        {f.description ?? NA}
                      </p>
                    </div>
                  </div>

                  {/* Meeting time + Instagram */}
                  <div className="bg-white rounded-2xl border border-[#E7B7A0]/20 shadow-sm px-6 py-5 flex flex-wrap items-center gap-6">
                    {f.schedule && (
                      <div className="flex items-center gap-3">
                        <div className="bg-[#9A2B27]/10 p-2 rounded-lg">
                          <Calendar className="w-4 h-4 text-[#9A2B27]" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#6F685B] block">
                            {t.schedule[currentLang]}
                          </span>
                          <span className="text-sm font-semibold text-[#33271E]">
                            {f.schedule}
                          </span>
                        </div>
                      </div>
                    )}
                    {f.instagramUrl && (
                      <div className="flex items-center gap-3">
                        <div className="bg-[#9A2B27]/10 p-2 rounded-lg">
                          <InstagramIcon className="w-4 h-4 text-[#9A2B27]" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#6F685B] block">
                            {t.instagram[currentLang]}
                          </span>
                          <a
                            href={f.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-[#9A2B27] hover:underline"
                          >
                            {f.instagramUrl.replace(/https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "")}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
