import { useEffect, useState, useCallback } from "react";
import Logo from "./Logo";
import Link from "./Link";
import { services } from "../data";
import CookieConsent from "./CookieConsent";
import { trackContact, trackInitiateCheckout, trackLead } from "../utils/pixel";
import { submitLead } from "../utils/lead";

import { ANNOUNCE_H, HEADER_H, HEADER_BORDER_H } from "../config";
import {
  FACEBOOK_URL as FB_LINK,
  INSTAGRAM_URL,
  EMAIL,
  PHONE_DISPLAY,
  phoneUrl,
  phoneOpensWhatsApp,
  COPYRIGHT_YEAR,
  chatUrl,
  hasWhatsApp,
  whatsappUrl,
} from "../config";

type Props = {
  children: React.ReactNode;
  navigate: (path: string) => void;
  current: string;
};

export default function Layout({ children, navigate, current }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [notif, setNotif] = useState<{ name: string; state: string; exam: string } | null>(null);
  const [exitFormData, setExitFormData] = useState({ name: "", contact: "" });
  const [exitSubmitted, setExitSubmitted] = useState(false);
  const [exitSending, setExitSending] = useState(false);
  const [exitHandoff, setExitHandoff] = useState(false);

  /* ---- Scroll detection ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Exit-intent (once per session via sessionStorage) ---- */
  useEffect(() => {
    if (sessionStorage.getItem("hmcn_exit")) return;
    function handler(e: MouseEvent) {
      if (e.clientY <= 0 && window.innerWidth > 768) {
        setExitOpen(true);
        sessionStorage.setItem("hmcn_exit", "1");
      }
    }
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  /* ---- Live social proof notifications ---- */
  useEffect(() => {
    const names = ["Tasha", "Marcus", "Aisha", "Devon", "Jasmine", "Robert", "Brianna", "Tyrone", "Latoya", "Andre", "Kiana", "Maria", "Carlos", "Whitney", "Chase"];
    const states = ["Georgia", "Texas", "Florida", "North Carolina", "Maryland", "Alabama", "Mississippi", "Louisiana", "Virginia", "Ohio", "Illinois", "California"];
    const exams = ["GED Exam", "TEAS Exam", "WGU Course", "NCLEX-RN", "CompTIA Security+", "AWS Cert", "Proctored Exam", "HiSET", "PMP Exam", "Sophia Course"];
    function show() {
      setNotif({
        name: names[Math.floor(Math.random() * names.length)],
        state: states[Math.floor(Math.random() * states.length)],
        exam: exams[Math.floor(Math.random() * exams.length)],
      });
      setTimeout(() => setNotif(null), 4500);
    }
    const initial = setTimeout(show, 7000);
    const interval = setInterval(show, 22000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  /* ---- Section fade-in observer ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [current]); // re-observe on page change

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const onExitSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setExitSending(true);
    const result = await submitLead({
      name: exitFormData.name,
      contact: exitFormData.contact,
      source: "exit-intent",
    });
    trackLead();
    setExitHandoff(result.ok && result.mode === "handoff");
    setExitSending(false);
    setExitSubmitted(true);
  }, [exitFormData]);

  const scrollToForm = useCallback(() => {
    const el = document.getElementById("lead-form-main");
    if (el) { el.scrollIntoView({ behavior: "smooth" }); }
    else { navigate("/contact"); }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white text-[#1f1f2e]">

      {/* ============ STICKY ANNOUNCEMENT BAR ============ */}
      {/* Fixed height (not padding-based): the navbar below is sticky-positioned
          with a matching top offset, so this height and ANNOUNCE_H must stay in
          sync or the header visibly overlaps this bar. */}
      <div
        className="sticky top-0 z-50 bg-[#F35B04] text-white text-sm font-semibold overflow-hidden flex items-center"
        style={{ height: ANNOUNCE_H }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-center gap-4 text-center">
          {/* Desktop */}
          <span className="hidden sm:inline leading-snug">
            🔥 LIMITED EXPERT SLOTS AVAILABLE THIS WEEK — Get Expert Help Now &amp; Save Big!
          </span>
          <button
            onClick={scrollToForm}
            className="hidden sm:inline-flex bg-white text-[#F35B04] font-extrabold rounded-full px-4 py-1.5 text-xs hover:bg-[#F7B801] hover:text-[#3D348B] transition-colors"
          >
            CLAIM YOUR SPOT →
          </button>
          {/* Mobile marquee */}
          <div className="sm:hidden w-full overflow-hidden">
            <div className="announce-marquee inline-flex whitespace-nowrap">
              <span className="px-2">🔥 LIMITED EXPERT SLOTS THIS WEEK — Get Help Now &amp; Save Big! →&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className="px-2">🔥 LIMITED EXPERT SLOTS THIS WEEK — Get Help Now &amp; Save Big! →&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============ NAVBAR ============ */}
      <header className="sticky z-40 bg-[#3D348B] text-white shadow-lg" style={{ top: ANNOUNCE_H }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4" style={{ height: HEADER_H }}>
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center shrink-0" aria-label="HelpMyCourseNow home">
            <Logo size={42} light />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[15px] font-semibold">
            {navLinks.slice(0, 1).map((l) => (
              <Link key={l.path} to={l.path} className={`hover:text-[#F7B801] transition-colors ${current === l.path ? "text-[#F7B801]" : ""}`}>
                {l.label}
              </Link>
            ))}
            {/* Services dropdown — trigger is a real link to the services index,
                and also opens on hover, on focus, and on touch. */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onFocus={() => setServicesOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
              }}
            >
              <Link
                to="/services"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(false)}
                className={`hover:text-[#F7B801] flex items-center gap-1 transition-colors ${current.startsWith("/services") ? "text-[#F7B801]" : ""}`}
              >
                Services <span className="text-xs" aria-hidden="true">▾</span>
              </Link>
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-3 w-[300px]">
                  <div className="bg-white rounded-xl shadow-2xl p-2 border border-[#eeeefb]">
                    {services.map((s) => (
                      <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setServicesOpen(false)}
                        className="w-full text-left flex items-start gap-3 p-3 rounded-lg hover:bg-[#F9F9FF] text-[#3D348B]">
                        <span className="text-xl">{s.emoji}</span>
                        <div>
                          <div className="font-semibold text-sm">{s.title}</div>
                          <div className="text-xs text-[#7678ED] line-clamp-1">{s.short}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {navLinks.slice(1).map((l) => (
              <Link key={l.path} to={l.path} className={`hover:text-[#F7B801] transition-colors ${current === l.path ? "text-[#F7B801]" : ""}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            {PHONE_DISPLAY && (
              <a
                href={phoneUrl()}
                target={phoneOpensWhatsApp() ? "_blank" : undefined}
                rel={phoneOpensWhatsApp() ? "noopener noreferrer" : undefined}
                onClick={() => trackContact()}
                aria-label={phoneOpensWhatsApp() ? `Chat with us on WhatsApp at ${PHONE_DISPLAY}` : `Call us at ${PHONE_DISPLAY}`}
                className="btn-secondary h-[48px] px-4 text-sm"
              >
                {phoneOpensWhatsApp() ? "💬 WhatsApp" : "📞 Call Us"}
              </a>
            )}
            <Link to="/contact" onClick={() => trackInitiateCheckout()} className="btn-cta h-[48px] px-5 text-sm">
              Get Help Now →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden text-white text-2xl" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
        {/* Gold separator */}
        <div className="h-[3px] w-full bg-[#F7B801]" />

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#2A2565] border-t border-[#5750a8] px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {PHONE_DISPLAY && (
              <a
                href={phoneUrl()}
                target={phoneOpensWhatsApp() ? "_blank" : undefined}
                rel={phoneOpensWhatsApp() ? "noopener noreferrer" : undefined}
                onClick={() => { trackContact(); setMobileOpen(false); }}
                className="btn-secondary w-full h-[54px] justify-center text-base mb-3"
              >
                {phoneOpensWhatsApp() ? "💬 WhatsApp Us" : "📞 Call Us Now"}
              </a>
            )}
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="btn-cta w-full h-[54px] justify-center text-base mb-4">Get Help Now →</Link>
            {navLinks.map((l) => (
              <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)}
                className="block w-full text-left text-white py-3 px-3 rounded-lg hover:bg-[#3D348B] text-base">{l.label}</Link>
            ))}
            <div className="text-[#F7B801] uppercase text-xs font-bold pt-3 px-3">Services</div>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setMobileOpen(false)}
                className="block w-full text-left text-white py-3 px-3 rounded-lg hover:bg-[#3D348B] text-base">{s.emoji} {s.title}</Link>
            ))}
          </div>
        )}
      </header>

      {/* ============ STICKY DESKTOP CTA BAR (after scroll) ============ */}
      {scrolled && (
        <div className="hidden md:block sticky z-30 bg-[#F35B04] text-white shadow" style={{ top: ANNOUNCE_H + HEADER_H + HEADER_BORDER_H }}>
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-3 text-sm">
            <span>⏰ <strong>Expert slots filling fast</strong> — students are getting matched right now.</span>
            <button onClick={scrollToForm} className="bg-white text-[#F35B04] font-extrabold rounded-md px-4 py-1.5 text-xs hover:bg-[#F7B801] hover:text-[#3D348B] transition-colors">
              GET FREE QUOTE →
            </button>
          </div>
        </div>
      )}

      {/* ============ MAIN CONTENT ============ */}
      <main>{children}</main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#3D348B] text-white relative">
        <div className="h-[3px] w-full bg-[#F7B801]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Logo size={48} light />
            <p className="text-base text-[#cfd0ff] mt-4 leading-relaxed">
              Expert Help. Real Results. Your Success. Trusted by 10,000+ students across the United States.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={FB_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F7B801] hover:text-[#3D348B] flex items-center justify-center transition-colors" aria-label="Facebook">f</a>
              {INSTAGRAM_URL && (
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F7B801] hover:text-[#3D348B] flex items-center justify-center transition-colors" aria-label="Instagram">📷</a>
              )}
              <a href={chatUrl()} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F7B801] hover:text-[#3D348B] flex items-center justify-center transition-colors" aria-label={hasWhatsApp() ? "WhatsApp" : "Message us"}>{hasWhatsApp() ? "💬" : "✉️"}</a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-[#F7B801] mb-4 text-sm tracking-wider">SERVICES</h4>
            <ul className="space-y-2 text-base text-[#cfd0ff]">
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-white transition-colors">{s.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-[#F7B801] mb-4 text-sm tracking-wider">COMPANY</h4>
            <ul className="space-y-2 text-base text-[#cfd0ff]">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-[#F7B801] mb-4 text-sm tracking-wider">CONTACT</h4>
            <ul className="space-y-3 text-base text-[#cfd0ff]">
              <li>📧 <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a></li>
              {PHONE_DISPLAY && (
                <li>
                  {phoneOpensWhatsApp() ? "💬" : "📞"}{" "}
                  <a
                    href={phoneUrl()}
                    target={phoneOpensWhatsApp() ? "_blank" : undefined}
                    rel={phoneOpensWhatsApp() ? "noopener noreferrer" : undefined}
                    onClick={() => trackContact()}
                    className="hover:text-white transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
              )}
              <li>💬 <a href={chatUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Message Us 24/7</a></li>
              <li>🌐 www.helpmycoursenow.com</li>
            </ul>
            <Link to="/contact" className="btn-cta mt-5 w-full h-[54px] text-sm">
              Get Help Now →
            </Link>
          </div>
        </div>
        <div className="bg-[#2A2565] text-[#bdbeed] text-base">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div>© {COPYRIGHT_YEAR} HelpMyCourseNow. All Rights Reserved.</div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ============ MOBILE STICKY BOTTOM BAR (2 buttons: WhatsApp + GET HELP) ============ */}
      {scrolled && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9998] mobile-bar-in bg-[#3D348B] shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-2 gap-1.5 p-2">
            <a
              href={whatsappUrl("Hi! I need help with my exam or course.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact()}
              className="h-[54px] rounded-lg bg-[#25D366] text-white font-bold flex items-center justify-center text-base gap-2"
            >
              {hasWhatsApp() ? "💬 WhatsApp" : "💬 Message Us"}
            </a>
            <button onClick={() => { trackInitiateCheckout(); scrollToForm(); }}
              className="h-[54px] rounded-lg bg-[#F35B04] text-white font-bold flex items-center justify-center text-base">
              GET HELP NOW
            </button>
          </div>
        </div>
      )}

      {/* ============ FLOATING WHATSAPP BUTTON ============ */}
      <a
        href={whatsappUrl("Hi! I need help with my exam or course.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContact()}
        className={`${hasWhatsApp() ? "wa-tooltip" : "chat-tooltip"} fixed bottom-28 md:bottom-8 right-5 z-[9999] w-[62px] h-[62px] rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl wa-pulse`}
        aria-label={hasWhatsApp() ? "Chat with us on WhatsApp" : "Message us on Facebook"}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.003 2.667A13.207 13.207 0 0 0 2.82 15.852a13.1 13.1 0 0 0 1.8 6.635L2.667 29.333l7.06-1.895A13.233 13.233 0 0 0 29.333 15.88 13.238 13.238 0 0 0 16.003 2.667Zm7.68 18.573c-.32.9-1.587 1.647-2.58 1.867-.68.147-1.567.267-4.553-0.98-3.82-1.593-6.28-5.473-6.47-5.727-.187-.253-1.527-2.033-1.527-3.88s.967-2.753 1.307-3.127c.34-.373.74-.467.987-.467.247 0 .493 0 .713.013.227.013.533-.087.833.633.307.74 1.047 2.553 1.14 2.74.093.187.153.407.027.653-.127.253-.187.407-.373.627-.187.22-.393.487-.56.653-.187.187-.38.393-.167.773.213.373.953 1.573 2.047 2.547 1.4 1.253 2.58 1.64 2.947 1.827.367.187.58.153.793-.093.22-.247.927-1.08 1.173-1.453.247-.373.493-.313.833-.187.34.127 2.153 1.013 2.52 1.2.367.187.613.273.707.427.093.153.093.9-.227 1.8Z" fill="white"/>
        </svg>
      </a>

      {/* ============ LIVE NOTIFICATION (bottom-left) ============ */}
      {notif && (
        <div className="hidden sm:block fixed bottom-8 left-5 z-40 max-w-[320px] slide-in-up">
          <div className="bg-white rounded-xl shadow-2xl border border-[#eeeefb] p-4 flex gap-3 items-start">
            <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
            <div className="text-sm">
              <div className="font-bold text-[#3D348B]">{notif.name} from {notif.state}</div>
              <div className="text-[#3D348B]/70">just got matched with an expert for their <strong className="text-[#F35B04]">{notif.exam}</strong></div>
              <div className="text-[11px] text-[#7678ED] mt-1">a few seconds ago</div>
            </div>
          </div>
        </div>
      )}

      {/* ============ EXIT-INTENT POPUP ============ */}
      {exitOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/70 flex items-center justify-center p-4" onClick={() => setExitOpen(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setExitOpen(false)} className="absolute top-3 right-4 text-2xl text-[#7678ED] hover:text-[#3D348B] transition-colors">×</button>
            {exitSubmitted ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#F35B04] mx-auto flex items-center justify-center text-white text-3xl">✓</div>
                <h3 className="font-display font-extrabold text-[#3D348B] text-2xl mt-4">We Got You!</h3>
                <p className="text-[#3D348B]/70 mt-2 text-base">
                  {exitHandoff
                    ? "We've opened a message with your details — just hit send and an expert will reply in under 5 minutes."
                    : "An expert will reach out in under 5 minutes."}
                </p>
                <button onClick={() => setExitOpen(false)} className="btn-cta mt-5 w-full h-[54px] text-base">Close</button>
              </div>
            ) : (
              <>
                <div className="text-5xl mb-3 text-center">⏰</div>
                <h3 className="font-display font-extrabold text-[#3D348B] text-2xl text-center leading-tight">
                  Wait! Don't Let Your Deadline Pass You By.
                </h3>
                <p className="text-center text-[#3D348B]/70 mt-3 text-base">
                  Get a <strong>FREE</strong> expert quote before you go — takes less than 60 seconds.
                </p>
                <form className="mt-5 space-y-3" onSubmit={onExitSubmit}>
                  <label htmlFor="exit-name" className="sr-only">Your name</label>
                  <input
                    id="exit-name"
                    required
                    className="field"
                    placeholder="Your Name"
                    value={exitFormData.name}
                    onChange={(e) => setExitFormData({ ...exitFormData, name: e.target.value })}
                  />
                  <label htmlFor="exit-contact" className="sr-only">Email or WhatsApp number</label>
                  <input
                    id="exit-contact"
                    required
                    className="field"
                    placeholder="Email or WhatsApp #"
                    value={exitFormData.contact}
                    onChange={(e) => setExitFormData({ ...exitFormData, contact: e.target.value })}
                  />
                  <button type="submit" disabled={exitSending}
                    className="btn-cta w-full h-[58px] text-base disabled:opacity-70 disabled:cursor-wait">
                    {exitSending ? "SENDING…" : "GET MY FREE QUOTE →"}
                  </button>
                </form>
                <button onClick={() => setExitOpen(false)} className="block mx-auto mt-3 text-xs text-[#7678ED]/60 hover:text-[#3D348B] underline transition-colors">
                  No thanks, I'll handle it myself
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom spacer for mobile sticky bar */}
      <div className="md:hidden h-[74px]" />

      {/* Cookie Consent Banner */}
      <CookieConsent onPrivacy={() => navigate("/privacy")} />
    </div>
  );
}

/* ============ CTA SECTION (shared) ============ */
export function CTASection() {
  return (
    <section className="bg-[#F35B04] text-white reveal-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight">
          Don't Let This Exam Define Your Future.
        </h2>
        <p className="mt-4 text-lg sm:text-xl opacity-95 max-w-2xl mx-auto">
          Our experts are standing by RIGHT NOW — ready to help you pass.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <a
            href={whatsappUrl("Hi! I need help with my exam or course.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact()}
            className="bg-white text-[#F35B04] font-extrabold rounded-xl h-[58px] px-7 inline-flex items-center justify-center hover:bg-[#F7B801] hover:text-[#3D348B] transition-colors"
          >
            💬 CHAT ON WHATSAPP
          </a>
          <Link to="/contact" onClick={() => trackInitiateCheckout()}
            className="border-2 border-white text-white font-extrabold rounded-xl h-[58px] px-7 inline-flex items-center justify-center hover:bg-white/10 transition-colors">
            🌐 GET STARTED ONLINE
          </Link>
        </div>
        <div className="mt-6 text-base opacity-90">
          ⏰ Average response time: Under 5 minutes • Available 24/7
        </div>
      </div>
    </section>
  );
}

/* ============ PAGE HERO (shared) ============ */
export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-gradient-to-br from-[#3D348B] to-[#7678ED] text-white relative overflow-hidden">
      <div className="bg-pattern absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 relative">
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl max-w-3xl">{title}</h1>
        <p className="mt-4 text-lg opacity-95 max-w-2xl">{subtitle}</p>
        <Link to="/contact" className="btn-cta mt-7 h-[58px] px-7 text-base">
          GET EXPERT HELP NOW →
        </Link>
      </div>
      <svg viewBox="0 0 1440 80" className="hero-wave" preserveAspectRatio="none">
        <path d="M0,40 C360,90 1080,0 1440,50 L1440,80 L0,80 Z" fill="white" />
      </svg>
    </section>
  );
}
