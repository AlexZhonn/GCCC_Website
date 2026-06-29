"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import { Calendar, User, X } from "lucide-react";

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

interface CmsMinistryCategory {
  id: string;
  categoryId: string;
  color?: string;
}

interface FellowshipGridProps {
  currentLang: Language;
}

export default function FellowshipGrid({ currentLang }: FellowshipGridProps) {
  const [fellowships, setFellowships] = useState<CmsFellowship[]>([]);
  const [categories, setCategories] = useState<CmsMinistryCategory[]>([]);
  const [selected, setSelected] = useState<CmsFellowship | null>(null);

  useEffect(() => {
    const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001");
    const locale = `locale=${currentLang}&fallbackLocale=en`;

    Promise.all([
      fetch(`${base}/api/fellowships?sort=order&limit=50&${locale}&depth=1`, { next: { revalidate: 60 } } as RequestInit)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d?.docs ?? [])
        .catch(() => []),
      fetch(`${base}/api/ministry-categories?limit=20&depth=0`, { next: { revalidate: 300 } } as RequestInit)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d?.docs ?? [])
        .catch(() => []),
    ]).then(([fships, cats]) => {
      setFellowships(fships);
      setCategories(cats);
    });
  }, [currentLang]);

  const resolveUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "")}${url}`;
  };

  const catColor = (categoryId?: string) =>
    categories.find((c) => c.categoryId === categoryId)?.color ?? "#9A2B27";

  const t = {
    exploreBtn: { en: "Gather Details", zh: "查看聚會詳情" },
    modalSchedule: { en: "Meeting Time", zh: "聚會時段" },
    modalLocation: { en: "Location", zh: "聚會地點" },
    modalContact: { en: "Coordinator", zh: "聯絡窗口" },
    modalInstagram: { en: "Follow on Instagram", zh: "追蹤 Instagram" },
    closeBtn: { en: "Close Window", zh: "關閉視窗" },
  };

  if (fellowships.length === 0) {
    return <p className="text-center text-neutral-400 font-mono text-sm py-20">{NA}</p>;
  }

  return (
    <div className="flex flex-col gap-8" id="fellowships_section_block">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fellowships.map((fellowship) => {
          const imgUrl = resolveUrl(fellowship.image?.url);
          return (
            <div
              key={fellowship.id}
              className="relative aspect-4/3 rounded-xl overflow-hidden group cursor-pointer shadow-md select-none border border-[#E7B7A0]/10"
              onClick={() => setSelected(fellowship)}
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={fellowship.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/40 to-[#211E18]/10 group-hover:via-[#211E18]/50 transition-all duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-[#FBF7EF] z-10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E7B7A0] font-bold block mb-1">
                  {fellowship.schedule ?? NA}
                </span>
                <h4 className="font-serif text-lg font-bold leading-tight line-clamp-1 group-hover:text-amber-100 transition-colors">
                  {fellowship.name}
                </h4>
                <p className="text-xs text-[#FBF7EF]/85 line-clamp-2 mt-2 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-12 transition-all duration-500">
                  {fellowship.description ?? ""}
                </p>
                <div className="mt-3 flex items-center text-xs font-semibold text-[#E7B7A0] group-hover:translate-x-1 transition-transform">
                  <span>{t.exploreBtn[currentLang]}</span>
                  <span className="ml-1.5">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" id="fellowship-detail-modal">
          <div
            className="bg-[#FBF7EF] text-[#33271E] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-[#E7B7A0]/30 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Banner */}
            <div
              className="relative h-44 overflow-hidden flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${catColor(selected.ministryCategory)}cc 0%, ${catColor(selected.ministryCategory)}88 60%, #211E18 100%)` }}
            >
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect x="88" y="20" width="24" height="160" rx="6" fill="white" />
                <rect x="30" y="68" width="140" height="24" rx="6" fill="white" />
              </svg>
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#dots)" />
              </svg>
              <div className="relative z-10 text-center px-6">
                <p className="text-[10px] uppercase font-mono tracking-widest text-white/70 mb-1">
                  Gainesville Chinese Christian Church
                </p>
                <h3 className="font-serif text-2xl font-bold text-white leading-snug drop-shadow">
                  {selected.name}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/65 text-white p-2 rounded-full transition-all"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 flex flex-col gap-5">
              <div>
                <h4 className="font-serif text-2xl font-bold tracking-tight text-[#33271E]">
                  {selected.name}
                </h4>
                <p className="text-sm font-sans text-[#6F685B] font-medium leading-relaxed mt-2.5">
                  {selected.description ?? NA}
                </p>
              </div>

              <div className="flex flex-col gap-3.5 border-t border-[#E7B7A0]/25 pt-4">
                {selected.schedule && (
                  <div className="flex items-start gap-3">
                    <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                      <Calendar className="w-4 h-4 text-[#9A2B27]" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">{t.modalSchedule[currentLang]}</span>
                      <span className="text-sm font-semibold text-[#33271E]">{selected.schedule}</span>
                    </div>
                  </div>
                )}
                {selected.contact && (
                  <div className="flex items-start gap-3">
                    <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                      <User className="w-4 h-4 text-[#9A2B27]" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">{t.modalContact[currentLang]}</span>
                      <span className="text-sm font-semibold text-[#33271E]">{selected.contact}</span>
                    </div>
                  </div>
                )}
                {selected.instagramUrl && (
                  <div className="flex items-start gap-3">
                    <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                      <InstagramIcon className="w-4 h-4 text-[#9A2B27]" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">{t.modalInstagram[currentLang]}</span>
                      <a
                        href={selected.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#9A2B27] hover:underline"
                      >
                        {selected.instagramUrl.replace(/https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4 border-t border-[#E7B7A0]/25 pt-4">
                <button
                  onClick={() => setSelected(null)}
                  className="bg-[#9A2B27] hover:bg-[#80221E] text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow transition-all"
                >
                  {t.closeBtn[currentLang]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
