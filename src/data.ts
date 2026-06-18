import { Sermon, Fellowship, SiteSettings } from './types';

export const siteSettings: SiteSettings = {
  churchName: {
    en: "Gainesville Chinese Christian Church",
    zh: "甘城華人教會"
  },
  tagline: {
    en: "Experiencing Christ's Love, Sharing the Eternal Truth",
    zh: "經歷福杯滿溢的基督之愛，同享恆久不變的福音真理"
  },
  welcomeBlurbSubject: {
    en: "Welcome to Our Family",
    zh: "歡迎來到我們的屬靈大家庭"
  },
  welcomeBlurbText: {
    en: "The Gainesville Chinese Christian Church (GCCC) is a non-denominational, Bible-centered fellowship of believers. We are dedicated to preaching the Gospel of Jesus Christ, building up believers in faith and discipleship, and serving the Chinese-speaking and English-speaking communities in Gainesville and the surrounding areas.",
    zh: "甘城華人教會（GCCC）是一個不分宗派、以聖經真理為核心的基督徒群體。我們致力於傳揚耶穌基督的福音、在信心與門徒訓練中造就信徒，並熱沈服務甘城（蓋恩斯維爾）及周邊地區的華人同胞與英語社群。"
  },
  welcomeHistoryText: {
    en: "Founded by a dedicated group of students and scholars near the University of Florida, GCCC has grown into a vibrant, multi-generational home for individuals at all life stages. Whether you are a student exploring faith for the first time, a young professional seeking deep community, or a family looking for a warm environment for your children, there is a place for you here to grow closer to God.",
    zh: "由佛羅里達大學（UF）的一群熱心學生與學者創立，如今甘城華人教會已發展成一個充滿生機、跨越世代的溫暖港灣。無論你是初次探尋信仰的學子、尋求屬靈同伴的年輕職場人士，還是為孩子尋找溫馨環境的家庭，這裡都有屬於你的位置，讓我們並肩更親近神。"
  },
  address: {
    en: "3425 SW 2nd Ave, Gainesville, FL 32607",
    zh: "3425 SW 2nd Ave, Gainesville, FL 32607 (UF校園旁)"
  },
  phone: "(352) 378-0554",
  email: "gcccfl@gmail.com",
  youtubeLiveUrl: "https://www.youtube.com/@GainesvilleChineseChristianChurch"
};

export const currentSermons: Sermon[] = [
  {
    id: "sermon-1",
    title: {
      en: "Abiding in the Vine: True Spiritual Fruitfulness",
      zh: "常在葡萄樹上：結出豐盛的生命果子"
    },
    speaker: {
      en: "Pastor Samuel Cheng",
      zh: "鄭牧師"
    },
    scripture: "John 15:1-8 (約翰福音 15:1-8)",
    date: "2026-06-14",
    series: {
      en: "The Gospel of John",
      zh: "約翰福音系列"
    },
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo link
    audioLink: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "sermon-2",
    title: {
      en: "Foundations of Faith: Hearing and Doing",
      zh: "信仰的根基：聽道與行道"
    },
    speaker: {
      en: "Elder David Jiang",
      zh: "蔣長老"
    },
    scripture: "James 1:22-25 (雅各書 1:22-25)",
    date: "2026-06-07",
    series: {
      en: "Walking in Wisdom",
      zh: "智慧中行事"
    },
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audioLink: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: "sermon-3",
    title: {
      en: "A Call to True Discipleship",
      zh: "真實門徒的召喚與奉獻"
    },
    speaker: {
      en: "Rev. Matthew Wu",
      zh: "吳牧師"
    },
    scripture: "Luke 9:23-26 (路加福音 9:23-26)",
    date: "2026-05-31",
    series: {
      en: "Following Jesus",
      zh: "跟隨耶穌的腳步"
    },
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audioLink: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: "sermon-4",
    title: {
      en: "The Peace That Transcends Understanding",
      zh: "出人意外的平安"
    },
    speaker: {
      en: "Pastor Samuel Cheng",
      zh: "鄭牧師"
    },
    scripture: "Philippians 4:4-7 (腓立比書 4:4-7)",
    date: "2026-05-24",
    series: {
      en: "Joy in All Circumstance",
      zh: "逆境中的喜樂"
    },
    youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    audioLink: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  }
];

