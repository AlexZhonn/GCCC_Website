/**
 * src/gccc/data.ts
 *
 * Static fallback fixtures used when CMS is not configured.
 */
import {
  Sermon,
  Fellowship,
  SiteSettings,
  Activity,
  Leader,
  MinistryCategoryInfo,
} from "./types";

export const siteSettings: SiteSettings = {
  churchName: {
    en: "Gainesville Chinese Christian Church",
    zh: "甘城華人教會",
  },
  tagline: {
    en: "Experiencing Christ's Love, Sharing the Eternal Truth",
    zh: "經歷福杯滿溢的基督之愛，同享恆久不變的福音真理",
  },
  welcomeBlurbSubject: {
    en: "Welcome to Our Family",
    zh: "歡迎來到我們的屬靈大家庭",
  },
  welcomeBlurbText: {
    en: "The Gainesville Chinese Christian Church (GCCC) is a non-denominational, Bible-centered fellowship of believers. We are dedicated to preaching the Gospel of Jesus Christ, building up believers in faith and discipleship, and serving the Chinese-speaking and English-speaking communities in Gainesville and the surrounding areas.",
    zh: "甘城華人教會（GCCC）是一個不分宗派、以聖經真理為核心的基督徒群體。我們致力於傳揚耶穌基督的福音、在信心與門徒訓練中造就信徒，並熱沈服務甘城（蓋恩斯維爾）及周邊地區的華人同胞與英語社群。",
  },
  welcomeHistoryText: {
    en: "Founded by a dedicated group of students and scholars near the University of Florida, GCCC has grown into a vibrant, multi-generational home for individuals at all life stages. Whether you are a student exploring faith for the first time, a young professional seeking deep community, or a family looking for a warm environment for your children, there is a place for you here to grow closer to God.",
    zh: "由佛羅里達大學（UF）的一群熱心學生與學者創立，如今甘城華人教會已發展成一個充滿生機、跨越世代的溫暖港灣。無論你是初次探尋信仰的學子、尋求屬靈同伴的年輕職場人士，還是為孩子尋找溫馨環境的家庭，這裡都有屬於你的位置，讓我們並肩更親近神。",
  },
  address: {
    en: "2850 NW 23rd Blvd, Gainesville, FL 32605",
    zh: "2850 NW 23rd Blvd, Gainesville, FL 32605",
  },
  phone: "(352) 271-0776",
  email: "contactus@gcccfl.org",
  pastor: {
    name: "HongJun Li · 李洪軍牧師",
    email: "hongjun.li@gcccfl.org",
    cell: "(407) 924-8541",
  },
  youtubeLiveUrl: "https://www.youtube.com/@gainesvillechinesechristia9690",
};

export const currentSermons: Sermon[] = [
  {
    id: "sermon-1",
    title: { en: "The Kingdom of God", zh: "神国" },
    speaker: { en: "", zh: "" },
    scripture: "",
    date: "2026-06-14",
    youtubeLink: "https://www.youtube.com/embed/8abEVKXjFiU",
    englishYoutubeLink: "https://www.youtube.com/embed/3TxEmfIqXrI",
  },
  {
    id: "sermon-2",
    title: { en: "Let Us Renew Our Strength", zh: "让我们重新得力" },
    speaker: { en: "", zh: "" },
    scripture: "",
    date: "2026-05-31",
    youtubeLink: "https://www.youtube.com/embed/0WNz27xGa7A",
    englishYoutubeLink: "https://www.youtube.com/embed/EFF1TP7drfw",
  },
  {
    id: "sermon-3",
    title: { en: "Free from Inner Turmoil", zh: "让我能不再内耗" },
    speaker: { en: "Deacon Alex Lu", zh: "陸尊恩 傳道" },
    scripture: "",
    date: "2026-05-29",
    youtubeLink: "https://www.youtube.com/embed/VjqQbFt_xoc",
  },
];

export const activitiesData: Activity[] = [
  {
    id: "activity-1",
    fellowship: { en: "Alpha Fellowship", zh: "Alpha 團契" },
    title: { en: "He vs. She Cooking Competition", zh: "男女廚藝大比拼" },
    description: {
      en: "Brothers and sisters go head-to-head in a friendly cooking showdown. Come hungry, vote for your favorite dish, and enjoy an evening of laughter and fellowship!",
      zh: "兄弟與姊妹們一較廚藝高下！帶著空腹來，為你最愛的菜投票，享受一個充滿歡笑與團契的美好夜晚！",
    },
    date: "2026-06-19",
    time: "6:30 PM",
    location: { en: "Church Fellowship Hall", zh: "教會團契廳" },
    photos: ["/images/alpha.JPG"],
  },
];

