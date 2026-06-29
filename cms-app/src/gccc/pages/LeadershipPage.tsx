"use client";

import { Language } from "../types";
import { leadersData } from "../data";
import { Mail, UserCircle2 } from "lucide-react";

interface LeadershipPageProps {
  currentLang: Language;
}

export default function LeadershipPage({ currentLang }: LeadershipPageProps) {
  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[45vh] min-h-[280px] flex items-end pt-20 bg-cover bg-center"
        style={{ backgroundImage: `url("/images/aboutus.jpg")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-2">
            {currentLang === "en" ? "Who We Are" : "關於我們"}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {currentLang === "en" ? "Leadership" : "牧師同工"}
          </h1>
        </div>
      </section>

      {/* LEADERS GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-serif text-lg text-[#6F685B] leading-relaxed">
            {currentLang === "en"
              ? "Meet the pastoral team and elders who shepherd our congregation."
              : "認識帶領我們會眾的牧師同工與長老群。"}
          </p>
          <div className="mt-6 h-1 w-16 bg-[#9A2B27] mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadersData.map((leader) => (
            <div
              key={leader.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#E7B7A0]/20 flex flex-col"
            >
              <div className="aspect-[3/4] bg-[#F5EDE4] flex items-center justify-center overflow-hidden">
                {leader.imageUrl ? (
                  <img
                    src={leader.imageUrl}
                    alt={leader.name[currentLang]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle2 className="w-32 h-32 text-[#E7B7A0]" />
                )}
              </div>

              <div className="p-6 flex flex-col gap-3 flex-grow">
                <div>
                  <span className="font-mono text-[10px] text-[#9A2B27] uppercase tracking-widest font-bold block mb-1">
                    {leader.title[currentLang]}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#33271E] leading-snug">
                    {leader.name[currentLang]}
                  </h3>
                </div>

                {leader.bio && (
                  <p className="text-sm text-[#6F685B] font-serif leading-relaxed flex-grow">
                    {leader.bio[currentLang]}
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
          ))}
        </div>
      </section>
    </>
  );
}
