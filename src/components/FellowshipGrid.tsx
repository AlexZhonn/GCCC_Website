import { useState } from "react";
import { Fellowship, Language } from "../types";
import { fellowshipsData } from "../data";
import { Calendar, MapPin, PhoneCall, User, X, Compass, ExternalLink } from "lucide-react";

interface FellowshipGridProps {
  currentLang: Language;
}

export default function FellowshipGrid({ currentLang }: FellowshipGridProps) {
  const [selectedFellowship, setSelectedFellowship] = useState<Fellowship | null>(null);

  const t = {
    exploreBtn: { en: "Gather Details", zh: "查看聚會詳情" },
    featuredBadge: { en: "UF Priority Youth", zh: "UF高佛學子重點事工" },
    titleMain: { en: "Find Your Community", zh: "在基督裡同心同行" },
    subMain: { en: "Fellowships Grouped By Life Stage", zh: "切合您不同人生軌跡的團契與小組生活" },
    modalSchedule: { en: "Meeting Time", zh: "聚會時段" },
    modalLocation: { en: "Location", zh: "聚會地點" },
    modalContact: { en: "Coordinator", zh: "聯絡窗口" },
    closeBtn: { en: "Close Window", zh: "關閉視窗" },
  };

  // Split out the featured Campus fellowship
  const featured = fellowshipsData.find(f => f.isFeatured);
  const remainingGrids = fellowshipsData.filter(f => !f.isFeatured);

  return (
    <div className="flex flex-col gap-8" id="fellowships_section_block">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-4">
        <span className="font-mono text-xs tracking-widest text-[#9A2B27] uppercase font-bold block mb-2">
          {t.subMain[currentLang]}
        </span>
        <h3 className="font-serif text-3xl md:text-4xl text-[#33271E] font-bold tracking-tight">
          {t.titleMain[currentLang]}
        </h3>
        <p className="text-[#6F685B] mt-3 font-serif italic text-base leading-relaxed">
          甘城華人教會以多元、跨群體的小組及團契搭建起傳承信仰與生命支持的網絡。不論您的生辰背景或所處歲月，我們都張開雙手。
        </p>
      </div>

      {/* FEATURED: Campus Ministry (UF priority) Banner */}
      {featured && (
        <div 
          className="relative bg-[#33271E] text-[#FBF7EF] rounded-2xl overflow-hidden shadow-xl border border-[#E7B7A0]/20 min-h-[420px] flex flex-col justify-end p-6 md:p-12 hover:shadow-2xl transition-all group cursor-pointer"
          onClick={() => setSelectedFellowship(featured)}
          id="featured-campus-banner"
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-[#211E18]">
            <img 
              src={featured.imageUrl} 
              alt={featured.name[currentLang]}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Gradients blending with the warm background colors */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#211E18] via-[#211E18]/20 to-transparent hidden md:block" />
          </div>

          {/* Interactive foreground details */}
          <div className="relative z-10 max-w-2xl flex flex-col gap-4">
            <span className="font-mono text-[11px] font-bold tracking-widest text-[#E7B7A0] bg-[#9A2B27] px-3.5 py-1.5 rounded-full inline-block self-start shadow-sm">
              ✨ {t.featuredBadge[currentLang]}
            </span>
            <h4 className="font-serif text-2xl sm:text-4xl text-white font-bold leading-tight">
              {featured.name[currentLang]}
            </h4>
            <p className="font-sans text-sm sm:text-base text-[#FBF7EF]/90 line-clamp-3 leading-relaxed">
              {featured.description[currentLang]}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm text-[#E7B7A0] pt-2">
              <span className="flex items-center gap-1.5 bg-[#211E18]/80 px-3 py-1.5 rounded-lg border border-[#E7B7A0]/10">
                <Calendar className="w-4 h-4 text-[#9A2B27]" />
                {featured.schedule[currentLang]}
              </span>
              <span className="flex items-center gap-1.5 bg-[#211E18]/80 px-3 py-1.5 rounded-lg border border-[#E7B7A0]/10">
                <MapPin className="w-4 h-4 text-[#9A2B27]" />
                {featured.location[currentLang]}
              </span>
            </div>
            
            <button 
              className="mt-4 self-start bg-[#9A2B27] hover:bg-[#80221E] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFellowship(featured);
              }}
            >
              <Compass className="w-4 h-4" />
              {t.exploreBtn[currentLang]}
            </button>
          </div>
        </div>
      )}

      {/* REMAINDER: Beautiful Flat Photo Overlay grid (NOT cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingGrids.map((fellowship) => {
          return (
            <div
              key={fellowship.id}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer shadow-md select-none border border-[#E7B7A0]/10"
              onClick={() => setSelectedFellowship(fellowship)}
            >
              {/* Photo backdrop */}
              <img
                src={fellowship.imageUrl}
                alt={fellowship.name[currentLang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Shadow gradient darkening bottom and overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/40 to-[#211E18]/10 group-hover:via-[#211E18]/50 transition-all duration-300" />
              
              {/* Flat overlay info */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-[#FBF7EF] z-10 transition-transform duration-300">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#E7B7A0] font-bold block mb-1">
                  {fellowship.schedule[currentLang]}
                </span>
                <h4 className="font-serif text-lg font-bold leading-tight line-clamp-1 group-hover:text-amber-100 transition-colors">
                  {fellowship.name[currentLang]}
                </h4>
                <p className="text-xs text-[#FBF7EF]/85 line-clamp-2 mt-2 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-12 transition-all duration-500">
                  {fellowship.description[currentLang]}
                </p>
                <div className="mt-3 flex items-center text-xs font-semibold text-[#E7B7A0] group-hover:translate-x-1 transition-transform">
                  <span>{t.exploreBtn[currentLang]}</span>
                  <span className="ml-1.5">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL DIALOG / MODAL PANEL */}
      {selectedFellowship && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" id="fellowship-detail-modal">
          <div 
            className="bg-[#FBF7EF] text-[#33271E] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-[#E7B7A0]/30 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image display */}
            <div className="relative h-48 bg-[#33271E]">
              <img 
                src={selectedFellowship.imageUrl} 
                alt={selectedFellowship.name[currentLang]}
                className="w-full h-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7EF] via-transparent to-[#211E18]/30" />
              <button 
                onClick={() => setSelectedFellowship(null)}
                className="absolute top-4 right-4 bg-black/65 hover:bg-black/85 text-white p-2 rounded-full transition-all"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 flex flex-col gap-5">
              <div>
                <h4 className="font-serif text-2xl font-bold tracking-tight text-[#33271E]">
                  {selectedFellowship.name[currentLang]}
                </h4>
                <p className="text-sm font-sans text-[#6F685B] font-medium leading-relaxed mt-2.5">
                  {selectedFellowship.description[currentLang]}
                </p>
              </div>

              <div className="flex flex-col gap-3.5 border-t border-[#E7B7A0]/25 pt-4">
                
                {/* Time */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                    <Calendar className="w-4 h-4 text-[#9A2B27]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">
                      {t.modalSchedule[currentLang]}
                    </span>
                    <span className="text-sm font-semibold text-[#33271E]">
                      {selectedFellowship.schedule[currentLang]}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                    <MapPin className="w-4 h-4 text-[#9A2B27]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">
                      {t.modalLocation[currentLang]}
                    </span>
                    <span className="text-sm font-semibold text-[#33271E]">
                      {selectedFellowship.location[currentLang]}
                    </span>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#9A2B27]/10 p-2 rounded-lg mt-0.5">
                    <User className="w-4 h-4 text-[#9A2B27]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider text-[#6F685B] block">
                      {t.modalContact[currentLang]}
                    </span>
                    <span className="text-sm font-semibold text-[#33271E]">
                      {selectedFellowship.contact[currentLang]}
                    </span>
                  </div>
                </div>

              </div>

              {/* Close controls */}
              <div className="flex justify-end gap-3 mt-4 border-t border-[#E7B7A0]/25 pt-4">
                <button
                  onClick={() => setSelectedFellowship(null)}
                  className="bg-[#9A2B27] hover:bg-[#80221E] text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow transition-all"
                >
                  {t.closeBtn[currentLang]}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
