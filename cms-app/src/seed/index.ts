/**
 * Seed script: migrates static fixtures from src/data.ts into Payload CMS.
 *
 * Run with:  cd cms-app && npm run seed
 *
 * Prerequisites:
 *   - .env file present with DATABASE_URL and PAYLOAD_SECRET
 *   - Run AFTER creating your first admin user at /admin
 */

import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Wraps a plain string into a minimal Lexical JSON document for richText fields */
function makeLexical(text: string) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          children: [{ type: 'text', text, format: 0, version: 1 }],
          direction: 'ltr' as const,
        },
      ],
      direction: 'ltr' as const,
    },
  }
}

// ─── Fixtures (mirrors src/data.ts) ──────────────────────────────────────────

const siteSettingsSeed = {
  churchName: { en: 'Gainesville Chinese Christian Church', zh: '甘城華人教會' },
  tagline: {
    en: "Experiencing Christ's Love, Sharing the Eternal Truth",
    zh: '經歷福杯滿溢的基督之愛，同享恆久不變的福音真理',
  },
  welcomeBlurbSubject: { en: 'Welcome to Our Family', zh: '歡迎來到我們的屬靈大家庭' },
  welcomeBlurbText: {
    en: 'The Gainesville Chinese Christian Church (GCCC) is a non-denominational, Bible-centered fellowship of believers. We are dedicated to preaching the Gospel of Jesus Christ, building up believers in faith and discipleship, and serving the Chinese-speaking and English-speaking communities in Gainesville and the surrounding areas.',
    zh: '甘城華人教會（GCCC）是一個不分宗派、以聖經真理為核心的基督徒群體。我們致力於傳揚耶穌基督的福音、在信心與門徒訓練中造就信徒，並熱沈服務甘城（蓋恩斯維爾）及周邊地區的華人同胞與英語社群。',
  },
  welcomeHistoryText: {
    en: 'Founded by a dedicated group of students and scholars near the University of Florida, GCCC has grown into a vibrant, multi-generational home for individuals at all life stages. Whether you are a student exploring faith for the first time, a young professional seeking deep community, or a family looking for a warm environment for your children, there is a place for you here to grow closer to God.',
    zh: '由佛羅里達大學（UF）的一群熱心學生與學者創立，如今甘城華人教會已發展成一個充滿生機、跨越世代的溫暖港灣。無論你是初次探尋信仰的學子、尋求屬靈同伴的年輕職場人士，還是為孩子尋找溫馨環境的家庭，這裡都有屬於你的位置，讓我們並肩更親近神。',
  },
  address: {
    en: '2850 NW 23rd Blvd, Gainesville, FL 32605',
    zh: '2850 NW 23rd Blvd, Gainesville, FL 32605',
  },
  phone: '(352) 271-0776',
  email: 'contactus@gcccfl.org',
  pastor: { name: 'HongJun Li · 李洪軍牧師', email: 'hongjun.li@gcccfl.org', cell: '(407) 924-8541' },
  youtubeLiveUrl: 'https://www.youtube.com/@gainesvillechinesechristia9690',
}

const speakerFixtures = [
  { name: { en: 'Rev. HongJun Li', zh: '李洪軍牧師' }, title: { en: 'Pastor', zh: '牧師' } },
  { name: { en: 'Elder David Jiang', zh: '蔣長老' }, title: { en: 'Elder', zh: '長老' } },
  { name: { en: 'Deacon Alex Lu', zh: '陸尊恩 傳道' }, title: { en: 'Deacon', zh: '傳道' } },
]

const leaderFixtures = [
  {
    name: { en: 'Rev. HongJun Li', zh: '李洪軍牧師' },
    title: { en: 'Pastor', zh: '牧師' },
    bio: {
      en: 'Pastor HongJun Li has faithfully served GCCC as Senior Pastor, shepherding the congregation with a deep commitment to biblical preaching and discipleship.',
      zh: '李洪軍牧師忠心服事甘城華人教會，以深厚的聖經根基帶領會眾，致力於講道與門徒培育事工。',
    },
    email: 'hongjun.li@gcccfl.org',
    order: 1,
  },
  { name: { en: 'Brother Chou Fang', zh: '方疇弟兄' }, title: { en: 'Elder', zh: '長老' }, order: 2 },
  { name: { en: 'Brother Sihong Song', zh: '宋嗣宏弟兄' }, title: { en: 'Elder', zh: '長老' }, order: 3 },
]

