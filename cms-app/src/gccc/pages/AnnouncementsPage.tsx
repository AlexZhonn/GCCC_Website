"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import RichText from "../components/RichText";
import { fetchPageGlobal, type AnnouncementsPageGlobalDoc } from "../lib/cms";

const NA = "—";

interface AnnouncementsPageProps {
  currentLang: Language;
}

export default function AnnouncementsPage({ currentLang }: AnnouncementsPageProps) {
  const [doc, setDoc] = useState<AnnouncementsPageGlobalDoc | null>(null);

  useEffect(() => {
    fetchPageGlobal<AnnouncementsPageGlobalDoc>("page-announcements", currentLang).then(setDoc);
  }, [currentLang]);

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#33271E] mb-3">
        {doc?.heading ?? NA}
      </h1>
      <p className="text-base text-[#6F685B] font-serif mb-10">
        {doc?.subheading ?? NA}
      </p>

      {!doc || (doc.items ?? []).length === 0 ? (
        <p className="text-neutral-400 font-mono text-sm">{NA}</p>
      ) : (
        <div className="space-y-5">
          {doc.items!.map((item, idx) => (
            <div
              key={item.id ?? idx}
              className="bg-white rounded-2xl border border-black/8 shadow-sm p-6 md:p-8"
            >
              <span className="text-[10px] font-mono tracking-widest text-[#9A2B27] uppercase font-semibold">
                {new Date(item.date).toLocaleDateString(
                  currentLang === "zh" ? "zh-TW" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </span>
              <h2 className="font-serif text-xl font-bold text-[#33271E] mt-2 mb-3">
                {item.title}
              </h2>
              {item.body ? (
                <RichText
                  content={item.body}
                  className="text-sm text-[#6F685B] font-serif leading-relaxed"
                />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
