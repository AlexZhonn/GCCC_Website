"use client";

import { useState, useEffect } from "react";
import { Language } from "../types";
import { CheckCircle2 } from "lucide-react";

interface PrayerPageProps {
  currentLang: Language;
}

type FormState = "idle" | "submitting" | "done";
type ContactMethod = "wechat" | "whatsapp" | "email" | "phone" | "none";

const CONTACT_METHODS: { id: ContactMethod; label: { en: string; zh: string }; placeholder: { en: string; zh: string } }[] = [
  {
    id: "wechat",
    label: { en: "WeChat", zh: "微信" },
    placeholder: { en: "WeChat ID", zh: "微信帳號" },
  },
  {
    id: "whatsapp",
    label: { en: "WhatsApp", zh: "WhatsApp" },
    placeholder: { en: "WhatsApp number", zh: "WhatsApp 號碼" },
  },
  {
    id: "email",
    label: { en: "Email", zh: "電子郵件" },
    placeholder: { en: "your@email.com", zh: "您的電子郵件" },
  },
  {
    id: "phone",
    label: { en: "Phone", zh: "電話" },
    placeholder: { en: "Phone number", zh: "電話號碼" },
  },
  {
    id: "none",
    label: { en: "Prefer Not to Share", zh: "不提供聯絡方式" },
    placeholder: { en: "", zh: "" },
  },
];

export default function PrayerPage({ currentLang }: PrayerPageProps) {
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("wechat");
  const [contactValue, setContactValue] = useState("");
  const [request, setRequest] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  // Scroll to form if navigated here from the prayer card on HomePage
  useEffect(() => {
    if (sessionStorage.getItem("gccc_scroll_prayer")) {
      sessionStorage.removeItem("gccc_scroll_prayer");
      setTimeout(() => {
        document
          .getElementById("prayer-form")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, []);

  const t = {
    prayerFormHeading: {
      en: "How Can We Pray for You?",
      zh: "我們可以為您禱告什麼？",
    },
    prayerFormSub: {
      en: "Share what's on your heart. One of our pastors or care team members will reach out to you personally.",
      zh: "請告訴我們您心中的需求。我們的牧師或關懷同工將會直接與您聯繫。",
    },
    labelName: { en: "Your Name", zh: "您的姓名" },
    labelNamePlaceholder: {
      en: "e.g. John Doe or Anonymous",
      zh: "例如：王小明 或 匿名",
    },
    labelContact: { en: "How Can We Reach You?", zh: "我們如何聯絡您？" },
    labelContactDetail: { en: "Contact Details", zh: "聯絡方式詳情" },
    labelRequest: {
      en: "How Can We Pray for You?",
      zh: "您希望我們為您禱告什麼？",
    },
    labelRequestPlaceholder: {
      en: "Share what's on your heart…",
      zh: "請分享您心中的代禱需求…",
    },
    submitBtn: { en: "Submit", zh: "提交" },
    submitting: { en: "Submitting…", zh: "提交中…" },
    successTitle: { en: "Thank you for sharing.", zh: "感謝您的分享。" },
    successBody: {
      en: "We have received your prayer request and someone from our care team will reach out to you soon. We are honored to stand with you in prayer.",
      zh: "我們已收到您的代禱需求，我們的關懷同工將盡快與您聯繫。我們深感榮幸能與您一同在禱告中彼此守望。",
    },
    submitAnother: { en: "Submit another", zh: "再次提交" },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !request.trim()) return;
    setFormState("submitting");
    setTimeout(() => setFormState("done"), 900);
  };

  const handleReset = () => {
    setFormState("idle");
    setName("");
    setContactMethod("wechat");
    setContactValue("");
    setRequest("");
  };

  const selectedMethod = CONTACT_METHODS.find((m) => m.id === contactMethod)!;

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#33271E] mb-3">
        {t.prayerFormHeading[currentLang]}
      </h1>
      <p className="text-base text-[#6F685B] font-serif mb-10">
        {t.prayerFormSub[currentLang]}
      </p>

      <div
        id="prayer-form"
        className="scroll-mt-28 max-w-2xl bg-white rounded-2xl border border-black/8 shadow-sm p-6 md:p-10"
      >
        {formState === "done" ? (
          <div className="flex flex-col items-center text-center gap-4 py-8">
            <CheckCircle2 className="w-14 h-14 text-[#9A2B27]" />
            <h3 className="font-serif text-2xl font-bold text-[#33271E]">
              {t.successTitle[currentLang]}
            </h3>
            <p className="text-sm text-[#6F685B] font-serif leading-relaxed max-w-sm">
              {t.successBody[currentLang]}
            </p>
            <button
              onClick={handleReset}
              className="mt-2 text-xs font-mono underline underline-offset-4 text-[#9A2B27] hover:text-[#33271E] transition-colors"
            >
              {t.submitAnother[currentLang]}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-semibold uppercase tracking-widest text-[#33271E]">
                {t.labelName[currentLang]}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.labelNamePlaceholder[currentLang]}
                required
                className="w-full px-4 py-3 rounded-xl border border-black/12 bg-[#FAFAFA] text-sm font-serif text-[#33271E] placeholder:text-[#6F685B]/50 focus:outline-none focus:ring-2 focus:ring-[#9A2B27]/30 focus:border-[#9A2B27]/50 transition-all"
              />
            </div>

            {/* Contact method selector + detail input */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold uppercase tracking-widest text-[#33271E]">
                {t.labelContact[currentLang]}
              </label>
              {/* Method pills */}
              <div className="flex gap-2 flex-wrap">
                {CONTACT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setContactMethod(m.id);
                      setContactValue("");
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-serif border transition-all ${
                      contactMethod === m.id
                        ? "bg-[#33271E] text-white border-[#33271E]"
                        : "bg-[#FAFAFA] text-[#6F685B] border-black/10 hover:border-black/25"
                    }`}
                  >
                    {m.label[currentLang]}
                  </button>
                ))}
              </div>
              {/* Detail input — hidden when "Prefer Not to Share" is selected */}
              {contactMethod !== "none" && (
                <input
                  type={contactMethod === "email" ? "email" : "text"}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={selectedMethod.placeholder[currentLang]}
                  className="w-full px-4 py-3 rounded-xl border border-black/12 bg-[#FAFAFA] text-sm font-serif text-[#33271E] placeholder:text-[#6F685B]/50 focus:outline-none focus:ring-2 focus:ring-[#9A2B27]/30 focus:border-[#9A2B27]/50 transition-all"
                />
              )}
            </div>

            {/* Prayer request */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-semibold uppercase tracking-widest text-[#33271E]">
                {t.labelRequest[currentLang]}
              </label>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder={t.labelRequestPlaceholder[currentLang]}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-black/12 bg-[#FAFAFA] text-sm font-serif text-[#33271E] placeholder:text-[#6F685B]/50 focus:outline-none focus:ring-2 focus:ring-[#9A2B27]/30 focus:border-[#9A2B27]/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={
                formState === "submitting" || !name.trim() || !request.trim()
              }
              className="w-full bg-[#33271E] hover:bg-black text-white font-sans text-sm font-semibold py-3.5 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formState === "submitting"
                ? t.submitting[currentLang]
                : t.submitBtn[currentLang]}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
