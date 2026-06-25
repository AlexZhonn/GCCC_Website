import { Language } from "../types";
import { currentSermons, siteSettings } from "../data";

interface SermonPlayerProps {
  currentLang: Language;
}

export default function SermonPlayer({ currentLang }: SermonPlayerProps) {
  const t = {
    chinese: { en: "Chinese", zh: "中文" },
    english: { en: "English", zh: "英文" },
    viewChannel: {
      en: "View All Sermons on YouTube",
      zh: "在 YouTube 觀看所有講道",
    },
  };

  const sermon = currentSermons[0];
  if (!sermon) return null;

  const hasChinese = !!sermon.youtubeLink;
  const hasEnglish = !!sermon.englishYoutubeLink;

  return (
    <div className="flex flex-col gap-6">
      {/* Sermon title + date */}
      <div>
        <p className="font-mono text-xs text-[#9A2B27] uppercase tracking-widest mb-1">
          {sermon.date}
          {sermon.speaker[currentLang] ? ` · ${sermon.speaker[currentLang]}` : ""}
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-[#33271E] font-bold tracking-tight">
          {sermon.title[currentLang]}
        </h3>
      </div>

      {/* Video cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {hasChinese && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-[#6F685B] uppercase tracking-widest">
              {t.chinese[currentLang]}
            </span>
            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <iframe
                className="w-full h-full"
                src={sermon.youtubeLink}
                title={`${sermon.title[currentLang]} — Chinese`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {hasEnglish && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-[#6F685B] uppercase tracking-widest">
              {t.english[currentLang]}
            </span>
            <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
              <iframe
                className="w-full h-full"
                src={sermon.englishYoutubeLink}
                title={`${sermon.title[currentLang]} — English`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      {/* YouTube channel button */}
      <div className="pt-2">
        <a
          href={siteSettings.youtubeLiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#33271E] hover:bg-neutral-800 text-[#FBF7EF] px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          {t.viewChannel[currentLang]}
        </a>
      </div>
    </div>
  );
}
