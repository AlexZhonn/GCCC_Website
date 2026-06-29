"use client";

import { Language } from "../types";
import { siteSettings } from "../data";
import { MapPin, Mail, ExternalLink, Gift } from "lucide-react";

interface GivePageProps {
  currentLang: Language;
}

export default function GivePage({ currentLang }: GivePageProps) {
  const l = currentLang;

  const t = {
    title: { en: "Give to GCCC", zh: "奉獻支持甘城華人教會" },
    sub: {
      en: "Your generous giving supports the ministry and mission of GCCC Gainesville.",
      zh: "您慷慨的奉獻支持甘城華人教會的事工與宣教使命。",
    },
    giveOnline: { en: "Give via Zelle", zh: "Zelle 線上奉獻" },
    giveOnlineDesc: {
      en: "Use Zelle to transfer your offering. Send to general@gcccfl.org for tithing or Building Fund. Once tithing is satisfied, send to mission@gcccfl.org for Mission Fund.",
      zh: "請使用 Zelle 轉帳奉獻。什一奉獻或建堂奉獻請轉至 general@gcccfl.org；若已完成什一奉獻且感動奉獻宣教，請轉至 mission@gcccfl.org。",
    },
    giveMail: { en: "Give by Mail", zh: "郵寄支票" },
    giveMailDesc: {
      en: "Make checks payable to 'Gainesville Chinese Christian Church' and mail to our address.",
      zh: "支票抬頭請寫「Gainesville Chinese Christian Church」，郵寄至教會地址。",
    },
    giveInPerson: { en: "Give In Person", zh: "現場奉獻" },
    giveInPersonDesc: {
      en: "Please deposit your offerings in the offering box, available during Sunday Worship Service.",
      zh: "主日崇拜時，請將奉獻放入奉獻箱中。",
    },
    giveNote: {
      en: "GCCC is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent allowed by law.",
      zh: "甘城華人教會為合法登記之 501(c)(3) 非營利組織，所有捐款均可依法享有稅務減免。",
    },
  };

  return (
    <section
      id="give"
      className="flex flex-col bg-[#eeecec] text-[#33271E] border-t border-black/10 min-h-screen pt-16"
    >
      {/* Top info strip */}
      <div className="px-4 sm:px-8 lg:px-16 pt-16 pb-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <h2 className="font-serif text-4xl md:text-5xl text-[#33271E] font-bold tracking-tight leading-tight">
            {t.title[l]}
          </h2>
          <div className="h-0.75 w-14 bg-[#9A2B27]" />
          <p className="text-[#6F685B] font-serif text-base leading-relaxed max-w-2xl">
            {t.sub[l]}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-16 py-10 flex-1">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Zelle */}
            <div className="bg-white border border-black/8 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#9A2B27]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#33271E] text-base mb-1">
                  {t.giveOnline[l]}
                </h4>
                <p className="text-[#6F685B] text-xs font-serif leading-relaxed">
                  {t.giveOnlineDesc[l]}
                </p>
              </div>
              <div className="mt-auto flex flex-col gap-1.5">
                <a
                  href="mailto:general@gcccfl.org"
                  className="inline-flex items-center gap-1.5 text-[#9A2B27] text-xs font-semibold hover:text-[#80221E] transition-colors"
                >
                  general@gcccfl.org
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="mailto:mission@gcccfl.org"
                  className="inline-flex items-center gap-1.5 text-[#9A2B27] text-xs font-semibold hover:text-[#80221E] transition-colors"
                >
                  mission@gcccfl.org
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Mail */}
            <div className="bg-white border border-black/8 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#9A2B27]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#33271E] text-base mb-1">
                  {t.giveMail[l]}
                </h4>
                <p className="text-[#6F685B] text-xs font-serif leading-relaxed">
                  {t.giveMailDesc[l]}
                </p>
              </div>
              <span className="mt-auto text-[#9A2B27] text-xs font-semibold">
                {siteSettings.address[l]}
              </span>
            </div>

            {/* In person */}
            <div className="bg-white border border-black/8 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#9A2B27]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#33271E] text-base mb-1">
                  {t.giveInPerson[l]}
                </h4>
                <p className="text-[#6F685B] text-xs font-serif leading-relaxed">
                  {t.giveInPersonDesc[l]}
                </p>
              </div>
              <span className="mt-auto text-[#9A2B27] text-xs font-semibold">
                {l === "en" ? "Sundays · 10:50 AM" : "週日 · 上午 10:50"}
              </span>
            </div>
          </div>

          {/* 501c3 note */}
          <div className="bg-[#9A2B27]/8 border border-[#9A2B27]/15 rounded-xl px-6 py-4 flex items-start gap-3">
            <Gift className="w-4 h-4 text-[#9A2B27] shrink-0 mt-0.5" />
            <p className="text-xs text-[#6F685B] font-serif leading-relaxed">
              {t.giveNote[l]}
            </p>
          </div>

          {/* Scripture */}
          <blockquote className="border-l-2 border-[#9A2B27] pl-5 py-1">
            <p className="font-serif text-sm italic text-[#6F685B] leading-relaxed">
              {l === "en"
                ? '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7'
                : "「各人要隨本心所酌定的捐輸，不要作難，不要勉強，因為捐得樂意的人是神所喜愛的。」— 哥林多後書 9:7"}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
