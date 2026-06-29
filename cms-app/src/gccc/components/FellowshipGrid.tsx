"use client";

import { useState } from "react";
import { Fellowship, Language } from "../types";
import { fellowshipsData, ministryCategoriesData } from "../data";
import { Calendar, MapPin, User, X } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface FellowshipGridProps {
  currentLang: Language;
}

export default function FellowshipGrid({ currentLang }: FellowshipGridProps) {
  const [selectedFellowship, setSelectedFellowship] =
    useState<Fellowship | null>(null);

  const t = {
    exploreBtn: { en: "Gather Details", zh: "查看聚會詳情" },
    modalSchedule: { en: "Meeting Time", zh: "聚會時段" },
    modalLocation: { en: "Location", zh: "聚會地點" },
    modalContact: { en: "Coordinator", zh: "聯絡窗口" },
    modalInstagram: { en: "Follow on Instagram", zh: "追蹤 Instagram" },
    closeBtn: { en: "Close Window", zh: "關閉視窗" },
  };

  return (
    <div className="flex flex-col gap-8" id="fellowships_section_block">
      {/* UNIFORM GRID: all fellowships same size, ordered youngest → oldest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fellowshipsData.map((fellowship) => (
          <div
            key={fellowship.id}
            className="relative aspect-4/3 rounded-xl overflow-hidden group cursor-pointer shadow-md select-none border border-[#E7B7A0]/10"
            onClick={() => setSelectedFellowship(fellowship)}
          >
            {/* Photo backdrop */}
            <img
              src={fellowship.imageUrl}
              alt={fellowship.name[currentLang]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Shadow gradient darkening bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/40 to-[#211E18]/10 group-hover:via-[#211E18]/50 transition-all duration-300" />

            {/* Overlay info */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-[#FBF7EF] z-10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#E7B7A0] font-bold block mb-1">
                {fellowship.schedule[currentLang]}
              </span>
              <h4 className="font-serif text-lg font-bold leading-tight line-clamp-1 group-hover:text-amber-100 transition-colors">
                {fellowship.name[currentLang]}
              </h4>
              <p className="text-xs text-[#FBF7EF]/85 line-clamp-2 mt-2 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-12 transition-all duration-500">
                {fellowship.description[currentLang]}
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-[#E7B7A0] group-hover:translate-x-1 transition-transform">
                <span>{t.exploreBtn[currentLang]}</span>
                <span className="ml-1.5">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL DIALOG / MODAL PANEL */}
      {selectedFellowship && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          id="fellowship-detail-modal"
        >
          <div
            className="bg-[#FBF7EF] text-[#33271E] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-[#E7B7A0]/30 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal banner */}
            {(() => {
              const catColor =
                ministryCategoriesData.find(
                  (c) => c.id === selectedFellowship.ministryCategory
                )?.color ?? "#9A2B27";
              return (
                <div
                  className="relative h-44 overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${catColor}cc 0%, ${catColor}88 60%, #211E18 100%)` }}
                >
                  {/* Decorative cross */}
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 w-full h-full opacity-10"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                  >
                    <rect x="88" y="20" width="24" height="160" rx="6" fill="white" />
                    <rect x="30" y="68" width="140" height="24" rx="6" fill="white" />
                  </svg>
                  {/* Subtle dot grid */}
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 w-full h-full opacity-10"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="200" height="200" fill="url(#dots)" />
                  </svg>
                  {/* Ministry name */}
                  <div className="relative z-10 text-center px-6">
                    <p className="text-[10px] uppercase font-mono tracking-widest text-white/70 mb-1">
                      Gainesville Chinese Christian Church
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-white leading-snug drop-shadow">
                      {selectedFellowship.name[currentLang]}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedFellowship(null)}
                    className="absolute top-4 right-4 bg-black/40 hover:bg-black/65 text-white p-2 rounded-full transition-all"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              );
            })()}

            {/* Modal Body */}
            <div className="p-6 md:p-8 flex flex-col gap-5">
              <div>
                <h4 className="font-serif text-2xl font-bold tracking-tight text-[#33271E]">
                  {selectedFellowship.name[currentLang]}
                </h4>
                <p className="text-sm font-sans text-[#6F685B] font-medium leading-relaxed mt-2.5">
                  {selectedFellowship.description[currentLang]}
                </p>
              </div>

              <div className="flex flex-col gap-3.5 border-t border-[#E7B7A0]/25 pt-4">
                {/* Time */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                    <Calendar className="w-4 h-4 text-[#9A2B27]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">
                      {t.modalSchedule[currentLang]}
                    </span>
                    <span className="text-sm font-semibold text-[#33271E]">
                      {selectedFellowship.schedule[currentLang]}
                    </span>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                    <User className="w-4 h-4 text-[#9A2B27]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">
                      {t.modalContact[currentLang]}
                    </span>
                    <span className="text-sm font-semibold text-[#33271E]">
                      {selectedFellowship.contact[currentLang]}
                    </span>
                  </div>
                </div>

                {/* Instagram */}
                {selectedFellowship.instagramUrl && (
                  <div className="flex items-start gap-3">
                    <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                      <InstagramIcon className="w-4 h-4 text-[#9A2B27]" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">
                        {t.modalInstagram[currentLang]}
                      </span>
                      <a
                        href={selectedFellowship.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#9A2B27] hover:underline"
                      >
                        @gccc_alpha
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Close controls */}
              <div className="flex justify-end gap-3 mt-4 border-t border-[#E7B7A0]/25 pt-4">
                <button
                  onClick={() => setSelectedFellowship(null)}
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
