import { useState } from "react";
import { CTASection, PageHero } from "./Layout";
import LeadForm from "./LeadForm";
import { homeFaqs, testimonials, blogPosts, blogCategories, examOptions } from "../data";
import { trackLead, trackContact } from "../utils/pixel";

const FB_LINK = "https://www.facebook.com/profile.php?id=61589640929259";
type Nav = { navigate: (p: string) => void };

/* ==================== HOW IT WORKS ==================== */
export function HowItWorksPage({ navigate }: Nav) {
  const steps = [
    { n: 1, e: "🖊️", t: "Tell Us What You Need", b: "Fill our 60-second form, message us on WhatsApp, or call. Tell us your exam, course, deadline and what kind of help you need." },
    { n: 2, e: "🤝", t: "We Match You With An Expert", b: "Our team reviews your request and matches you with a vetted expert who specializes in your exact platform — usually within 5–30 minutes." },
    { n: 3, e: "💬", t: "Confirm Your Plan & Quote", b: "You'll get a custom quote — no hidden fees. Once you approve, you'll be connected directly with your expert via secure messaging." },
    { n: 4, e: "🔒", t: "Expert Handles Everything", b: "Your expert works on your exam or course using secure remote-access methods. Your camera looks natural, your IP is protected, your privacy is preserved." },
    { n: 5, e: "🏆", t: "You Get Results — Guaranteed", b: "You receive your passing grade. If we don't deliver, you get a full refund or a free retake. Period." },
  ];
  return (
    <>
      <PageHero title="How HelpMyCourseNow Works" subtitle="From your first message to your passing grade — here's the full process, end-to-end." navigate={navigate} />
      <section className="section-pad bg-white reveal-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#3D348B] to-[#7678ED] flex items-center justify-center text-white relative overflow-hidden">
            <div className="bg-pattern absolute inset-0" />
            <div className="text-center relative">
              <div className="text-6xl">▶</div>
              <p className="font-display font-bold text-xl mt-3">Watch: How It Works (90 sec)</p>
              <p className="text-base opacity-90">Coming soon</p>
            </div>
          </div>

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
      <CTASection navigate={navigate} />
    </>
  );
}

/* ==================== ABOUT ==================== */
export function AboutPage({ navigate }: Nav) {
  return (
    <>
      <PageHero title="About HelpMyCourseNow" subtitle="We help adult learners across America get the diplomas, degrees and certifications they deserve — without burning out." navigate={navigate} />
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
      <CTASection navigate={navigate} />
    </>
  );
}

/* ==================== CONTACT ==================== */
export function ContactPage({ navigate }: Nav) {
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
            <a href={FB_LINK} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()} className="block bg-[#25D366] text-white rounded-2xl p-7 hover:scale-[1.01] transition lift-card">
              <div className="text-4xl">💬</div>
              <div className="font-display font-extrabold text-2xl mt-2">Message Us On WhatsApp</div>
              <div className="opacity-90 mt-1 text-base">Fastest way to get matched with an expert.</div>
            </a>
            <a href="tel:+10000000000" className="block bg-[#3D348B] text-white rounded-2xl p-7 hover:scale-[1.01] transition lift-card">
              <div className="text-4xl">📞</div>
              <div className="font-display font-extrabold text-2xl mt-2">Call Us 24/7</div>
              <div className="opacity-90 mt-1 text-base">+1 (000) 000-0000</div>
            </a>
            <a href="mailto:hello@helpmycoursenow.com" className="block bg-[#7678ED] text-white rounded-2xl p-7 hover:scale-[1.01] transition lift-card">
              <div className="text-4xl">📧</div>
              <div className="font-display font-extrabold text-2xl mt-2">Email Us</div>
              <div className="opacity-90 mt-1 text-base">hello@helpmycoursenow.com</div>
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
      <CTASection navigate={navigate} />
    </>
  );
}

function FullContactForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-[#F35B04] mx-auto flex items-center justify-center text-white text-3xl">✓</div>
        <h3 className="font-display font-bold text-[#3D348B] text-2xl mt-4">Got It!</h3>
        <p className="text-[#3D348B]/70 mt-2 text-base">An expert will reach out in under 5 minutes.</p>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); trackLead(); setSubmitted(true); }} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input required className="field" placeholder="Full Name" />
        <input required className="field" placeholder="Email Address" type="email" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input required className="field" placeholder="WhatsApp / Phone #" />
        <select required className="field" defaultValue="">
          <option value="" disabled>Select Service</option>
          {examOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <input className="field" placeholder="Deadline (optional)" />
      <textarea required className="field" placeholder="Tell us about your exam, course or deadline..." />
      <button className="btn-cta w-full h-[58px] text-base">SEND MESSAGE — GET QUOTE IN 5 MIN →</button>
      <p className="text-sm text-center text-[#7678ED]">🔒 100% private • SSL secured • No spam, ever.</p>
    </form>
  );
}

