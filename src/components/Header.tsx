import { useState, useEffect, useRef } from "react";
import { Language, Page } from "../types";
import GcccMark from "./GcccMark";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onReplayIntro?: () => void;
  introPlaying: boolean;
}

export default function Header({
  currentLang,
  onLanguageChange,
  currentPage,
  onPageChange,
  introPlaying,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [connectDropdownOpen, setConnectDropdownOpen] = useState(false);
  const [mobileConnectOpen, setMobileConnectOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const eventsDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setConnectDropdownOpen(false);
      }
      if (
        eventsDropdownRef.current &&
        !eventsDropdownRef.current.contains(e.target as Node)
      ) {
        setEventsDropdownOpen(false);
      }
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(e.target as Node)
      ) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const t = {
    navHome: { en: "Home", zh: "首頁" },
    navAbout: { en: "About Us", zh: "關於我們" },
    navGainsvilleDew: { en: "Gainesville Dew", zh: "甘城甘露" },
    navFellowships: { en: "Ministries", zh: "团契事工" },
    navLeaders: { en: "Leadership", zh: "牧師同工" },
    navEvents: { en: "Events", zh: "活動" },
    navEventsCalendar: { en: "Church Calendar", zh: "教會行事曆" },
    navEventsAnnouncements: { en: "Announcements", zh: "教會公告" },
    navConnect: { en: "Get Connected", zh: "聯絡我們" },
    navConnectCard: { en: "Connection Card", zh: "聯絡卡" },
    navConnectPrayer: { en: "Prayer Requests", zh: "代禱事項" },
    navConnectGive: { en: "Give", zh: "奉獻" },
    wordmarkZh: "甘城華人教會",
    wordmarkEn: "GCCC FL",
  };

  const handleNav = (page: Page) => {
    setMobileMenuOpen(false);
    setConnectDropdownOpen(false);
    setEventsDropdownOpen(false);
    setAboutDropdownOpen(false);
    setMobileAboutOpen(false);
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="gccc_header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-black/10 py-2"
          : "bg-white/80 backdrop-blur-sm py-4"
      } ${introPlaying ? "opacity-0 pointer-events-none" : "opacity-100 animate-fade-in"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Wordmark */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNav("home")}
          >
            <div className="transform transition-transform duration-300 group-hover:scale-105">
              <GcccMark width={44} height={46} strokeColor="#000000" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-black leading-tight">
                {t.wordmarkZh}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-gray-500 font-medium uppercase leading-tight">
                {t.wordmarkEn}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3">
            {/* Home */}
            <button
              onClick={() => handleNav("home")}
              className={`font-sans text-base font-medium px-3 py-2 rounded-md transition-colors relative group ${
                currentPage === "home"
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {t.navHome[currentLang]}
              <span
                className={`absolute bottom-1 left-3 right-3 h-[2px] bg-black transition-transform duration-300 origin-center ${currentPage === "home" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              />
            </button>

            {/* About Us dropdown */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                onClick={() => setAboutDropdownOpen((o) => !o)}
                className={`font-sans text-base font-medium px-3 py-2 rounded-md transition-colors relative group flex items-center gap-1 ${
                  currentPage === "about" || currentPage === "gainesville-dew" || currentPage === "leadership"
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t.navAbout[currentLang]}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? "rotate-180" : ""}`}
                />
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[2px] bg-black transition-transform duration-300 origin-center ${currentPage === "about" || currentPage === "gainesville-dew" || currentPage === "leadership" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </button>
              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-black/8 overflow-hidden py-1 animate-fade-in">
                  <button
                    onClick={() => handleNav("about")}
                    className={`w-full text-left px-4 py-2.5 text-sm font-sans hover:bg-black/5 hover:text-black transition-colors ${currentPage === "about" ? "text-black font-semibold" : "text-gray-700"}`}
                  >
                    {currentLang === "en" ? "Our Story" : "教會歷史"}
                  </button>
                  <button
                    onClick={() => handleNav("leadership")}
                    className={`w-full text-left px-4 py-2.5 text-sm font-sans hover:bg-black/5 hover:text-black transition-colors ${currentPage === "about" ? "text-black font-semibold" : "text-gray-700"}`}
                  >
                    {currentLang === "en" ? "Leadership" : "牧師同工"}
                  </button>
                  <button
                    onClick={() => handleNav("gainesville-dew")}
                    className={`w-full text-left px-4 py-2.5 text-sm font-sans hover:bg-black/5 hover:text-black transition-colors ${currentPage === "gainesville-dew" ? "text-black font-semibold" : "text-gray-700"}`}
                  >
                    {t.navGainsvilleDew[currentLang]}
                  </button>
                </div>
              )}
            </div>

            {/* Ministries */}
            <button
              onClick={() => handleNav("fellowships")}
              className={`font-sans text-base font-medium px-3 py-2 rounded-md transition-colors relative group ${
                currentPage === "fellowships"
                  ? "text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {t.navFellowships[currentLang]}
              <span
                className={`absolute bottom-1 left-3 right-3 h-[2px] bg-black transition-transform duration-300 origin-center ${currentPage === "fellowships" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
              />
            </button>

            {/* Events dropdown */}
            <div className="relative" ref={eventsDropdownRef}>
              <button
                onClick={() => setEventsDropdownOpen((o) => !o)}
                className={`font-sans text-base font-medium px-3 py-2 rounded-md transition-colors relative group flex items-center gap-1 ${
                  currentPage === "calendar" || currentPage === "announcements"
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t.navEvents[currentLang]}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${eventsDropdownOpen ? "rotate-180" : ""}`}
                />
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[2px] bg-black transition-transform duration-300 origin-center ${
                    currentPage === "calendar" ||
                    currentPage === "announcements"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>

              {eventsDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-black/8 overflow-hidden py-1 animate-fade-in">
                  <button
                    onClick={() => handleNav("calendar")}
                    className="w-full text-left px-4 py-2.5 text-sm font-sans text-gray-700 hover:bg-black/5 hover:text-black transition-colors"
                  >
                    {t.navEventsCalendar[currentLang]}
                  </button>
                  <button
                    onClick={() => handleNav("announcements")}
                    className="w-full text-left px-4 py-2.5 text-sm font-sans text-gray-700 hover:bg-black/5 hover:text-black transition-colors"
                  >
                    {t.navEventsAnnouncements[currentLang]}
                  </button>
                </div>
              )}
            </div>

            {/* Get Connected dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setConnectDropdownOpen((o) => !o)}
                className={`font-sans text-base font-medium px-3 py-2 rounded-md transition-colors relative group flex items-center gap-1 ${
                  currentPage === "contact" ||
                  currentPage === "give" ||
                  currentPage === "prayer"
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t.navConnect[currentLang]}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${connectDropdownOpen ? "rotate-180" : ""}`}
                />
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[2px] bg-black transition-transform duration-300 origin-center ${
                    currentPage === "contact" ||
                    currentPage === "give" ||
                    currentPage === "prayer"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              {connectDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-black/8 overflow-hidden py-1 animate-fade-in">
                  <button
                    onClick={() => handleNav("contact")}
                    className="w-full text-left px-4 py-2.5 text-sm font-sans text-gray-700 hover:bg-black/5 hover:text-black transition-colors"
                  >
                    {t.navConnectCard[currentLang]}
                  </button>
                  <button
                    onClick={() => handleNav("prayer")}
                    className="w-full text-left px-4 py-2.5 text-sm font-sans text-gray-700 hover:bg-black/5 hover:text-black transition-colors"
                  >
                    {t.navConnectPrayer[currentLang]}
                  </button>
                  <button
                    onClick={() => handleNav("give")}
                    className="w-full text-left px-4 py-2.5 text-sm font-sans text-gray-700 hover:bg-black/5 hover:text-black transition-colors"
                  >
                    {t.navConnectGive[currentLang]}
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className="flex items-center bg-black/5 p-1 rounded-full"
              id="lang-toggle-container"
            >
              <Globe className="w-3.5 h-3.5 text-gray-500 ml-2 mr-1 hidden sm:inline" />
              <button
                onClick={() => onLanguageChange("en")}
                className={`text-xs px-2.5 py-1 rounded-full font-sans transition-all font-semibold ${
                  currentLang === "en"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange("zh")}
                className={`text-xs px-2.5 py-1 rounded-full font-sans transition-all font-semibold ${
                  currentLang === "zh"
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                中文
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-black hover:bg-black/5 transition-colors"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-b border-black/10 ${
          mobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {/* Home */}
          <button
            onClick={() => handleNav("home")}
            className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-all ${
              currentPage === "home"
                ? "bg-black/10 text-black"
                : "text-gray-600 hover:bg-black/5 hover:text-black"
            }`}
          >
            {t.navHome[currentLang]}
          </button>

          {/* Mobile About Us expandable */}
          <div>
            <button
              onClick={() => setMobileAboutOpen((o) => !o)}
              className={`flex w-full items-center justify-between px-4 py-2.5 rounded-md text-base font-medium transition-all ${
                currentPage === "about" || currentPage === "gainesville-dew" || currentPage === "leadership"
                  ? "bg-black/10 text-black"
                  : "text-gray-600 hover:bg-black/5 hover:text-black"
              }`}
            >
              {t.navAbout[currentLang]}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileAboutOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => handleNav("about")}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-black transition-all"
                >
                  {currentLang === "en" ? "Our Story" : "教會歷史"}
                </button>
                <button
                  onClick={() => handleNav("leadership")}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-black transition-all"
                >
                  {currentLang === "en" ? "Leadership" : "牧師同工"}
                </button>
                <button
                  onClick={() => handleNav("gainesville-dew")}
                  className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium hover:bg-black/5 hover:text-black transition-all ${currentPage === "gainesville-dew" ? "text-black font-semibold" : "text-gray-600"}`}
                >
                  {t.navGainsvilleDew[currentLang]}
                </button>
              </div>
            )}
          </div>

          {/* Ministries */}
          <button
            onClick={() => handleNav("fellowships")}
            className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-all ${
              currentPage === "fellowships"
                ? "bg-black/10 text-black"
                : "text-gray-600 hover:bg-black/5 hover:text-black"
            }`}
          >
            {t.navFellowships[currentLang]}
          </button>

          {/* Mobile Events expandable */}
          <div>
            <button
              onClick={() => setMobileEventsOpen((o) => !o)}
              className={`flex w-full items-center justify-between px-4 py-2.5 rounded-md text-base font-medium transition-all ${
                currentPage === "calendar" || currentPage === "announcements"
                  ? "bg-black/10 text-black"
                  : "text-gray-600 hover:bg-black/5 hover:text-black"
              }`}
            >
              {t.navEvents[currentLang]}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileEventsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileEventsOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => handleNav("calendar")}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-black transition-all"
                >
                  {t.navEventsCalendar[currentLang]}
                </button>
                <button
                  onClick={() => handleNav("announcements")}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-black transition-all"
                >
                  {t.navEventsAnnouncements[currentLang]}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Get Connected expandable */}
          <div>
            <button
              onClick={() => setMobileConnectOpen((o) => !o)}
              className={`flex w-full items-center justify-between px-4 py-2.5 rounded-md text-base font-medium transition-all ${
                currentPage === "contact" ||
                currentPage === "give" ||
                currentPage === "prayer"
                  ? "bg-black/10 text-black"
                  : "text-gray-600 hover:bg-black/5 hover:text-black"
              }`}
            >
              {t.navConnect[currentLang]}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${mobileConnectOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileConnectOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <button
                  onClick={() => handleNav("contact")}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-black transition-all"
                >
                  {t.navConnectCard[currentLang]}
                </button>
                <button
                  onClick={() => handleNav("prayer")}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-black transition-all"
                >
                  {t.navConnectPrayer[currentLang]}
                </button>
                <button
                  onClick={() => handleNav("give")}
                  className="block w-full text-left px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-black transition-all"
                >
                  {t.navConnectGive[currentLang]}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
