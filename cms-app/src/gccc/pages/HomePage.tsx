"use client";

import { useState, useEffect } from "react";
import { Language, Page } from "../types";
import SermonPlayer from "../components/SermonPlayer";
import { Info, ChevronRight, X, ChevronLeft, HandHeart } from "lucide-react";

interface HomePageProps {
  currentLang: Language;
  onNavigateTo: (page: Page) => void;
}

const cookingPhotos = [
  "/images/cooking competion/27d94bc0-8dad-44c7-a6ab-1e6f8e8a3ead.JPG",
  "/images/cooking competion/573ebce7-ca0f-4bf5-850c-40f19f5d0cad.JPG",
  "/images/cooking competion/IMG_2842.JPG",
  "/images/cooking competion/IMG_2843.JPG",
  "/images/cooking competion/IMG_2847.JPG",
  "/images/cooking competion/IMG_2848.JPG",
];

export default function HomePage({ currentLang, onNavigateTo }: HomePageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + cookingPhotos.length) % cookingPhotos.length,
    );
  const nextPhoto = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % cookingPhotos.length,
    );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex]);

  const t = {
    heroScheduleSentence: {
      en: "Join us this Sunday: Sunday School at 9:30 AM | Bilingual Worship Service at 10:50 AM (In-Person & YouTube Live)",
      zh: "主日聚會日程：上午 9:30 兒童/成人主日學 | 上午 10:50 中英雙語聯合主日崇拜 (實體聚會 & 網路YouTube同步直播)",
    },
    UFStudentSectionTitle: {
      en: "University of Florida Focus",
      zh: "佛羅里達大學 (UF) 重點事工",
    },
    UFStudentSectionDesc: {
      en: "Located just minutes away from the UF campus, we provide undergraduate, graduate, and visiting scholars a secondary home. Enjoy healthy free meals, genuine community, and life-changing discipleship.",
      zh: "座落於佛羅里達大學（UF）校園旁。我們為本科生、研究生和訪問學人安排了豐富的港灣聚會：美味可口的週五愛宴、溫馨相扶的成長小組，與深度真誠的青年生活。",
    },
    directionsTitle: {
      en: "Getting to GCCC from UF",
      zh: "從佛羅里達大學 (UF) 前往教會",
    },
    directionsWalk: {
      en: "15 min walk from SW Recreation",
      zh: "從西南體育館步行約 15 分鐘",
    },
    directionsBus: {
      en: "Take RTS Bus 9, 34, or 35",
      zh: "搭乘甘城公交 9, 34 或 35 路",
    },
    directionsCar: {
      en: "5 mins drive down SW 2nd Ave",
      zh: "自 SW 2nd Ave 驅車僅 5 分鐘",
    },
  };

  return (
    <>
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[calc(95vh-80px)] mt-20 flex items-center px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: `url("/images/hero.JPG")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/60" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/30 to-transparent" />

        <div className="relative z-10 w-full flex flex-col items-start gap-6 text-[#FBF7EF] py-12 md:py-24 animate-fade-in pl-[10%] pr-[10%] sm:pr-[35%]">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
            {currentLang === "en"
              ? "Welcome to Gainesville Chinese Christian Church"
              : "歡迎來到甘城華人教會"}
          </h1>

          <p className="font-mono text-sm sm:text-sm text-[#E7B7A0] tracking-widest leading-relaxed">
            {t.heroScheduleSentence[currentLang]}
          </p>
        </div>
      </section>

      {/* SUNDAY SERVICE */}
      <section
        id="sunday-service"
        className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl lg:h-140">
          {/* Image panel */}
          <div className="lg:w-1/2 shrink-0 h-64 lg:h-full">
            <img
              src="/images/sundayservice.JPG"
              alt="Sunday Service at GCCC"
              className="w-full h-full object-cover block"
            />
          </div>
          {/* Content panel */}
          <div className="bg-[#fefefe] px-8 py-8 lg:px-10 flex flex-col justify-between gap-4 lg:w-1/2">
            <div>
              <span className="font-mono text-xs text-[#7b7878] uppercase tracking-[3px] font-bold block mb-2">
                {currentLang === "en"
                  ? "You Are Welcome Here"
                  : "歡迎你來到我們中間"}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-black font-bold tracking-tight leading-snug">
                {currentLang === "en" ? "Sunday Service" : "主日崇拜"}
              </h2>
            </div>

            <p className="text-lg text-[#70665f] font-serif leading-relaxed">
              {currentLang === "en"
                ? "Every Sunday we gather as one family — in English and Mandarin — to worship, learn from God's Word, and encourage one another. Whether you're visiting for the first time or returning home, there is a place for you."
                : "每主日，我們以中英雙語齊聚一堂，敬拜讚美、聆聽神話語、彼此相扶。無論你是第一次來訪，還是尋覓屬靈的家，這裡都有你的位置。"}
            </p>

            {/* Schedule items */}
            <div className="divide-y divide-transparent">
              {[
                {
                  time: currentLang === "en" ? "9:30 AM" : "上午 9:30",
                  label: currentLang === "en" ? "Sunday School" : "主日學",
                  sub:
                    currentLang === "en" ? "Children & Adults" : "兒童及成人班",
                },
                {
                  time: currentLang === "en" ? "10:50 AM" : "上午 10:50",
                  label:
                    currentLang === "en"
                      ? "Bilingual Worship Service"
                      : "中英雙語主日崇拜",
                  sub:
                    currentLang === "en"
                      ? "In-Person & YouTube Live"
                      : "實體聚會 & YouTube 同步直播",
                },
              ].map((item) => (
                <div key={item.time} className="flex items-baseline gap-6 py-4">
                  <span className="font-mono text-base text-[#9A2B27] font-bold whitespace-nowrap w-28 shrink-0">
                    {item.time}
                  </span>
                  <div>
                    <p className="font-serif text-lg text-[#33271E] font-semibold leading-snug">
                      {item.label}
                    </p>
                    <p className="font-mono text-sm text-[#7b7878] tracking-wide mt-1">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA + address */}
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <a
                  href="https://www.youtube.com/@gccc_gainesville"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#7e2320] text-white px-5 py-2.5 rounded-lg text-base font-semibold transition-all shadow-lg shadow-black/20 border-amber-50 border"
                >
                  {currentLang === "en" ? "Watch Live" : "線上直播"}
                  <ChevronRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onNavigateTo("contact")}
                  className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#7e2320] text-white px-5 py-2.5 rounded-lg text-base font-semibold transition-all shadow-lg shadow-black/20 border-amber-50 border"
                >
                  {currentLang === "en" ? "Find Us" : "前往教會"}
                  <Info className="w-4 h-4" />
                </button>
              </div>
              <div className="pt-4">
                <p className="font-mono text-xs text-[#7b7878] uppercase tracking-widest">
                  {currentLang === "en"
                    ? "2850 NW 23rd Blvd, Gainesville, FL 32605"
                    : "2850 NW 23rd Blvd, Gainesville, FL 32605"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRAYER REQUESTS */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse rounded-3xl overflow-hidden shadow-2xl lg:h-140">
          {/* Image panel */}
          <div className="lg:w-1/2 shrink-0 h-64 lg:h-full">
            <img
              src="/images/junjie.JPG"
              alt="Congregation in prayer"
              className="w-full h-full object-cover block"
            />
          </div>

          {/* Content panel */}
          <div className="bg-[#fefefe] px-8 py-8 lg:px-10 flex flex-col justify-between gap-4 lg:w-1/2">
            <div>
              <span className="font-mono text-xs text-[#7b7878] uppercase tracking-[3px] font-bold block mb-2">
                {currentLang === "en"
                  ? "Bring Your Burdens to God"
                  : "將你的重擔帶到神面前"}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-black font-bold tracking-tight leading-snug">
                {currentLang === "en" ? "Prayer Requests" : "代禱事項"}
              </h2>
            </div>

            <p className="text-lg text-[#70665f] font-serif leading-relaxed">
              {currentLang === "en"
                ? "Prayer is our lifeline, and everyone is invited. We have seen God's power save, heal, and restore too many times to expect anything less. There is strength when we bring our needs to God together. We know that He hears us and He answers."
                : "禱告是我們的生命線，我們歡迎每一個人的加入。我們已無數次見證了神拯救、醫治與恢復的大能，因此我們絕不會降低對祂的期盼。當我們同心合意將需要帶到神面前時，便大有力量。我們深知，祂在垂聽，也必應允。"}
            </p>

            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => {
                    sessionStorage.setItem("gccc_scroll_prayer", "1");
                    onNavigateTo("prayer");
                  }}
                  className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#7e2320] text-white px-5 py-2.5 rounded-lg text-base font-semibold transition-all shadow-lg shadow-black/20 border-amber-50 border"
                >
                  {currentLang === "en"
                    ? "Submit a Prayer Request"
                    : "提交代禱事項"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERMONS — inline on home page for easy visitor access */}
      <section
        id="sermons"
        className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center"
      >
        <div className="mb-8">
          <h2 className="font-serif text-3xl md:text-6xl text-[#33271E] font-bold tracking-tight">
            {currentLang === "en" ? "Recent Sermons" : "近期主日講道"}
          </h2>
        </div>
        <SermonPlayer currentLang={currentLang} />
      </section>

      {/* ACTIVITIES */}
      <section
        id="activities"
        className="text-center py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-6xl text-brand-brown-dark font-bold tracking-tight">
            {currentLang === "en" ? "Recent Activities" : "近期活動"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Activity Card: Cooking Competition */}
          <div className="group rounded-3xl overflow-hidden shadow-xl border border-brand-tan/20 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row">
            {/* Image grid */}
            <div className="grid grid-cols-3 grid-rows-2 lg:w-3/5 shrink-0 h-72 lg:h-96">
              <img
                src={cookingPhotos[0]}
                alt="He and She Fellowship cooking competition group"
                className="w-full h-full object-cover col-span-2 row-span-2 cursor-pointer"
                onClick={() => openLightbox(0)}
              />
              <img
                src={cookingPhotos[2]}
                alt="Cooking competition kitchen prep"
                className="w-full h-full object-cover border-l-2 border-b border-white cursor-pointer"
                onClick={() => openLightbox(2)}
              />
              <img
                src={cookingPhotos[4]}
                alt="Cooking competition serving"
                className="w-full h-full object-cover border-l-2 border-t border-white cursor-pointer"
                onClick={() => openLightbox(4)}
              />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 flex flex-col justify-between gap-6 lg:w-2/5">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-brand-red uppercase tracking-widest font-bold bg-brand-red/8 px-3 py-1 rounded-full">
                    {currentLang === "en" ? "Fellowship" : "團契活動"}
                  </span>
                  <span className="font-mono text-[10px] text-[#6F685B]/60 tracking-wide">
                    {currentLang === "en" ? "Jun 2025" : "2025 年 6 月"}
                  </span>
                </div>

                <p className="font-mono text-xs text-brand-red uppercase tracking-widest font-bold mb-1">
                  Alpha Fellowship
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-brown-dark font-bold leading-snug mb-4">
                  {currentLang === "en"
                    ? "He & She Fellowship Cooking Competition"
                    : "弟兄姊妹團契廚藝大賽"}
                </h3>
                <div className="h-0.5 w-10 bg-brand-red mb-5" />
                <p className="font-serif text-base text-[#6F685B] leading-relaxed">
                  {currentLang === "en"
                    ? "Brothers and sisters from Alpha Fellowship put their culinary skills to the test in a friendly cooking competition — a joyful evening celebrating community, creativity, and delicious food together."
                    : "Alpha 團契的弟兄姊妹各展廚藝，在歡樂的廚藝競賽中切磋交流，共享美食，彼此相連，溫馨難忘。"}
                </p>
              </div>

              {/* Thumbnail strip — click any to open lightbox */}
              <div className="flex gap-2 flex-wrap">
                {cookingPhotos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Photo ${i + 1}`}
                    onClick={() => openLightbox(i)}
                    className="w-14 h-14 rounded-lg object-cover shadow cursor-pointer hover:ring-2 hover:ring-brand-red transition-all"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Image */}
          <img
            src={cookingPhotos[lightboxIndex]}
            alt={`Photo ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {cookingPhotos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${i === lightboxIndex ? "bg-white scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