/* ==================== TESTIMONIALS PAGE ==================== */
export function TestimonialsPage({ navigate }: Nav) {
  return (
    <>
      <PageHero title="Real Students. Real Results. Real Stories." subtitle="Read what students across America are saying about HelpMyCourseNow." navigate={navigate} />
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
      <CTASection navigate={navigate} />
    </>
  );
}

/* ==================== FAQ PAGE ==================== */
export function FAQPage({ navigate }: Nav) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you've ever wanted to know about HelpMyCourseNow — answered honestly." navigate={navigate} />
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
      <CTASection navigate={navigate} />
    </>
  );
}

/* ==================== BLOG INDEX ==================== */
export function BlogPage({ navigate }: Nav) {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);
  return (
    <>
      <PageHero title="Expert Tips • Student Success • Exam Guides" subtitle="Free resources to help you pass your next exam, finish your course, and earn the credentials you deserve." />
      <section className="bg-white py-14 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <button onClick={() => navigate(`/blog/${featured.slug}`)} className="block w-full text-left bg-gradient-to-br from-[#3D348B] to-[#7678ED] text-white rounded-2xl overflow-hidden lift-card">
              <div className="p-8">
                <span className="inline-block bg-[#F7B801] text-[#2A2565] text-xs font-extrabold px-3 py-1 rounded-full">FEATURED</span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl mt-4">{featured.title}</h2>
                <p className="opacity-90 mt-3 text-base">{featured.excerpt}</p>
                <div className="mt-4 text-base opacity-90">{featured.date} • {featured.readTime}</div>
              </div>
            </button>
            <div className="grid sm:grid-cols-2 gap-5">
              {rest.map((p) => (
                <button key={p.slug} onClick={() => navigate(`/blog/${p.slug}`)} className="text-left bg-white border-2 border-[#eeeefb] rounded-2xl p-5 lift-card">
                  <span className="text-xs font-bold text-[#F35B04] uppercase tracking-wider">{p.category}</span>
                  <h3 className="font-display font-bold text-[#3D348B] text-lg mt-2 line-clamp-2">{p.title}</h3>
                  <p className="text-base text-[#3D348B]/70 mt-2 line-clamp-3">{p.excerpt}</p>
                  <div className="text-sm text-[#7678ED] mt-3">{p.date} • {p.readTime}</div>
                </button>
              ))}
            </div>
          </div>
          <aside className="space-y-5">
            <div className="bg-white border-2 border-[#eeeefb] rounded-xl p-4">
              <input className="field" placeholder="🔍 Search articles..." />
            </div>
            <LeadForm variant="compact" title="Get Free Expert Help" buttonLabel="GET HELP NOW →" />
            <div className="bg-white border-2 border-[#eeeefb] rounded-xl p-5">
              <h4 className="font-display font-bold text-[#3D348B] mb-3">Categories</h4>
              <ul className="space-y-2 text-base">
                {blogCategories.map((c) => <li key={c}><span className="text-[#3D348B]/70 hover:text-[#F35B04] cursor-pointer transition-colors">{c}</span></li>)}
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
      <CTASection navigate={navigate} />
    </>
  );
}

/* ==================== BLOG POST ==================== */
export function BlogPostPage({ slug, navigate }: { slug: string; navigate: (p: string) => void }) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <section className="section-pad bg-white max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-display font-extrabold text-3xl text-[#3D348B]">Post Not Found</h1>
        <button onClick={() => navigate("/blog")} className="btn-cta mt-6 h-[54px] px-6">← Back To Blog</button>
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
              <button onClick={() => navigate("/blog")} className="text-[#F35B04] font-semibold">← Blog</button> • {post.category} • {post.readTime}
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
              <button onClick={() => navigate("/contact")} className="btn-cta mt-5 h-[58px] px-7">Message Us Now →</button>
            </div>
            <div className="mt-12">
              <h3 className="font-display font-bold text-[#3D348B] text-xl">Related Articles</h3>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                {related.map((r) => (
                  <button key={r.slug} onClick={() => navigate(`/blog/${r.slug}`)} className="text-left bg-white border-2 border-[#eeeefb] rounded-xl p-4 lift-card">
                    <div className="text-xs font-bold text-[#F35B04] uppercase">{r.category}</div>
                    <div className="font-display font-bold text-[#3D348B] mt-1 text-base line-clamp-3">{r.title}</div>
                  </button>
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
export function LegalPage({ kind, navigate }: { kind: "privacy" | "terms"; navigate: (p: string) => void }) {
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
          <p className="text-base text-[#7678ED] mt-10">Last updated: January 2025</p>
          <button onClick={() => navigate("/contact")} className="btn-cta h-[54px] px-7">Have Questions? Contact Us →</button>
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
  { t: "5. Cookies", b: "We use only essential cookies for site functionality and anonymous analytics (Google Analytics). You can disable cookies in your browser at any time." },
  { t: "6. Data Retention", b: "We retain your account data for as long as your account is active and for up to 90 days after final delivery. After that, all personally identifiable information is permanently deleted." },
  { t: "7. Your Rights", b: "You have the right to access, correct or delete your data at any time by emailing privacy@helpmycoursenow.com." },
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
