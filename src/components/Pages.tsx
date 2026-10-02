import { useState } from "react";
import { CTASection, PageHero } from "./Layout";
import LeadForm from "./LeadForm";
import Link from "./Link";
import { homeFaqs, testimonials, blogPosts, blogCategories, examOptions, services } from "../data";
import { trackLead, trackContact } from "../utils/pixel";
import { submitLead } from "../utils/lead";
import { VIDEO_EMBED_URL } from "../config";

import {
  EMAIL,
  PHONE_E164,
  PHONE_DISPLAY,
  PRIVACY_EMAIL,
  chatUrl,
  hasWhatsApp,
} from "../config";

/* ==================== HOW IT WORKS ==================== */
export function HowItWorksPage() {
  const steps = [
    { n: 1, e: "🖊️", t: "Tell Us What You Need", b: "Fill our 60-second form, message us on WhatsApp, or call. Tell us your exam, course, deadline and what kind of help you need." },
    { n: 2, e: "🤝", t: "We Match You With An Expert", b: "Our team reviews your request and matches you with a vetted expert who specializes in your exact platform — usually within 5–30 minutes." },
    { n: 3, e: "💬", t: "Confirm Your Plan & Quote", b: "You'll get a custom quote — no hidden fees. Once you approve, you'll be connected directly with your expert via secure messaging." },
    { n: 4, e: "🔒", t: "Expert Handles Everything", b: "Your expert works on your exam or course using secure remote-access methods. Your camera looks natural, your IP is protected, your privacy is preserved." },
    { n: 5, e: "🏆", t: "You Get Results — Guaranteed", b: "You receive your passing grade. If we don't deliver, you get a full refund or a free retake. Period." },
  ];
  return (
    <>
      <PageHero title="How HelpMyCourseNow Works" subtitle="From your first message to your passing grade — here's the full process, end-to-end." />
      <section className="section-pad bg-white reveal-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {VIDEO_EMBED_URL ? (
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={VIDEO_EMBED_URL}
                title="How HelpMyCourseNow works"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ["⏱️", "Takes 2 Minutes", "One short form is all we need to get started."],
                ["⚡", "Matched In 5 Minutes", "A specialist for your exact exam reviews your request."],
                ["🎯", "You Get Results", "Backed by our money-back guarantee."],
              ].map(([e, t, b]) => (
                <div key={t} className="bg-[#F9F9FF] border-2 border-[#eeeefb] rounded-2xl p-6 text-center">
                  <div className="text-4xl">{e}</div>
                  <div className="font-display font-bold text-[#3D348B] text-lg mt-2">{t}</div>
                  <div className="text-[#3D348B]/70 text-base mt-1">{b}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 space-y-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5 bg-[#F9F9FF] rounded-2xl p-6 border-2 border-[#eeeefb] lift-card">
                <div className="w-16 h-16 shrink-0 rounded-full bg-[#F35B04] text-white font-display font-extrabold text-xl flex items-center justify-center">{s.n}</div>
                <div>
                  <div className="text-2xl">{s.e}</div>
                  <h3 className="font-display font-bold text-[#3D348B] text-xl mt-1">{s.t}</h3>
                  <p className="text-[#3D348B]/70 mt-2 leading-relaxed text-base">{s.b}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#3D348B] text-white rounded-2xl p-8 text-center">
            <h3 className="font-display font-extrabold text-2xl">Privacy &amp; Security At Every Step</h3>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 text-left">
              {[
                ["🔒", "Encrypted Communication", "All messages happen on WhatsApp, Signal or our private portal."],
                ["🛡️", "Secure Remote Access", "We never store your school credentials longer than the session."],
                ["💳", "Private Payment", "Zelle, Cash App, PayPal, crypto — your choice, fully discreet."],
              ].map(([e, t, b]) => (
                <div key={t} className="bg-white/10 rounded-xl p-5">
                  <div className="text-3xl">{e}</div>
                  <div className="font-display font-bold mt-2">{t}</div>
                  <div className="text-base opacity-90 mt-1">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ==================== ABOUT ==================== */
export function AboutPage() {
  return (
    <>
      <PageHero title="About HelpMyCourseNow" subtitle="We help adult learners across America get the diplomas, degrees and certifications they deserve — without burning out." />
      <section className="section-pad bg-white reveal-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display font-extrabold text-[#3D348B] text-3xl">Why We Started HelpMyCourseNow</h2>
            <p className="text-[#3D348B]/70 mt-4 leading-relaxed text-base">We started HelpMyCourseNow because we watched too many smart, capable adults get stuck — working full-time, raising families, and trying to finish a degree or pass an exam that simply wasn't designed for their schedule.</p>
            <p className="text-[#3D348B]/70 mt-4 leading-relaxed text-base">Today our team includes 500+ vetted experts — licensed nurses, certified IT professionals, math PhDs, English tutors, and former university instructors. Every single one is US-based or US-certified, and every one understands what's at stake.</p>
            <p className="text-[#3D348B]/70 mt-4 leading-relaxed text-base"><strong className="text-[#F35B04]">Our mission:</strong> turn the most stressful moment of your academic life into the easiest decision you'll ever make.</p>
          </div>
          <div className="bg-gradient-to-br from-[#3D348B] to-[#7678ED] rounded-2xl p-8 text-white">
            <h3 className="font-display font-bold text-xl">By The Numbers</h3>
            <div className="grid grid-cols-2 gap-4 mt-5">
              {[["10,000+", "Students Helped"], ["500+", "Vetted Experts"], ["7", "Years Operating"], ["4.9/5", "Average Rating"], ["48", "States Served"], ["99.6%", "Pass Rate"]].map(([n, l]) => (
                <div key={l} className="bg-white/10 rounded-xl p-4">
                  <div className="font-display font-extrabold text-2xl text-[#F7B801]">{n}</div>
                  <div className="text-sm opacity-90">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-16">
          <h3 className="font-display font-extrabold text-[#3D348B] text-2xl text-center">Our Leadership Team</h3>
          <div className="grid sm:grid-cols-4 gap-5 mt-8">
            {[["Marcus T.", "Founder & CEO", "#3D348B"], ["Aisha R.", "Head of Experts", "#F35B04"], ["Devon K.", "Chief Tech Officer", "#7678ED"], ["Whitney L.", "Student Success Lead", "#F18701"]].map(([n, t, c]) => (
              <div key={n} className="bg-white rounded-2xl p-5 text-center border-2 border-[#eeeefb] lift-card">
                <div className="w-20 h-20 mx-auto rounded-full text-white font-display font-extrabold text-2xl flex items-center justify-center" style={{ background: c }}>{n.charAt(0)}</div>
                <div className="font-display font-bold text-[#3D348B] mt-3">{n}</div>
                <div className="text-sm text-[#7678ED]">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ==================== CONTACT ==================== */
export function ContactPage() {
  return (
    <>
      <PageHero title="Get In Touch — We Reply In 5 Minutes" subtitle="Fill the form, send a WhatsApp, or call us. We're available 24/7 across the United States." />
      <section className="section-pad bg-white reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display font-extrabold text-[#3D348B] text-3xl">Tell Us About Your Exam Or Course</h2>
            <p className="text-[#3D348B]/70 mt-3 text-base">The more details you share, the faster we can match you with the perfect expert. All info is 100% confidential.</p>
            <div className="mt-6 bg-white rounded-2xl border-2 border-[#eeeefb] p-6">
              <FullContactForm />
            </div>
          </div>
          <div className="space-y-5">
            <a href={chatUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()} className="block bg-[#25D366] text-white rounded-2xl p-7 hover:scale-[1.01] transition lift-card">
              <div className="text-4xl">💬</div>
              <div className="font-display font-extrabold text-2xl mt-2">{hasWhatsApp() ? "Message Us On WhatsApp" : "Message Us Now"}</div>
              <div className="opacity-90 mt-1 text-base">Fastest way to get matched with an expert.</div>
            </a>
            {PHONE_E164 && (
              <a href={`tel:+${PHONE_E164}`} className="block bg-[#3D348B] text-white rounded-2xl p-7 hover:scale-[1.01] transition lift-card">
                <div className="text-4xl">📞</div>
                <div className="font-display font-extrabold text-2xl mt-2">Call Us 24/7</div>
                <div className="opacity-90 mt-1 text-base">{PHONE_DISPLAY}</div>
              </a>
            )}
            <a href={`mailto:${EMAIL}`} className="block bg-[#7678ED] text-white rounded-2xl p-7 hover:scale-[1.01] transition lift-card">
              <div className="text-4xl">📧</div>
              <div className="font-display font-extrabold text-2xl mt-2">Email Us</div>
              <div className="opacity-90 mt-1 text-base">{EMAIL}</div>
            </a>
            <div className="bg-[#F9F9FF] rounded-2xl p-6 border-2 border-[#eeeefb]">
              <div className="text-xl font-display font-bold text-[#3D348B]">⏰ Operating Hours</div>
              <div className="text-[#3D348B]/70 mt-1 text-base">24 hours a day, 7 days a week, 365 days a year.</div>
              <div className="text-base text-[#F35B04] font-bold mt-2">⚡ Average response time: under 5 minutes.</div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-[#3D348B] to-[#7678ED] rounded-2xl text-white flex items-center justify-center text-center p-6">
              <div>
                <div className="text-4xl">🇺🇸</div>
                <div className="font-display font-bold mt-2">Serving Students Nationwide</div>
                <div className="text-base opacity-90">Georgia • Texas • Florida • NC • Maryland • Alabama • Mississippi • Louisiana • +40 more</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function FullContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "handoff">("idle");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    exam: "",
    deadline: "",
    message: "",
    company: "", // honeypot
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const result = await submitLead({
      name: data.name,
      contact: data.email || data.phone,
      email: data.email,
      phone: data.phone,
      exam: data.exam,
      deadline: data.deadline,
      message: data.message,
      source: "contact-page",
      company: data.company,
    });
    trackLead();
    setState(result.ok && result.mode === "endpoint" ? "sent" : "handoff");
  }

  if (state === "sent" || state === "handoff") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-[#F35B04] mx-auto flex items-center justify-center text-white text-3xl">✓</div>
        <h3 className="font-display font-bold text-[#3D348B] text-2xl mt-4">
          {state === "sent" ? "Got It!" : "Almost Done — Press Send"}
        </h3>
        <p className="text-[#3D348B]/70 mt-2 text-base">
          {state === "sent"
            ? "An expert will reach out in under 5 minutes."
            : "We've opened a message with your details. Just hit send and we'll reply within 5 minutes."}
        </p>
        <a href={chatUrl()} target="_blank" rel="noopener noreferrer" className="btn-cta mt-5 h-[54px] px-7">
          💬 Message Us Now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="cf-name" className="sr-only">Full name</label>
          <input id="cf-name" required className="field" placeholder="Full Name"
            value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>
        <div>
          <label htmlFor="cf-email" className="sr-only">Email address</label>
          <input id="cf-email" required className="field" placeholder="Email Address" type="email"
            value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="cf-phone" className="sr-only">WhatsApp or phone number</label>
          <input id="cf-phone" required className="field" placeholder="WhatsApp / Phone #"
            value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        </div>
        <div>
          <label htmlFor="cf-exam" className="sr-only">Select service</label>
          <select id="cf-exam" required className="field" value={data.exam}
            onChange={(e) => setData({ ...data, exam: e.target.value })}>
            <option value="" disabled>Select Service</option>
            {examOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-deadline" className="sr-only">Deadline</label>
        <input id="cf-deadline" className="field" placeholder="Deadline (optional)"
          value={data.deadline} onChange={(e) => setData({ ...data, deadline: e.target.value })} />
      </div>
      <div>
        <label htmlFor="cf-message" className="sr-only">Tell us about your exam or course</label>
        <textarea id="cf-message" required className="field"
          placeholder="Tell us about your exam, course or deadline..."
          value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} />
      </div>

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="hidden" value={data.company}
        onChange={(e) => setData({ ...data, company: e.target.value })} />

      <button type="submit" disabled={state === "sending"}
        className="btn-cta w-full h-[58px] text-base disabled:opacity-70 disabled:cursor-wait">
        {state === "sending" ? "SENDING…" : "SEND MESSAGE — GET QUOTE IN 5 MIN →"}
      </button>
      <p className="text-sm text-center text-[#7678ED]">🔒 100% private • SSL secured • No spam, ever.</p>
    </form>
  );
}


/* ==================== SERVICES INDEX ==================== */
export function ServicesIndexPage() {
  return (
    <>
      <PageHero
        title="Expert Help For Every Exam & Course"
        subtitle="High school to PhD. Pick your exam or course below and we'll match you with a specialist who has already passed it."
      />
      <section className="section-pad bg-white reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}
                className="lift-card bg-white text-[#1f1f2e] rounded-2xl overflow-hidden relative border-2 border-[#eeeefb]">
                <div className="bg-[#3D348B] h-2 w-full" />
                {s.popular && (
                  <div className="absolute top-4 right-4 bg-[#F7B801] text-[#2A2565] text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                    ⭐ MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <div className="text-4xl text-[#F7B801]">{s.emoji}</div>
                  <h2 className="font-display font-bold text-[#3D348B] text-xl mt-3">{s.title}</h2>
                  <p className="text-[#3D348B]/70 text-base mt-2 leading-relaxed">{s.short}</p>
                  <span className="mt-4 inline-flex items-center text-[#F35B04] font-bold text-base">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 bg-[#F9F9FF] border-2 border-[#eeeefb] rounded-2xl p-8 text-center">
            <h2 className="font-display font-extrabold text-[#3D348B] text-2xl">Don't See Your Exam Or Course?</h2>
            <p className="text-[#3D348B]/70 mt-2 text-base max-w-2xl mx-auto">
              We cover far more than what's listed here — including Canvas, Blackboard, Moodle, D2L Brightspace,
              Pearson MyLab, McGraw-Hill Connect, ALEKS, Cengage MindTap and WileyPlus.
            </p>
            <Link to="/contact" className="btn-cta mt-6 h-[58px] px-7 text-base">
              Ask About Your Exam →
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ==================== TESTIMONIALS PAGE ==================== */
export function TestimonialsPage() {
  return (
    <>
      <PageHero title="Real Students. Real Results. Real Stories." subtitle="Read what students across America are saying about HelpMyCourseNow." />
      <section className="section-pad bg-white reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="text-[#F7B801] text-2xl">⭐⭐⭐⭐⭐</div>
            <p className="text-[#3D348B]/70 mt-2 text-base">Based on 10,000+ student interactions • 4.9/5 average rating</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border-2 border-[#eeeefb] rounded-2xl p-6 lift-card">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-extrabold text-lg" style={{ background: t.color }}>{t.initial}</div>
                  <div>
                    <div className="font-display font-bold text-[#3D348B]">{t.name}</div>
                    <div className="text-sm text-[#7678ED]">{t.location} • {t.course}</div>
                  </div>
                </div>
                <div className="text-[#F7B801] mt-3">⭐⭐⭐⭐⭐</div>
                <p className="text-[#3D348B]/80 mt-3 leading-relaxed text-base">"{t.quote}"</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#F9F9FF] text-[#3D348B] border border-[#7678ED]/30 px-2.5 py-1 rounded-full">✓ VERIFIED U.S. STUDENT</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ==================== FAQ PAGE ==================== */
export function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you've ever wanted to know about HelpMyCourseNow — answered honestly." />
      <section className="section-pad bg-white reveal-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-3">
          {homeFaqs.map((f, i) => (
            <div key={i} className="border-2 border-[#eeeefb] rounded-xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-[#F9F9FF] transition-colors">
                <span className="font-display font-semibold text-[#3D348B] text-base">{f.q}</span>
                <span className={`text-[#F35B04] text-2xl shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`faq-answer ${open === i ? "open" : ""}`}>
                <p className="text-[#3D348B]/70 leading-relaxed text-base">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ==================== BLOG INDEX ==================== */
export function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const matches = (p: (typeof blogPosts)[number]) => {
    const q = query.trim().toLowerCase();
    const inQuery =
      q === "" ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    const inCategory = category === null || p.category === category;
    return inQuery && inCategory;
  };

  const filtered = blogPosts.filter(matches);
  const isFiltering = query.trim() !== "" || category !== null;
  const featured = filtered[0];
  const rest = filtered.slice(1);
  return (
    <>
      <PageHero title="Expert Tips • Student Success • Exam Guides" subtitle="Free resources to help you pass your next exam, finish your course, and earn the credentials you deserve." />
      <section className="bg-white py-14 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {filtered.length === 0 && (
              <div className="bg-[#F9F9FF] border-2 border-[#eeeefb] rounded-2xl p-10 text-center">
                <div className="text-4xl">🔍</div>
                <h3 className="font-display font-bold text-[#3D348B] text-xl mt-3">No articles found</h3>
                <p className="text-[#3D348B]/70 mt-2 text-base">
                  Nothing matches "{query}"{category ? ` in ${category}` : ""}. Try a different search.
                </p>
                <button
                  onClick={() => { setQuery(""); setCategory(null); }}
                  className="btn-cta mt-5 h-[54px] px-6"
                >
                  Clear filters
                </button>
              </div>
            )}

            {featured && (
            <Link to={`/blog/${featured.slug}`} className="block w-full text-left bg-gradient-to-br from-[#3D348B] to-[#7678ED] text-white rounded-2xl overflow-hidden lift-card">
              <div className="p-8">
                {!isFiltering && (
                  <span className="inline-block bg-[#F7B801] text-[#2A2565] text-xs font-extrabold px-3 py-1 rounded-full">FEATURED</span>
                )}
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl mt-4">{featured.title}</h2>
                <p className="opacity-90 mt-3 text-base">{featured.excerpt}</p>
                <div className="mt-4 text-base opacity-90">{featured.date} • {featured.readTime}</div>
              </div>
            </Link>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              {rest.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="text-left bg-white border-2 border-[#eeeefb] rounded-2xl p-5 lift-card">
                  <span className="text-xs font-bold text-[#F35B04] uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display font-bold text-[#3D348B] text-lg mt-2 line-clamp-2">{p.title}</h3>
                  <p className="text-base text-[#3D348B]/70 mt-2 line-clamp-3">{p.excerpt}</p>
                  <div className="text-sm text-[#7678ED] mt-3">{p.date} • {p.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
          <aside className="space-y-5">
            <div className="bg-white border-2 border-[#eeeefb] rounded-xl p-4">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <input
                id="blog-search"
                type="search"
                className="field"
                placeholder="🔍 Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <LeadForm variant="compact" title="Get Free Expert Help" buttonLabel="GET HELP NOW →" />
            <div className="bg-white border-2 border-[#eeeefb] rounded-xl p-5">
              <h4 className="font-display font-bold text-[#3D348B] mb-3">Categories</h4>
              <ul className="space-y-2 text-base">
                <li>
                  <button
                    onClick={() => setCategory(null)}
                    className={`text-left transition-colors ${category === null ? "text-[#F35B04] font-semibold" : "text-[#3D348B]/70 hover:text-[#F35B04]"}`}
                  >
                    All articles
                  </button>
                </li>
                {blogCategories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setCategory(category === c ? null : c)}
                      className={`text-left transition-colors ${category === c ? "text-[#F35B04] font-semibold" : "text-[#3D348B]/70 hover:text-[#F35B04]"}`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#3D348B] text-white rounded-xl p-5 text-center">
              <div className="text-3xl">🛡️</div>
              <div className="font-display font-bold mt-2">100% Private</div>
              <div className="text-base opacity-90 mt-1">SSL secured. Money-back guarantee. ⭐ 4.9/5 rating.</div>
            </div>
          </aside>
        </div>
      </section>
      <CTASection />
    </>
  );
}

/* ==================== BLOG POST ==================== */
export function BlogPostPage({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <section className="section-pad bg-white max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-display font-extrabold text-3xl text-[#3D348B]">Post Not Found</h1>
        <Link to="/blog" className="btn-cta mt-6 h-[54px] px-6">← Back To Blog</Link>
      </section>
    );
  }
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <PageHero title={post.title} subtitle={post.excerpt} />
      <section className="bg-white py-14 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <div className="text-base text-[#7678ED] mb-2">
              <Link to="/blog" className="text-[#F35B04] font-semibold">← Blog</Link> • {post.category} • {post.readTime}
            </div>
            <div className="max-w-none">
              {post.body.map((b, i) => (
                <div key={i}>
                  {b.heading && <h2 className="font-display font-extrabold text-[#3D348B] text-2xl mt-8">{b.heading}</h2>}
                  {b.paragraph && <p className="text-[#3D348B]/70 mt-3 leading-relaxed text-base">{b.paragraph}</p>}
                  {b.list && (
                    <ul className="mt-3 space-y-2">
                      {b.list.map((l, j) => <li key={j} className="flex gap-3 text-[#3D348B]/70 text-base"><span className="text-[#F35B04]">•</span> {l}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gradient-to-br from-[#3D348B] to-[#7678ED] rounded-2xl p-8 text-white text-center">
              <h3 className="font-display font-extrabold text-2xl">Need Expert Help?</h3>
              <p className="opacity-90 mt-2 text-base">Stop researching — start passing. Our experts are 5 minutes away.</p>
              <Link to="/contact" className="btn-cta mt-5 h-[58px] px-7">Message Us Now →</Link>
            </div>
            <div className="mt-12">
              <h3 className="font-display font-bold text-[#3D348B] text-xl">Related Articles</h3>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="text-left bg-white border-2 border-[#eeeefb] rounded-xl p-4 lift-card">
                    <div className="text-xs font-bold text-[#F35B04] uppercase">{r.category}</div>
                    <div className="font-display font-bold text-[#3D348B] mt-1 text-base line-clamp-3">{r.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </article>
          <aside className="lg:sticky lg:top-[140px] h-max space-y-5">
            <LeadForm variant="compact" title="Get Free Expert Help" buttonLabel="GET HELP NOW →" />
            <div className="bg-[#F9F9FF] border-2 border-[#eeeefb] rounded-xl p-5">
              <div className="text-[#F7B801] text-xl">⭐⭐⭐⭐⭐</div>
              <p className="text-base text-[#3D348B]/70 italic mt-2">"They handled my entire WGU term while I focused on my family."</p>
              <p className="text-sm text-[#7678ED] mt-2">— Marcus J., Houston TX</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ==================== LEGAL ==================== */
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const isPrivacy = kind === "privacy";
  return (
    <>
      <PageHero title={isPrivacy ? "Privacy Policy" : "Terms & Conditions"} subtitle={isPrivacy ? "Your privacy is the foundation of our service. Here's exactly how we protect it." : "The rules of the road for using HelpMyCourseNow."} />
      <section className="section-pad bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          {(isPrivacy ? privacySections : termsSections).map((s) => (
            <div key={s.t}>
              <h2 className="font-display font-extrabold text-[#3D348B] text-2xl">{s.t}</h2>
              <p className="text-[#3D348B]/70 mt-3 leading-relaxed text-base">{s.b}</p>
            </div>
          ))}
          <p className="text-base text-[#7678ED] mt-10">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
          <Link to="/contact" className="btn-cta h-[54px] px-7">Have Questions? Contact Us →</Link>
        </div>
      </section>
    </>
  );
}

const privacySections = [
  { t: "1. Information We Collect", b: "We collect the minimum information necessary to provide our service: your name, contact email or WhatsApp number, the exam or course you need help with, and your deadline. We never sell or share this information with third parties." },
  { t: "2. How We Use Your Information", b: "Your information is used solely to match you with the right expert and to communicate about your service. We do not use your data for advertising, profiling, or sale to third parties." },
  { t: "3. Data Security", b: "All communication is encrypted in transit (SSL/TLS). Payment information is processed via PCI-compliant providers. We do not store payment card data on our servers." },
  { t: "4. Confidentiality", b: "We have never compromised a student's privacy in our entire operating history. Our experts are bound by strict NDAs and our internal policies prohibit any disclosure of client identity or work product." },
  { t: "5. Cookies & Advertising", b: "We use essential cookies to run this site, and — only if you click \"Accept All Cookies\" — advertising and analytics cookies, including the Meta (Facebook) Pixel, which lets us measure and personalise advertising on Facebook and Instagram. No advertising or analytics cookies are set before you consent. You can decline via the cookie banner, or change your choice at any time by clearing this site's cookies in your browser." },
  { t: "6. Data Retention", b: "We retain your account data for as long as your account is active and for up to 90 days after final delivery. After that, all personally identifiable information is permanently deleted." },
  { t: "7. Your Rights", b: `You have the right to access, correct or delete your data at any time by emailing ${PRIVACY_EMAIL}.` },
  { t: "8. Contact", b: "Questions about this policy? Email privacy@helpmycoursenow.com or message us on WhatsApp." },
];

const termsSections = [
  { t: "1. Service Description", b: "HelpMyCourseNow provides private academic assistance, tutoring and exam preparation services to adult learners in the United States. All services are delivered by independent expert contractors." },
  { t: "2. Eligibility", b: "You must be 16 years or older to use our services. By using HelpMyCourseNow you confirm that you are using our service of your own free will and that any decisions about how to use the deliverables are your own personal responsibility." },
  { t: "3. Payments", b: "All quotes are individually negotiated. Payment is typically required after delivery for single-exam services and on a milestone basis for full-course services. We accept Zelle, Cash App, PayPal, debit/credit cards, and approved cryptocurrency." },
  { t: "4. Money-Back Guarantee", b: "If we fail to deliver the agreed grade or score on a guaranteed service, you are entitled to a full refund or a free retake handled by a senior expert. The guarantee covers the agreed-upon scope only." },
  { t: "5. Confidentiality", b: "Both parties agree to maintain strict confidentiality regarding the existence and details of any engagement. We will never disclose your identity to any third party." },
  { t: "6. Limitations of Liability", b: "HelpMyCourseNow's total liability for any claim arising from a service is limited to the amount you paid for that service." },
  { t: "7. Use Of Deliverables", b: "How you choose to use the work product, study materials, or exam guidance we provide is entirely your own decision and responsibility." },
  { t: "8. Modifications", b: "We may update these terms at any time. Continued use of our service after an update constitutes acceptance of the revised terms." },
];
