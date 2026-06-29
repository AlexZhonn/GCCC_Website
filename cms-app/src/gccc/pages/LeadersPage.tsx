"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import { Mail, UserCircle2 } from "lucide-react";

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

interface LeadersPageProps {
  currentLang: Language;
}

export default function LeadersPage({ currentLang }: LeadersPageProps) {
  const [leaders, setLeaders] = useState<CmsLeader[]>([]);

  useEffect(() => {
    const base = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3001");
    fetch(
      `${base}/api/leaders?sort=order&limit=50&locale=${currentLang}&fallbackLocale=en&depth=1`,
      { next: { revalidate: 60 } } as RequestInit,
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setLeaders(d?.docs ?? []))
      .catch(() => setLeaders([]));
  }, [currentLang]);

  const labels = {
    eyebrow: { en: "Our Team", zh: "教會同工" },
    heading: { en: "Pastors & Elders", zh: "牧師與長老" },
    sub: {
      en: "Meet the pastoral team and elders who shepherd our congregation.",
      zh: "認識帶領我們會眾的牧師同工與長老群。",
    },
    contact: { en: "Contact", zh: "聯絡" },
  };

  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[55vh] min-h-85 flex items-end pt-20 bg-cover bg-center"
        style={{ backgroundImage: `url("/images/sundayservice.JPG")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/55" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-2">
            {labels.eyebrow[currentLang]}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {labels.heading[currentLang]}
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="pt-16 pb-4 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <p className="font-serif text-lg text-[#6F685B] leading-relaxed">
          {labels.sub[currentLang]}
        </p>
        <div className="mt-6 h-1 w-16 bg-[#9A2B27] mx-auto" />
      </section>

      {/* LEADERS GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
                      <img src={photoUrl} alt={leader.name} className="w-full h-full object-cover" />
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
                        {labels.contact[currentLang]}
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