const sermonFixtures = [
  {
    title: { en: 'The Kingdom of God', zh: '神国' },
    speakerName: 'Rev. HongJun Li',
    scripture: '',
    date: '2026-06-14',
    youtubeLink: 'https://www.youtube.com/embed/8abEVKXjFiU',
    englishYoutubeLink: 'https://www.youtube.com/embed/3TxEmfIqXrI',
  },
  {
    title: { en: 'Let Us Renew Our Strength', zh: '让我们重新得力' },
    speakerName: 'Rev. HongJun Li',
    scripture: '',
    date: '2026-05-31',
    youtubeLink: 'https://www.youtube.com/embed/0WNz27xGa7A',
    englishYoutubeLink: 'https://www.youtube.com/embed/EFF1TP7drfw',
  },
  {
    title: { en: 'Free from Inner Turmoil', zh: '让我能不再内耗' },
    speakerName: 'Deacon Alex Lu',
    scripture: '',
    date: '2026-05-29',
    youtubeLink: 'https://www.youtube.com/embed/VjqQbFt_xoc',
  },
]

const fellowshipFixtures = [
  {
    slug: 'children',
    name: { en: 'Children Sunday School', zh: '兒童主日學' },
    schedule: { en: 'Sundays at 10:50 AM (Sunday School)', zh: '主日上午 10:50 兒童主日學' },
    location: { en: "Children's Classrooms (Lower Level)", zh: '兒童教室（樓下）' },
    contact: { en: "Children's Ministry Team", zh: '兒童事工團隊' },
    description: {
      en: 'A nurturing, age-appropriate environment where children from infants through 5th grade learn to love God through Bible stories, worship songs, crafts, and meaningful friendships in a safe and joyful setting.',
      zh: '為嬰兒至五年級的孩子提供充滿愛、合乎年齡的成長環境。透過聖經故事、敬拜詩歌、手工藝及真誠友誼，讓孩子們在安全喜樂的氛圍中學習愛神愛人。',
    },
    ministryCategory: 'kids', isFeatured: false, order: 1, isActive: true,
  },
  {
    slug: 'youth',
    name: { en: 'Youth Ministry (Middle & High School)', zh: '青少年事工 (國中/高中)' },
    schedule: { en: 'Sundays at 9:30 AM & bi-weekly Friday evenings', zh: '主日上午 9:30 及 雙週五傍晚' },
    location: { en: 'Youth Room & Church Campus', zh: '青少年教室及教會校園' },
    contact: { en: 'Youth Ministry Team', zh: '青少年事工團隊' },
    description: {
      en: 'A vibrant community for middle and high school students to explore faith, ask tough questions, build lasting friendships, and grow as disciples of Christ.',
      zh: '為國中及高中生打造充滿活力的信仰群體。透過敬拜、查經、服事項目與趣味活動，讓青少年在基督裡成長為真正的門徒。',
    },
    ministryCategory: 'youth', isFeatured: false, order: 2, isActive: true,
  },
  {
    slug: 'alpha',
    name: { en: 'Alpha Fellowship (College Students)', zh: 'Alpha團契 (大學生)' },
    schedule: { en: 'Friday evenings at 6:30 PM', zh: '週五傍晚 6:30' },
    location: { en: 'Church Lounge', zh: '教會多功能室' },
    contact: { en: 'Dan Dai', zh: '戴弟兄' },
    description: {
      en: "A warm home away from home for college students — especially UF students and international scholars. Come for a free Friday dinner, stay for authentic community and Bible study.",
      zh: '為大學生——尤其是佛大學生及國際訪學者——打造真誠溫馨的屬靈家園。週五免費愛宴帶你認識我們，查經與真誠團契讓你在信仰中紮根。',
    },
    ministryCategory: 'college', instagramUrl: 'https://www.instagram.com/gccc_alpha/',
    isFeatured: false, order: 3, isActive: true,
  },
  {
    slug: 'song-of-songs',
    name: { en: 'Song of Songs Fellowship', zh: '雅歌團契 (青年夫妻/職青)' },
    schedule: { en: 'Alternate Saturdays at 6:30 PM', zh: '雙週六晚 6:30' },
    location: { en: 'West Gainesville Group Houses', zh: '甘城西區小組成員居所' },
    contact: { en: 'Sister Chloe Ye', zh: '葉姊妹' },
    description: {
      en: 'Tailored for young working professionals and recently married couples. We cover career challenges, work-faith balance, building strong marriages.',
      zh: '為年輕在職青年、博士後以及新婚夫妻而設。共同探索職場挑戰、信仰與工作的契合、早期婚姻經營等專題。',
    },
    ministryCategory: 'adults', isFeatured: false, order: 4, isActive: true,
  },
  {
    slug: 'loving-family',
    name: { en: 'Loving Family Fellowship', zh: '愛家團契 (中青年家庭)' },
    schedule: { en: 'Saturdays once a month at 5:30 PM', zh: '每月一次週六傍晚 5:30' },
    location: { en: 'Rotational Homes & Outdoor Parks', zh: '契友家輪流 或 戶外公園聚會' },
    contact: { en: 'Brother Victor Lin', zh: '林弟兄' },
    description: {
      en: 'A community for married couples with young children. We support one another in biblical parenting and host family potlucks while kids play safely together.',
      zh: '由甘城當地有幼兒或學齡兒童的中青年夫婦組成的同盟。我們圍繞聖經原則切磋教養心得，並常開展親子家庭派對。',
    },
    ministryCategory: 'adults', isFeatured: false, order: 5, isActive: true,
  },
  {
    slug: 'friday-bible-study',
    name: { en: 'Friday Bible Study', zh: '週五查經班' },
    schedule: { en: 'Fridays at 7:30 PM', zh: '每週五晚 7:30' },
    location: { en: 'Main Sanctuary & Classrooms', zh: '主堂及各教室/線上同步' },
    contact: { en: 'Elder David Jiang', zh: '蔣長老' },
    description: {
      en: "A structured, welcoming space for scholars, local professionals, and families to study God's Word in depth.",
      zh: '為甘城當地的訪問學者、職場人士和家庭提供系統化且深入的聖經學習。',
    },
    ministryCategory: 'adults', isFeatured: false, order: 6, isActive: true,
  },
  {
    slug: 'evergreen',
    name: { en: 'Evergreen Senior Fellowship', zh: '常青團契 (長輩)' },
    schedule: { en: '2nd & 4th Saturday Mornings at 10:00 AM', zh: '每月第二及第四個週六上午 10:00' },
    location: { en: 'Church Lounge / Cozy Homes', zh: '教會多功能廳 或 契友家中' },
    contact: { en: 'Sister Helen Chao', zh: '趙姊妹' },
    description: {
      en: 'Designed for our treasured elder members and visiting parents. Connect through traditional hymns, stretching exercises, health seminars, and rich testimonies.',
      zh: '專為我們珍愛的長輩契友以及前來探親的父母們設計。我們一同吟唱古典聖詩、做舒展體操、舉辦健康講座，並在茶點中分享生命見證。',
    },
    ministryCategory: 'senior-adults', isFeatured: false, order: 7, isActive: true,
  },
  {
    slug: 'prayer-meeting',
    name: { en: 'Weekly Church Prayer Meeting', zh: '教會每週守望禱告會' },
    schedule: { en: 'Wednesdays at 8:00 PM', zh: '每週三晚 8:00' },
    location: { en: 'Church Chapel & Zoom Group', zh: '教堂小禮拜堂 / 雲端會議室' },
    contact: { en: 'Pastor HongJun Li', zh: '李牧師' },
    description: {
      en: "The powerhouse of our church. We gather to pray for world missions, local community needs, sick members, and church ministries.",
      zh: '教會事工的屬靈發動機。我們同心合意聚集，專切為全球宣教、社區需要及教會各項聖工代禱守望。',
    },
    isFeatured: false, order: 8, isActive: true,
  },
]

