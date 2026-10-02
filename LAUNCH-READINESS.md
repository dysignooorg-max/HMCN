# HMCN (HelpMyCourseNow) — Launch Readiness Audit

**Date:** 2 October 2026
**Verdict:** ❌ **Not ready to go live.** The production build was failing outright — the site could not be deployed at all. I've fixed the build so it now compiles and runs, but there are still several **must-fix items that only you can complete** (real phone number, lead delivery, consent, and some legal exposure).

---

## 1. What was blocking launch (now fixed)

These were hard failures. The site literally could not be built or deployed.

| # | Problem | Impact | Status |
|---|---------|--------|--------|
| 1 | **Project structure was broken.** All source files sat in the repo root, but every import expected `src/`, `src/components/` and `src/utils/`. | `npm run build` failed: `Failed to resolve /src/main.tsx`. Nothing could be deployed. | ✅ Fixed — files moved into the correct structure (history preserved via `git mv`) |
| 2 | **Invalid HTML broke the build.** `<noscript><img></noscript>` was placed inside `<head>`, which is not allowed. | Vite aborted with `parse5 error code disallowed-content-in-noscript-in-head`. | ✅ Fixed — moved into `<body>`, `alt` added |
| 3 | **The favicon didn't exist.** `index.html` referenced `/favicon.svg`, but there was no `public/` folder. | Broken tab icon / 404 on every page load. | ✅ Fixed — created `public/favicon.svg` from the brand logo |
| 4 | **TypeScript was silently checking nothing.** `tsconfig.json` had `"include": ["src", ...]`, but `src` didn't exist. | `tsc` exited 0 while the code had 30+ real type errors. A false sense of safety. | ✅ Fixed — type-checking now runs on the real files and **is part of `npm run build`** |
| 5 | **Vite blocked the preview/production host.** No `allowedHosts` configured. | Server returned `403 Blocked request` — the preview would not load behind a proxy or CDN. | ✅ Fixed in `vite.config.ts` |
| 6 | **No `.gitignore`.** | The moment anyone ran `npm install`, `node_modules/` (10k+ files) would be committed. | ✅ Fixed |

**Current state:** `npm run build` passes cleanly (type-check + bundle), and the site runs and renders.

---

## 2. Must fix before going live — these are business decisions, not code bugs

I deliberately did **not** invent values for these. They are wired to a single config file so you only have to fill them in one place: **`src/config.ts`**.

### 2.1 🔴 The lead forms don't send data anywhere
This is the most serious remaining problem. **Every form on the site is a dead end.**

- `LeadForm` ("Get My Free Quote"), the contact page form, and the exit-intent popup all do exactly one thing on submit: `setSubmitted(true)` and show a *"You're In! An expert will message you within 5 minutes"* success message.
- No `fetch`, no API call, no email, no CRM, no `mailto:`. **The data is discarded the moment the page is closed.**

I searched the entire codebase for any network call — there are none. So right now the site confidently promises a 5-minute reply to every visitor and then silently loses every single lead. This will also make your Meta ad spend look 100% wasted, because `trackLead()` fires on a conversion that never actually reaches you.

**Fix:** connect the forms to something real — a form backend (Formspree, Web3Forms, Basin), your own API endpoint, or a CRM/automation webhook (Zapier/Make). Also add a WhatsApp deep link that pre-fills the visitor's message as a fallback.

### 2.2 🔴 Placeholder phone number is live on the site
`+1 (000) 000-0000` is shown in the footer, on the contact page, and on every service page, and every "Call Us 24/7" button dials `tel:+10000000000`. It's also in the Schema.org markup (`"telephone": "+1-000-000-0000"`).

**Fix:** set `PHONE_E164` and `PHONE_DISPLAY` in `src/config.ts`. Until then, the call buttons now **hide themselves automatically** instead of dialling a dead number — but you're still advertising 24/7 phone support that doesn't exist.

### 2.3 🔴 "WhatsApp" buttons don't go to WhatsApp
14 places link to `FB_LINK`. Several are styled in bright WhatsApp green, labelled **"💬 WhatsApp"**, and the floating button's tooltip says **"Chat With Us Now"** — but they all open a **Facebook profile**. The FAQ, About and Contact pages all promise WhatsApp support. That's a misleading claim, and it's a poor experience for anyone who taps it expecting WhatsApp.

**Fix:** set `WHATSAPP_URL` in `src/config.ts` (e.g. `https://wa.me/15551234567`). If no WhatsApp number exists, the buttons now honestly relabel themselves to "Message Us" automatically rather than misrepresenting the destination.

