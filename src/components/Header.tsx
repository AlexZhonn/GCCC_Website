import { useState, useEffect } from "react";
import { Language } from "../types";
import GcccMark from "./GcccMark";
import { Menu, X, Globe } from "lucide-react";

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onReplayIntro?: () => void;
  introPlaying: boolean;
}

export default function Header({
  currentLang,
  onLanguageChange,
  onReplayIntro,
  introPlaying,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = {
    navHome: { en: "Home", zh: "首頁" },
    navAbout: { en: "About Us", zh: "關於我們" },
    navSermons: { en: "Sermons", zh: "主日講道" },
    navFellowships: { en: "Fellowships", zh: "團契生活" },
    navCalendar: { en: "Schedule", zh: "聚會日程" },
    navContact: { en: "Contact Us", zh: "聯絡我們" },
    replayBtn: { en: "Replay Intro", zh: "重播動畫" },
    wordmarkZh: "甘城華人教會",
    wordmarkEn: "GCCC FL",
  };

  const navItems = [
    { label: t.navHome, anchor: "hero" },
    { label: t.navAbout, anchor: "about" },
    { label: t.navSermons, anchor: "sermons" },
    { label: t.navFellowships, anchor: "fellowships" },
    { label: t.navCalendar, anchor: "calendar" },
    { label: t.navContact, anchor: "contact" },
  ];

  const handleScrollTo = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="gccc_header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FBF7EF]/95 backdrop-blur-md shadow-md border-b border-[#E7B7A0]/20 py-2"
          : "bg-[#FBF7EF]/80 backdrop-blur-sm py-4"
      } ${introPlaying ? "opacity-0 pointer-events-none" : "opacity-100 animate-fade-in"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Wordmark */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleScrollTo("hero")}
          >
            <div className="transform transition-transform duration-300 group-hover:scale-105">
              <GcccMark width={44} height={46} strokeColor="#9A2B27" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-[#33271E] leading-tight">
                {t.wordmarkZh}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#6F685B] font-medium uppercase leading-tight">
                {t.wordmarkEn}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleScrollTo(item.anchor)}
                className="font-sans text-sm font-medium text-[#33271E] hover:text-[#9A2B27] px-3 py-2 rounded-md transition-colors relative group"
              >
                {item.label[currentLang]}
                <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-[#9A2B27] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </button>
            ))}
          </nav>

          {/* Right Controls: Replay Intro, EN/中文 Toggle, Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Replay Intro - Demo Only Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="hidden lg:inline-flex items-center text-xs font-mono px-3 py-1.5 border border-[#9A2B27]/30 text-[#9A2B27] rounded-full hover:bg-[#9A2B27]/5 hover:border-[#9A2B27] transition-all"
              >
                {t.replayBtn[currentLang]}
              </button>
            )}

            {/* Language Switcher Toggle */}
            <div className="flex items-center bg-[#E7B7A0]/20 p-1 rounded-full relative" id="lang-toggle-container">
              <Globe className="w-3.5 h-3.5 text-[#6F685B] ml-2 mr-1 hidden sm:inline" />
              <button
                onClick={() => onLanguageChange('en')}
                className={`text-xs px-2.5 py-1 rounded-full font-sans transition-all font-semibold ${
                  currentLang === 'en'
                    ? 'bg-[#9A2B27] text-white shadow-sm'
                    : 'text-[#33271E] hover:text-[#9A2B27]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('zh')}
                className={`text-xs px-2.5 py-1 rounded-full font-sans transition-all font-semibold ${
                  currentLang === 'zh'
                    ? 'bg-[#9A2B27] text-white shadow-sm'
                    : 'text-[#33271E] hover:text-[#9A2B27]'
                }`}
              >
                中文
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#33271E] hover:text-[#9A2B27] hover:bg-[#E7B7A0]/10 transition-colors"
              aria-expanded="false"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu, show/hide based on menu state */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#FBF7EF] border-b border-[#E7B7A0]/20 ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollTo(item.anchor)}
              className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-[#33271E] hover:bg-[#E7B7A0]/10 hover:text-[#9A2B27] transition-all"
            >
              {item.label[currentLang]}
            </button>
          ))}
          
          {onReplayIntro && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-[#9A2B27] font-mono hover:bg-[#9A2B27]/5 border-t border-[#E7B7A0]/10"
            >
              {t.replayBtn[currentLang]}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
