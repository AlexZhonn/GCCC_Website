/**
 * Seed script: migrates static fixtures from src/data.ts into Payload CMS.
 *
 * Run with:  cd cms && npm run seed
 *
 * Prerequisites:
 *   - Payload dev server running, OR run in the same process via getPayload()
 *   - PAYLOAD_SECRET env var set (or uses default dev secret)
 *   - DATABASE_URI env var set (or defaults to ../cms.db)
 */

import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Raw fixture data (mirrors src/data.ts exactly) ──────────────────────────

const siteSettingsSeed = {
  churchName: {
    en: 'Gainesville Chinese Christian Church',
    zh: '甘城華人教會',
  },
  tagline: {
    en: "Experiencing Christ's Love, Sharing the Eternal Truth",
    zh: '經歷福杯滿溢的基督之愛，同享恆久不變的福音真理',
  },
  welcomeBlurbSubject: {
    en: 'Welcome to Our Family',
    zh: '歡迎來到我們的屬靈大家庭',
  },
  welcomeBlurbText: {
    en: 'The Gainesville Chinese Christian Church (GCCC) is a non-denominational, Bible-centered fellowship of believers. We are dedicated to preaching the Gospel of Jesus Christ, building up believers in faith and discipleship, and serving the Chinese-speaking and English-speaking communities in Gainesville and the surrounding areas.',
    zh: '甘城華人教會（GCCC）是一個不分宗派、以聖經真理為核心的基督徒群體。我們致力於傳揚耶穌基督的福音、在信心與門徒訓練中造就信徒，並熱沈服務甘城（蓋恩斯維爾）及周邊地區的華人同胞與英語社群。',
  },
  welcomeHistoryText: {
    en: 'Founded by a dedicated group of students and scholars near the University of Florida, GCCC has grown into a vibrant, multi-generational home for individuals at all life stages.',
    zh: '由佛羅里達大學（UF）的一群熱心學生與學者創立，如今甘城華人教會已發展成一個充滿生機、跨越世代的溫暖港灣。',
  },
  address: {
    en: '3425 SW 2nd Ave, Gainesville, FL 32607',
    zh: '3425 SW 2nd Ave, Gainesville, FL 32607 (UF校園旁)',
  },
  phone: '(352) 378-0554',
  email: 'gcccfl@gmail.com',
  youtubeLiveUrl: 'https://www.youtube.com/@GainesvilleChineseChristianChurch',
}

// Speaker fixtures keyed by en name for easy lookup
const speakerFixtures = [
  { name: { en: 'Pastor Samuel Cheng', zh: '鄭牧師' }, title: { en: 'Senior Pastor', zh: '主任牧師' } },
  { name: { en: 'Elder David Jiang', zh: '蔣長老' }, title: { en: 'Elder', zh: '長老' } },
  { name: { en: 'Rev. Matthew Wu', zh: '吳牧師' }, title: { en: 'Associate Pastor', zh: '副牧師' } },
]

// Series fixtures
const seriesFixtures = [
  { name: { en: 'The Gospel of John', zh: '約翰福音系列' }, isActive: true },
  { name: { en: 'Walking in Wisdom', zh: '智慧中行事' }, isActive: true },
  { name: { en: 'Following Jesus', zh: '跟隨耶穌的腳步' }, isActive: false },
  { name: { en: 'Joy in All Circumstance', zh: '逆境中的喜樂' }, isActive: true },
]

