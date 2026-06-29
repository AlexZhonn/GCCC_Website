"use client";

import { useState } from "react";
import { Language } from "../types";
import { siteSettings } from "../data";
import { Heart, ChevronDown } from "lucide-react";

interface ContactPageProps {
  currentLang: Language;
}

const STAGE_OPTIONS: { value: string; en: string; zh: string }[] = [
  { value: "high_school", en: "High School", zh: "高中生" },
  { value: "undergrad", en: "Undergrad (College)", zh: "大學生" },
  { value: "grad", en: "Graduate Student", zh: "研究生 / 學者" },
  { value: "young_pro", en: "Young Professional", zh: "職場新人" },
  { value: "single_adult", en: "Single Adult", zh: "單身成人" },
  { value: "married", en: "Married", zh: "已婚" },
  { value: "family_kids", en: "Family with Kids", zh: "有孩子的家庭" },
  { value: "empty_nester", en: "Empty Nester", zh: "空巢" },
  { value: "retiree", en: "Retiree", zh: "退休人士" },
];

const INTEREST_OPTIONS: { value: string; en: string; zh: string }[] = [
  {
    value: "jesus",
    en: "Beginning a relationship with Jesus",
    zh: "開始與耶穌的關係",
  },
  { value: "serve", en: "Ways to serve", zh: "服事機會" },
  {
    value: "missions",
    en: "Missions and/or evangelism opportunities",
    zh: "宣教與傳福音機會",
  },
  { value: "baptism", en: "Being baptized", zh: "受洗" },
  { value: "other", en: "Other", zh: "其他" },
];

const GC_OPTIONS: { value: string; en: string; zh: string }[] = [
  { value: "sun_1230", en: "Sunday 12:30 PM", zh: "週日下午 12:30" },
  { value: "sun_515", en: "Sunday 5:15 PM", zh: "週日下午 5:15" },
  { value: "mon_630", en: "Monday 6:30 PM", zh: "週一晚 6:30" },
  { value: "tue_615", en: "Tuesday 6:15 PM", zh: "週二晚 6:15" },
  { value: "tue_630", en: "Tuesday 6:30 PM", zh: "週二晚 6:30" },
  { value: "wed_630", en: "Wednesday 6:30 PM", zh: "週三晚 6:30" },
];

const HEAR_OPTIONS: { value: string; en: string; zh: string }[] = [
  { value: "campus_ministry", en: "Campus Ministry", zh: "校園事工" },
  { value: "campus_outreach", en: "Campus Outreach", zh: "校園外展" },
  { value: "friend", en: "Friend", zh: "朋友介紹" },
  { value: "family", en: "Family Member", zh: "家人介紹" },
  { value: "sister_church", en: "Sister Church", zh: "姐妹教會" },
  { value: "retreat", en: "Retreat / Camp", zh: "退修會/營會" },
  { value: "website", en: "Website", zh: "教會網站" },
  { value: "social_media", en: "Social Media", zh: "社交媒體" },
];

