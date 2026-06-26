import { useState, useEffect } from "react";
import { Language, Page, MinistryCategory } from "./types";
import { siteSettings } from "./data";
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
import {
  Heart,
  CheckCircle,
  Sparkles,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

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

  const t = {
    visitorModalTitle: {
      en: "Welcome to GCCC!",
      zh: "熱忱歡迎您來到甘城華人教會！",
    },
    visitorModalSub: {
      en: "Frequently Asked Questions for Guests",
      zh: "為新走入教會的朋友解答以下心中常問的多個問題",
    },
    visitorQ1: { en: "What language is spoken?", zh: "我們聚會使用什麼語言？" },
    visitorA1: {
      en: "Our Sunday Service is joint bilingual (English and Mandarin Chinese) with live translations for sermons and messages.",
      zh: "我們的主日崇拜、報告與講道採取雙語（中文普通話與英文）同步翻譯，中英文會眾都能融洽得造就。",
    },
    visitorQ2: {
      en: "Is there a program for children?",
      zh: "我的孩子能參與什麼活動？",
    },
    visitorA2: {
      en: "Yes! We run Children's Sunday School (9:30 AM) and provide loving child supervision and youth groups during worship services.",
      zh: "絕對有！我們在每週日上午 9:30 設有各年齡層的孩子主日學，在崇拜時間亦有專為兒童照看與青少年陪伴預備的輔助事工。",
    },
    visitorQ3: {
      en: "Do I need to sign up for Friday dinner?",
      zh: "週五學生與學者晚餐需要提前預約嗎？",
    },
    visitorA3: {
      en: "No sign ups required. Just show up! Dinner starts at 6:30 PM in the Fellowship Hall. We would love to serve you.",
      zh: "完全不需要！每週五傍晚 6:30 供應愛宴，直接前來走入教會副堂即可，我們期待為您奉上暖胃家常菜！",
    },
    socialLinks: {
      en: "Social Media Channels & Resources",
      zh: "常用社群渠道與資源連結",
    },
    rights: { en: "All Rights Reserved", zh: "甘城華人基督教會 版權所有" },
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
      case "sermons":
        return (
          <HomePage currentLang={currentLang} onNavigateTo={handlePageChange} />
        );
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
        className={`flex-grow transition-opacity duration-700 ${introPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        {renderPage()}
      </main>

      <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative z-10">
        {/* Top: 3 columns */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 border-b border-white/10 pb-12 mb-12">
          {/* Contact column */}
          <div className="flex flex-col gap-4 py-8 sm:py-0 sm:pr-8 border-b sm:border-b-0 sm:border-r border-white/10">
            <span className="text-xs uppercase font-mono tracking-widest text-white/40 font-semibold mb-1">
              {currentLang === "en" ? "Contact" : "聯絡我們"}
            </span>
            <a
              href={`mailto:${siteSettings.email}`}
              className="flex items-center gap-2 text-lg text-white/60 hover:text-white transition-colors w-fit font-light"
            >
              <Mail className="w-5 h-5 shrink-0" />
              {siteSettings.email}
            </a>
            <a
              href={`tel:${siteSettings.phone}`}
              className="flex items-center gap-2 text-lg text-white/60 hover:text-white transition-colors w-fit font-light"
            >
              <Phone className="w-5 h-5 shrink-0" />
              {siteSettings.phone}
            </a>
            <a
              href="https://maps.google.com/?q=2850+NW+23rd+Blvd,+Gainesville,+FL+32605"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-lg text-white/60 hover:text-white transition-colors w-fit font-light"
            >
              <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
              <span>
                {siteSettings.address[currentLang].replace(
                  /, (Gainesville.*)$/,
                  "",
                )}
                <br />
                {
                  siteSettings.address[currentLang].match(
                    /, (Gainesville.*)$/,
                  )?.[1]
                }
              </span>
            </a>
          </div>

          {/* Who We Are column */}
          <div className="flex flex-col gap-4 py-8 sm:py-0 sm:px-8 border-b sm:border-b-0 sm:border-r border-white/10">
            <span className="text-xs uppercase font-mono tracking-widest text-white/40 font-semibold mb-1">
              {currentLang === "en" ? "Who We Are" : "關於我們"}
            </span>
            {(
              [
                { label: { en: "Home", zh: "首頁" }, page: "home" as Page },
                {
                  label: { en: "About Us", zh: "關於我們" },
                  page: "about" as Page,
                },
                {
                  label: { en: "Ministry", zh: "团契事工" },
                  page: "fellowships" as Page,
                },
                {
                  label: { en: "Events", zh: "活動" },
                  page: "announcements" as Page,
                },
              ] as const
            ).map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className="text-lg text-white/60 hover:text-white transition-colors text-left font-light"
              >
                {label[currentLang]}
              </button>
            ))}
          </div>

          {/* Get Connected column */}
          <div className="flex flex-col gap-4 py-8 sm:py-0 sm:pl-8">
            <span className="text-xs uppercase font-mono tracking-widest text-white/40 font-semibold mb-1">
              {currentLang === "en" ? "Get Connected" : "聯絡我們"}
            </span>
            <button
              onClick={() => handlePageChange("contact")}
              className="text-lg text-white/60 hover:text-white transition-colors text-left font-light"
            >
              {currentLang === "en" ? "Connection Card" : "聯絡卡"}
            </button>
            <button
              onClick={() => handlePageChange("prayer")}
              className="text-lg text-white/60 hover:text-white transition-colors text-left font-light"
            >
              {currentLang === "en" ? "Prayer" : "代禱事項"}
            </button>
            <button
              onClick={() => handlePageChange("give")}
              className="text-lg text-white/60 hover:text-white transition-colors text-left font-light"
            >
              {currentLang === "en" ? "Give" : "線上奉獻"}
            </button>
          </div>
        </div>

        {/* Middle: social — logo — social */}
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-8 mb-8">
          {/* YouTube left */}
          <a
            href={siteSettings.youtubeLiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors"
            title="YouTube"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* Logo center */}
          <button
            className="cursor-pointer mx-6"
            onClick={() => handlePageChange("home")}
          >
            <GcccMark width={72} height={76} strokeColor="#ffffff" />
          </button>

          {/* Instagram right */}
          <a
            href="https://www.instagram.com/gccc_alpha/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors"
            title="Instagram"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        {/* Worship times */}
        <div className="max-w-5xl mx-auto text-center mb-10">
          <p className="text-sm text-white/40 font-mono">
            {currentLang === "en"
              ? "Join us for worship every Sunday at 10:50 AM & Friday at 6:30 PM"
              : "歡迎每週日上午 10:50 及週五晚 6:30 與我們一同敬拜"}
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-6 text-center text-[11px] text-white/30 font-mono">
          &copy; {new Date().getFullYear()} {t.rights[currentLang]}.{" "}
          {siteSettings.address[currentLang]}.
        </div>
      </footer>

      {showNewHereModal && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewHereModal(false)}
        >
          <div
            className="bg-[#FBF7EF] text-[#33271E] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#E7B7A0]/30 animate-fade-in relative max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#33271E] text-[#FBF7EF] px-6 py-5 md:px-8 border-b border-[#E7B7A0]/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#9A2B27] fill-[#9A2B27]" />
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {t.visitorModalTitle[currentLang]}
                  </h4>
                  <span className="text-[10px] font-mono tracking-wider text-[#E7B7A0] block uppercase">
                    {t.visitorModalSub[currentLang]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowNewHereModal(false)}
                className="bg-black/40 hover:bg-black/60 text-[#FBF7EF] p-1.5 rounded-full transition-colors text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto space-y-5 flex-grow">
              <div className="text-sm font-serif italic text-[#6F685B] border-b border-[#E7B7A0]/10 pb-4 mb-2 leading-relaxed">
                {currentLang === "zh"
                  ? "「若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。」— 哥林多後書 5:17。我們非常期待與您建立深刻的連結，以下為您整理了初次來到本堂最實用的信息指南："
                  : "We are genuinely delighted you're exploring GCCC. Our hearts are packed with warmth and expectation as we look forward to shaking hands soon. Here are a handful of handy questions answered:"}
              </div>
              {(
                [
                  { q: t.visitorQ1, a: t.visitorA1, n: "Q1" },
                  { q: t.visitorQ2, a: t.visitorA2, n: "Q2" },
                  { q: t.visitorQ3, a: t.visitorA3, n: "Q3" },
                ] as const
              ).map(({ q, a, n }) => (
                <div
                  key={n}
                  className="bg-white rounded-xl p-4 border border-[#E7B7A0]/25 shadow-sm"
                >
                  <div className="flex gap-2.5 items-start">
                    <span className="font-mono text-xs font-black text-[#9A2B27] bg-[#9A2B27]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {n}
                    </span>
                    <div>
                      <h5 className="font-serif font-bold text-sm sm:text-base text-[#33271E] leading-snug">
                        {q[currentLang]}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#6F685B] mt-2 font-serif leading-relaxed">
                        {a[currentLang]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-[#E7B7A0]/15 p-4 rounded-xl border border-[#E7B7A0]/40 flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#9A2B27] shrink-0 mt-0.5" />
                <span className="text-xs font-sans text-[#33271E] leading-relaxed">
                  {currentLang === "zh"
                    ? "無需任何著裝限制 (No Dress Code)。聚會時穿著舒適、得體的便服即可。歡迎您和家人朋友前來，我們非常期待親自向您問好！"
                    : "No specific dress codes or prior bookings necessary. Dress in whatever casual, respectful clothing makes you feel comfortable. Looking forward to greeting you!"}
                </span>
              </div>
            </div>
            <div className="border-t border-[#E7B7A0]/20 p-4 bg-white flex justify-end shrink-0">
              <button
                onClick={() => setShowNewHereModal(false)}
                className="bg-[#33271E] hover:bg-neutral-800 text-[#FBF7EF] px-5 py-2 rounded-lg text-xs font-semibold shadow transition-all cursor-pointer"
              >
                {currentLang === "en" ? "Got it, thanks!" : "我明白了，謝謝！"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
