"use client";

import { useState } from "react";
import { FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Language } from "../types";

interface AboutPageProps {
  currentLang: Language;
}

export default function AboutPage({ currentLang }: AboutPageProps) {
  const [commemorativeOpen, setCommemorativeOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section
        className="relative h-[75vh] min-h-[500px] flex items-end pt-20 bg-cover bg-center"
        style={{ backgroundImage: `url("/images/aboutus.jpg")` }}
      >
        <div className="absolute inset-0 bg-neutral-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211E18] via-[#211E18]/20 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
          <span className="font-mono text-xs text-[#E7B7A0] uppercase tracking-widest font-bold block mb-2">
            {currentLang === "en" ? "Who We Are" : "關於我們"}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-bold tracking-tight leading-tight">
            {currentLang === "en" ? "About GCCC" : "甘城華人教會"}
          </h1>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Full-width church portrait */}
        <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <div className="aspect-21/9">
            <img
              src="/images/church-portait.JPG"
              alt="GCCC congregation portrait"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-[#211E18]/60 to-transparent" />
          <div className="absolute -bottom-4 -right-4 w-48 h-24 bg-[#E7B7A0]/30 rounded-2xl -z-10" />
          <div className="absolute top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-[#9A2B27] -z-10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          {/* Left: proclamation */}
          <div className="flex flex-col gap-8">

            {/* Proclamation of Faith */}
            <div className="bg-white rounded-2xl p-8 border-l-4 border-[#9A2B27] shadow-xl">
              <span className="font-mono text-xs text-[#9A2B27] uppercase tracking-[3px] font-bold block mb-5">
                {currentLang === "en" ? "Proclamation of Faith" : "信仰宣告"}
              </span>
              <div className="space-y-4 font-serif text-base text-neutral-800 italic leading-relaxed">
                {currentLang === "en" ? (
                  <>
                    <p>
                      I believe in God, the Father Almighty, Creator of heaven
                      and earth.
                    </p>
                    <p>
                      I believe in Jesus Christ, God's only Son, our Lord; who
                      was conceived by the Holy Spirit, born of the Virgin Mary;
                      suffered under Pontius Pilate, was crucified, died, and
                      was buried; he descended to the dead; on the third day he
                      rose again; he ascended into heaven, he is seated at the
                      right hand of the Father; and he will come again to judge
                      the living and the dead.
                    </p>
                    <p>
                      I believe in the Holy Spirit; the holy catholic church,
                      the communion of saints; the forgiveness of sins, the
                      resurrection of the body; and the life everlasting. Amen.
                    </p>
                  </>
                ) : (
                  <>
                    <p>我信上帝，全能的父，創造天地的主。</p>
                    <p>
                      我信我主耶穌基督，上帝的獨生子；因著聖靈感孕，從童貞女馬利亞所生；在本丟彼拉多手下受難，被釘在十字架上，受死，埋葬；降在陰間；第三天從死里復活；祂升天，坐在全能父上帝的右邊；將來必從那里降臨，審判活人，死人。
                    </p>
                    <p>
                      我信聖靈；我信聖而公之教會；我信聖徒相通；我信罪得赦免；我信身體復活；我信永生。阿們！
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: full church history */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-6xl text-[#33271E] font-bold tracking-tight">
                {currentLang === "en" ? "History of Our Church" : "本教會歷史"}
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-[#000000] font-serif leading-relaxed">
              {currentLang === "en" ? (
                <>
                  <p>
                    In September 1970, several Chinese Christians started the
                    Gainesville Chinese Bible Study Group. They met every Friday
                    night at the Baptist Student Center — not only to fellowship
                    through Bible study, praying, and sharing together with
                    other brothers and sisters in the Lord, but also to share
                    the gospel with the Chinese community. The numbers of people
                    attending the meeting grew from a little over 10 people to
                    60 to 70 people by the 1980s.
                  </p>
                  <p>
                    In 1979, the First Baptist Church started an international
                    Sunday school, whose members were mainly from the
                    Gainesville Chinese Bible Study Group. In October 1988,
                    Chinese Sunday worship service was started at the chapel of
                    the First Baptist Church. In February 1989, the Gainesville
                    Chinese Christian Church was officially established. By the
                    grace of God, we moved into our own church building in 2002.
                    The number of adults attending the worship service grew from
                    about 40 initially to more than 100 at present.
                  </p>
                  <p>
                    Our congregation consists of people of all walks of life and
                    of all ages. We are mostly first- and second-generation
                    Chinese immigrants, college students, and graduate students
                    and their families.
                  </p>
                  <p>
                    One of the missions of the church is to evangelize Chinese
                    who came to Gainesville for school or work. By the grace of
                    God, we have been successful in this mission. Many
                    Christians, who have accepted Jesus Christ as their personal
                    savior and been baptized in the church, have carried this
                    mission with them to other parts of the United States and
                    their home countries.
                  </p>
                  <p>
                    There are about five percent non-Chinese and about one-third
                    second-generation Chinese immigrants who are more fluent in
                    English than Chinese. As such, the church is Chinese-English
                    bilingual and bicultural. The adult worship service is
                    conducted in both Chinese and English, whereas the youth
                    worship service as well as several Bible studies are
                    conducted in English. While other meetings are conducted in
                    Chinese, English is used in conversations.
                  </p>
                  <p>
                    This church has deep roots in Bible study. From a small
                    Bible study forty years ago, this church has grown. Now we
                    have four Bible study groups on Sunday mornings, another six
                    on Friday nights, five fellowships, and a Bible Training
                    Center for Pastors. We are students of the Holy Bible and
                    disciples of Jesus Christ.
                  </p>
                  <p>
                    In 2009, the church celebrated its 20th anniversary and the
                    7th anniversary of church building dedication. The church
                    published a commemorative issue that documented witnesses of
                    God's grace and glory in church history.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    一九七零年九月，數位愛主的華人基督徒開始佛州大學的中文查經班。每週五晚上，在浸信會學生中心聚會。一則聯繫主內弟兄姊妹查經、禱告、分享，一則傳揚福音給自己的同胞，同學。聚會人數從起初的十幾人到八十年代末期已增至六、七十人。
                  </p>
                  <p>
                    一九七九年第一浸信教會開始以華人為主的國際主日學，其中成員都是查經班的弟兄姊妹。一九八八年十月第一浸信教會提供場所給查經班，在它的副堂開始中文主日崇拜。次年二月正式成立教會。蒙神的恩典，教會於二零零二年搬進了自建的教堂，教會的崇拜成人人數也由起初的四十幾人增加到現在的一百多人。
                  </p>
                  <p>
                    本教會會眾包含社會各階層及各年齡層的人。我們大部份是第一代及第二代華人移民、大學生、研究生及他們的眷屬。
                  </p>
                  <p>
                    本教會首要的使命之一就是傳福音給來甘城讀書或工作的華人。蒙神的恩典、我們在這個使命裡有收穫。許多基督徒、在接受耶穌基督為他們個人的救主並在教會受洗以後、到了美國其它各地或回到家鄉接續了這項使命、繼續的傳耶穌基督復活及赦罪的福音。
                  </p>
                  <p>
                    教會會眾中有大約百份之五的非華人及大約三份之一的第二代華人移民。他們說英文比說中文流利。因此、本教會有一個中英文雙語及雙文化的環境。成人主日崇拜是雙語的。青少年主日崇拜及數個查經班是英語的。雖然在大部份的時間我們用的語言是中文、英文也是聚會時隨時可用的語言。
                  </p>
                  <p>
                    本教會的基礎深植於查經班。從四十年前的那一個查經班開始、本教會現在在主日有四個查經班、在週五有六個查經班、在週末有聖經牧訓班、另外有五個團契及其它的聚會。我們是聖經的學生、是耶穌基督的門徒。
                  </p>
                  <p>
                    在二零零九年，教會的弟兄姊妹慶祝了教會成立二十周年及建堂七周年、除了向神獻上感恩外、並為文以為紀念。教會也發行了紀念特刊、將榮耀、感恩及頌讚歸與神。
                  </p>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Commemorative Issue Dropdown — centered below the grid */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-black/8 overflow-hidden shadow-sm bg-white">
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-black/2 transition-colors"
            onClick={() => setCommemorativeOpen((o) => !o)}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#9A2B27]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#9A2B27]" />
              </div>
              <div className="min-w-0">
                <p className="font-serif font-semibold text-base sm:text-lg text-[#211E18]">
                  {currentLang === "en"
                    ? "20th Anniversary Commemorative Issue"
                    : "建堂二十週年紀念特刊"}
                </p>
                <p className="text-sm text-gray-500 font-mono mt-0.5">2009</p>
              </div>
            </div>
            <div className="shrink-0 text-gray-400">
              {commemorativeOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </button>

          {commemorativeOpen && (
            <div className="border-t border-black/8 px-6 py-5 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentLang === "en"
                  ? "A commemorative issue documenting witnesses of God's grace and glory in our church history, published for the 20th anniversary of GCCC."
                  : "教會成立二十週年紀念特刊，記錄神在本教會歷史中的恩典與榮耀見證。"}
              </p>
              <div
                className="rounded-xl overflow-hidden border border-black/10 bg-gray-50"
                style={{ height: "900px" }}
              >
                <object
                  data="/pdfs/20th_anniversary.pdf"
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-500 text-sm p-8 text-center">
                    <FileText className="w-10 h-10 text-gray-300" />
                    <p>
                      {currentLang === "en"
                        ? "Your browser cannot display this PDF inline."
                        : "您的瀏覽器無法直接顯示此 PDF。"}
                    </p>
                    <a
                      href="/pdfs/20th_anniversary.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2B27] hover:text-[#7a2220] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {currentLang === "en" ? "Download PDF" : "下載 PDF"}
                    </a>
                  </div>
                </object>
              </div>
              <a
                href="/pdfs/20th_anniversary.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2B27] hover:text-[#7a2220] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {currentLang === "en" ? "Open PDF" : "開啟 PDF"}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
