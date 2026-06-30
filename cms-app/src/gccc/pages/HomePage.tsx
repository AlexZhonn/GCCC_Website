"use client";

import { useState, useEffect } from "react";
import { Language, Page } from "../types";
import SermonPlayer from "../components/SermonPlayer";
import RichText from "../components/RichText";
import { fetchPageGlobal, mediaUrl, type HomePageGlobalDoc } from "../lib/cms";
import { Info, ChevronRight, X, ChevronLeft } from "lucide-react";

const NA = "—";

interface HomePageProps {
  currentLang: Language;
  onNavigateTo: (page: Page) => void;
}

export default function HomePage({ currentLang, onNavigateTo }: HomePageProps) {
  const [doc, setDoc] = useState<HomePageGlobalDoc | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPageGlobal<HomePageGlobalDoc>("page-home", currentLang).then(setDoc);
  }, [currentLang]);

  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + lightboxPhotos.length) % lightboxPhotos.length,
    );
  const nextPhoto = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % lightboxPhotos.length,
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
  }, [lightboxIndex, lightboxPhotos]);

  // ── Section data ─────────────────────────────────────────────────────────
  const hero = doc?.hero;
  const sunday = doc?.sundayService;
  const prayer = doc?.prayerFeature;
  const campus = doc?.campusFocus;
  const activities = doc?.activities;

  const heroBg = mediaUrl(hero?.backgroundImage);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[calc(95vh-80px)] mt-20 flex items-center px-4 sm:px-6 lg:px-8 bg-cover bg-center"
        style={heroBg ? { backgroundImage: `url("${heroBg}")` } : undefined}
      >
        <div className="absolute inset-0 bg-neutral-900/60" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/30 to-transparent" />

        <div className="relative z-10 w-full flex flex-col items-start gap-6 text-[#FBF7EF] py-12 md:py-24 animate-fade-in pl-[10%] pr-[10%] sm:pr-[35%]">
          {hero ? (
            <>
              {hero.eyebrow && (
                <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest">
                  {hero.eyebrow}
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-tight">
                {hero.heading}
              </h1>
              {hero.subheading && (
                <p className="font-mono text-sm text-[#E7B7A0] tracking-widest leading-relaxed">
                  {hero.subheading}
                </p>
              )}
            </>
          ) : (
            <p className="font-mono text-sm text-white/40">{NA}</p>
          )}
        </div>
      </section>

      {/* ── SUNDAY SERVICE ───────────────────────────────────────────────── */}
      <section
        id="sunday-service"
        className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto"
      >
        {sunday ? (
          <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl lg:h-140">
            {/* Image panel */}
            <div className="lg:w-1/2 shrink-0 h-64 lg:h-full">
              {mediaUrl(sunday.image) ? (
                <img
                  src={mediaUrl(sunday.image)!}
                  alt={sunday.heading}
                  className="w-full h-full object-cover block"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 text-sm font-mono">
                  {NA}
                </div>
              )}
            </div>

            {/* Content panel */}
            <div className="bg-[#fefefe] px-8 py-8 lg:px-10 flex flex-col justify-between gap-4 lg:w-1/2">
              <div>
                {sunday.eyebrow && (
                  <span className="font-mono text-xs text-[#7b7878] uppercase tracking-[3px] font-bold block mb-2">
                    {sunday.eyebrow}
                  </span>
                )}
                <h2 className="font-serif text-4xl md:text-5xl text-black font-bold tracking-tight leading-snug">
                  {sunday.heading}
                </h2>
              </div>

              {!!sunday.body && (
                <RichText
                  content={sunday.body}
                  className="text-lg text-[#70665f] font-serif leading-relaxed"
                />
              )}

              {/* Schedule items */}
              {(sunday.scheduleItems ?? []).length > 0 && (
                <div className="divide-y divide-transparent">
                  {sunday.scheduleItems!.map((item, i) => (
                    <div key={item.id ?? i} className="flex items-baseline gap-6 py-4">
                      <span className="font-mono text-base text-[#9A2B27] font-bold whitespace-nowrap w-28 shrink-0">
                        {item.time}
                      </span>
                      <div>
                        <p className="font-serif text-lg text-[#33271E] font-semibold leading-snug">
                          {item.label}
                        </p>
                        {item.sub && (
                          <p className="font-mono text-sm text-[#7b7878] tracking-wide mt-1">
                            {item.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div>
                <div className="flex flex-wrap gap-3 mb-4">
                  {sunday.watchLiveUrl && (
                    <a
                      href={sunday.watchLiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#7e2320] text-white px-5 py-2.5 rounded-lg text-base font-semibold transition-all shadow-lg shadow-black/20 border-amber-50 border"
                    >
                      {sunday.watchLiveLabel ?? (currentLang === "en" ? "Watch Live" : "線上直播")}
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => onNavigateTo("contact")}
                    className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#7e2320] text-white px-5 py-2.5 rounded-lg text-base font-semibold transition-all shadow-lg shadow-black/20 border-amber-50 border"
                  >
                    {sunday.findUsLabel ?? (currentLang === "en" ? "Find Us" : "前往教會")}
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                {sunday.addressLine && (
                  <div className="pt-4">
                    <p className="font-mono text-xs text-[#7b7878] uppercase tracking-widest">
                      {sunday.addressLine}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white/60 border border-black/8 p-12 text-center text-neutral-400 font-mono text-sm shadow">
            {NA}
          </div>
        )}
      </section>

      {/* ── PRAYER FEATURE ───────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        {prayer ? (
          <div className="flex flex-col lg:flex-row-reverse rounded-3xl overflow-hidden shadow-2xl lg:h-140">
            {/* Image panel */}
            <div className="lg:w-1/2 shrink-0 h-64 lg:h-full">
              {mediaUrl(prayer.image) ? (
                <img
                  src={mediaUrl(prayer.image)!}
                  alt={prayer.heading}
                  className="w-full h-full object-cover block"
                />
              ) : (
                <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400 text-sm font-mono">
                  {NA}
                </div>
              )}
            </div>

            {/* Content panel */}
            <div className="bg-[#fefefe] px-8 py-8 lg:px-10 flex flex-col justify-between gap-4 lg:w-1/2">
              <div>
                {prayer.eyebrow && (
                  <span className="font-mono text-xs text-[#7b7878] uppercase tracking-[3px] font-bold block mb-2">
                    {prayer.eyebrow}
                  </span>
                )}
                <h2 className="font-serif text-4xl md:text-5xl text-black font-bold tracking-tight leading-snug">
                  {prayer.heading}
                </h2>
              </div>

              {!!prayer.body && (
                <RichText
                  content={prayer.body}
                  className="text-lg text-[#70665f] font-serif leading-relaxed"
                />
              )}

              <div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={() => {
                      sessionStorage.setItem("gccc_scroll_prayer", "1");
                      onNavigateTo("prayer");
                    }}
                    className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#7e2320] text-white px-5 py-2.5 rounded-lg text-base font-semibold transition-all shadow-lg shadow-black/20 border-amber-50 border"
                  >
                    {prayer.ctaLabel ??
                      (currentLang === "en"
                        ? "Submit a Prayer Request"
                        : "提交代禱事項")}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-white/60 border border-black/8 p-12 text-center text-neutral-400 font-mono text-sm shadow">
            {NA}
          </div>
        )}
      </section>

      {/* ── SERMONS ──────────────────────────────────────────────────────── */}
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

      {/* ── CAMPUS FOCUS ─────────────────────────────────────────────────── */}
      {campus && (
        <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-[#E7B7A0]/20 p-8 md:p-12">
            <h2 className="font-serif text-2xl md:text-4xl text-[#33271E] font-bold tracking-tight mb-3">
              {campus.sectionTitle}
            </h2>
            {campus.sectionDesc && (
              <p className="text-[#6F685B] font-serif text-base md:text-lg leading-relaxed mb-6">
                {campus.sectionDesc}
              </p>
            )}
            {campus.directionsTitle && (
              <p className="font-mono text-xs text-[#9A2B27] uppercase tracking-widest font-bold mb-4">
                {campus.directionsTitle}
              </p>
            )}
            {(campus.directionItems ?? []).length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {campus.directionItems!.map((d, i) => (
                  <li
                    key={i}
                    className="bg-[#9A2B27]/8 border border-[#9A2B27]/15 rounded-xl px-4 py-2 text-sm font-sans text-[#33271E]"
                  >
                    {d.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ── ACTIVITIES ───────────────────────────────────────────────────── */}
      <section
        id="activities"
        className="text-center py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {activities ? (
          <>
            <div className="mb-10">
              <h2 className="font-serif text-3xl md:text-6xl text-brand-brown-dark font-bold tracking-tight">
                {activities.heading}
              </h2>
            </div>

            {(activities.items ?? []).length === 0 ? (
              <p className="text-neutral-400 font-mono text-sm">{NA}</p>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {activities.items!.map((item, idx) => {
                  // Build photo URL list: prefer CMS media uploads, fall back to legacy paths
                  const photos: string[] = [
                    ...(item.photos ?? [])
                      .map((p) => mediaUrl(p.photo))
                      .filter(Boolean) as string[],
                    ...(item.legacyPhotoPaths ?? []).map((p) => p.path),
                  ];

                  return (
                    <div
                      key={item.id ?? idx}
                      className="group rounded-3xl overflow-hidden shadow-xl border border-brand-tan/20 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row"
                    >
                      {/* Photo grid — up to 3 photos */}
                      {photos.length > 0 ? (
                        <div className="grid grid-cols-3 grid-rows-2 lg:w-3/5 shrink-0 h-72 lg:h-96">
                          <img
                            src={photos[0]}
                            alt={item.title}
                            className="w-full h-full object-cover col-span-2 row-span-2 cursor-pointer"
                            onClick={() => {
                              setLightboxPhotos(photos);
                              setLightboxIndex(0);
                            }}
                          />
                          {photos[1] && (
                            <img
                              src={photos[1]}
                              alt={`${item.title} 2`}
                              className="w-full h-full object-cover border-l-2 border-b border-white cursor-pointer"
                              onClick={() => {
                                setLightboxPhotos(photos);
                                setLightboxIndex(1);
                              }}
                            />
                          )}
                          {photos[2] && (
                            <img
                              src={photos[2]}
                              alt={`${item.title} 3`}
                              className="w-full h-full object-cover border-l-2 border-t border-white cursor-pointer"
                              onClick={() => {
                                setLightboxPhotos(photos);
                                setLightboxIndex(2);
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="lg:w-3/5 shrink-0 h-72 lg:h-96 bg-neutral-100 flex items-center justify-center text-neutral-400 font-mono text-sm">
                          {NA}
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-8 lg:p-10 flex flex-col justify-between gap-6 lg:w-2/5">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            {item.fellowship && (
                              <span className="font-mono text-[10px] text-brand-red uppercase tracking-widest font-bold bg-brand-red/8 px-3 py-1 rounded-full">
                                {currentLang === "en" ? "Fellowship" : "團契活動"}
                              </span>
                            )}
                            {item.dateLabel && (
                              <span className="font-mono text-[10px] text-[#6F685B]/60 tracking-wide">
                                {item.dateLabel}
                              </span>
                            )}
                          </div>
                          {item.fellowship && (
                            <p className="font-mono text-xs text-brand-red uppercase tracking-widest font-bold mb-1">
                              {item.fellowship}
                            </p>
                          )}
                          <h3 className="font-serif text-2xl md:text-3xl text-brand-brown-dark font-bold leading-snug mb-4">
                            {item.title}
                          </h3>
                          <div className="h-0.5 w-10 bg-brand-red mb-5" />
                          {!!item.description && (
                            <RichText
                              content={item.description}
                              className="font-serif text-base text-[#6F685B] leading-relaxed"
                            />
                          )}
                        </div>

                        {/* Thumbnail strip */}
                        {photos.length > 1 && (
                          <div className="flex gap-2 flex-wrap">
                            {photos.map((src, i) => (
                              <img
                                key={i}
                                src={src}
                                alt={`Photo ${i + 1}`}
                                onClick={() => {
                                  setLightboxPhotos(photos);
                                  setLightboxIndex(i);
                                }}
                                className="w-14 h-14 rounded-lg object-cover shadow cursor-pointer hover:ring-2 hover:ring-brand-red transition-all"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl bg-white/60 border border-black/8 p-12 text-center text-neutral-400 font-mono text-sm shadow">
            {NA}
          </div>
        )}
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && lightboxPhotos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X className="w-7 h-7" />
          </button>
          <button
            className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <img
            src={lightboxPhotos[lightboxIndex]}
            alt={`Photo ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight className="w-7 h-7" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {lightboxPhotos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === lightboxIndex ? "bg-white scale-125" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
