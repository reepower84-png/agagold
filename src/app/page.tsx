"use client";

import { useState, useEffect, useCallback } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "홈" },
  { id: "about", label: "제품소개" },
  { id: "benefits", label: "효능" },
  { id: "certifications", label: "인증" },
  { id: "faq", label: "Q&A" },
  { id: "reviews", label: "고객후기" },
  { id: "contact", label: "문의하기" },
];

const REVIEWS = [
  {
    name: "김*수",
    age: "50대",
    text: "잠을 못 자서 오랫동안 고생했는데, 침향오일을 쓰고 나서 확실히 수면의 질이 달라졌습니다. 아내한테도 추천해서 같이 쓰고 있어요.",
  },
  {
    name: "이*영",
    age: "40대",
    text: "향이 너무 좋아서 처음엔 아로마 목적으로 썼는데, 쓰다 보니 컨디션이 확 좋아지더라고요. 이제 없으면 불안합니다.",
  },
  {
    name: "박*진",
    age: "60대",
    text: "주변에서 침향 좋다는 얘기는 많이 들었는데 아가골드가 진짜였습니다. 몸이 가벼워지고 아침이 달라요.",
  },
  {
    name: "최*라",
    age: "30대",
    text: "스트레스를 많이 받는 직업인데, 퇴근 후 한 방울 떨어뜨리면 긴장이 확 풀립니다. 선물용으로도 최고예요.",
  },
  {
    name: "정*호",
    age: "70대",
    text: "나이 들면서 기력이 떨어졌는데, 아가골드 쓴 뒤로 산책도 다시 다니게 됐습니다. 자식들이 계속 사다 줍니다.",
  },
  {
    name: "한*미",
    age: "50대",
    text: "남편이 먼저 써보고 저한테 강력 추천했어요. 확실히 다른 침향 제품과는 퀄리티가 다릅니다.",
  },
  {
    name: "송*현",
    age: "60대",
    text: "소화가 안 되고 속이 더부룩한 게 일상이었는데, 아가골드 복용 후 속이 편안해지고 식사가 즐거워졌습니다. 밥맛이 돌아왔어요.",
  },
  {
    name: "윤*정",
    age: "40대",
    text: "만성 피로에 시달렸는데 아가골드 먹기 시작하고 오후에도 처지지 않더라고요. 커피 대신 이걸 챙기게 됐습니다.",
  },
  {
    name: "오*택",
    age: "50대",
    text: "면역력이 약해서 환절기마다 고생했는데, 꾸준히 복용하니 올해는 감기 한 번 안 걸렸습니다. 몸이 확실히 튼튼해진 느낌이에요.",
  },
];

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`inline-block bg-gold-400 hover:bg-gold-500 text-dark-900 font-bold py-3.5 px-8 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] ${className}`}
    >
      지금 바로 문의하기
    </a>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
    const scrollPosition = window.scrollY + 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(NAV_ITEMS[i].id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitResult({
          ok: true,
          msg: "문의가 접수되었습니다. 빠르게 연락드리겠습니다!",
        });
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setSubmitResult({
          ok: false,
          msg: "문의 접수에 실패했습니다. 다시 시도해주세요.",
        });
      }
    } catch {
      setSubmitResult({
        ok: false,
        msg: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <a href="#hero" className="block shrink-0">
              <img
                src="/images/Image_2026년_3월_29일_오후_09_26_27_가로-removebg-preview.png"
                alt="아가골드 공식몰"
                className="h-14 sm:h-16 md:h-20 w-auto"
              />
            </a>

            <ul className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gold-400 text-dark-900"
                        : "text-dark-200 hover:text-gold-300"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="메뉴 열기"
            >
              <span
                className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-dark-900/95 backdrop-blur-md ${
            mobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-gold-400 text-dark-900"
                      : "text-dark-200 hover:text-gold-300"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/v2_watermarked-77d4db73-b310-4c77-a8a0-d059175370e8 5.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-dark-900/50" />

        <div className="relative z-10 text-center px-5 sm:px-6 max-w-3xl mx-auto">
          <p className="text-gold-400 text-xs sm:text-sm md:text-base font-medium tracking-wider sm:tracking-widest uppercase mb-4">
            Vietnam Premium Agarwood Oil
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
            단 1방울,
            <br />
            <span className="text-gold-400">몸이 먼저 알아보는</span>
            <br />
            진짜 침향
          </h1>
          <p className="text-dark-100 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            베트남 직수입 프리미엄 아가골드 오일
            <br />한 번 써본 고객은 다시 찾습니다
          </p>
          <CTAButton />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gold-400/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 bg-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              About Product
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 text-white">
              아가골드플러스란?
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gold-400/20">
              <iframe
                src="https://www.youtube.com/embed/JXn4XG-o90c?autoplay=1&mute=1&loop=1&playlist=JXn4XG-o90c&rel=0"
                title="아가골드플러스 제품 소개"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="space-y-6">
              <p className="text-dark-200 text-base md:text-lg leading-relaxed">
                <strong className="text-gold-400">아가골드플러스</strong>는
                베트남 현지에서 직수입한 최상급 침향나무에서 추출한 프리미엄
                침향오일입니다.
              </p>
              <p className="text-dark-200 text-base md:text-lg leading-relaxed">
                침향(沈香)은 수천 년간 동양 의학에서 귀하게 여겨온 천연
                소재로, 심신 안정과 기력 보충에 탁월한 효능이 있는 것으로
                알려져 있습니다.
              </p>
              <p className="text-dark-200 text-base md:text-lg leading-relaxed">
                아가골드는 전통 방식의 추출 공정을 통해{" "}
                <strong className="text-white">
                  침향 본연의 향과 유효 성분을 최대한 보존
                </strong>
                하여, 단 1방울만으로도 차이를 느끼실 수 있습니다.
              </p>

              <div className="pt-4">
                <CTAButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 md:py-28 bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              Benefits
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 text-white">
              왜 아가골드인가요?
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
            <p className="text-dark-300 mt-6 max-w-2xl mx-auto text-base md:text-lg">
              베트남 직수입 프리미엄 아가골드 오일이 특별한 이유
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🌙",
                title: "숙면 유도",
                desc: "천연 침향 성분이 뇌파를 안정시켜 깊은 수면을 도와줍니다.",
              },
              {
                icon: "💪",
                title: "기력 보충",
                desc: "떨어진 기력을 보충하고 활력을 되찾아 드립니다.",
              },
              {
                icon: "🧘",
                title: "심신 안정",
                desc: "스트레스와 긴장을 완화하고 마음의 평온을 선사합니다.",
              },
              {
                icon: "✨",
                title: "프리미엄 품질",
                desc: "베트남 현지 최상급 침향나무만을 엄선하여 추출합니다.",
              },
              {
                icon: "🔬",
                title: "전통 추출 공법",
                desc: "침향 고유의 유효 성분을 최대한 보존하는 전통 방식 고수.",
              },
              {
                icon: "📦",
                title: "직수입 유통",
                desc: "중간 유통 없이 산지 직수입으로 합리적인 가격을 실현합니다.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-dark-800 border border-dark-600 rounded-2xl p-6 md:p-8 hover:border-gold-400/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-dark-300 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-gold-300 text-lg md:text-xl font-semibold mb-6">
              오늘 입고분 한정, 지금 바로 확인하세요
            </p>
            <CTAButton />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 md:py-28 bg-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              Certifications
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 text-white">
              믿을 수 있는 인증서류
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-6 md:space-y-8">
            {[
              { src: "/images/20260331_143513 2.jpg", alt: "식품안전관리인증, ISO22000, CFS인증, 베트남사업자, 사업자등록증, 영업등록증, 수입식품검사결과, 수입신고필증" },
              { src: "/images/20260331_134905 2.jpg", alt: "할인판매수입표준, 건강보조식품 인증 라이센스, 하노이 과학기술부 원재 의약품 시험 연구 센터, 식품위생인증, GMP" },
            ].map((img) => (
              <div
                key={img.src}
                className="rounded-2xl overflow-hidden border border-gold-400/30 shadow-lg shadow-gold-400/5"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              Q&A
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 text-white">
              자주 묻는 질문
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-6">
            {[
              {
                q: "하루 권장 섭취량은 어떻게 되나요?",
                a: "1일 1회 1정씩 물과 함께 섭취하세요.",
              },
              {
                q: "언제, 어떻게 섭취하면 좋나요?",
                a: "하루 중 편한 시간대 섭취하셔도 무방합니다.\n단, 위가 예민한 경우 음식과 함께 드시기를 권합니다.",
              },
              {
                q: "섭취 시 주의해야할 점이 있나요?",
                a: "알레르기 체질, 특이 체질의 경우 성분을 꼭 확인 후 섭취하세요.\n개인의 신체에 따라 평소와 다른 증상이 있을 경우 의사와 상의하세요.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-dark-800 border border-dark-600 rounded-2xl p-6 md:p-8 hover:border-gold-400/30 transition-all duration-300"
              >
                <h3 className="text-gold-400 font-bold text-base md:text-lg mb-3 flex items-start gap-2">
                  <span className="shrink-0">Q.</span>
                  <span>{item.q}</span>
                </h3>
                <div className="text-dark-200 text-sm md:text-base leading-relaxed pl-7 whitespace-pre-line">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 md:py-28 bg-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 text-white">
              한 번 써본 고객은 다시 찾습니다
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="bg-dark-900 border border-dark-600 rounded-2xl p-6 md:p-8 hover:border-gold-400/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 text-gold-400 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark-200 text-sm md:text-base leading-relaxed mb-5 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400 font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {review.name}
                    </p>
                    <p className="text-dark-400 text-xs">{review.age} 고객</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 md:py-28 bg-dark-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
              Contact
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-3 text-white">
              문의하기
            </h2>
            <div className="w-16 h-1 bg-gold-400 mx-auto mt-4 rounded-full" />
            <p className="text-dark-300 mt-6 text-sm sm:text-base md:text-lg">
              궁금한 점이 있으시면 아래 양식을 작성해주세요.
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              빠르게 연락드리겠습니다.
            </p>
          </div>

          <div className="bg-dark-800 border border-gold-400/30 rounded-2xl p-6 md:p-8 mb-8 text-center">
            <p className="text-gold-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4">
              아가골드플러스 베트남 침향 오일 캡슐 30정 가격 안내
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-dark-400">
                <span className="text-sm sm:text-base">정상가</span>
                <span className="text-base sm:text-lg line-through">1,350,000원</span>
              </div>
              <div className="flex items-center gap-2 text-dark-300">
                <span className="text-sm sm:text-base">할인가</span>
                <span className="text-lg sm:text-xl line-through">1,050,000원</span>
              </div>
              <div className="mt-3 pt-3 border-t border-dark-600 w-full">
                <p className="text-xs sm:text-sm text-gold-300 mb-1">
                  아가골드 공식몰 론칭 기념
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-400">
                  790,000원
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-dark-800 border border-dark-600 rounded-2xl p-6 md:p-10 space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-500 text-white placeholder-dark-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors text-sm md:text-base"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-500 text-white placeholder-dark-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors text-sm md:text-base"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-dark-200 mb-2"
              >
                문의 내용
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg bg-dark-700 border border-dark-500 text-white placeholder-dark-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors resize-none text-sm md:text-base"
                placeholder="문의하실 내용을 입력해주세요."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white hover:bg-dark-100 disabled:bg-white/50 text-dark-900 font-bold py-3.5 rounded-lg text-base md:text-lg transition-all duration-300"
            >
              {submitting ? "접수 중..." : "문의 접수하기"}
            </button>

            {submitResult && (
              <p
                className={`text-center text-sm font-medium ${
                  submitResult.ok ? "text-green-400" : "text-red-400"
                }`}
              >
                {submitResult.msg}
              </p>
            )}

            <a
              href="http://pf.kakao.com/_GJQxmb/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FDD800] text-dark-900 font-bold py-3.5 rounded-lg text-base md:text-lg transition-all duration-300"
            >
              <img
                src="/images/카톡_원형_로고.png"
                alt="카카오톡"
                className="w-6 h-6"
              />
              카카오톡으로 상담하기
            </a>
          </form>
        </div>
      </section>

      {/* Kakao floating button */}
      <a
        href="http://pf.kakao.com/_GJQxmb/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 overflow-hidden"
        aria-label="카카오톡 상담"
      >
        <img
          src="/images/카톡_원형_로고.png"
          alt="카카오톡 상담"
          className="w-full h-full object-cover"
        />
      </a>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 py-10 pb-24 md:pb-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gold-400 font-bold text-lg mb-2">
            아가골드 공식몰
          </p>
          <p className="text-dark-400 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} 아가골드 공식몰. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