export const fellowshipsData: Fellowship[] = [
  {
    id: "campus",
    name: {
      en: "Campus Student Fellowship (UF & SFC)",
      zh: "校園學生團契 (UF & SFC)"
    },
    schedule: {
      en: "Fridays at 7:30 PM (Dinner at 6:30 PM)",
      zh: "每週五晚 7:30 (傍晚 6:30 供應學生愛宴)"
    },
    location: {
      en: "Church Fellowship Hall & UF Campus",
      zh: "教會副堂 及 佛羅里達大學校區各小組"
    },
    contact: {
      en: "Brother Ethan / Sister Grace",
      zh: "Ethan 弟兄 / Grace 姊妹"
    },
    description: {
      en: "A priority community for undergraduate and graduate students at University of Florida (UF) and Santa Fe College (SFC). We gather weekly for home-cooked meals, worship, inductive Bible study, and support groups. Whether you are actively Christian or just curious, come make lifelong friends here!",
      zh: "專為佛羅里達大學（UF）和聖達菲學院（SFC）本科生及研究生打造的重點社區。我們每週五一同共享家常愛宴，隨後進行敬拜、啟發式查經與互助分享。不論你是基督徒還是尋求信仰的旁聽者，歡迎加入這個溫馨好動的大家庭！"
    },
    imageUrl: "/src/assets/images/gccc_campus_1781744441184.jpg", // Generated campus photo
    isFeatured: true
  },
  {
    id: "friday-bible-study",
    name: {
      en: "Friday Adult Bible Study",
      zh: "週五成人查經班"
    },
    schedule: {
      en: "Fridays at 7:30 PM",
      zh: "每週五晚 7:30"
    },
    location: {
      en: "Main Sanctuary & Classrooms",
      zh: "主堂及各教室/線上同步"
    },
    contact: {
      en: "Elder David Jiang",
      zh: "蔣長老"
    },
    description: {
      en: "A structured, welcoming space for scholars, local professionals, and families to study God's Word in depth. We feature age-appropriate groupings and interactive discussions, alongside children's program supervision.",
      zh: "為甘城當地的訪問學者、職場人士和家庭提供系統化且深入的聖經學習。查經班設有多個小組，並配合兒童看護和課堂活動，歡迎攜家帶眷參與。"
    },
    imageUrl: "https://picsum.photos/seed/bible/600/400"
  },
  {
    id: "evergreen",
    name: {
      en: "Evergreen Senior Fellowship",
      zh: "常青團契 (長輩)"
    },
    schedule: {
      en: "2nd & 4th Saturday Mornings at 10:00 AM",
      zh: "每月第二及第四個週六上午 10:00"
    },
    location: {
      en: "Church Lounge / Cozy Homes",
      zh: "教會多功能廳 或 契友家中"
    },
    contact: {
      en: "Sister Helen Chao",
      zh: "趙姊妹"
    },
    description: {
      en: "Designed for our treasured elder members and visiting parents. Connect through traditional hymns, physical stretching exercises, health seminars, Chinese calligraphy sessions, and rich, loving testimonies.",
      zh: "專為我們珍愛的長輩契友以及前來探親的父母們設計。我們一同吟唱古典聖詩、做舒展體操、舉辦健康講座與書法交流，並在熱呼呼的茶點中分享生命的恩典與見證。"
    },
    imageUrl: "https://picsum.photos/seed/seniors/600/400"
  },
  {
    id: "loving-family",
    name: {
      en: "Loving Family Fellowship",
      zh: "愛家團契 (中青年家庭)"
    },
    schedule: {
      en: "Saturdays once a month at 5:30 PM",
      zh: "每月一次週六傍晚 5:30"
    },
    location: {
      en: "Rotational Homes & Outdoor Parks",
      zh: "契友家輪流 或 戶外公園聚會"
    },
    contact: {
      en: "Brother Victor Lin",
      zh: "林弟兄"
    },
    description: {
      en: "A community for married couples with young children. Here we support one another in biblical parenting, discuss marriage health, and host family potlucks while kids play safely together under supervision.",
      zh: "由甘城當地有幼兒或學齡兒童的中青年夫婦組成的同盟。我們圍繞聖經原則切磋教養心得、探討健康夫妻關係，並常開展露營、烤肉等親子家庭派對。"
    },
    imageUrl: "https://picsum.photos/seed/family/600/400"
  },
  {
    id: "song-of-songs",
    name: {
      en: "Song of Songs Fellowship",
      zh: "雅歌團契 (青年夫妻/職青)"
    },
    schedule: {
      en: "Alternate Saturdays at 6:30 PM",
      zh: "雙週六晚 6:30"
    },
    location: {
      en: "West Gainesville Group Houses",
      zh: "甘城西區小組成員居所"
    },
    contact: {
      en: "Sister Chloe Ye",
      zh: "葉姊妹"
    },
    description: {
      en: "Tailored for young working professionals and recently married couples. We cover career challenges, work-faith balance, building strong marriages, and exploring faith in modern culture through a cozy, authentic community format.",
      zh: "為年輕在職青年、博士後以及新婚夫妻而設。共同探索職場挑戰、信仰與工作的契合、早期婚姻經營等專題，在輕鬆自在、充滿美食的氛圍中敞開心懷坦誠相交。"
    },
    imageUrl: "https://picsum.photos/seed/songofsongs/600/400"
  },
  {
    id: "sisters",
    name: {
      en: "Sisters' Fellowship",
      zh: "姊妹團契 (婦女)"
    },
    schedule: {
      en: "1st Wednesday Afternoons at 1:30 PM",
      zh: "每月第一個週三下午 1:30"
    },
    location: {
      en: "Church Lounge / Online Meet",
      zh: "教會多功能室 / 雲端視頻同步"
    },
    contact: {
      en: "Sister Sarah Wu",
      zh: "吳師母"
    },
    description: {
      en: "A supportive sanctuary for women of all ages to prayerfully lift one another up, share life's blessings and sorrows, read spiritual books together, and study biblical examples of faithful women.",
      zh: "由各年齡層姊妹組成的屬靈馨香港灣。我們以真誠的禱告彼此扶持，分享做妻子、母親或職場女性的苦樂，共讀屬靈書籍，在基督的慈愛中共同綻放生命的光彩。"
    },
    imageUrl: "https://picsum.photos/seed/sisters/600/400"
  },
  {
    id: "prayer-meeting",
    name: {
      en: "Weekly Church Prayer Meeting",
      zh: "教會每週守望禱告會"
    },
    schedule: {
      en: "Wednesdays at 8:00 PM",
      zh: "每週三晚 8:00"
    },
    location: {
      en: "Church Chapel & Zoom Group",
      zh: "教堂小禮拜堂 / 雲端會議室"
    },
    contact: {
      en: "Pastor Samuel Cheng",
      zh: "鄭牧師"
    },
    description: {
      en: "The powerhouse of our church. We gather specifically to pray for world missions, local community needs, sick members, church ministries, and to seek God's leading.",
      zh: "教會事工的屬靈發動機。我們同心合意聚集，專切為全球宣教、甘城社區需要、生病肢體及教會各項聖工代禱守望，在安靜中尋求神的主權與引導。"
    },
    imageUrl: "https://picsum.photos/seed/gathering/600/400"
  }
];
