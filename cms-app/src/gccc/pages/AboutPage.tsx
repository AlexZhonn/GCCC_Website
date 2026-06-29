"use client";

import { useState, useEffect } from "react";
import { FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Language } from "../types";
import RichText from "../components/RichText";
import { fetchPageGlobal, mediaUrl, type AboutPageGlobalDoc } from "../lib/cms";

const NA = "—";

interface AboutPageProps {
  currentLang: Language;
}

export default function AboutPage({ currentLang }: AboutPageProps) {
  const [doc, setDoc] = useState<AboutPageGlobalDoc | null>(null);
  const [commemorativeOpen, setCommemorativeOpen] = useState(false);

  useEffect(() => {
    fetchPageGlobal<AboutPageGlobalDoc>("page-about", currentLang).then(setDoc);
  }, [currentLang]);

  const hero = doc?.hero;
  const history = doc?.churchHistory;

  const heroBg = mediaUrl(hero?.backgroundImage);
  const portraitUrl = mediaUrl(history?.churchPortrait);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative h-[75vh] min-h-125 flex items-end pt-20 bg-cover bg-center"
        style={heroBg ? { backgroundImage: `url("${heroBg}")` } : undefined}
      >
        <div className="absolute inset-0 bg-neutral-900/55" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          {hero?.eyebrow && (
            <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-2">
              {hero.eyebrow}
            </span>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {hero?.heading ?? NA}
          </h1>
        </div>
      </section>

      {/* ── CHURCH HISTORY ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Church portrait */}
        <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <div className="aspect-21/9">
            {portraitUrl ? (
              <img
                src={portraitUrl}
                alt={currentLang === "en" ? "GCCC congregation portrait" : "甘城華人教會全體照"}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 font-mono text-sm">
                {NA}
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-[#211E18]/60 to-transparent" />
          <div className="absolute -bottom-4 -right-4 w-48 h-24 bg-[#E7B7A0]/30 rounded-2xl -z-10" />
          <div className="absolute top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[#9A2B27] -z-10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Left: proclamation of faith */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl p-8 border-l-4 border-[#9A2B27] shadow-xl">
              <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-[3px] font-bold block mb-5">
                {currentLang === "en" ? "Proclamation of Faith" : "信仰宣告"}
              </span>
              {history?.proclamationOfFaith ? (
                <RichText
                  content={history.proclamationOfFaith}
                  className="font-serif text-base text-neutral-800 italic leading-relaxed space-y-4"
                />
              ) : (
                <p className="font-mono text-sm text-neutral-400">{NA}</p>
              )}
            </div>
          </div>

          {/* Right: history */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-6xl text-[#33271E] font-bold tracking-tight">
                {history?.historyHeading ?? NA}
              </h2>
            </div>
            {history?.historyBody ? (
              <RichText
                content={history.historyBody}
                className="space-y-5 text-base md:text-lg text-[#000000] font-serif leading-relaxed"
              />
            ) : (
              <p className="font-mono text-sm text-neutral-400">{NA}</p>
            )}
          </div>
        </div>

        {/* ── Documents (commemorative issues etc.) ─────────────────────── */}
        {(history?.documents ?? []).length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto space-y-4">
            {history!.documents!.map((doc, idx) => {
              const pdfUrl = mediaUrl(doc.file) ?? doc.legacyPdfPath;
              const isOpen = commemorativeOpen && idx === 0; // expand first by default
              return (
                <div
                  key={doc.id ?? idx}
                  className="rounded-2xl border border-black/8 overflow-hidden shadow-sm bg-white"
                >
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-black/2 transition-colors"
                    onClick={() => setCommemorativeOpen((o) => !o)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#9A2B27]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif font-semibold text-base sm:text-lg text-[#211E18]">
                          {doc.label}
                        </p>
                        {doc.year && (
                          <p className="text-sm text-gray-500 font-mono mt-0.5">{doc.year}</p>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 text-gray-400">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-black/8 px-6 py-5 space-y-4">
                      {doc.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">{doc.description}</p>
                      )}
                      {pdfUrl ? (
                        <>
                          <div className="rounded-xl overflow-hidden border border-black/10 bg-gray-50" style={{ height: "900px" }}>
                            <object data={pdfUrl} type="application/pdf" className="w-full h-full">
                              <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500 text-sm p-8 text-center">
                                <FileText className="w-10 h-10 text-gray-300" />
                                <p>
                                  {currentLang === "en"
                                    ? "Your browser cannot display this PDF inline."
                                    : "您的瀏覽器無法直接顯示此 PDF。"}
                                </p>
                                <a
                                  href={pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2B27] hover:text-[#7a2220] transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  {currentLang === "en" ? "Download PDF" : "下載 PDF"}
                                </a>
                              </div>
                            </object>
                          </div>
                          <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2B27] hover:text-[#7a2220] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {currentLang === "en" ? "Open PDF" : "開啟 PDF"}
                          </a>
                        </>
                      ) : (
                        <p className="font-mono text-sm text-neutral-400">{NA}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