export default function ContactPage({ currentLang }: ContactPageProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    birthday: "",
    gender: "",
    maritalStatus: "",
    stages: [] as string[],
    interests: [] as string[],
    gcTimes: [] as string[],
    contactVia: "",
    addToList: "",
    prayerRequest: "",
    generalQuestion: "",
    howHeard: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const l = currentLang;

  const t = {
    formTitle: { en: "Connection Card — Digital", zh: "數位聯絡卡" },
    formSubtitle: {
      en: "Thank you for coming to GCCC! If you want to get more information about our church then please fill out this form and we'll contact you to get you better connected!",
      zh: "感謝您來到甘城華人教會！若您希望進一步了解本教會，請填寫此表格，我們將與您聯絡，幫助您更好地融入！",
    },
    firstName: { en: "First Name", zh: "名字" },
    lastName: { en: "Last Name", zh: "姓氏" },
    email: { en: "Email Address", zh: "電子郵件" },
    phone: { en: "Phone Number", zh: "電話號碼" },
    phoneType: { en: "Phone Type", zh: "電話類型" },
    address: { en: "Street Address", zh: "街道地址" },
    apt: { en: "Apt/Unit/Box (optional)", zh: "公寓/單元（選填）" },
    city: { en: "City", zh: "城市" },
    state: { en: "State", zh: "州" },
    zip: { en: "Postal Code", zh: "郵遞區號" },
    country: { en: "Country", zh: "國家" },
    birthday: { en: "Birthday", zh: "生日" },
    gender: { en: "Gender", zh: "性別" },
    maritalStatus: { en: "Marital Status", zh: "婚姻狀況" },
    stageTitle: {
      en: "Stage of Life (Choose all that apply):",
      zh: "人生階段（可複選）：",
    },
    interestTitle: {
      en: "I would like to know more about:",
      zh: "我希望了解更多關於：",
    },
    contactVia: { en: "Please contact me via:", zh: "請以以下方式聯絡我：" },
    addToList: {
      en: "Would you like to be added to our mailing list?",
      zh: "您是否願意加入我們的通訊名單？",
    },
    question: { en: "General Questions", zh: "一般問題" },
    questionDesc: {
      en: "Please use this section to ask a general question.",
      zh: "您有任何問題，歡迎在此詢問。",
    },
    howHeard: {
      en: "How did you hear about GCCC?",
      zh: "您如何得知甘城華人教會？",
    },
    submit: { en: "Submit", zh: "提交" },
    required: { en: "required", zh: "必填" },
    successTitle: { en: "Thank you!", zh: "感謝您！" },
    successMsg: {
      en: "We've received your connection card and will be in touch soon. Welcome to the GCCC family!",
      zh: "我們已收到您的聯絡卡，將盡快與您聯繫。歡迎加入甘城華人教會大家庭！",
    },
  };

  const handleCheckbox = (
    field: "stages" | "interests" | "gcTimes",
    value: string,
  ) => {
    setForm((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="flex flex-col bg-[#eeecec] text-[#33271E] border-t border-black/10 min-h-screen pt-16"
    >
      {/* Top info strip */}
      <div className="px-4 sm:px-8 lg:px-16 pt-16 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-20">
          {/* Heading */}
          <div className="flex flex-col gap-4 lg:max-w-lg">
            <h2 className="font-serif text-4xl md:text-5xl text-[#33271E] font-bold tracking-tight leading-tight">
              {l === "en" ? "Contact Us" : "聯絡我們"}
            </h2>
            <div className="h-0.75 w-14 bg-[#9A2B27]" />
            <p className="text-[#6F685B] font-serif text-base leading-relaxed">
              {l === "en"
                ? "We'd love to hear from you. Fill out a connection card, set up giving, or reach us directly."
                : "我們深切重視您的回音。填寫聯絡卡、設定奉獻，或直接與我們聯繫。"}
            </p>
          </div>

          {/* Church contact details */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-mono text-xs tracking-wider uppercase text-[#9A2B27] block mb-1">
                {l === "en" ? "Address" : "教會堂址"}
              </span>
              <a
                href="https://maps.google.com/?q=2850+NW+23rd+Blvd,+Gainesville,+FL+32605"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-lg text-[#33271E] hover:text-[#9A2B27] hover:underline"
              >
                {siteSettings.address[l]}
              </a>
            </div>
            <div>
              <span className="font-mono text-xs tracking-wider uppercase text-[#9A2B27] block mb-1">
                {l === "en" ? "Phone" : "電話號碼"}
              </span>
              <a
                href={`tel:${siteSettings.phone.replace(/\D/g, "")}`}
                className="font-serif text-lg text-[#33271E] hover:text-[#9A2B27] hover:underline"
              >
                {siteSettings.phone}
              </a>
            </div>
            <div>
              <span className="font-mono text-xs tracking-wider uppercase text-[#9A2B27] block mb-1">
                {l === "en" ? "Email" : "電子郵件"}
              </span>
              <a
                href={`mailto:${siteSettings.email}`}
                className="font-serif text-lg text-[#33271E] hover:text-[#9A2B27] hover:underline"
              >
                {siteSettings.email}
              </a>
            </div>
          </div>

          {/* Pastor */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs tracking-wider uppercase text-[#9A2B27] block mb-1">
              {l === "en" ? "Pastor" : "牧師"}
            </span>
            <p className="font-serif text-lg text-[#33271E]">
              {siteSettings.pastor.name}
            </p>
            <a
              href={`mailto:${siteSettings.pastor.email}`}
              className="font-serif text-lg text-[#33271E] hover:text-[#9A2B27] hover:underline block"
            >
              {siteSettings.pastor.email}
            </a>
            <a
              href={`tel:${siteSettings.pastor.cell.replace(/\D/g, "")}`}
              className="font-serif text-lg text-[#33271E] hover:text-[#9A2B27] hover:underline block"
            >
              {l === "en" ? "Cell: " : "手機："}
              {siteSettings.pastor.cell}
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-16 py-10 flex-1">
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <div className="bg-white border border-[#9A2B27]/20 rounded-2xl p-10 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#9A2B27]/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-[#9A2B27] fill-[#9A2B27]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#33271E] mb-2">
                {t.successTitle[l]}
              </h4>
              <p className="text-[#6F685B] font-serif text-sm leading-relaxed max-w-md mx-auto">
                {t.successMsg[l]}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    phoneType: "",
                    address: "",
                    apt: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: "",
                    birthday: "",
                    gender: "",
                    maritalStatus: "",
                    stages: [],
                    interests: [],
                    gcTimes: [],
                    contactVia: "",
                    addToList: "",
                    prayerRequest: "",
                    generalQuestion: "",
                    howHeard: "",
                  });
                }}
                className="mt-6 text-sm text-[#9A2B27] hover:text-[#80221E] underline underline-offset-2 transition-colors"
              >
                {l === "en" ? "Submit another response" : "再次填寫"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={t.firstName[l]} required>
                  <input
                    type="text"
                    placeholder={t.firstName[l]}
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                    required
                    className={inputCls}
                  />
                </FormField>
                <FormField label={t.lastName[l]} required>
                  <input
                    type="text"
                    placeholder={t.lastName[l]}
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                    required
                    className={inputCls}
                  />
                </FormField>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={t.email[l]} required>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className={inputCls}
                  />
                </FormField>
                <FormField label={t.phone[l]} required>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="(352) 000-0000"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      required
                      className={`${inputCls} flex-1`}
                    />
                    <div className="relative">
                      <select
                        value={form.phoneType}
                        onChange={(e) =>
                          setForm({ ...form, phoneType: e.target.value })
                        }
                        className={`${inputCls} pr-8 appearance-none`}
                      >
                        <option value="">{l === "en" ? "Type" : "類型"}</option>
                        <option value="mobile">
                          {l === "en" ? "Mobile" : "手機"}
                        </option>
                        <option value="home">
                          {l === "en" ? "Home" : "家用"}
                        </option>
                        <option value="work">
                          {l === "en" ? "Work" : "公司"}
                        </option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>
                </FormField>
              </div>

              {/* Address */}
              <fieldset className="space-y-3">
                <legend className="text-xs font-mono uppercase tracking-wider text-[#9A2B27] mb-3">
                  {l === "en" ? "Address" : "地址"}
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      value={form.country}
                      onChange={(e) =>
                        setForm({ ...form, country: e.target.value })
                      }
                      className={`${inputCls} appearance-none pr-8 sm:col-span-2`}
                    >
                      <option value="">
                        {t.country?.[l] ?? (l === "en" ? "Country" : "國家")}
                      </option>
                      <option value="us">
                        {l === "en" ? "United States" : "美國"}
                      </option>
                      <option value="cn">
                        {l === "en" ? "China" : "中國"}
                      </option>
                      <option value="tw">
                        {l === "en" ? "Taiwan" : "台灣"}
                      </option>
                      <option value="other">
                        {l === "en" ? "Other" : "其他"}
                      </option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder={t.address[l]}
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className={inputCls}
                />
                <input
                  type="text"
                  placeholder={t.apt[l]}
                  value={form.apt}
                  onChange={(e) => setForm({ ...form, apt: e.target.value })}
                  className={inputCls}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder={t.city[l]}
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputCls}
                  />
                  <input
                    type="text"
                    placeholder={t.state[l]}
                    value={form.state}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                    className={inputCls}
                  />
                  <input
                    type="text"
                    placeholder={t.zip[l]}
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className={`${inputCls} col-span-2 sm:col-span-1`}
                  />
                </div>
              </fieldset>

              {/* Birthday + Gender + Marital */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label={t.birthday[l]} required>
                  <input
                    type="date"
                    value={form.birthday}
                    onChange={(e) =>
                      setForm({ ...form, birthday: e.target.value })
                    }
                    required
                    className={inputCls}
                  />
                </FormField>
                <FormField label={t.gender[l]} required>
                  <div className="relative">
                    <select
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                      required
                      className={`${inputCls} appearance-none pr-8`}
                    >
                      <option value="">
                        {l === "en" ? "Select…" : "請選擇…"}
                      </option>
                      <option value="male">{l === "en" ? "Male" : "男"}</option>
                      <option value="female">
                        {l === "en" ? "Female" : "女"}
                      </option>
                      <option value="other">
                        {l === "en" ? "Prefer not to say" : "不方便說明"}
                      </option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </FormField>
                <FormField label={t.maritalStatus[l]}>
                  <div className="relative">
                    <select
                      value={form.maritalStatus}
                      onChange={(e) =>
                        setForm({ ...form, maritalStatus: e.target.value })
                      }
                      className={`${inputCls} appearance-none pr-8`}
                    >
                      <option value="">
                        {l === "en" ? "Select…" : "請選擇…"}
                      </option>
                      <option value="single">
                        {l === "en" ? "Single" : "單身"}
                      </option>
                      <option value="married">
                        {l === "en" ? "Married" : "已婚"}
                      </option>
                      <option value="divorced">
                        {l === "en" ? "Divorced" : "離婚"}
                      </option>
                      <option value="widowed">
                        {l === "en" ? "Widowed" : "喪偶"}
                      </option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </FormField>
              </div>

              {/* Stage of Life */}
              <fieldset>
                <legend className="text-sm font-semibold text-[#33271E] mb-3">
                  {t.stageTitle[l]}{" "}
                  <span className="text-[#9A2B27] ml-0.5">*</span>
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {STAGE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={checkboxLabelCls(
                        form.stages.includes(opt.value),
                      )}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={form.stages.includes(opt.value)}
                        onChange={() => handleCheckbox("stages", opt.value)}
                      />
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${form.stages.includes(opt.value) ? "bg-[#9A2B27] border-[#9A2B27]" : "border-black/25 bg-white"}`}
                      >
                        {form.stages.includes(opt.value) && (
                          <span className="text-white text-[9px] font-black">
                            ✓
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-sans">{opt[l]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Interests */}
              <fieldset>
                <legend className="text-sm font-semibold text-[#33271E] mb-1">
                  {t.interestTitle[l]}
                </legend>
                <p className="text-xs text-[#6F685B] mb-3 font-serif">
                  {l === "en"
                    ? "Let us know which ministry area you're interested in and we'll send you more info."
                    : "請告訴我們您感興趣的事工領域，我們將為您提供更多資訊。"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTEREST_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={checkboxLabelCls(
                        form.interests.includes(opt.value),
                      )}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={form.interests.includes(opt.value)}
                        onChange={() => handleCheckbox("interests", opt.value)}
                      />
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${form.interests.includes(opt.value) ? "bg-[#9A2B27] border-[#9A2B27]" : "border-black/25 bg-white"}`}
                      >
                        {form.interests.includes(opt.value) && (
                          <span className="text-white text-[9px] font-black">
                            ✓
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-sans">{opt[l]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Contact via */}
              <FormField label={t.contactVia[l]} required>
                <div className="relative">
                  <select
                    value={form.contactVia}
                    onChange={(e) =>
                      setForm({ ...form, contactVia: e.target.value })
                    }
                    required
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    <option value="">
                      {l === "en" ? "Select…" : "請選擇…"}
                    </option>
                    <option value="email">
                      {l === "en" ? "Email" : "電子郵件"}
                    </option>
                    <option value="phone">
                      {l === "en" ? "Phone Call" : "電話"}
                    </option>
                    <option value="text">
                      {l === "en" ? "Text / SMS" : "簡訊"}
                    </option>
                    <option value="wechat">
                      {l === "en" ? "WeChat" : "微信"}
                    </option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                </div>
              </FormField>

              {/* Add to mailing list */}
              <FormField label={t.addToList[l]}>
                <div className="relative">
                  <select
                    value={form.addToList}
                    onChange={(e) =>
                      setForm({ ...form, addToList: e.target.value })
                    }
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    <option value="">
                      {l === "en" ? "Select…" : "請選擇…"}
                    </option>
                    <option value="yes">
                      {l === "en" ? "Yes, add me" : "是，請加入"}
                    </option>
                    <option value="no">
                      {l === "en" ? "No, thank you" : "不用，謝謝"}
                    </option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                </div>
              </FormField>

              {/* General Questions */}
              <FormField label={t.question[l]}>
                <p className="text-xs text-[#6F685B] mb-2 font-serif">
                  {t.questionDesc[l]}
                </p>
                <textarea
                  rows={3}
                  value={form.generalQuestion}
                  onChange={(e) =>
                    setForm({ ...form, generalQuestion: e.target.value })
                  }
                  placeholder={
                    l === "en"
                      ? "Any questions for us?"
                      : "有任何問題想詢問我們嗎？"
                  }
                  className={`${inputCls} resize-none`}
                />
              </FormField>

              {/* How did you hear */}
              <FormField label={t.howHeard[l]} required>
                <div className="relative">
                  <select
                    value={form.howHeard}
                    onChange={(e) =>
                      setForm({ ...form, howHeard: e.target.value })
                    }
                    required
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    <option value="">
                      {l === "en" ? "Select…" : "請選擇…"}
                    </option>
                    {HEAR_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt[l]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                </div>
              </FormField>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#9A2B27] hover:bg-[#80221E] text-white px-10 py-3.5 rounded-xl text-sm font-semibold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  {t.submit[l]}
                </button>
              </div>
            </form>
          )}

          {/* Deacon / Coworker Directory */}
          <div className="mt-12">
            <div className="mb-4">
              <h4 className="font-serif text-lg font-bold text-[#33271E] mb-1">
                {l === "en" ? "Ministry Contacts" : "事工同工聯絡表"}
              </h4>
              <p className="text-xs text-[#6F685B] font-serif">
                {l === "en"
                  ? "For questions relating to church business or ministries, please contact the appropriate deacon or coworker below."
                  : "如有關於教會事務或事工的問題，請聯絡以下相關執事或同工。"}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-black/10 shadow-sm bg-white">
              <iframe
                src="https://docs.google.com/spreadsheets/d/1k7YJjdBpWJjMxFPG--1JKgUCwq4dN5NzMA11g5LBD6o/pubhtml?gid=1676222687&single=true&widget=false&headers=false&chrome=false"
                className="w-full"
                style={{ height: "480px", border: 0 }}
                title="GCCC Ministry Contacts Directory"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width map */}
      <div className="relative min-h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.37930208156!2d-82.35344298863825!3d29.679780935652065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e8a48c73bd0d83%3A0x3aa4c82d1f25a130!2sGainesville%20Chinese%20Christian%20Church!5e0!3m2!1sen!2sus!4v1781993277965!5m2!1sen!2sus"
          className="absolute inset-0 w-full h-full"
          style={{
            border: 0,
            filter:
              "grayscale(10%) invert(90%) contrast(100%) brightness(100%)",
          }}
          allowFullScreen
          loading="lazy"
          title="GCCC Street MapLocation"
        />
      </div>
    </section>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white border border-black/12 text-[#33271E] placeholder-neutral-400 rounded-lg px-3.5 py-2.5 text-sm font-sans focus:outline-none focus:border-[#9A2B27] focus:ring-1 focus:ring-[#9A2B27]/30 transition-colors shadow-sm";

const checkboxLabelCls = (checked: boolean) =>
  `flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border transition-colors ${
    checked
      ? "border-[#9A2B27]/50 bg-[#9A2B27]/8 text-[#33271E]"
      : "border-black/10 bg-white text-[#6F685B] hover:border-[#9A2B27]/30 hover:text-[#33271E]"
  }`;

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-wider text-[#9A2B27]">
        {label}
        {required && <span className="text-[#9A2B27] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
