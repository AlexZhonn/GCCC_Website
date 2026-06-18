import { useState, useEffect } from "react";
import { Language } from "./types";
import { siteSettings } from "./data";
import GcccIntro from "./components/GcccIntro";
import Header from "./components/Header";
import SermonPlayer from "./components/SermonPlayer";
import FellowshipGrid from "./components/FellowshipGrid";
import CalendarEmbed from "./components/CalendarEmbed";
import GcccMark from "./components/GcccMark";
import { 
  Heart, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Youtube, 
  Compass, 
  ChevronRight, 
  Calendar, 
  ArrowRight, 
  Info, 
  CheckCircle, 
  ExternalLink,
  Car,
  Trash2,
  Sparkles
} from "lucide-react";

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>("zh"); // Default to Chinese as per GCCC audience, but fully toggleable!
  const [introPlaying, setIntroPlaying] = useState(true);
  const [forceReplayKey, setForceReplayKey] = useState(0);
  const [showNewHereModal, setShowNewHereModal] = useState(false);
  
  // Transit checking calculation (for college student priority audience)
  const [transitMode, setTransitMode] = useState<"walk" | "bus" | "car">("bus");

  // On mount, check if intro should play
  useEffect(() => {
    const seen = sessionStorage.getItem("gccc_intro_seen");
    if (seen) {
      setIntroPlaying(false);
    }
  }, [forceReplayKey]);

  const handleReplayIntro = () => {
    sessionStorage.removeItem("gccc_intro_seen");
    setIntroPlaying(true);
    setForceReplayKey((prev) => prev + 1);
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const t = {
    heroEyebrow: { en: "Gainesville Chinese Christian Church", zh: "甘城華人基督教會" },
    heroTitle: { 
      en: "A spiritual home for Chinese and English communities near UF", 
      zh: "鄰近佛羅里達大學，播撒聖經真理與基督大愛的屬靈港灣" 
    },
    heroDesc: {
      en: "We are a multi-generational, Bible-centered family of believers in Gainesville, FL, seeking to grow in faith and make Christ known.",
      zh: "我們是位於佛羅里達州蓋恩斯維爾的一個跨宗派、以聖經為中心的基督信徒家庭。透過愛與真理，在校園和甘城廣傳福音。"
    },
    heroScheduleSentence: {
      en: "Join us this Sunday: Sunday School at 9:30 AM | Bilingual Worship Service at 10:50 AM (In-Person & YouTube Live)",
      zh: "主日聚會日程：上午 9:30 兒童/成人主日學 | 上午 10:50 中英雙語聯合主日崇拜 (實體聚會 & 網路YouTube同步直播)"
    },
    heroCtaNew: { en: "I'm New Here", zh: "我是新朋友" },
    heroCtaWatch: { en: "Watch Sermons", zh: "觀看證道影音" },
    
    welcomeTitle: { en: "Who We Are", zh: "我們的異象與傳承" },
    welcomeHeader: { en: "A Loving Home For All Life Stages", zh: "跨世代、暖人心房的信仰家園" },
    
     UFStudentSectionTitle: { en: "University of Florida Focus", zh: "佛羅里達大學 (UF) 重點事工" },
     UFStudentSectionDesc: {
      en: "Located just minutes away from the UF campus, we provide undergraduate, graduate, and visiting scholars a secondary home. Enjoy healthy free meals, genuine community, and life-changing discipleship.",
      zh: "座落於佛羅里達大學（UF）校園旁。我們為本科生、研究生和訪問學人安排了豐富的港灣聚會：美味可口的週五愛宴、溫馨相扶的成長小組，與深度真誠的青年生活。"
    },
    UFStudentSectionBtn: { en: "Explore Student Fellowship", zh: "瞭解學生聚會與愛宴詳情" },
    
    directionsTitle: { en: "Getting to GCCC from UF", zh: "從佛羅里達大學 (UF) 前往教會" },
    directionsWalk: { en: "15 min walk from SW Recreation", zh: "從西南體育館步行約 15 分鐘" },
    directionsBus: { en: "Take RTS Bus 9, 34, or 35", zh: "搭乘甘城公交 9, 34 或 35 路" },
    directionsCar: { en: "5 mins drive down SW 2nd Ave", zh: "自 SW 2nd Ave 驅車僅 5 分鐘" },

    visitorModalTitle: { en: "Welcome to GCCC!", zh: "熱忱歡迎您來到甘城華人教會！" },
    visitorModalSub: { en: "Frequently Asked Questions for Guests", zh: "為新走入教會的朋友解答以下心中常問的多個問題" },
    visitorQ1: { en: "What language is spoken?", zh: "我們聚會使用什麼語言？" },
    visitorA1: { en: "Our Sunday Service is joint bilingual (English and Mandarin Chinese) with live translations for sermons and messages.", zh: "我們的主日崇拜、報告與講道採取雙語（中文普通話與英文）同步翻譯，中英文會眾都能融洽得造就。" },
    visitorQ2: { en: "Is there a program for children?", zh: "我的孩子能參與什麼活動？" },
    visitorA2: { en: "Yes! We run Children's Sunday School (9:30 AM) and provide loving child supervision and youth groups during worship services.", zh: "絕對有！我們在每週日上午 9:30 設有各年齡層的孩子主日學，在崇拜時間亦有專為兒童照看與青少年陪伴預備的輔助事工。" },
    visitorQ3: { en: "Do I need to sign up for Friday dinner?", zh: "週五學生與學者晚餐需要提前預約嗎？" },
    visitorA3: { en: "No sign ups required. Just show up! Dinner starts at 6:30 PM in the Fellowship Hall. We would love to serve you.", zh: "完全不需要！每週五傍晚 6:30 供應愛宴，直接前來走入教會副堂即可，我們期待為您奉上暖胃家常菜！" },

    footerDesc: {
      en: "GCCC Gainesville is a Bible-teaching church community. Our door is open to seekers and believers alike.",
      zh: "甘城華人教會是以聖經神治與恩惠真理為講台核心的基督徒社群，無論您是信仰探求者，還是尋覓屬靈家園的同工，我們均溫馨守候。"
    },
    socialLinks: { en: "Social Media Channels & Resources", zh: "常用社群渠道與資源連結" },
    rights: { en: "All Rights Reserved", zh: "甘城華人基督教會 版權所有" },
  };

  const handleHeroScrollToSermon = () => {
    const el = document.getElementById("sermons");
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7EF] flex flex-col selection:bg-[#9A2B27]/30 selection:text-[#33271E]">
      
      {/* INTRO ANIMATION PLAYED ONCE PER SESSION */}
      <GcccIntro 
        key={forceReplayKey} 
        forceReplay={introPlaying} 
        onDone={() => setIntroPlaying(false)} 
      />

      {/* STICKY HEADER */}
      <Header 
        currentLang={currentLang} 
        onLanguageChange={handleLanguageChange}
        onReplayIntro={handleReplayIntro}
        introPlaying={introPlaying}
      />

      {/* MAIN CONTAINER */}
      <main className={`flex-grow transition-opacity duration-1000 ${introPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        
        {/* HERO SECTION - Full-bleed warm-toned imagery wrapper */}
        <section 
          id="hero" 
          className="relative min-h-[95vh] flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
          style={{
            backgroundImage: `url("/src/assets/images/gccc_hero_1781744424066.jpg")`
          }}
        >
          {/* Aesthetic Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-neutral-900/60" />

          {/* Golden warmth highlight mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/30 to-transparent" />

          {/* Hero Content Box */}
          <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-6 text-[#FBF7EF] py-12 md:py-24 animate-fade-in animate-delay-300">
            
            {/* Logo lockup in Hero */}
            <div className="bg-[#FBF7EF]/10 p-4 rounded-full border border-[#E7B7A0]/20 backdrop-blur-sm shadow-xl mb-2 hover:scale-105 transition-transform">
              <GcccMark width={60} height={63} strokeColor="#FBF7EF" />
            </div>

            <span className="font-mono text-xs sm:text-sm font-bold text-[#E7B7A0] tracking-[5px] uppercase">
              {t.heroEyebrow[currentLang]}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight max-w-4xl leading-tight">
              {t.heroTitle[currentLang]}
            </h1>

            <p className="font-sans text-sm sm:text-lg text-[#FBF7EF] max-w-3xl leading-relaxed font-light">
              {t.heroDesc[currentLang]}
            </p>

            {/* Service times woven naturally into an elegant frame */}
            <div className="bg-[#211E18]/70 border border-[#E7B7A0]/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto my-3 text-[#FBF7EF]">
              <div className="flex justify-center items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#E7B7A0]" />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase text-[#E7B7A0]">
                  {currentLang === 'en' ? "Weekly Core Service Gathering" : "主日會幕聚會"}
                </span>
              </div>
              <p className="font-serif text-sm sm:text-base leading-relaxed tracking-wide text-neutral-100">
                {t.heroScheduleSentence[currentLang]}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto px-6">
              <button
                onClick={() => setShowNewHereModal(true)}
                className="w-full sm:w-auto bg-[#9A2B27] hover:bg-[#80221E] text-white px-8 py-3.5 rounded-lg text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                id="hero-cta-new-friend"
              >
                {t.heroCtaNew[currentLang]}
              </button>
              <button
                onClick={handleHeroScrollToSermon}
                className="w-full sm:w-auto bg-transparent hover:bg-[#FBF7EF]/10 border border-white/60 text-white hover:text-white px-8 py-3.5 rounded-lg text-sm font-bold tracking-wider uppercase transition-all"
              >
                {t.heroCtaWatch[currentLang]}
              </button>
            </div>

          </div>
        </section>

        {/* SECTION 1: WHO WE ARE (EDITORIAL TWO-COLUMN WITH CHURCH PHOTO) */}
        <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left Column: Stunning Image with Warm Accent Overlay */}
            <div className="relative">
              {/* Main image */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-10">
                <img 
                  src="/src/assets/images/gccc_sermon_1781744456768.jpg" 
                  alt="Holy Bible on altar table" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Backing decorative colored container */}
              <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-[#E7B7A0]/40 rounded-2xl z-0" />
              <div className="absolute top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#9A2B27] z-0" />

              <div className="absolute bottom-4 left-4 z-20 bg-[#211E18]/80 text-[#FBF7EF] p-4 rounded-xl backdrop-blur-sm border border-[#E7B7A0]/20 max-w-xs shadow-lg">
                <span className="text-[10px] font-mono tracking-widest text-[#E7B7A0] block uppercase mb-1">
                  {currentLang === 'en' ? "Bible-Centered Root" : "敬虔、立足經文基石"}
                </span>
                <p className="font-serif text-xs italic">
                  &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo; – Psalm 119:105
                </p>
              </div>
            </div>

            {/* Right Column: Editorial story copywriting */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-[3px] font-bold block mb-2">
                  {t.welcomeTitle[currentLang]}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
                  {t.welcomeHeader[currentLang]}
                </h2>
              </div>

              <div className="h-1 w-16 bg-[#9A2B27]" />

              <div className="space-y-4 text-sm sm:text-base text-[#6F685B] font-serif leading-relaxed">
                <p>{siteSettings.welcomeBlurbText[currentLang]}</p>
                <p className="font-sans text-xs sm:text-sm text-[#33271E] bg-[#E7B7A0]/10 p-4 border-l-4 border-[#E7B7A0] rounded-r-lg font-light leading-relaxed">
                  {siteSettings.welcomeHistoryText[currentLang]}
                </p>
              </div>

              {/* Three Core Pillars info row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#E7B7A0]/20 pt-6 mt-4">
                <div className="flex flex-col gap-1.5">
                  <span className="font-serif text-[#9A2B27] font-bold text-lg">01. 經歷真愛</span>
                  <span className="text-xs text-[#6F685B]">{currentLang === 'en' ? "Experiencing Christ's Love to the Fullest" : "在委身的小組團契中體驗真理與接納"}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-serif text-[#9A2B27] font-bold text-lg">02. 扎根真理</span>
                  <span className="text-xs text-[#6F685B]">{currentLang === 'en' ? "Biblical Rootedness in Faith and Deeds" : "以系統化聖經查經扎實建造屬靈生命"}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="font-serif text-[#9A2B27] font-bold text-lg">03. 廣傳真光</span>
                  <span className="text-xs text-[#6F685B]">{currentLang === 'en' ? "Sharing Eternal Hope to Gator Nation" : "踏出牆垣服侍甘城當地的華人與萬民"}</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* BRIGHT EDITORIAL CALLOUT FOR UF COLLEGE STUDENTS */}
        <section className="bg-[#211E18] text-[#FBF7EF] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="uf-campus-focus-billboard">
          {/* Abstract warm gradient overlays */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9A2B27]/10 rounded-full blur-3xl translate-x-24 -translate-y-24" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E7B7A0]/5 rounded-full blur-3xl -translate-x-24 translate-y-24" />

          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text description */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-semibold block">
                ⭐ {t.UFStudentSectionTitle[currentLang]}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
                {currentLang === 'zh' 
                  ? "支持佛羅里達大學學子的溫暖港灣，伴您留學歲月" 
                  : "Serving Gators with love and hospitality just steps from campus"}
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-3xl">
                {t.UFStudentSectionDesc[currentLang]}
              </p>
              
              {/* Interactive Direction calculator from UF campus */}
              <div className="bg-[#33271E] rounded-xl p-4 border border-white/5 mt-3 max-w-xl">
                <span className="text-xs font-mono tracking-wider text-[#E7B7A0] font-bold block mb-2 uppercase">
                  📍 {t.directionsTitle[currentLang]}
                </span>
                
                <div className="flex border-b border-white/10 mb-3">
                  <button 
                    onClick={() => setTransitMode("walk")} 
                    className={`pb-2 px-3 text-xs font-medium border-b-2 transition-all ${transitMode === 'walk' ? 'border-[#9A2B27] text-white' : 'border-transparent text-neutral-400 hover:text-white'}`}
                  >
                    🚶 {currentLang === 'en' ? "On foot" : "步行"}
                  </button>
                  <button 
                    onClick={() => setTransitMode("bus")} 
                    className={`pb-2 px-3 text-xs font-medium border-b-2 transition-all ${transitMode === 'bus' ? 'border-[#9A2B27] text-white' : 'border-transparent text-neutral-400 hover:text-white'}`}
                  >
                    🚌 {currentLang === 'en' ? "RTS Bus" : "搭乘公交"}
                  </button>
                  <button 
                    onClick={() => setTransitMode("car")} 
                    className={`pb-2 px-3 text-xs font-medium border-b-2 transition-all ${transitMode === 'car' ? 'border-[#9A2B27] text-white' : 'border-transparent text-neutral-400 hover:text-white'}`}
                  >
                    🚗 {currentLang === 'en' ? "By Car" : "開車自駕"}
                  </button>
                </div>

                <div className="text-xs text-[#FBF7EF] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#E7B7A0] shrink-0" />
                  <span>
                    {transitMode === "walk" && t.directionsWalk[currentLang]}
                    {transitMode === "bus" && t.directionsBus[currentLang]}
                    {transitMode === "car" && t.directionsCar[currentLang]}
                  </span>
                </div>
              </div>
            </div>

            {/* Collage/Picture */}
            <div className="lg:col-span-5 h-[280px] sm:h-[320px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10">
              <img 
                src="/src/assets/images/gccc_campus_1781744441184.jpg" 
                alt="Gators studying study group" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <span className="font-mono text-[9px] uppercase tracking-widest text-amber-200 block mb-1">
                  Friday Dinner & Groups
                </span>
                <span className="font-serif text-lg font-bold">
                  UF Plaza of the Americas & Church Hall
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: SERMON LAYER (INTERACTIVE AUDIO + VIDEO PLAYER) */}
        <section id="sermons" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-6">
          <div className="flex flex-col gap-10">
            <div className="text-center md:text-left">
              <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-widest font-bold block mb-1">
                {currentLang === 'en' ? "Spiritual Nourishment" : "主日神話語的造就"}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
                {currentLang === 'en' ? "Bilingual Sermons Archive" : "中英講道錄影與音頻文庫"}
              </h2>
              <p className="text-[#6F685B] text-sm mt-2 max-w-3xl leading-relaxed font-serif italic">
                每一步信仰路都是真理的沉澱。我們的主日講道均進行普通話與英文雙語聯合播講，幫助雙語背景的人士一同汲取生命甘露。
              </p>
            </div>
            
            {/* Custom media player */}
            <SermonPlayer currentLang={currentLang} />
          </div>
        </section>

        {/* SECTION 3: GROUP/FELLOWSHIPS (PHOTO GRID INSTEAD OF CHIP CARDS) */}
        <section id="fellowships" className="py-20 md:py-28 bg-[#F5EFE3] px-4 sm:px-6 lg:px-8 border-y border-[#E7B7A0]/25">
          <div className="max-w-7xl mx-auto">
            <FellowshipGrid currentLang={currentLang} />
          </div>
        </section>

        {/* SECTION 4: CALENDAR SECTION (GOOGLE CALENDAR INTEGRATION) */}
        <section id="calendar" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
            
            {/* Quick schedule lookup info card */}
            <div className="bg-[#33271E] text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border border-[#E7B7A0]/10 shadow-xl min-h-[350px]">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E7B7A0] font-bold">
                  {currentLang === 'en' ? "Sunday Logistics" : "崇拜與聚會後愛宴"}
                </span>
                
                <h4 className="font-serif text-2xl font-semibold leading-tight text-white">
                  {currentLang === 'zh' ? "主日同享愛宴，共享彼此生命契合" : "Fellowship lunch served right after Sunday Worship"}
                </h4>
                
                <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
                  {currentLang === 'zh'
                    ? "崇拜（下午 12:15）結束後。備有熱飯熱菜供全體會眾免費同享！這是一次極好的機會，與牧長和在座弟兄姊妹彼此傾聽和熟悉。"
                    : "Worship services are followed by a complimentary home-style luncheon. It is a fantastic setting to greet coordinators, seek guidance, or get acquainted with local friends in a relaxed context."}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-xs">
                  <Clock className="w-4 h-4 text-[#E7B7A0]" />
                  <span>{currentLang === 'en' ? "Lunch starts: 12:20 PM every Sunday" : "午餐愛宴：崇拜結束後 (12:20 PM)"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <Heart className="w-4 h-4 text-[#9A2B27] fill-[#9A2B27]" />
                  <span>{currentLang === 'en' ? "100% Free & Open to All Visitors" : "免費供應，熱切期待您的加入一同聚餐"}</span>
                </div>
              </div>
            </div>

            {/* Google calendar embed wrap */}
            <div className="lg:col-span-2">
              <CalendarEmbed currentLang={currentLang} />
            </div>

          </div>
        </section>

        {/* SECTION 5: CONTACT US & DIRECTIONS MAP */}
        <section id="contact" className="py-20 md:py-28 bg-[#211E18] text-[#FBF7EF] px-4 sm:px-6 lg:px-8 border-t border-[#E7B7A0]/20 scroll-mt-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
            
            {/* Contact details */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-1">
                  {currentLang === 'en' ? "Get in Touch" : "甘城與你，愛中相遇"}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-tight">
                  {currentLang === 'en' ? "Contact Us" : "聯絡我們"}
                </h2>
                <p className="text-neutral-300 font-serif text-sm leading-relaxed mt-2.5 max-w-xl">
                  我們深切重視您的回音。如果您想索取各團契查經小組的交通方式，有任何代禱需求，或是新學期面臨搬遷落腳、交通接送，請不吝聯絡。
                </p>
              </div>

              <div className="h-[2px] w-12 bg-[#9A2B27]" />

              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex items-start gap-3 text-sm">
                  <div className="bg-[#9A2B27]/20 p-2.5 rounded-lg text-[#E7B7A0]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#E7B7A0] block">
                      {currentLang === 'en' ? "Address" : "教會堂址"}
                    </span>
                    <a 
                      href="https://maps.google.com/?q=3425+SW+2nd+Ave,+Gainesville,+FL+32607" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-serif text-base text-[#FBF7EF] hover:text-[#E7B7A0] hover:underline"
                    >
                      {siteSettings.address[currentLang]}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 text-sm">
                  <div className="bg-[#9A2B27]/20 p-2.5 rounded-lg text-[#E7B7A0]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#E7B7A0] block">
                      {currentLang === 'en' ? "Email" : "電子郵件"}
                    </span>
                    <a href={`mailto:${siteSettings.email}`} className="font-serif text-base text-[#FBF7EF] hover:text-[#E7B7A0] hover:underline">
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 text-sm">
                  <div className="bg-[#9A2B27]/20 p-2.5 rounded-lg text-[#E7B7A0]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-[#E7B7A0] block">
                      {currentLang === 'en' ? "Phone Call" : "電話號碼"}
                    </span>
                    <a href={`tel:${siteSettings.phone.replace(/\D/g,'')}`} className="font-serif text-base text-[#FBF7EF] hover:text-[#E7B7A0] hover:underline">
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

              </div>

              {/* Direct Maps Trigger */}
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=3425+SW+2nd+Ave,+Gainesville,+FL+32607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#9A2B27] hover:bg-[#80221E] text-white px-5 py-3 rounded-lg text-xs font-semibold shadow transition-all transform hover:-translate-y-0.5"
                >
                  <span>{currentLang === 'en' ? "Navigate in Google Maps" : "在谷歌地圖中導航"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Minimal framed embedded map block */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-neutral-900/40 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1s0x88e8a38c2323cc67%3A0xc3f8373b7541b61c!2s3425+SW+2nd+Ave%2s+Gainesville%2s+FL+32607!5e0!3m2!1sen!2sus!4v15456!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ border: 0, filter: "grayscale(10%) invert(90%) contrast(100%) brightness(100%)" }} // Aesthetic map styling to blend with dark cream/brown layout
                allowFullScreen
                loading="lazy"
                title="GCCC Street MapLocation"
              />
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#191512] text-[#F9F6ED] py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-[#9A2B27]/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#E7B7A0]/10 pb-12 mb-12">
          
          {/* Logo / Wordmark */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <GcccMark width={36} height={38} strokeColor="#9A2B27" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider text-white">甘城華人教會</span>
                <span className="font-mono text-[9px] tracking-widest text-[#E7B7A0] uppercase font-light">Gainesville Chinese Christian Church</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-serif leading-relaxed text-center md:text-left max-w-sm mt-2">
              {t.footerDesc[currentLang]}
            </p>
          </div>

          {/* Social icons / YouTube streams */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#E7B7A0] font-semibold">
              {t.socialLinks[currentLang]}
            </span>
            <div className="flex items-center gap-3">
              <a 
                href={siteSettings.youtubeLiveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-red-700/10 hover:bg-red-700/30 p-2.5 rounded-full border border-red-700/30 text-red-500 hover:text-red-400 transition-colors"
                title="GCCC YouTube Channels"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${siteSettings.email}`}
                className="bg-neutral-800 hover:bg-neutral-700 p-2.5 rounded-full border border-[#E7B7A0]/10 text-[#E7B7A0] hover:text-white transition-colors"
                title="Email Us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://maps.google.com/?q=3425+SW+2nd+Ave,+Gainesville,+FL+32607"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-neutral-800 hover:bg-neutral-700 p-2.5 rounded-full border border-[#E7B7A0]/10 text-[#E7B7A0] hover:text-white transition-colors"
                title="Church Location Map"
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom details & Replay Animation control */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono">
          <span>&copy; {new Date().getFullYear()} {t.rights[currentLang]}. 3425 SW 2nd Ave, Gainesville, FL 32607.</span>
          
          <div className="flex items-center gap-4">
            {/* Demo replay button */}
            <button 
              onClick={handleReplayIntro}
              style={{ cursor: "pointer" }}
              className="inline-flex items-center gap-1.5 text-[#9A2B27] hover:text-red-500 border border-[#9A2B27]/40 hover:border-[#9A2B27] px-3.5 py-1.5 rounded-full bg-neutral-900 transition-all cursor-pointer font-bold uppercase tracking-wider"
              id="footer-replay-btn"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? "Replay Drawing Intro" : "重新播放手繪動畫"}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* VISITORS BILINGUAL "I'M NEW HERE" INTERACTIVE DIALOG MODAL */}
      {showNewHereModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 scroll-smooth" id="visitor-new-here-modal">
          <div 
            className="bg-[#FBF7EF] text-[#33271E] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#E7B7A0]/30 animate-fade-in relative max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal sticky top banner header */}
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
                className="bg-black/40 hover:bg-black/60 text-[#FBF7EF] p-1.5 rounded-full transition-colors text-xs"
                style={{ cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Questions list */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-5 flex-grow">
              
              <div className="text-sm font-serif italic text-[#6F685B] border-b border-[#E7B7A0]/10 pb-4 mb-2 leading-relaxed">
                {currentLang === 'zh'
                  ? "「若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。」— 哥林多後書 5:17。我們非常期待與您建立深刻的連結，以下為您整理了初次來到本堂最實用的信息指南："
                  : "We are genuinely delighted you're exploring GCCC. Our hearts are packed with warmth and expectation as we look forward to shaking hands soon. Here are a handful of handy questions answered:"}
              </div>

              {/* Q1 */}
              <div className="bg-white rounded-xl p-4 border border-[#E7B7A0]/25 shadow-sm">
                <div className="flex gap-2.5 items-start">
                  <span className="font-mono text-xs font-black text-[#9A2B27] bg-[#9A2B27]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">Q1</span>
                  <div>
                    <h5 className="font-serif font-bold text-sm sm:text-base text-[#33271E] leading-snug">
                      {t.visitorQ1[currentLang]}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#6F685B] mt-2 font-serif leading-relaxed">
                      {t.visitorA1[currentLang]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Q2 */}
              <div className="bg-white rounded-xl p-4 border border-[#E7B7A0]/25 shadow-sm">
                <div className="flex gap-2.5 items-start">
                  <span className="font-mono text-xs font-black text-[#9A2B27] bg-[#9A2B27]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">Q2</span>
                  <div>
                    <h5 className="font-serif font-bold text-sm sm:text-base text-[#33271E] leading-snug">
                      {t.visitorQ2[currentLang]}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#6F685B] mt-2 font-serif leading-relaxed">
                      {t.visitorA2[currentLang]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Q3 */}
              <div className="bg-white rounded-xl p-4 border border-[#E7B7A0]/25 shadow-sm">
                <div className="flex gap-2.5 items-start">
                  <span className="font-mono text-xs font-black text-[#9A2B27] bg-[#9A2B27]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">Q3</span>
                  <div>
                    <h5 className="font-serif font-bold text-sm sm:text-base text-[#33271E] leading-snug">
                      {t.visitorQ3[currentLang]}
                    </h5>
                    <p className="text-xs sm:text-sm text-[#6F685B] mt-2 font-serif leading-relaxed">
                      {t.visitorA3[currentLang]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logistics callout */}
              <div className="bg-[#E7B7A0]/15 p-4 rounded-xl border border-[#E7B7A0]/40 flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#9A2B27] shrink-0 mt-0.5" />
                <span className="text-xs font-sans text-[#33271E] leading-relaxed">
                  {currentLang === 'zh'
                    ? "無需任何著裝限制 (No Dress Code)。聚會時穿著舒適、得體的便服即可。歡迎您和家人朋友前來，我們非常期待親自向您問好！"
                    : "No specific dress codes or prior bookings necessary. Dress in whatever casual, respectful clothing makes you feel comfortable. Looking forward to greeting you!"}
                </span>
              </div>

            </div>

            {/* Sticky footer control */}
            <div className="border-t border-[#E7B7A0]/20 p-4 bg-white flex justify-end shrink-0">
              <button
                onClick={() => setShowNewHereModal(false)}
                className="bg-[#33271E] hover:bg-neutral-800 text-[#FBF7EF] px-5 py-2 rounded-lg text-xs font-semibold shadow transition-all"
                style={{ cursor: "pointer" }}
              >
                {currentLang === 'en' ? "Got it, thanks!" : "我明白了，謝謝！"}
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
