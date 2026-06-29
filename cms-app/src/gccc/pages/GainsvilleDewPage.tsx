"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import { FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { fetchPageGlobal, mediaUrl, type GainsvilleDewPageGlobalDoc } from "../lib/cms";

const NA = "—";

interface GainsvilleDewPageProps {
  currentLang: Language;
}

function formatDate(dateStr: string, lang: Language) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
    year: "numeric",
    month: "long",
  });
}

export default function GainsvilleDewPage({ currentLang }: GainsvilleDewPageProps) {
  const [doc, setDoc] = useState<GainsvilleDewPageGlobalDoc | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchPageGlobal<GainsvilleDewPageGlobalDoc>("page-gainesville-dew", currentLang).then((d) => {
      setDoc(d);
      // Auto-expand the first issue
      const first = d?.issues?.[0];
      if (first) setExpandedId(first.id ?? "0");
    });
  }, [currentLang]);

  const issues = doc?.issues ?? [];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#211E18] pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {doc?.eyebrow && (
            <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-3">
              {doc.eyebrow}
            </span>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight mb-4">
            {doc?.heading ?? NA}
          </h1>
          {doc?.subheading && (
            <p className="text-white/60 text-lg font-light max-w-xl">
              {doc.subheading}
            </p>
          )}
        </div>
      </section>

      {/* ── ISSUES LIST ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {issues.length === 0 ? (
          <p className="text-center text-neutral-400 font-mono text-sm py-20">{NA}</p>
        ) : (
          <div className="space-y-4">
            {issues.map((issue, idx) => {
              const id = issue.id ?? String(idx);
              const isExpanded = expandedId === id;
              const pdfUrl = mediaUrl(issue.file) ?? issue.legacyPdfPath;

              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl shadow-sm border border-black/8 overflow-hidden"
                >
                  {/* Header row */}
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-black/[0.02] transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : id)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#9A2B27]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif font-semibold text-base sm:text-lg text-[#211E18] truncate">
                          {issue.title}
                        </p>
                        <p className="text-sm text-gray-500 font-mono mt-0.5">
                          {formatDate(issue.date, currentLang)}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-gray-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Expanded: PDF embed */}
                  {isExpanded && (
                    <div className="border-t border-black/8 px-6 py-5 space-y-4 animate-fade-in">
                      {issue.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {issue.description}
                        </p>
                      )}
                      {pdfUrl ? (
                        <>
                          <div
                            className="rounded-xl overflow-hidden border border-black/10 bg-gray-50"
                            style={{ height: "600px" }}
                          >
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
