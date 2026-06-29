"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import { Mail, UserCircle2 } from "lucide-react";
import { fetchPageGlobal, mediaUrl, type LeadershipPageGlobalDoc } from "../lib/cms";

const NA = "—";

interface CmsLeader {
  id: string;
  name: string;
  title: string;
  bio?: string;
  email?: string;
  photo?: { url?: string };
  order?: number;
}

interface LeadershipPageProps {
  currentLang: Language;
}

export default function LeadershipPage({ currentLang }: LeadershipPageProps) {
  const [doc, setDoc] = useState<LeadershipPageGlobalDoc | null>(null);
  const [leaders, setLeaders] = useState<CmsLeader[]>([]);

  useEffect(() => {
    fetchPageGlobal<LeadershipPageGlobalDoc>("page-leadership", currentLang).then(setDoc);
    const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001");
    fetch(
      `${base}/api/leaders?sort=order&limit=50&locale=${currentLang}&fallbackLocale=en&depth=1`,
      { next: { revalidate: 60 } } as RequestInit,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setLeaders(d?.docs ?? []))
      .catch(() => setLeaders([]));
  }, [currentLang]);

  const hero = doc?.hero;
  const heroBg = mediaUrl(hero?.backgroundImage);

  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[45vh] min-h-70 flex items-end pt-20 bg-cover bg-center"
        style={heroBg ? { backgroundImage: `url("${heroBg}")` } : { backgroundImage: `url("/images/aboutus.jpg")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/55" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-2">
            {hero?.eyebrow ?? (currentLang === "en" ? "Who We Are" : "關於我們")}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {hero?.heading ?? (currentLang === "en" ? "Leadership" : "牧師同工")}
          </h1>
        </div>
      </section>

      {/* LEADERS GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-serif text-lg text-[#6F685B] leading-relaxed">
            {doc?.introParagraph ?? (currentLang === "en"
              ? "Meet the pastoral team and elders who shepherd our congregation."
              : "認識帶領我們會眾的牧師同工與長老群。")}
          </p>
          <div className="mt-6 h-1 w-16 bg-[#9A2B27] mx-auto" />
        </div>

        {leaders.length === 0 ? (
          <p className="text-center text-neutral-400 font-mono text-sm">{NA}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader) => {
              const photoUrl = leader.photo?.url
                ? leader.photo.url.startsWith("http")
                  ? leader.photo.url
                  : `${typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "")}${leader.photo.url}`
                : null;

              return (
                <div
                  key={leader.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#E7B7A0]/20 flex flex-col"
                >
                  <div className="aspect-3/4 bg-[#F5EDE4] flex items-center justify-center overflow-hidden">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2 className="w-32 h-32 text-[#E7B7A0]" />
                    )}
                  </div>

                  <div className="p-6 flex flex-col gap-3 grow">
                    <div>
                      <span className="font-mono text-[10px] text-[#9A2B27] uppercase tracking-widest font-bold block mb-1">
                        {leader.title ?? NA}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#33271E] leading-snug">
                        {leader.name}
                      </h3>
                    </div>

                    {leader.bio && (
                      <p className="text-sm text-[#6F685B] font-serif leading-relaxed grow">
                        {leader.bio}
                      </p>
                    )}

                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="inline-flex items-center gap-1.5 text-xs text-[#9A2B27] hover:text-[#7a2220] transition-colors font-mono mt-auto"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {currentLang === "en" ? "Contact" : "聯絡"}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
