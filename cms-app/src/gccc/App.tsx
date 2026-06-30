"use client";

import { useState, useEffect } from "react";
import { Language, Page, MinistryCategory } from "./types";
import {
  fetchPage,
  fetchSiteSettings,
  findBlock,
  type CmsPageDoc,
  type CmsSiteSettings,
  type VisitorFaqBlockData,
  type FooterBlockData,
} from "./lib/cms";
import RichText from "./components/RichText";
import GcccIntro from "./components/GcccIntro";
import Header from "./components/Header";
import GcccMark from "./components/GcccMark";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FellowshipsPage from "./pages/FellowshipsPage";
import CalendarPage from "./pages/CalendarPage";
import ContactPage from "./pages/ContactPage";
import GivePage from "./pages/GivePage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import PrayerPage from "./pages/PrayerPage";
import MinistryDetailPage from "./pages/MinistryDetailPage";
import GainsvilleDewPage from "./pages/GainsvilleDewPage";
import LeadershipPage from "./pages/LeadershipPage";
import { Heart, CheckCircle, Mail, MapPin, Phone } from "lucide-react";

const NA = "—";

const PAGE_TO_PATH: Record<Page, string> = {
  home: "/",
  about: "/about-us",
  fellowships: "/ministry",
  sermons: "/sermons",
  calendar: "/calendar",
  contact: "/contact",
  give: "/give",
  announcements: "/announcements",
  prayer: "/prayer",
  "gainesville-dew": "/gainesville-dew",
  leadership: "/leadership",
};

const PATH_TO_PAGE: Record<string, Page> = {
  "/": "home",
  "/about-us": "about",
  "/ministry": "fellowships",
  "/sermons": "home",
  "/calendar": "calendar",
  "/contact": "contact",
  "/give": "give",
  "/announcements": "announcements",
  "/prayer": "prayer",
  "/gainesville-dew": "gainesville-dew",
  "/leadership": "leadership",
};

const MINISTRY_CATEGORY_PATHS: Record<string, MinistryCategory> = {
  "/ministry/kids": "kids",
  "/ministry/youth": "youth",
  "/ministry/college": "college",
  "/ministry/adults": "adults",
  "/ministry/senior-adults": "senior-adults",
};

function getPageFromPath(): Page {
  if (MINISTRY_CATEGORY_PATHS[window.location.pathname]) return "fellowships";
  return PATH_TO_PAGE[window.location.pathname] ?? "home";
}