// Sermon fixtures — speaker and series referenced by en name
const sermonFixtures = [
  {
    title: { en: 'Abiding in the Vine: True Spiritual Fruitfulness', zh: '常在葡萄樹上：結出豐盛的生命果子' },
    speakerName: 'Pastor Samuel Cheng',
    scripture: 'John 15:1-8 (約翰福音 15:1-8)',
    date: '2026-06-14',
    seriesName: 'The Gospel of John',
    youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioLink: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: { en: 'Foundations of Faith: Hearing and Doing', zh: '信仰的根基：聽道與行道' },
    speakerName: 'Elder David Jiang',
    scripture: 'James 1:22-25 (雅各書 1:22-25)',
    date: '2026-06-07',
    seriesName: 'Walking in Wisdom',
    youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioLink: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: { en: 'A Call to True Discipleship', zh: '真實門徒的召喚與奉獻' },
    speakerName: 'Rev. Matthew Wu',
    scripture: 'Luke 9:23-26 (路加福音 9:23-26)',
    date: '2026-05-31',
    seriesName: 'Following Jesus',
    youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioLink: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    title: { en: 'The Peace That Transcends Understanding', zh: '出人意外的平安' },
    speakerName: 'Pastor Samuel Cheng',
    scripture: 'Philippians 4:4-7 (腓立比書 4:4-7)',
    date: '2026-05-24',
    seriesName: 'Joy in All Circumstance',
    youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioLink: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
]

// Fellowship fixtures
const fellowshipFixtures = [
  {
    slug: 'campus',
    name: { en: 'Campus Student Fellowship (UF & SFC)', zh: '校園學生團契 (UF & SFC)' },
    schedule: { en: 'Fridays at 7:30 PM (Dinner at 6:30 PM)', zh: '每週五晚 7:30 (傍晚 6:30 供應學生愛宴)' },
    location: { en: 'Church Fellowship Hall & UF Campus', zh: '教會副堂 及 佛羅里達大學校區各小組' },
    contact: { en: 'Brother Ethan / Sister Grace', zh: 'Ethan 弟兄 / Grace 姊妹' },
    description: {
      en: 'A priority community for undergraduate and graduate students at University of Florida (UF) and Santa Fe College (SFC). We gather weekly for home-cooked meals, worship, inductive Bible study, and support groups.',
      zh: '專為佛羅里達大學（UF）和聖達菲學院（SFC）本科生及研究生打造的重點社區。我們每週五一同共享家常愛宴，隨後進行敬拜、啟發式查經與互助分享。',
    },
    isFeatured: true,
    order: 1,
    isActive: true,
  },
  {
    slug: 'friday-bible-study',
    name: { en: 'Friday Bible Study', zh: '週五查經班' },
    schedule: { en: 'Fridays at 7:30 PM', zh: '每週五晚 7:30' },
    location: { en: 'Main Sanctuary & Classrooms', zh: '主堂及各教室/線上同步' },
    contact: { en: 'Elder David Jiang', zh: '蔣長老' },
    description: {
      en: 'A structured, welcoming space for scholars, local professionals, and families to study God\'s Word in depth.',
      zh: '為甘城當地的訪問學者、職場人士和家庭提供系統化且深入的聖經學習。',
    },
    isFeatured: false,
    order: 2,
    isActive: true,
  },
  {
    slug: 'evergreen',
    name: { en: 'Evergreen Senior Fellowship', zh: '常青團契 (長輩)' },
    schedule: { en: '2nd & 4th Saturday Mornings at 10:00 AM', zh: '每月第二及第四個週六上午 10:00' },
    location: { en: 'Church Lounge / Cozy Homes', zh: '教會多功能廳 或 契友家中' },
    contact: { en: 'Sister Helen Chao', zh: '趙姊妹' },
    description: {
      en: 'Designed for our treasured elder members and visiting parents. Connect through traditional hymns, physical stretching exercises, health seminars, and rich, loving testimonies.',
      zh: '專為我們珍愛的長輩契友以及前來探親的父母們設計。',
    },
    isFeatured: false,
    order: 3,
    isActive: true,
  },
  {
    slug: 'loving-family',
    name: { en: 'Loving Family Fellowship', zh: '愛家團契 (中青年家庭)' },
    schedule: { en: 'Saturdays once a month at 5:30 PM', zh: '每月一次週六傍晚 5:30' },
    location: { en: 'Rotational Homes & Outdoor Parks', zh: '契友家輪流 或 戶外公園聚會' },
    contact: { en: 'Brother Victor Lin', zh: '林弟兄' },
    description: {
      en: 'A community for married couples with young children supporting one another in biblical parenting.',
      zh: '由甘城當地有幼兒或學齡兒童的中青年夫婦組成的同盟。',
    },
    isFeatured: false,
    order: 4,
    isActive: true,
  },
  {
    slug: 'song-of-songs',
    name: { en: 'Song of Songs Fellowship', zh: '雅歌團契 (青年夫妻/職青)' },
    schedule: { en: 'Alternate Saturdays at 6:30 PM', zh: '雙週六晚 6:30' },
    location: { en: 'West Gainesville Group Houses', zh: '甘城西區小組成員居所' },
    contact: { en: 'Sister Chloe Ye', zh: '葉姊妹' },
    description: {
      en: 'Tailored for young working professionals and recently married couples exploring career, faith balance, and building strong marriages.',
      zh: '為年輕在職青年、博士後以及新婚夫妻而設。',
    },
    isFeatured: false,
    order: 5,
    isActive: true,
  },
  {
    slug: 'sisters',
    name: { en: 'Alpha Fellowship', zh: 'Alpha團契' },
    schedule: { en: 'Friday evenings at 6:30 PM', zh: '週五傍晚 6:30' },
    location: { en: 'Church Lounge', zh: '教會多功能室' },
    contact: { en: 'Sister Sarah Wu', zh: '吳師母' },
    description: {
      en: 'A supportive sanctuary for women of all ages to prayerfully lift one another up and study biblical examples of faithful women.',
      zh: '由各年齡層姊妹組成的屬靈馨香港灣。',
    },
    isFeatured: false,
    order: 6,
    isActive: true,
  },
  {
    slug: 'prayer-meeting',
    name: { en: 'Weekly Church Prayer Meeting', zh: '教會每週守望禱告會' },
    schedule: { en: 'Wednesdays at 8:00 PM', zh: '每週三晚 8:00' },
    location: { en: 'Church Chapel & Zoom Group', zh: '教堂小禮拜堂 / 雲端會議室' },
    contact: { en: 'Pastor Samuel Cheng', zh: '鄭牧師' },
    description: {
      en: 'The powerhouse of our church. We gather specifically to pray for world missions, local community needs, sick members, and church ministries.',
      zh: '教會事工的屬靈發動機。我們同心合意聚集，專切代禱守望。',
    },
    isFeatured: false,
    order: 7,
    isActive: true,
  },
]

// ─── Seed Logic ───────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting GCCC seed...\n')

  // 1. Site Settings (global — updateGlobal, not create)
  console.log('📋 Seeding site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      churchName: siteSettingsSeed.churchName.en,
      tagline: siteSettingsSeed.tagline.en,
      welcomeBlurbSubject: siteSettingsSeed.welcomeBlurbSubject.en,
      address: siteSettingsSeed.address.en,
      phone: siteSettingsSeed.phone,
      email: siteSettingsSeed.email,
      youtubeLiveUrl: siteSettingsSeed.youtubeLiveUrl,
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'zh',
    data: {
      churchName: siteSettingsSeed.churchName.zh,
      tagline: siteSettingsSeed.tagline.zh,
      welcomeBlurbSubject: siteSettingsSeed.welcomeBlurbSubject.zh,
      address: siteSettingsSeed.address.zh,
    },
  })
  console.log('  ✓ site-settings\n')

  // 2. Speakers
  console.log('👤 Seeding speakers...')
  const speakerIdMap = new Map<string, number>()
  for (const s of speakerFixtures) {
    const doc = await payload.create({
      collection: 'speakers',
      locale: 'en',
      data: { name: s.name.en, title: s.title.en },
    })
    // Set Chinese locale
    await payload.update({
      collection: 'speakers',
      id: doc.id,
      locale: 'zh',
      data: { name: s.name.zh, title: s.title.zh },
    })
    speakerIdMap.set(s.name.en, doc.id as number)
    console.log(`  ✓ ${s.name.en}`)
  }

  // 3. Sermon Series
  console.log('\n📚 Seeding sermon series...')
  const seriesIdMap = new Map<string, number>()
  for (const s of seriesFixtures) {
    const doc = await payload.create({
      collection: 'sermon-series',
      locale: 'en',
      data: { name: s.name.en, isActive: s.isActive },
    })
    await payload.update({
      collection: 'sermon-series',
      id: doc.id,
      locale: 'zh',
      data: { name: s.name.zh },
    })
    seriesIdMap.set(s.name.en, doc.id as number)
    console.log(`  ✓ ${s.name.en}`)
  }

  // 4. Sermons
  console.log('\n🎙️  Seeding sermons...')
  for (const s of sermonFixtures) {
    const speakerId = speakerIdMap.get(s.speakerName)
    const seriesId = seriesIdMap.get(s.seriesName)
    if (!speakerId) throw new Error(`Speaker not found: ${s.speakerName}`)

    const doc = await payload.create({
      collection: 'sermons',
      locale: 'en',
      data: {
        title: s.title.en,
        speaker: speakerId,
        scripture: s.scripture,
        date: s.date,
        series: seriesId,
        youtubeLink: s.youtubeLink,
        audioLink: s.audioLink,
      },
    })
    await payload.update({
      collection: 'sermons',
      id: doc.id,
      locale: 'zh',
      data: { title: s.title.zh },
    })
    console.log(`  ✓ ${s.title.en}`)
  }

  // 5. Fellowships
  console.log('\n🤝 Seeding fellowships...')
  for (const f of fellowshipFixtures) {
    const doc = await payload.create({
      collection: 'fellowships',
      locale: 'en',
      data: {
        slug: f.slug,
        name: f.name.en,
        schedule: f.schedule.en,
        location: f.location.en,
        contact: f.contact.en,
        isFeatured: f.isFeatured,
        order: f.order,
        isActive: f.isActive,
      },
    })
    await payload.update({
      collection: 'fellowships',
      id: doc.id,
      locale: 'zh',
      data: {
        name: f.name.zh,
        schedule: f.schedule.zh,
        location: f.location.zh,
        contact: f.contact.zh,
      },
    })
    console.log(`  ✓ ${f.name.en}`)
  }

  console.log('\n✅ Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