### 2.4 🔴 Meta Pixel fired before consent — the cookie banner was decorative
`index.html` called `fbq('init', ...)` and `fbq('track','PageView')` **on page load**, before the visitor clicked anything. So visitor data was already sent to Facebook before consent — which defeats the entire purpose of the cookie banner and breaches GDPR/UK-GDPR/CCPA expectations.

There was also an internal contradiction: `pixel.ts` carried the comment *"Events ONLY fire when localStorage hmcn_consent === accepted"*, but the pixel in `index.html` ignored that logic entirely.

**Fixed:** the pixel is now injected **only after** the visitor clicks "Accept All Cookies", conversion events stay consent-gated, declining sends `fbq('consent','revoke')`, and returning visitors who already accepted get the pixel re-activated without seeing the banner again.

### 2.5 🟠 Your Privacy Policy contradicted your actual site
The policy stated: *"We use only essential cookies for site functionality and anonymous analytics (Google Analytics)."* In reality the site uses the **Meta Pixel for advertising** and the banner says it personalises ads on Facebook and Instagram. A privacy policy that misdescribes your tracking is a genuine regulatory problem.

**Fixed:** rewrote section 5 to disclose the Meta Pixel and state clearly that no advertising cookies are set before consent. **Please have this reviewed** — I'm an engineer, not your lawyer.

### 2.6 🟠 Fabricated ratings and reviews in structured data
The Schema.org block declared `"ratingValue": "4.9"` and `"reviewCount": "10243"`, and pointed at a `logo.png` that doesn't exist. Inventing review counts in structured data violates Google's policies and can get the site's rich results penalised or the domain flagged as spam.

**Fixed:** removed the fabricated `aggregateRating` and the broken image reference. Re-add only with real, verifiable reviews.

---

## 3. Legal & platform risk you should weigh before launch

I want to flag this plainly because it directly affects whether the site *stays* live:

**The service advertised is contract cheating.** The copy doesn't hedge — it states that experts use *"secure remote-access methods that bypass detection while keeping your camera natural"*, claims a *"99.6% non-detection rate"*, offers to *"take a Pearson VUE OnVUE proctored exam for you"*, and advertises a *"No Trace Policy — No evidence left of our assistance"*.

Concrete consequences beyond the ethics:

- **Meta ad account risk.** Meta's advertising policies prohibit promoting academic cheating services. Since you're running the Meta Pixel, you clearly intend to buy ads — this copy is a strong candidate for ad rejection or an account ban, and the pixel data won't save the account.
- **Payment processor risk.** Stripe, PayPal, Square and most mainstream processors prohibit academic-fraud transactions. Several payment methods advertised (Zelle, Cash App, crypto) are popular here precisely *because* mainstream processors refuse this business — which also means **chargeback protection is minimal and the "money-back guarantee" is hard to enforce.**
- **Fake social proof is a separate FTC problem.** "✓ VERIFIED U.S. STUDENT" badges, "4.9/5 based on 10,243 reviews", "10,000+ students helped", the leadership team names, and the **live "Tasha from Georgia just got matched" popups** (which are randomly generated in `Layout.tsx` every 22 seconds) are fabricated. Under FTC endorsement rules, fake testimonials and invented reviews are an enforcement priority.
- **Customer-side risk.** The Terms push responsibility onto the client and restrict liability to the amount paid — that won't protect against a determined university or state attorney general, and an 18-year-old signing a liability waiver isn't strong protection.
- **The stated "is it legal?" FAQ answer is evasive** ("we provide expert tutoring… how clients use our services is their own responsibility") while other pages openly describe bypassing proctoring. That contradiction is discoverable and could be used against you.

**My recommendation:** if you want this to be a durable business, reposition to *legitimate* services the site already half-describes — tutoring, exam prep, study coaching, practice tests, writing feedback. You get to keep the brand, the design, the SEO targets, the lead funnel and the paying customer base (stressed adult learners are a real, underserved market) **and** you get mainstream ad accounts, mainstream payments, and no liability. If you keep the current claims, budget for recurring account bans and expect the domain to eventually be delisted.

**Fabricated content to remove or replace regardless:** the random "just got matched" notifications, the "VERIFIED U.S. STUDENT" badges, the "10,000+ students / 500+ experts / 7 years operating / 48 states / 99.6% pass rate" numbers, the invented leadership team, and the six testimonials.

---

## 4. Should fix before launch