export const ministryCategoriesData: MinistryCategoryInfo[] = [
  {
    id: "kids",
    label: { en: "Kids", zh: "兒童" },
    ageRange: { en: "Infants – 5th Grade", zh: "嬰兒至五年級" },
    description: {
      en: "A nurturing, age-appropriate environment where children learn to love God through Bible stories, worship songs, crafts, and meaningful friendships. We walk alongside parents in raising the next generation of faithful followers of Christ.",
      zh: "為嬰兒至五年級的孩子提供充滿愛、合乎年齡的成長環境。透過聖經故事、敬拜詩歌、手工藝及真誠友誼，讓孩子們在安全喜樂的氛圍中學習愛神愛人，與家長攜手培育下一代基督門徒。",
    },
    bannerImageUrl: "/images/kidSundaySchool.png",
    color: "#4A90D9",
  },
  {
    id: "youth",
    label: { en: "Youth", zh: "青少年" },
    ageRange: { en: "Middle & High School", zh: "國中 / 高中" },
    description: {
      en: "A vibrant community for middle and high school students to explore faith, ask tough questions, build lasting friendships, and grow as disciples of Christ through worship, Bible study, service projects, and fun events.",
      zh: "為國中及高中生打造充滿活力的信仰群體。透過敬拜、查經、服事項目與趣味活動，讓青少年在此探索信仰、提出真實問題、建立長久友誼，並在基督裡成長為真正的門徒。",
    },
    bannerImageUrl: "/images/gccc_campus_1781744441184.jpg",
    color: "#7B6CF6",
  },
  {
    id: "college",
    label: { en: "College", zh: "大學生" },
    ageRange: { en: "College Students", zh: "大學生" },
    description: {
      en: "A warm home away from home for college students — especially UF students and international scholars. Come for a free Friday dinner, stay for authentic community, Bible study, and a faith that holds up under real questions.",
      zh: "為大學生——尤其是佛大學生及國際訪學者——打造真誠溫馨的屬靈家園。週五免費愛宴帶你認識我們，查經與真誠團契讓你在信仰中紮根。",
    },
    bannerImageUrl: "/images/college.JPG",
    color: "#E8963A",
  },
  {
    id: "adults",
    label: { en: "Adults", zh: "成人" },
    ageRange: { en: "Young Professionals & Families", zh: "職青 / 青年家庭" },
    description: {
      en: "Communities for young professionals, married couples, and growing families navigating career, marriage, and parenthood. We pursue Christ together through honest conversation, shared meals, and mutual encouragement.",
      zh: "為職場青年、新婚夫婦及育兒家庭而設的屬靈群體。在坦誠對話、共享美食與彼此扶持中，一同在基督裡走過職場、婚姻與育兒的人生旅程。",
    },
    bannerImageUrl: "/images/adults.JPG",
    color: "#9A2B27",
  },
  {
    id: "senior-adults",
    label: { en: "Senior Adults", zh: "長輩" },
    ageRange: { en: "Senior Adults & Visiting Parents", zh: "長輩 / 探親父母" },
    description: {
      en: "A warm fellowship designed for our treasured elder members and visiting parents. Connect through traditional hymns, health seminars, Chinese calligraphy, stretching exercises, and rich testimonies over tea.",
      zh: "專為我們珍愛的長輩契友以及前來探親的父母們設計。一同吟唱古典聖詩、參與健康講座、書法交流及舒展體操，在熱呼呼的茶點中分享生命的恩典與見證。",
    },
    bannerImageUrl: "/images/aijiatuanqi.JPG",
    color: "#2E7D52",
  },
  {
    id: "discipleship",
    label: { en: "Discipleship", zh: "門徒訓練" },
    ageRange: { en: "All Ages", zh: "所有年齡" },
    description: {
      en: "A space for every believer to grow deeper in Christ — through training, spiritual breakthrough, and curated resources. Whether you are just beginning your faith journey or pursuing deeper maturity, we walk alongside you.",
      zh: "為每一位信徒提供在基督裡更深成長的空間——透過系統訓練、屬靈突破與精選資源，陪伴你從信仰起步到生命成熟的每一步。",
    },
    bannerImageUrl: "/images/discipleship.png",
    color: "#C07A2F",
  },
];

