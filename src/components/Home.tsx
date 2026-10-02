import { useEffect, useRef, useState } from "react";
import LeadForm from "./LeadForm";
import Link from "./Link";
import { CTASection } from "./Layout";
import { services, testimonials, homeFaqs } from "../data";
import { trackContact, trackInitiateCheckout } from "../utils/pixel";

import { chatUrl, hasWhatsApp } from "../config";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoSlider />
      <PainPoints />
      <ServicesSection />
      <HowItWorks />
      <StatsBar />
      <Testimonials />
      <ConfidentialitySection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

/* ====================================================================
   HERO SECTION
   ==================================================================== */
function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#3D348B] via-[#4a3fa0] to-[#7678ED] text-white overflow-hidden">
      <div className="bg-pattern absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-28 lg:pt-20 lg:pb-36 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#F7B801] text-[#3D348B] font-bold rounded-full px-4 py-1.5 text-sm">
              🛡️ Trusted By 10,000+ Students Across The USA
            </div>

            <h1 className="font-display font-extrabold text-[36px] sm:text-[52px] lg:text-[58px] leading-[1.05] mt-5">
              Are You Stressed About Your{" "}
              <span className="text-[#F7B801]">Online Exam</span> or Course?
            </h1>
            <p className="font-display font-bold text-[#F7B801] text-2xl sm:text-3xl mt-3">
              You Don't Have To Face It Alone Anymore.
            </p>
            <p className="text-lg text-white/90 mt-4 max-w-xl leading-relaxed">
              Our qualified experts handle your online exams, proctored tests, GED, TEAS, WGU courses, certifications and more —{" "}
              <strong>safely, confidentially, and guaranteed.</strong>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 text-sm">
              {["✅ 100% Confidential", "✅ HS to PhD Levels", "✅ Expert Support", "✅ Guaranteed Results"].map((t) => (
                <div key={t} className="bg-white/10 backdrop-blur rounded-lg px-3 py-2.5 font-semibold">{t}</div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 max-w-md">
              <Link to="/contact" onClick={() => trackInitiateCheckout()} className="btn-cta h-[64px] text-lg sm:text-xl font-extrabold">
                GET EXPERT HELP NOW →
              </Link>
              <div className="text-base text-white/90 text-center">📩 Response within 5 minutes • 24/7</div>
              <a href={chatUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()} className="text-center text-[#F7B801] font-bold underline hover:text-white transition-colors">
                {hasWhatsApp() ? "💬 Or Message Us on WhatsApp" : "💬 Or Message Us Now"}
              </a>
            </div>

            {/* Trust seal bar */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/85">
              <span>🔒 SSL Secured</span>
              <span>🛡️ Privacy Protected</span>
              <span>✅ Money-Back Guarantee</span>
              <span>⭐ 4.9/5 Rating</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-7 max-w-xl">
              <SocialNum n="10,000+" l="Students Helped" />
              <SocialNum n="500+" l="Expert Team" />
              <SocialNum n="100%" l="Guaranteed" />
            </div>
          </div>

          <div className="lg:col-span-5" id="lead-form-main">
            <div className="relative">
              <div className="absolute -top-3 -right-3 bg-[#F7B801] text-[#2A2565] font-extrabold text-[11px] px-3 py-1.5 rounded-full rotate-3 shadow-lg z-10">
                ⏰ 5 MIN RESPONSE
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1440 100" className="hero-wave" preserveAspectRatio="none">
        <path d="M0,50 C320,100 1120,0 1440,60 L1440,100 L0,100 Z" fill="#F9F9FF" />
      </svg>
    </section>
  );
}

function SocialNum({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl px-3 py-3 text-center border border-white/20">
      <div className="font-display font-extrabold text-xl sm:text-2xl text-[#F7B801]">{n}</div>
      <div className="text-xs text-white/85 font-semibold uppercase tracking-wide leading-tight mt-1">{l}</div>
    </div>
  );
}

/* ====================================================================
   LOGO SLIDER — Smooth infinite CSS-only marquee, 2 rows
   ==================================================================== */
const LOGOS = [
  { name: "GED", bg: "#3D348B" },
  { name: "HiSET", bg: "#7678ED" },
  { name: "TEAS", bg: "#F35B04" },
  { name: "HESI", bg: "#F18701" },
  { name: "CompTIA", bg: "#3D348B" },
  { name: "WGU", bg: "#7678ED" },
  { name: "Sophia", bg: "#F7B801" },
  { name: "Study.com", bg: "#3D348B" },
  { name: "Straighterline", bg: "#7678ED" },
  { name: "AWS", bg: "#F18701" },
  { name: "Coursera", bg: "#3D348B" },
  { name: "PMP", bg: "#F35B04" },
  { name: "ATI", bg: "#7678ED" },
  { name: "GRE", bg: "#3D348B" },
  { name: "GMAT", bg: "#F18701" },
  { name: "NCLEX", bg: "#F35B04" },
  { name: "ProctorU", bg: "#3D348B" },
  { name: "Proctorio", bg: "#7678ED" },
  { name: "Honorlock", bg: "#F18701" },
  { name: "Canvas", bg: "#F35B04" },
  { name: "Blackboard", bg: "#3D348B" },
  { name: "U. of Phoenix", bg: "#7678ED" },
  { name: "Liberty Univ.", bg: "#3D348B" },
  { name: "SNHU", bg: "#F18701" },
  { name: "Capella", bg: "#7678ED" },
  { name: "Purdue Global", bg: "#3D348B" },
  { name: "Walden", bg: "#F35B04" },
  { name: "Grand Canyon U.", bg: "#F18701" },
  { name: "WGU", bg: "#3D348B" },
];

function LogoPill({ name, bg }: { name: string; bg: string }) {
  return (
    <span
      className="shrink-0 inline-flex items-center justify-center h-[46px] px-5 rounded-full text-white font-display font-bold text-sm whitespace-nowrap select-none"
      style={{ background: bg }}
    >
      {name}
    </span>
  );
}

function LogoSlider() {
  // Duplicate each row so the marquee loops seamlessly
  const row1 = [...LOGOS, ...LOGOS];
  const row2 = [...[...LOGOS].reverse(), ...[...LOGOS].reverse()];

  return (
    <section className="bg-[#F9F9FF] py-12 sm:py-16 reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8">
        <h2 className="font-display font-bold text-[#3D348B] text-lg sm:text-xl tracking-wide uppercase">
          We Provide Expert Help For All These Platforms
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="marquee-container">
        <div className="marquee-track marquee-left">
          {row1.map((l, i) => (
            <div key={`r1-${i}`} className="mx-2">
              <LogoPill name={l.name} bg={l.bg} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="marquee-container mt-3">
        <div className="marquee-track marquee-right">
          {row2.map((l, i) => (
            <div key={`r2-${i}`} className="mx-2">
              <LogoPill name={l.name} bg={l.bg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   PAIN POINTS
   ==================================================================== */
function PainPoints() {
  const cards = [
    { e: "⏰", t: "Running Out Of Time?", b: "Your exam is in days and you haven't started. Deadlines feel impossible when life gets in the way." },
    { e: "😰", t: "Afraid of Failing?", b: "One failed exam can cost you months of progress, money, and the career opportunity you've worked for." },
    { e: "🤯", t: "Overwhelmed & Confused?", b: "The course material feels impossible and no one is explaining it in a way that makes sense." },
  ];
  return (
    <section className="section-pad bg-white reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-display font-extrabold text-[#3D348B] text-3xl sm:text-5xl text-center max-w-3xl mx-auto leading-tight">
          Sound Familiar? <span className="text-[#F35B04]">You're Not Alone.</span>
        </h2>
        <p className="text-center text-[#3D348B]/70 mt-3 max-w-2xl mx-auto text-base">
          Thousands of US students reach out to us every month for one reason — they're stuck. Here's what they tell us:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {cards.map((c) => (
            <div key={c.t} className="lift-card bg-white border-2 border-[#eeeefb] rounded-2xl p-7">
              <div className="w-16 h-16 rounded-2xl bg-[#F9F9FF] flex items-center justify-center text-4xl">{c.e}</div>
              <h3 className="font-display font-bold text-[#3D348B] text-xl mt-5">{c.t}</h3>
              <p className="text-[#3D348B]/70 mt-2 leading-relaxed text-base">{c.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="font-display font-bold text-[#F35B04] text-xl sm:text-2xl">
            Whatever your situation — WE HAVE AN EXPERT FOR YOU.
          </p>
          <Link to="/contact" onClick={() => trackInitiateCheckout()} className="btn-cta mt-5 h-[58px] px-7 text-base">
            Find Your Expert Now →
</Link>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   SERVICES
   ==================================================================== */
function ServicesSection() {
  return (
    <section className="bg-[#3D348B] text-white py-16 sm:py-20 relative overflow-hidden reveal-section">
      <div className="bg-pattern absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl">Expert Help For Every Exam &amp; Course</h2>
          <p className="font-display font-semibold text-[#F7B801] text-lg sm:text-xl mt-2">High School to PhD — We Cover It All</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((s) => (
            <div key={s.slug} className="lift-card bg-white text-[#1f1f2e] rounded-2xl overflow-hidden relative border-2 border-transparent">
              <div className="bg-[#3D348B] h-2 w-full" />
              {s.popular && (
                <div className="absolute top-4 right-4 bg-[#F7B801] text-[#2A2565] text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                  ⭐ MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <div className="text-4xl text-[#F7B801]">{s.emoji}</div>
                <h3 className="font-display font-bold text-[#3D348B] text-xl mt-3">{s.title}</h3>
                <p className="text-[#3D348B]/70 text-base mt-2 leading-relaxed">{s.short}</p>
                <Link to={`/services/${s.slug}`}
                  className="mt-4 inline-flex items-center text-[#F35B04] font-bold text-base hover:underline">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   HOW IT WORKS
   ==================================================================== */
function HowItWorks() {
  const steps = [
    { n: 1, e: "🖊️", t: "Tell Us What You Need", b: "Fill our quick form or message us on WhatsApp. Takes less than 2 minutes." },
    { n: 2, e: "🤝", t: "We Match You With An Expert", b: "Within minutes, we connect you with a qualified specialist for your exact exam or course." },
    { n: 3, e: "🔒", t: "Expert Handles Everything", b: "Safely, securely, and confidentially — your privacy is always protected." },
    { n: 4, e: "🏆", t: "You Get Results. Guaranteed.", b: "Pass your exam or course with confidence. Satisfaction guaranteed or we make it right." },
  ];
  return (
    <section className="section-pad bg-white reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-[#3D348B] text-3xl sm:text-5xl">Getting Help Is Easier Than You Think</h2>
          <p className="text-[#3D348B]/70 mt-3 text-base">Four simple steps from "I'm stressed" to "I passed."</p>
        </div>

        <div className="relative grid md:grid-cols-4 gap-8 mt-14">
          <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#F35B04] via-[#F18701] to-[#F7B801]" />
          {steps.map((s) => (
            <div key={s.n} className="text-center relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#F35B04] text-white font-display font-extrabold text-2xl flex items-center justify-center shadow-lg relative z-10 ring-4 ring-white">
                {s.n}
              </div>
              <div className="text-3xl mt-3">{s.e}</div>
              <h3 className="font-display font-bold text-[#3D348B] text-lg mt-2">{s.t}</h3>
              <p className="text-[#3D348B]/70 text-base mt-2">{s.b}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/contact" onClick={() => trackInitiateCheckout()} className="btn-cta h-[58px] px-7 text-base">
            Start Now — It Takes 2 Minutes →
</Link>
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   STATS BAR — counter animation on scroll
   ==================================================================== */
function useCounter(target: number, trigger: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target]);
  return v;
}

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setVis(true)), { threshold: 0.4 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  const a = useCounter(10000, vis);
  const b = useCounter(500, vis);
  const c = useCounter(100, vis);
  return (
    <section ref={ref} className="bg-[#7678ED] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-y-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#F7B801]/40">
        <Stat n={`${a.toLocaleString()}+`} l="Students Helped" />
        <Stat n={`${b}+`} l="Expert Team" />
        <Stat n={`${c}%`} l="Guaranteed Satisfaction" />
        <Stat n="24/7" l="Available" />
      </div>
    </section>
  );
}
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="px-4 py-2">
      <div className="font-display font-extrabold text-3xl sm:text-5xl text-[#F7B801]">{n}</div>
      <div className="text-base font-semibold mt-1 opacity-95">{l}</div>
    </div>
  );
}

/* ====================================================================
   TESTIMONIALS
   ==================================================================== */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const visible = 3;
  const max = testimonials.length - visible;

  return (
    <section className="bg-[#F9F9FF] section-pad reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-[#3D348B] text-3xl sm:text-5xl">
            Real Students. Real Results. Real Stories.
          </h2>
          <div className="mt-3 text-[#F7B801] text-xl">⭐⭐⭐⭐⭐</div>
          <p className="text-[#3D348B]/70 text-base">Based on 10,000+ student interactions • 4.9/5 average rating</p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(idx, idx + visible).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

        <div className="md:hidden mt-10">
          <TestimonialCard t={testimonials[idx % testimonials.length]} />
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => setIdx((i) => Math.max(0, i - 1))}
            className="w-12 h-12 rounded-full border-2 border-[#3D348B] text-[#3D348B] hover:bg-[#3D348B] hover:text-white text-xl transition-colors" aria-label="Previous">‹</button>
          <button onClick={() => setIdx((i) => Math.min(max, i + 1))}
            className="w-12 h-12 rounded-full border-2 border-[#3D348B] text-[#3D348B] hover:bg-[#3D348B] hover:text-white text-xl transition-colors" aria-label="Next">›</button>
        </div>

        <div className="text-center mt-8">
          <Link to="/contact" onClick={() => trackInitiateCheckout()} className="btn-cta h-[58px] px-7 text-base">
            Join Thousands of Successful Students →
</Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="bg-white rounded-2xl p-6 lift-card border-2 border-[#eeeefb]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-extrabold text-lg" style={{ background: t.color }}>
          {t.initial}
        </div>
        <div>
          <div className="font-display font-bold text-[#3D348B]">{t.name}</div>
          <div className="text-sm text-[#7678ED]">{t.location} • {t.course}</div>
        </div>
      </div>
      <div className="text-[#F7B801] text-base mt-3">⭐⭐⭐⭐⭐</div>
      <p className="text-[#3D348B]/80 mt-3 leading-relaxed text-base">"{t.quote}"</p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#F9F9FF] text-[#3D348B] border border-[#7678ED]/30 px-2.5 py-1 rounded-full">
        ✓ VERIFIED U.S. STUDENT
      </div>
    </div>
  );
}

/* ====================================================================
   CONFIDENTIALITY
   ==================================================================== */
function ConfidentialitySection() {
  const items = [
    { e: "🔒", t: "100% Confidential", b: "All interactions kept completely private." },
    { e: "🛡️", t: "Secure IP Protection", b: "We access your exam from secure systems." },
    { e: "💳", t: "Safe Payments", b: "SSL-encrypted payment processing." },
    { e: "✅", t: "No Trace Policy", b: "No evidence left of our assistance." },
  ];
  return (
    <section className="bg-gradient-to-br from-[#3D348B] to-[#7678ED] text-white section-pad relative overflow-hidden reveal-section">
      <div className="bg-pattern absolute inset-0" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl">Your Privacy Is Our #1 Priority</h2>
        <p className="text-white/85 mt-3 max-w-2xl mx-auto text-base">
          Discretion is the foundation of everything we do. Here are the four pillars that protect you at every step.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mt-10 text-left">
          {items.map((i) => (
            <div key={i.t} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 lift-card">
              <div className="text-4xl">{i.e}</div>
              <h3 className="font-display font-bold text-xl mt-2">{i.t}</h3>
              <p className="text-white/85 mt-1 text-base">{i.b}</p>
            </div>
          ))}
        </div>

        <p className="font-display font-bold text-[#F7B801] text-xl sm:text-2xl mt-10">
          We have NEVER compromised a student's privacy. Ever.
        </p>
        <Link to="/contact" onClick={() => trackInitiateCheckout()} className="btn-cta mt-6 h-[58px] px-7 text-base">
          Get Started Confidentially →
</Link>
      </div>
    </section>
  );
}

/* ====================================================================
   PRICING
   ==================================================================== */
function PricingSection() {
  const cards = [
    { t: "Single Exam Help", p: "$99", per: "per exam", items: ["One proctored or online exam", "Qualified expert assigned", "Results guaranteed", "100% confidential"] },
    { t: "Full Course Help", p: "$199", per: "per week", popular: true, items: ["Complete course management", "All assignments & quizzes", "Weekly progress updates", "Dedicated expert assigned"] },
    { t: "Certification Package", p: "$299", per: "per cert", items: ["CompTIA / PMP / AWS / GRE / GMAT", "Certified subject specialist", "Full prep + exam taking", "Money-back guarantee"] },
  ];
  return (
    <section className="bg-[#F9F9FF] section-pad reveal-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-[#3D348B] text-3xl sm:text-5xl">Affordable Help. Guaranteed Results.</h2>
          <p className="text-[#3D348B]/70 mt-3 text-base">Every quote is customized to your situation. No hidden fees. No surprises.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {cards.map((c) => (
            <div key={c.t}
              className={`relative bg-white rounded-2xl p-7 border-2 lift-card ${c.popular ? "border-[#F35B04] md:scale-[1.04] shadow-2xl" : "border-[#eeeefb]"}`}>
              {c.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F35B04] text-white text-xs font-extrabold px-4 py-1.5 rounded-full">🔥 MOST POPULAR</div>
              )}
              <h3 className="font-display font-bold text-[#3D348B] text-xl">{c.t}</h3>
              <div className="mt-3">
                <span className="text-sm text-[#7678ED]">starting from</span>
                <div className="flex items-end gap-2">
                  <div className="font-display font-extrabold text-[#F35B04] text-5xl">{c.p}</div>
                  <div className="text-[#3D348B]/60 mb-2 text-base">{c.per}</div>
                </div>
              </div>
              <ul className="space-y-2 mt-4">
                {c.items.map((it) => (
                  <li key={it} className="text-base text-[#3D348B]/80 flex gap-2">
                    <span className="text-[#F7B801]">✅</span> {it}
                  </li>
                ))}
              </ul>
              <Link to="/contact" onClick={() => trackInitiateCheckout()}
                className={`w-full h-[54px] mt-6 font-extrabold rounded-xl ${c.popular ? "btn-cta text-base" : "bg-[#3D348B] text-white hover:bg-[#2A2565] inline-flex items-center justify-center transition-colors"}`}>
                GET QUOTE →
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-[#3D348B]/70 text-base">
          Not sure what you need?{" "}
          <a href={chatUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()} className="text-[#F35B04] font-bold underline">Message us</a>{" "}
          — we'll build you a custom plan.
        </div>
      </div>
    </section>
  );
}

/* ====================================================================
   FAQ — smooth accordion
   ==================================================================== */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white section-pad reveal-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display font-extrabold text-[#3D348B] text-3xl sm:text-5xl">
            Questions? <span className="text-[#F35B04]">We Have Answers.</span>
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {homeFaqs.map((f, i) => (
            <div key={i} className="border-2 border-[#eeeefb] rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-[#F9F9FF] transition-colors">
                <span className="font-display font-semibold text-[#3D348B] text-base sm:text-lg">{f.q}</span>
                <span className={`text-[#F35B04] text-2xl shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`faq-answer ${open === i ? "open" : ""}`}>
                <p className="text-[#3D348B]/70 leading-relaxed text-base">{f.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-[#3D348B]/70 text-base">Still have questions? We're available 24/7</p>
          <Link to="/contact" onClick={() => trackInitiateCheckout()} className="btn-cta mt-4 h-[58px] px-7 text-base">
            Chat Now →
</Link>
        </div>
      </div>
    </section>
  );
}