const activityFixtures = [
  {
    fellowship: { en: 'Alpha Fellowship', zh: 'Alpha 團契' },
    title: { en: 'He vs. She Cooking Competition', zh: '男女廚藝大比拼' },
    description: {
      en: "Brothers and sisters go head-to-head in a friendly cooking showdown. Come hungry, vote for your favorite dish, and enjoy an evening of laughter and fellowship!",
      zh: '兄弟與姊妹們一較廚藝高下！帶著空腹來，為你最愛的菜投票，享受一個充滿歡笑與團契的美好夜晚！',
    },
    date: '2026-06-19',
    time: '6:30 PM',
    location: { en: 'Church Fellowship Hall', zh: '教會團契廳' },
  },
]

const ministryCategoryFixtures = [
  { categoryId: 'kids', label: { en: 'Kids', zh: '兒童' }, ageRange: { en: 'Infants – 5th Grade', zh: '嬰兒至五年級' }, color: '#4A90D9', order: 1 },
  { categoryId: 'youth', label: { en: 'Youth', zh: '青少年' }, ageRange: { en: 'Middle & High School', zh: '國中 / 高中' }, color: '#7B6CF6', order: 2 },
  { categoryId: 'college', label: { en: 'College', zh: '大學生' }, ageRange: { en: 'College Students', zh: '大學生' }, color: '#E8963A', order: 3 },
  { categoryId: 'adults', label: { en: 'Adults', zh: '成人' }, ageRange: { en: 'Young Professionals & Families', zh: '職青 / 青年家庭' }, color: '#9A2B27', order: 4 },
  { categoryId: 'senior-adults', label: { en: 'Senior Adults', zh: '長輩' }, ageRange: { en: 'Senior Adults & Visiting Parents', zh: '長輩 / 探親父母' }, color: '#2E7D52', order: 5 },
  { categoryId: 'discipleship', label: { en: 'Discipleship', zh: '門徒訓練' }, ageRange: { en: 'All Ages', zh: '所有年齡' }, color: '#C07A2F', order: 6 },
]

