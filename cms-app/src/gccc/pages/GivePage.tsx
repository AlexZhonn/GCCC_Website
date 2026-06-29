"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import RichText from "../components/RichText";
import {
  fetchPageGlobal,
  fetchSiteSettings,
  type GivePageGlobalDoc,
  type CmsSiteSettings,
} from "../lib/cms";
import { MapPin, Mail, Gift } from "lucide-react";

const NA = "—";

const ICON_MAP: Record<string, React.ReactNode> = {
  zelle: <Mail className="w-5 h-5 text-[#9A2B27]" />,
  mail: <MapPin className="w-5 h-5 text-[#9A2B27]" />,
  inPerson: <Gift className="w-5 h-5 text-[#9A2B27]" />,
};

interface GivePageProps {
  currentLang: Language;
}

export default function GivePage({ currentLang }: GivePageProps) {
  const [doc, setDoc] = useState<GivePageGlobalDoc | null>(null);
  const [settings, setSettings] = useState<CmsSiteSettings | null>(null);

  useEffect(() => {
    fetchPageGlobal<GivePageGlobalDoc>("page-give", currentLang).then(setDoc);
    fetchSiteSettings(currentLang).then(setSettings);
  }, [currentLang]);

  return (
    <section
      id="give"
      className="flex flex-col bg-[#eeecec] text-[#33271E] border-t border-black/10 min-h-screen pt-16"
    >
      {/* Top strip */}
      <div className="px-4 sm:px-8 lg:px-16 pt-16 pb-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <h2 className="font-serif text-4xl md:text-5xl text-[#33271E] font-bold tracking-tight leading-tight">
            {doc?.heading ?? NA}
          </h2>
          <div className="h-0.75 w-14 bg-[#9A2B27]" />
          <p className="text-[#6F685B] font-serif text-base leading-relaxed max-w-2xl">
            {doc?.subheading ?? NA}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-16 py-10 flex-1">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Method cards */}
          {!doc || (doc.methods ?? []).length === 0 ? (
            <p className="text-neutral-400 font-mono text-sm">{NA}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {doc.methods!.map((method, idx) => (
                <div
                  key={method.id ?? idx}
                  className="bg-white border border-black/8 rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                    {ICON_MAP[method.icon ?? ""] ?? <Gift className="w-5 h-5 text-[#9A2B27]" />}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#33271E] text-base mb-1">
                      {method.title}
                    </h4>
                    {method.description ? (
                      <RichText
                        content={method.description}
                        className="text-[#6F685B] text-xs font-serif leading-relaxed"
                      />
                    ) : null}
                  </div>
                  {/* Detail line — inject address from SiteSettings for mail method */}
                  <span className="mt-auto text-[#9A2B27] text-xs font-semibold">
                    {method.icon === "mail"
                      ? (settings?.address ?? NA)
                      : (method.detail ?? "")}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tax note */}
          {doc?.taxNote ? (
            <div className="bg-[#9A2B27]/8 border border-[#9A2B27]/15 rounded-xl px-6 py-4 flex items-start gap-3">
              <Gift className="w-4 h-4 text-[#9A2B27] shrink-0 mt-0.5" />
              <RichText
                content={doc.taxNote}
                className="text-xs text-[#6F685B] font-serif leading-relaxed"
              />
            </div>
          ) : null}

          {/* Scripture */}
          {doc?.scripture ? (
            <blockquote className="border-l-2 border-[#9A2B27] pl-5 py-1">
              <RichText
                content={doc.scripture}
                className="font-serif text-sm italic text-[#6F685B] leading-relaxed"
              />
            </blockquote>
          ) : null}
        </div>
      </div>
    </section>
  );
}