- **Stale content — dated 2025, today is October 2026.** All 10 blog posts are dated Jan–Feb 2025, and titles say *"How to Pass Your GED Exam in 2025"* / *"CompTIA A+ Exam Guide 2025"*. Also `© 2025` in the footer (now dynamic). Stale dates are a visible credibility hit; a blog that stopped 20 months ago undercuts the "expert resources" claim.
- **"Watch: How It Works (90 sec) — Coming soon"** on the How It Works page. An unfinished placeholder on a live marketing page. Either ship the video or remove the block.
- **No `og:image`.** `twitter:card` is set to `summary_large_image` with no image, so every share on Facebook/WhatsApp/iMessage renders as a blank grey card. For a business that markets through Facebook, this matters. Add a 1200×630 image.
- **Hash routing hurts SEO.** URLs are `/#/about`, `/#/blog/...`. Search engines treat the whole site as one URL, so only the homepage can rank — yet the site targets many high-intent keywords (GED, TEAS, NCLEX, CompTIA…). Switching to real paths with a server rewrite is the single highest-leverage SEO improvement available. I've noted this in `public/sitemap.xml`.
- **Unverifiable claims:** "Trusted By 10,000+ Students", "500+ Expert Team", "48 States Served", "7 Years Operating". Keep only what you can evidence.
- **Contact/blog/legal pages have no hero CTA** — `PageHero` is called without `navigate`, so the "GET EXPERT HELP NOW" button is missing on those pages while every other page has it. Minor conversion inconsistency.
- **No 404 handling for the server.** A hash-routed SPA served from a static host is fine, but confirm your host rewrites unknown paths to `index.html`.
- **`src/utils/cn.ts` is dead code** — imported nowhere. Harmless, but worth deleting or using.

---

## 5. Pre-launch checklist

**You must do:**
1. Connect the forms to a real backend/CRM so leads actually arrive.
2. Set `PHONE_E164`, `PHONE_DISPLAY`, `WHATSAPP_URL`, `EMAIL`, `PRIVACY_EMAIL` in `src/config.ts`.
3. Confirm `hello@` and `privacy@helpmycoursenow.com` mailboxes exist and are monitored (they're the only contact routes for privacy requests).
4. Replace/remove the fabricated reviews, ratings, stats, team and live notifications.
5. Have a lawyer review the Privacy Policy and Terms against what the site actually does.
6. Decide the repositioning question in §3.
7. Update the 2025 blog content and titles to 2026.
8. Add the `og:image`.
9. Remove the "Coming soon" video block.

**Then verify:**
10. `npm run build` passes (it does now).
11. Submit the contact form in production and **confirm the lead reaches you.**
12. Test one page in an incognito window: accept cookies → confirm the pixel fires; decline → confirm it does not.
13. Check the site on a real phone — the sticky bottom bar, marquee and cookie banner all compete for space at the bottom of the viewport.
14. Point DNS, force HTTPS, and check the www/non-www redirect matches your canonical tag.
15. Confirm `robots.txt` and `sitemap.xml` are reachable.

---

## 6. What I changed

| File | Change |
|------|--------|
| *(structure)* | Moved all source into `src/`, `src/components/`, `src/utils/` — fixes the build |
| `index.html` | Fixed invalid `<noscript>`; removed fabricated `aggregateRating`; removed pre-consent pixel; added `alt` |
| `public/favicon.svg` | **New** — brand logo favicon |
| `public/robots.txt`, `public/sitemap.xml` | **New** |
| `src/config.ts` | **New** — all business details/placeholders in one place |
| `src/utils/seo.ts` | **New** — per-route title/description (was homepage-only) |
| `src/utils/pixel.ts` | Rewritten — fully consent-gated pixel loading |
| `src/App.tsx` | Applies per-route SEO metadata |
| `src/components/CookieConsent.tsx` | Uses consent helpers instead of firing the pixel directly |
| `src/components/Layout.tsx` | Honest WhatsApp labelling, hides dead phone buttons, removed dead Instagram link, dynamic copyright year |
| `src/components/{Home,Pages,ServicePage,LeadForm}.tsx` | Wired to config; contact page link fixes |
| `src/components/Pages.tsx` | Blog search + category filters now actually work; added empty-state; accurate cookie disclosure |
| `src/index.css` | Added `.chat-tooltip` style |
| `vite.config.ts` | `allowedHosts` so the site loads behind a proxy/CDN |
| `package.json` | `build` now runs `tsc --noEmit`; added `typecheck` |
| `.gitignore` | **New** |

**Note:** I have not committed these changes — they're in your working tree on `arena/01a0fc86-hmcn` for you to review. `node_modules/` is installed locally and now correctly ignored.
