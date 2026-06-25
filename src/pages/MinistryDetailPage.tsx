import { Language, MinistryCategory } from "../types";
import { ministryCategoriesData, fellowshipsData } from "../data";
import { ArrowLeft, Calendar, Instagram } from "lucide-react";

interface MinistryDetailPageProps {
  currentLang: Language;
  category: MinistryCategory;
  onBack: () => void;
}

const t = {
  back: { en: "All Ministries", zh: "所有事工" },
  about: { en: "About This Ministry", zh: "關於此事工" },
  schedule: { en: "Meeting Time", zh: "聚會時段" },
  instagram: { en: "Follow on Instagram", zh: "追蹤 Instagram" },
};

export default function MinistryDetailPage({
  currentLang,
  category,
  onBack,
}: MinistryDetailPageProps) {
  const catInfo = ministryCategoriesData.find((c) => c.id === category);
  const fellowships = fellowshipsData.filter(
    (f) => f.ministryCategory === category,
  );

  if (!catInfo) return null;

  return (
    <>
      {/* BANNER */}
      <section
        className="relative h-[55vh] min-h-80 flex items-end pt-20 bg-cover bg-center"
        style={{ backgroundImage: `url("${catInfo.bannerImageUrl}")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/40" />
        <div className="absolute inset-0 bg-linear-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm font-sans mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {t.back[currentLang]}
          </button>

          <span
            className="text-xs uppercase font-mono tracking-widest font-bold mb-2 block"
            style={{ color: catInfo.color }}
          >
            {catInfo.ageRange[currentLang]}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {catInfo.label[currentLang]}
          </h1>
        </div>
      </section>

      <section className="bg-[#eeecec] px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* DESCRIPTION CARD */}
          <div className="bg-white rounded-2xl border border-[#E7B7A0]/20 shadow-sm px-8 py-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#33271E] mb-4">
              {t.about[currentLang]}
            </h2>
            <p className="text-[#33271E] text-base sm:text-lg font-sans leading-relaxed">
              {catInfo.description[currentLang]}
            </p>
          </div>

          {/* FELLOWSHIPS */}
          {fellowships.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7B7A0]/20 p-10 text-center shadow-sm">
              <p className="font-serif text-xl text-[#33271E] font-semibold mb-2">
                {currentLang === "en"
                  ? "Resources Coming Soon"
                  : "資源即將上線"}
              </p>
              <p className="text-sm text-[#6F685B] font-sans leading-relaxed max-w-md mx-auto">
                {currentLang === "en"
                  ? "We are preparing training materials and resources for this ministry. Check back soon!"
                  : "我們正在籌備相關訓練材料與資源，敬請期待！"}
              </p>
            </div>
          ) : (
            fellowships.map((f) => (
              <div key={f.id} className="flex flex-col gap-4">
                {/* Fellowship name card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E7B7A0]/20 flex flex-col sm:flex-row">
                  <div className="relative sm:w-64 lg:w-80 h-52 sm:h-auto shrink-0 overflow-hidden">
                    <img
                      src={f.imageUrl}
                      alt={f.name[currentLang]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center gap-3 grow">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#33271E] leading-snug">
                      {f.name[currentLang]}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6F685B] font-sans leading-relaxed">
                      {f.description[currentLang]}
                    </p>
                  </div>
                </div>

                {/* Meeting time + Instagram card */}
                <div className="bg-white rounded-2xl border border-[#E7B7A0]/20 shadow-sm px-6 py-5 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#9A2B27]/10 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-[#9A2B27]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#6F685B] block">
                        {t.schedule[currentLang]}
                      </span>
                      <span className="text-sm font-semibold text-[#33271E]">
                        {f.schedule[currentLang]}
                      </span>
                    </div>
                  </div>
                  {f.instagramUrl && (
                    <div className="flex items-center gap-3">
                      <div className="bg-[#9A2B27]/10 p-2 rounded-lg">
                        <Instagram className="w-4 h-4 text-[#9A2B27]" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#6F685B] block">
                          {t.instagram[currentLang]}
                        </span>
                        <a
                          href={f.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#9A2B27] hover:underline"
                        >
                          @gccc_alpha
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