// ─── Seed Logic ───────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting GCCC seed...\n')

  // 1. Site Settings
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
      pastor: siteSettingsSeed.pastor,
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
  console.log('🎙️  Seeding speakers...')
  const speakerIdMap = new Map<string, number>()
  for (const s of speakerFixtures) {
    const doc = await payload.create({ collection: 'speakers', locale: 'en', data: { name: s.name.en, title: s.title.en } })
    await payload.update({ collection: 'speakers', id: doc.id, locale: 'zh', data: { name: s.name.zh, title: s.title.zh } })
    speakerIdMap.set(s.name.en, doc.id as number)
    console.log(`  ✓ ${s.name.en}`)
  }

  // 3. Leaders
  console.log('\n👥 Seeding leaders...')
  for (const l of leaderFixtures) {
    const doc = await payload.create({
      collection: 'leaders',
      locale: 'en',
      data: { name: l.name.en, title: l.title.en, ...(l.email ? { email: l.email } : {}), order: l.order },
    })
    await payload.update({ collection: 'leaders', id: doc.id, locale: 'zh', data: { name: l.name.zh, title: l.title.zh } })
    console.log(`  ✓ ${l.name.en}`)
  }

  // 4. Sermons
  console.log('\n📖 Seeding sermons...')
  for (const s of sermonFixtures) {
    const speakerId = speakerIdMap.get(s.speakerName)
    if (!speakerId) throw new Error(`Speaker not found: ${s.speakerName}`)
    const doc = await payload.create({
      collection: 'sermons',
      locale: 'en',
      data: {
        title: s.title.en,
        speaker: speakerId,
        scripture: s.scripture,
        date: s.date,
        youtubeLink: s.youtubeLink,
        ...(s.englishYoutubeLink ? { englishYoutubeLink: s.englishYoutubeLink } : {}),
      },
    })
    await payload.update({ collection: 'sermons', id: doc.id, locale: 'zh', data: { title: s.title.zh } })
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
        description: makeLexical(f.description.en),
        isFeatured: f.isFeatured,
        order: f.order,
        isActive: f.isActive,
        ...(f.ministryCategory ? { ministryCategory: f.ministryCategory as 'kids' | 'youth' | 'college' | 'adults' | 'senior-adults' | 'discipleship' } : {}),
        ...(f.instagramUrl ? { instagramUrl: f.instagramUrl } : {}),
      },
    })
    await payload.update({
      collection: 'fellowships', id: doc.id, locale: 'zh',
      data: { name: f.name.zh, schedule: f.schedule.zh, location: f.location.zh, contact: f.contact.zh, description: makeLexical(f.description.zh) },
    })
    console.log(`  ✓ ${f.name.en}`)
  }

  // 6. Activities
  console.log('\n🎉 Seeding activities...')
  for (const a of activityFixtures) {
    const doc = await payload.create({
      collection: 'activities',
      locale: 'en',
      data: { title: a.title.en, fellowship: a.fellowship.en, date: a.date, time: a.time, location: a.location.en },
    })
    await payload.update({
      collection: 'activities', id: doc.id, locale: 'zh',
      data: { title: a.title.zh, fellowship: a.fellowship.zh, location: a.location.zh },
    })
    console.log(`  ✓ ${a.title.en}`)
  }

  // 7. Ministry Categories
  console.log('\n🏷️  Seeding ministry categories...')
  for (const mc of ministryCategoryFixtures) {
    const doc = await payload.create({
      collection: 'ministry-categories',
      locale: 'en',
      data: { categoryId: mc.categoryId as 'kids' | 'youth' | 'college' | 'adults' | 'senior-adults' | 'discipleship', label: mc.label.en, ageRange: mc.ageRange.en, color: mc.color, order: mc.order },
    })
    await payload.update({
      collection: 'ministry-categories', id: doc.id, locale: 'zh',
      data: { label: mc.label.zh, ageRange: mc.ageRange.zh },
    })
    console.log(`  ✓ ${mc.label.en}`)
  }

  console.log('\n✅ Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