export const fellowshipsData: Fellowship[] = [
  // Ordered from youngest to oldest life stage
  {
    id: "children",
    name: {
      en: "Children Sunday School",
      zh: "兒童主日學",
    },
    schedule: {
      en: "Sundays at 10:50 AM (Sunday School)",
      zh: "主日上午 10:50 兒童主日學",
    },
    location: {
      en: "Children's Classrooms (Lower Level)",
      zh: "兒童教室（樓下）",
    },
    contact: {
      en: "Children's Ministry Team",
      zh: "兒童事工團隊",
    },
    description: {
      en: "A nurturing, age-appropriate environment where children from infants through 5th grade learn to love God through Bible stories, worship songs, crafts, and meaningful friendships in a safe and joyful setting.",
      zh: "為嬰兒至五年級的孩子提供充滿愛、合乎年齡的成長環境。透過聖經故事、敬拜詩歌、手工藝及真誠友誼，讓孩子們在安全喜樂的氛圍中學習愛神愛人。",
    },
    imageUrl: "/images/kidSundaySchool.png",
    ministryCategory: "kids",
  },
  {
    id: "youth",
    name: {
      en: "Youth Ministry (Middle & High School)",
      zh: "青少年事工 (國中/高中)",
    },
    schedule: {
      en: "Sundays at 9:30 AM & bi-weekly Friday evenings",
      zh: "主日上午 9:30 及 雙週五傍晚",
    },
    location: {
      en: "Youth Room & Church Campus",
      zh: "青少年教室及教會校園",
    },
    contact: {
      en: "Youth Ministry Team",
      zh: "青少年事工團隊",
    },
    description: {
      en: "A vibrant community for middle and high school students to explore faith, ask tough questions, build lasting friendships, and grow as disciples of Christ through worship, Bible study, service projects, and fun events.",
      zh: "為國中及高中生打造充滿活力的信仰群體。透過敬拜、查經、服事項目與趣味活動，讓青少年在此探索信仰、提出真實問題、建立長久友誼，並在基督裡成長為真正的門徒。",
    },
    imageUrl: "/images/gccc_campus_1781744441184.jpg",
    ministryCategory: "youth",
  },
  {
    id: "alpha",
    name: {
      en: "Alpha Fellowship (College Students)",
      zh: "Alpha團契 (大學生)",
    },
    schedule: {
      en: "Friday evenings at 6:30 PM",
      zh: "週五傍晚 6:30",
    },
    location: {
      en: "Church Lounge",
      zh: "教會多功能室",
    },
    contact: {
      en: "Dan Dai",
      zh: "戴弟兄",
    },
    description: {
      en: "A supportive sanctuary for women of all ages to prayerfully lift one another up, share life's blessings and sorrows, read spiritual books together, and study biblical examples of faithful women.",
      zh: "由各年齡層姊妹組成的屬靈馨香港灣。我們以真誠的禱告彼此扶持，分享做妻子、母親或職場女性的苦樂，共讀屬靈書籍，在基督的慈愛中共同綻放生命的光彩。",
    },
    imageUrl: "/images/alpha.JPG",
    instagramUrl: "https://www.instagram.com/gccc_alpha/",
    ministryCategory: "college",
  },
  {
    id: "song-of-songs",
    name: {
      en: "Song of Songs Fellowship",
      zh: "雅歌團契 (青年夫妻/職青)",
    },
    schedule: {
      en: "Alternate Saturdays at 6:30 PM",
      zh: "雙週六晚 6:30",
    },
    location: {
      en: "West Gainesville Group Houses",
      zh: "甘城西區小組成員居所",
    },
    contact: {
      en: "Sister Chloe Ye",
      zh: "葉姊妹",
    },
    description: {
      en: "Tailored for young working professionals and recently married couples. We cover career challenges, work-faith balance, building strong marriages, and exploring faith in modern culture through a cozy, authentic community format.",
      zh: "為年輕在職青年、博士後以及新婚夫妻而設。共同探索職場挑戰、信仰與工作的契合、早期婚姻經營等專題，在輕鬆自在、充滿美食的氛圍中敞開心懷坦誠相交。",
    },
    imageUrl: "/images/song-of-songsJPG",
    ministryCategory: "adults",
  },
  {
    id: "loving-family",
    name: {
      en: "Loving Family Fellowship",
      zh: "愛家團契 (中青年家庭)",
    },
    schedule: {
      en: "Saturdays once a month at 5:30 PM",
      zh: "每月一次週六傍晚 5:30",
    },
    location: {
      en: "Rotational Homes & Outdoor Parks",
      zh: "契友家輪流 或 戶外公園聚會",
    },
    contact: {
      en: "Brother Victor Lin",
      zh: "林弟兄",
    },
    description: {
      en: "A community for married couples with young children. Here we support one another in biblical parenting, discuss marriage health, and host family potlucks while kids play safely together under supervision.",
      zh: "由甘城當地有幼兒或學齡兒童的中青年夫婦組成的同盟。我們圍繞聖經原則切磋教養心得、探討健康夫妻關係，並常開展露營、烤肉等親子家庭派對。",
    },
    imageUrl: "/images/gccc_hero_1781744424066.jpg",
    ministryCategory: "adults",
  },
  {
    id: "friday-bible-study",
    name: {
      en: "Friday Bible Study",
      zh: "週五查經班",
    },
    schedule: {
      en: "Fridays at 7:30 PM",
      zh: "每週五晚 7:30",
    },
    location: {
      en: "Main Sanctuary & Classrooms",
      zh: "主堂及各教室/線上同步",
    },
    contact: {
      en: "Elder David Jiang",
      zh: "蔣長老",
    },
    description: {
      en: "A structured, welcoming space for scholars, local professionals, and families to study God's Word in depth. We feature age-appropriate groupings and interactive discussions, alongside children's program supervision.",
      zh: "為甘城當地的訪問學者、職場人士和家庭提供系統化且深入的聖經學習。查經班設有多個小組，並配合兒童看護和課堂活動，歡迎攜家帶眷參與。",
    },
    imageUrl: "/images/sundayservice.JPG",
    ministryCategory: "adults",
  },
  {
    id: "evergreen",
    name: {
      en: "Evergreen Senior Fellowship",
      zh: "常青團契 (長輩)",
    },
    schedule: {
      en: "2nd & 4th Saturday Mornings at 10:00 AM",
      zh: "每月第二及第四個週六上午 10:00",
    },
    location: {
      en: "Church Lounge / Cozy Homes",
      zh: "教會多功能廳 或 契友家中",
    },
    contact: {
      en: "Sister Helen Chao",
      zh: "趙姊妹",
    },
    description: {
      en: "Designed for our treasured elder members and visiting parents. Connect through traditional hymns, physical stretching exercises, health seminars, Chinese calligraphy sessions, and rich, loving testimonies.",
      zh: "專為我們珍愛的長輩契友以及前來探親的父母們設計。我們一同吟唱古典聖詩、做舒展體操、舉辦健康講座與書法交流，並在熱呼呼的茶點中分享生命的恩典與見證。",
    },
    imageUrl: "/images/aijiatuanqi.JPG",
    ministryCategory: "senior-adults",
  },
  {
    id: "prayer-meeting",
    name: {
      en: "Weekly Church Prayer Meeting",
      zh: "教會每週守望禱告會",
    },
    schedule: {
      en: "Wednesdays at 8:00 PM",
      zh: "每週三晚 8:00",
    },
    location: {
      en: "Church Chapel & Zoom Group",
      zh: "教堂小禮拜堂 / 雲端會議室",
    },
    contact: {
      en: "Pastor Samuel Cheng",
      zh: "鄭牧師",
    },
    description: {
      en: "The powerhouse of our church. We gather specifically to pray for world missions, local community needs, sick members, church ministries, and to seek God's leading.",
      zh: "教會事工的屬靈發動機。我們同心合意聚集，專切為全球宣教、甘城社區需要、生病肢體及教會各項聖工代禱守望，在安靜中尋求神的主權與引導。",
    },
    imageUrl: "/images/evergreen.JPG",
  },
];

export const leadersData: Leader[] = [
  {
    id: "pastor-li",
    name: { en: "Rev. HongJun Li", zh: "李洪軍牧師" },
    title: { en: "Pastor", zh: "牧師" },
    bio: {
      en: "Pastor HongJun Li has faithfully served GCCC as Senior Pastor, shepherding the congregation with a deep commitment to biblical preaching and discipleship.",
      zh: "李洪軍牧師忠心服事甘城華人教會，以深厚的聖經根基帶領會眾，致力於講道與門徒培育事工。",
    },
    email: "hongjun.li@gcccfl.org",
  },
  {
    id: "elder-fang",
    name: { en: "Brother Chou Fang", zh: "方疇弟兄" },
    title: { en: "Elder", zh: "長老" },
  },
  {
    id: "elder-song",
    name: { en: "Brother Sihong Song", zh: "宋嗣宏弟兄" },
    title: { en: "Elder", zh: "長老" },
  },
];
