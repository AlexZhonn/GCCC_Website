import { useState } from "react";
import { Sermon, Language } from "../types";
import { currentSermons } from "../data";
import { Play, Pause, Video, Headphones, BookOpen, User, Calendar, Disc } from "lucide-react";

interface SermonPlayerProps {
  currentLang: Language;
}

export default function SermonPlayer({ currentLang }: SermonPlayerProps) {
  const [selectedSermon, setSelectedSermon] = useState<Sermon>(currentSermons[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<"video" | "audio">("video");
  const [audioRef] = useState<HTMLAudioElement>(() => {
    const audio = new Audio();
    audio.src = currentSermons[0].audioLink || "";
    return audio;
  });

  const t = {
    headerTitle: { en: "Latest Deliveries", zh: "主日證道經文與信息" },
    headerSub: { en: "Sermon Player & Archive", zh: "崇拜講道影音播放與存檔" },
    tabs: {
      video: { en: "Video Livestream / Replay", zh: "主日講道視頻 / 重溫" },
      audio: { en: "Audio Archive", zh: "主日音頻廣播" },
    },
    audioPlayerTitle: { en: "Preach Audio Channel", zh: "主日音頻播放器" },
    archiveTitle: { en: "Recent Preaches", zh: "近期證道回顧" },
    series: { en: "Series", zh: "系列" },
    scripture: { en: "Scripture", zh: "經文" },
    speaker: { en: "Speaker", zh: "講員" },
    date: { en: "Date", zh: "日期" },
    playText: { en: "Play Sermon Audio", zh: "播放講道音頻" },
    pauseText: { en: "Pause Audio", zh: "暫停播放" },
    nowPlaying: { en: "Now Playing:", zh: "正在播放：" },
  };

  const handleSelectSermon = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    setIsPlayingAudio(false);
    audioRef.pause();
    audioRef.src = sermon.audioLink || "";
    audioRef.load();
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      audioRef.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((e) => {
        console.error("Audio playback error:", e);
      });
    }
  };

  return (
    <div className="bg-[#33271E] text-[#FBF7EF] rounded-2xl overflow-hidden shadow-2xl border border-[#E7B7A0]/10" id="sermon_player_module">
      <div className="p-6 md:p-8 border-b border-[#E7B7A0]/10 bg-[#211E18]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs tracking-widest text-[#E7B7A0] uppercase block mb-1">
            {t.headerSub[currentLang]}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-[#FBF7EF] font-semibold tracking-tight">
            {t.headerTitle[currentLang]}
          </h3>
        </div>
        
        {/* Media Type Toggles */}
        <div className="flex bg-[#33271E] p-1 rounded-lg border border-[#E7B7A0]/20 self-start md:self-center">
          <button
            onClick={() => setActiveMediaTab("video")}
            className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-md transition-all ${
              activeMediaTab === "video"
                ? "bg-[#9A2B27] text-white shadow"
                : "text-[#E7B7A0] hover:text-white"
            }`}
          >
            <Video className="w-4 h-4" />
            {t.tabs.video[currentLang]}
          </button>
          <button
            onClick={() => setActiveMediaTab("audio")}
            className={`flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-md transition-all ${
              activeMediaTab === "audio"
                ? "bg-[#9A2B27] text-white shadow"
                : "text-[#E7B7A0] hover:text-white"
            }`}
          >
            <Headphones className="w-4 h-4" />
            {t.tabs.audio[currentLang]}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        
        {/* Left/Middle: Core Player Display */}
        <div className="lg:col-span-2 p-6 md:p-8 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-[#E7B7A0]/10 bg-[#281F18]/50">
          
          {/* Active Player Canvas */}
          <div className="aspect-video w-full rounded-xl bg-black overflow-hidden relative shadow-inner group border border-[#E7B7A0]/10" id="media-canvas">
            {activeMediaTab === "video" ? (
              <iframe
                className="w-full h-full"
                src={selectedSermon.youtubeLink}
                title="GCCC Sermon Playback"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#281F18] to-[#1E1611]/95 text-center relative">
                {/* Vinyl Rotation Disc */}
                <div className={`relative mb-6 transform transition-transform duration-[4s] ease-linear ${isPlayingAudio ? "animate-spin" : ""}`}>
                  <div className="w-24 h-24 rounded-full bg-neutral-900 flex items-center justify-center border-4 border-[#FBF7EF]/10 ring-4 ring-[#E7B7A0]/20 shadow-xl">
                    <Disc className="w-10 h-10 text-[#E7B7A0]" />
                  </div>
                </div>
                
                <h4 className="text-xs font-mono text-[#E7B7A0] uppercase tracking-widest mb-1">
                  {t.audioPlayerTitle[currentLang]}
                </h4>
                <p className="font-serif text-lg text-white font-medium max-w-md line-clamp-1 mb-1">
                  {selectedSermon.title[currentLang]}
                </p>
                <p className="text-sm text-[#E7B7A0] mb-6">
                  {selectedSermon.speaker[currentLang]} • {selectedSermon.scripture}
                </p>
                
                {/* Audio Custom Controller Panel */}
                <button
                  onClick={toggleAudio}
                  className="flex items-center gap-3 bg-[#9A2B27] hover:bg-[#80221E] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all text-sm font-semibold"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-5 h-5 fill-white" />
                      {t.pauseText[currentLang]}
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-white" />
                      {t.playText[currentLang]}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Sermon Information Details */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {selectedSermon.series && (
                <span className="font-sans text-xs font-semibold uppercase tracking-wider bg-[#9A2B27] text-white px-2.5 py-1 rounded-full">
                  {t.series[currentLang]}: {selectedSermon.series[currentLang]}
                </span>
              )}
              <span className="font-mono text-xs text-[#E7B7A0] bg-[#FBF7EF]/5 border border-[#E7B7A0]/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {selectedSermon.date}
              </span>
            </div>

            <h4 className="font-serif text-xl sm:text-2xl text-[#FBF7EF] font-bold tracking-tight">
              {selectedSermon.title[currentLang]}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-t border-[#E7B7A0]/10 pt-4">
              <div className="flex items-start gap-2.5 text-sm">
                <BookOpen className="w-4 h-4 text-[#E7B7A0] mt-0.5" />
                <div>
                  <span className="text-xs text-[#E7B7A0] block leading-none mb-1">
                    {t.scripture[currentLang]}
                  </span>
                  <span className="text-[#FBF7EF] font-serif tracking-wide">{selectedSermon.scripture}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <User className="w-4 h-4 text-[#E7B7A0] mt-0.5" />
                <div>
                  <span className="text-xs text-[#E7B7A0] block leading-none mb-1">
                    {t.speaker[currentLang]}
                  </span>
                  <span className="text-[#FBF7EF] font-serif font-medium">{selectedSermon.speaker[currentLang]}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Columns: Archive Picker */}
        <div className="p-6 md:p-8 bg-[#211E18]/40 flex flex-col gap-4 max-h-[500px] overflow-y-auto">
          <h4 className="font-mono text-xs text-[#E7B7A0] tracking-widest uppercase pb-2 border-b border-[#E7B7A0]/10">
            {t.archiveTitle[currentLang]}
          </h4>
          
          <div className="flex flex-col gap-3">
            {currentSermons.map((sermon) => {
              const isActive = selectedSermon.id === sermon.id;
              return (
                <button
                  key={sermon.id}
                  onClick={() => handleSelectSermon(sermon)}
                  className={`w-full text-left p-4 rounded-xl transition-all border ${
                    isActive
                      ? "bg-[#9A2B27] border-[#9A2B27] text-white shadow-md transform translate-x-1"
                      : "bg-[#33271E]/60 hover:bg-[#33271E] border-[#E7B7A0]/10 text-[#FBF7EF] hover:border-[#E7B7A0]/30"
                  }`}
                >
                  <span className={`font-mono text-[10px] block mb-1 ${isActive ? "text-[#FBF7EF]/80" : "text-[#E7B7A0]"}`}>
                    {sermon.date} • {sermon.speaker[currentLang]}
                  </span>
                  <span className="font-serif text-sm font-semibold tracking-wide line-clamp-2 block leading-snug">
                    {sermon.title[currentLang]}
                  </span>
                  <span className={`font-mono text-[10px] block mt-1 opacity-70`}>
                    {sermon.scripture}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