function getCategoryFromPath(): MinistryCategory | null {
  return MINISTRY_CATEGORY_PATHS[window.location.pathname] ?? null;
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>("zh");
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPath);
  const [selectedMinistryCategory, setSelectedMinistryCategory] =
    useState<MinistryCategory | null>(getCategoryFromPath);
  const [introPlaying, setIntroPlaying] = useState(true);
  const [forceReplayKey, setForceReplayKey] = useState(0);
  const [showNewHereModal, setShowNewHereModal] = useState(false);

  // CMS data for the shell (footer + visitor modal)
  const [shellPage, setShellPage] = useState<CmsPageDoc | null>(null);
  const [settings, setSettings] = useState<CmsSiteSettings | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("gccc_intro_seen");
    if (seen) setIntroPlaying(false);
  }, [forceReplayKey]);

  // Sync URL → state on browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
      setSelectedMinistryCategory(getCategoryFromPath());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Fetch shell-level CMS data whenever language changes
  useEffect(() => {
    fetchSiteSettings(currentLang).then(setSettings);
    fetchPage("app-shell", currentLang).then(setShellPage);
  }, [currentLang]);

  const handleReplayIntro = () => {
    sessionStorage.removeItem("gccc_intro_seen");
    setIntroPlaying(true);
    setForceReplayKey((prev) => prev + 1);
  };

  const handlePageChange = (page: Page) => {
    const path = PAGE_TO_PATH[page];
    window.history.pushState({ page }, "", path);
    setCurrentPage(page);
    setSelectedMinistryCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMinistryCategory = (category: MinistryCategory) => {
    const path = `/ministry/${category}`;
    window.history.pushState({ category }, "", path);
    setCurrentPage("fellowships");
    setSelectedMinistryCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visitorFaq = findBlock<VisitorFaqBlockData>(shellPage, "visitorFaq");
  const footerBlock = findBlock<FooterBlockData>(shellPage, "footer");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
      case "sermons":
        return <HomePage currentLang={currentLang} onNavigateTo={handlePageChange} />;
      case "about":
        return <AboutPage currentLang={currentLang} />;
      case "fellowships":
        if (selectedMinistryCategory) {
          return (
            <MinistryDetailPage
              currentLang={currentLang}
              category={selectedMinistryCategory}
              onBack={() => handlePageChange("fellowships")}
            />
          );
        }
        return (
          <FellowshipsPage
            currentLang={currentLang}
            onSelectCategory={handleMinistryCategory}
          />
        );
      case "calendar":
        return <CalendarPage currentLang={currentLang} />;
      case "contact":
        return <ContactPage currentLang={currentLang} />;
      case "give":
        return <GivePage currentLang={currentLang} />;
      case "announcements":
        return <AnnouncementsPage currentLang={currentLang} />;
      case "prayer":
        return <PrayerPage currentLang={currentLang} />;
      case "gainesville-dew":
        return <GainsvilleDewPage currentLang={currentLang} />;
      case "leadership":
        return <LeadershipPage currentLang={currentLang} />;
    }
  };

  // ── Footer nav links ──────────────────────────────────────────────────────
  // Use CMS footer block if populated, otherwise render nothing
  const whoWeAreLinks = footerBlock?.whoWeAreLinks ?? [];
  const getConnectedLinks = footerBlock?.getConnectedLinks ?? [];

  return (
    <div className="min-h-screen bg-[#eeecec] flex flex-col selection:bg-[#9A2B27]/30 selection:text-[#33271E]">
      <GcccIntro
        key={forceReplayKey}
        forceReplay={introPlaying}
        onDone={() => setIntroPlaying(false)}
      />

      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onReplayIntro={handleReplayIntro}
        introPlaying={introPlaying}
      />

      <main
        className={`grow transition-opacity duration-700 ${introPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        {renderPage()}
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative z-10">
        {/* Top: 3 columns */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 border-b border-white/10 pb-12 mb-12">

          {/* Contact column — driven by SiteSettings */}
          <div className="flex flex-col gap-4 py-8 sm:py-0 sm:pr-8 border-b sm:border-b-0 sm:border-r border-white/10">
            <span className="text-xs uppercase font-mono tracking-widest text-white/40 font-semibold mb-1">
              {currentLang === "en" ? "Contact" : "聯絡我們"}
            </span>
            <a
              href={`mailto:${settings?.email ?? ""}`}
              className="flex items-center gap-2 text-lg text-white/60 hover:text-white transition-colors w-fit font-light"
            >
              <Mail className="w-5 h-5 shrink-0" />
              {settings?.email ?? NA}
            </a>
            <a
              href={`tel:${(settings?.phone ?? "").replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-lg text-white/60 hover:text-white transition-colors w-fit font-light"
            >
              <Phone className="w-5 h-5 shrink-0" />
              {settings?.phone ?? NA}
            </a>
            {settings?.address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-lg text-white/60 hover:text-white transition-colors w-fit font-light"
              >
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>
                  {settings.address.replace(/, (Gainesville.*)$/, "")}
                  <br />
                  {settings.address.match(/, (Gainesville.*)$/)?.[1]}
                </span>
              </a>
            )}
          </div>

          {/* Who We Are column — driven by footer block */}
          <div className="flex flex-col gap-4 py-8 sm:py-0 sm:px-8 border-b sm:border-b-0 sm:border-r border-white/10">
            <span className="text-xs uppercase font-mono tracking-widest text-white/40 font-semibold mb-1">
              {currentLang === "en" ? "Who We Are" : "關於我們"}
            </span>
            {whoWeAreLinks.length === 0 ? (
              <span className="text-white/30 font-mono text-sm">{NA}</span>
            ) : (
              whoWeAreLinks.map((link, i) => (
                <button
                  key={link.id ?? i}
                  onClick={() => link.page && handlePageChange(link.page as Page)}
                  className="text-lg text-white/60 hover:text-white transition-colors text-left font-light"
                >
                  {link.label}
                </button>
              ))
            )}
          </div>

          {/* Get Connected column — driven by footer block */}
          <div className="flex flex-col gap-4 py-8 sm:py-0 sm:pl-8">
            <span className="text-xs uppercase font-mono tracking-widest text-white/40 font-semibold mb-1">
              {currentLang === "en" ? "Get Connected" : "聯絡我們"}
            </span>
            {getConnectedLinks.length === 0 ? (
              <span className="text-white/30 font-mono text-sm">{NA}</span>
            ) : (
              getConnectedLinks.map((link, i) => (
                <button
                  key={link.id ?? i}
                  onClick={() => link.page && handlePageChange(link.page as Page)}
                  className="text-lg text-white/60 hover:text-white transition-colors text-left font-light"
                >
                  {link.label}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Middle: social — logo — social */}
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-8 mb-8">
          {/* YouTube */}
          {settings?.youtubeLiveUrl && (
            <a
              href={settings.youtubeLiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
              title="YouTube"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          )}

          {/* Logo center */}
          <button className="cursor-pointer mx-6" onClick={() => handlePageChange("home")}>
            <GcccMark width={72} height={76} strokeColor="#ffffff" />
          </button>

          {/* Instagram */}
          {footerBlock?.instagramUrl && (
            <a
              href={footerBlock.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
              title="Instagram"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          )}
        </div>

        {/* Worship times line */}
        <div className="max-w-5xl mx-auto text-center mb-10">
          <p className="text-sm text-white/40 font-mono">
            {footerBlock?.worshipTimesLine ?? NA}
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-6 text-center text-[11px] text-white/30 font-mono">
          &copy; {new Date().getFullYear()}{" "}
          {currentLang === "en" ? "All Rights Reserved" : "甘城華人基督教會 版權所有"}.{" "}
          {settings?.address ?? NA}.
        </div>
      </footer>

      {/* ── VISITOR FAQ MODAL ──────────────────────────────────────────────── */}
      {showNewHereModal && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewHereModal(false)}
        >
          <div
            className="bg-[#FBF7EF] text-[#33271E] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#E7B7A0]/30 animate-fade-in relative max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#33271E] text-[#FBF7EF] px-6 py-5 md:px-8 border-b border-[#E7B7A0]/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#9A2B27] fill-[#9A2B27]" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {visitorFaq?.modalTitle ?? NA}
                  </h4>
                  {visitorFaq?.modalSubtitle && (
                    <span className="text-[10px] font-mono tracking-wider text-[#E7B7A0] block uppercase">
                      {visitorFaq.modalSubtitle}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowNewHereModal(false)}
                className="bg-black/40 hover:bg-black/60 text-[#FBF7EF] p-1.5 rounded-full transition-colors text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-5 grow">
              {/* Intro text */}
              {visitorFaq?.introText ? (
                <div className="text-sm font-serif italic text-[#6F685B] border-b border-[#E7B7A0]/10 pb-4 mb-2 leading-relaxed">
                  <RichText content={visitorFaq.introText} />
                </div>
              ) : null}

              {/* FAQ items */}
              {(visitorFaq?.faqs ?? []).length === 0 ? (
                <p className="font-mono text-sm text-neutral-400">{NA}</p>
              ) : (
                visitorFaq!.faqs!.map((faq, i) => (
                  <div
                    key={faq.id ?? i}
                    className="bg-white rounded-xl p-4 border border-[#E7B7A0]/25 shadow-sm"
                  >
                    <div className="flex gap-2.5 items-start">
                      <span className="font-mono text-xs font-black text-[#9A2B27] bg-[#9A2B27]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        Q{i + 1}
                      </span>
                      <div>
                        <h5 className="font-serif font-bold text-sm sm:text-base text-[#33271E] leading-snug">
                          {faq.question}
                        </h5>
                        {!!faq.answer && (
                          <RichText
                            content={faq.answer}
                            className="text-xs sm:text-sm text-[#6F685B] mt-2 font-serif leading-relaxed"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Closing note */}
              {visitorFaq?.closingNote && (
                <div className="bg-[#E7B7A0]/15 p-4 rounded-xl border border-[#E7B7A0]/40 flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-[#9A2B27] shrink-0 mt-0.5" />
                  <span className="text-xs font-sans text-[#33271E] leading-relaxed">
                    {visitorFaq.closingNote}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E7B7A0]/20 p-4 bg-white flex justify-end shrink-0">
              <button
                onClick={() => setShowNewHereModal(false)}
                className="bg-[#33271E] hover:bg-neutral-800 text-[#FBF7EF] px-5 py-2 rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
              >
                {visitorFaq?.closeButtonLabel ??
                  (currentLang === "en" ? "Got it, thanks!" : "我明白了，謝謝！")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
