# HelpMyCourseNow (HMCN)

Single-page React marketing site for HelpMyCourseNow.

**Stack:** React 19 · TypeScript · Vite 7 · Tailwind CSS 4
**Output:** one self-contained `dist/index.html` (all CSS + JS inlined)

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Type-check, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only |
| `npm run smoke` | Renders all 26 routes, validates every link/button/form |
| `npm run verify` | **Run this before deploying** — typecheck + smoke + build |

---

## ⚠️ Before you go live

Complete these in **`src/config.ts`** (everything is in one place):

| Setting | Why it matters |
|---|---|
| `LEAD_ENDPOINT` | **Where leads are sent.** Empty = forms fall back to opening a pre-filled WhatsApp/email message. See below. |
| `PHONE_E164` / `PHONE_DISPLAY` | ✅ Set to +1 (214) 356-0059. |
| `WHATSAPP_URL` | ✅ Set to https://wa.me/12143560059. |
| `PHONE_OPENS_WHATSAPP` | ✅ `true` — phone links open WhatsApp instead of dialling. |
| `EMAIL` / `PRIVACY_EMAIL` | Confirm both mailboxes exist and are monitored. |
| `INSTAGRAM_URL` | Hidden until set. |
| `VIDEO_EMBED_URL` | Optional explainer video. Hidden until set. |
| `META_PIXEL_ID` | Meta Pixel for ad tracking (consent-gated). |

### Phone & WhatsApp behaviour

Both the **WhatsApp icons** and the **phone number** open a WhatsApp chat with
`+1 (214) 356-0059` — no visitor ever has to dial, and every enquiry lands in
WhatsApp. Controlled by `PHONE_OPENS_WHATSAPP` in `src/config.ts`:

- `true` (current) → phone links point at `https://wa.me/12143560059` and
  buttons are labelled "💬 WhatsApp".
- `false` → phone links revert to normal `tel:+12143560059` dialling and
  buttons are labelled "📞 Call Us".

Main "chat with us" buttons open WhatsApp with a pre-filled message
("Hi! I need help with my exam or course.") so the visitor only has to hit send.

### Connecting the lead forms

Leads currently have **three** delivery modes, chosen automatically:

1. **`LEAD_ENDPOINT` is set** → the form POSTs JSON to it. Fully automatic.
2. **`WHATSAPP_URL` is set** → opens WhatsApp with the enquiry pre-filled.
3. **Neither** → opens a pre-filled email to `EMAIL`.

Mode 3 is the built-in safety net so a lead is never silently lost, but it
still requires the visitor to press send. **Set `LEAD_ENDPOINT` for a real
launch.** Free options that work with no backend code:

- **Formspree** — `https://formspree.io/f/YOUR_ID`
- **Web3Forms** — `https://api.web3forms.com/submit`
- **Zapier / Make / n8n** webhook URL

The POST body looks like:

```json
{
  "name": "Jane Doe",
  "contact": "jane@example.com",
  "email": "jane@example.com",
  "phone": "+15551234567",
  "exam": "TEAS",
  "deadline": "In 5 days",
  "message": "…",
  "source": "quote-form"
}
```

Forms also include a honeypot field (`company`) that silently discards bot
submissions.

### Deploying

`npm run build` produces `dist/index.html` plus `public/` assets. Upload the
contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, S3,
or plain shared hosting).

Because the site uses hash routing, **no server rewrite rules are needed** —
`index.html` alone is enough.

Point DNS, force HTTPS, then confirm these resolve:

- `https://www.helpmycoursenow.com/`
- `https://www.helpmycoursenow.com/robots.txt`
- `https://www.helpmycoursenow.com/sitemap.xml`
- `https://www.helpmycoursenow.com/og-image.jpg`

Make sure the `www` vs non-`www` redirect matches the canonical tag in
`index.html` (`https://www.helpmycoursenow.com/`).

---

## Switching to real URLs (recommended)

The site uses hash routing (`/#/about`), which is safe everywhere but means
Google sees **one** indexable page instead of ~26. Since the whole growth
strategy is organic search, this is the single biggest SEO limitation.

To switch:

1. In `src/components/Link.tsx`, change `href={`#${to}`}` to `href={to}`.
2. In `src/App.tsx`, replace the `hashchange` listener with `popstate`, and
   `navigate()` with `history.pushState`.
3. Add a server rewrite so every unknown path serves `index.html`:
   - **Netlify** — `public/_redirects` containing `/*  /index.html  200`
   - **Vercel** — a rewrite in `vercel.json`
   - **Apache** — a `.htaccess` fallback to `index.html`
   - **Nginx** — `try_files $uri $uri/ /index.html;`
4. List every page in `public/sitemap.xml`.
5. Intercept clicks on `<a>` in `Link.tsx` to avoid full page reloads.

---

## Project structure

```
src/
  App.tsx                  route table + per-route SEO
  config.ts                ⚠️ all business settings live here
  data.ts                  services, testimonials, FAQs, blog posts
  index.css                Tailwind + custom animations
  components/
    Layout.tsx             header, nav, footer, exit-intent, sticky bars
    Home.tsx               homepage sections
    Pages.tsx              about, contact, blog, FAQ, legal, services index
    ServicePage.tsx        individual service pages
    LeadForm.tsx           reusable lead form
    Link.tsx               real <a> wrapper for in-app navigation
    CookieConsent.tsx      GDPR/CCPA cookie banner
    Logo.tsx               inline SVG brand logo
  utils/
    lead.ts                lead submission (endpoint → WhatsApp → email)
    pixel.ts               consent-gated Meta Pixel
    seo.ts                 per-route titles & descriptions
    cn.ts                  class-name helper
scripts/
  smoke-test.tsx           automated route/link/form test
public/                    favicon, robots.txt, sitemap.xml, og-image.jpg
```

---

## Testing

`npm run smoke` renders every route server-side and checks 36 assertions:
route rendering, 404 fallback, no placeholder text left in output, every
internal link resolves, no dead/empty links, no fake phone numbers, exactly
one `<h1>` per page, `alt` text on images, accessible button labels, form
submit controls, and brand consistency.

Run `npm run verify` before every deploy.

---

## Content notes

- **Blog dates** are set in 2026. Update them as you publish.
- **Legal "Last updated"** is generated from the current date.
- **Fabricated social proof** (invented review counts, "verified student"
  badges, the rotating "X from Georgia just got matched" popups, leadership
  names, students-helped statistics) is still present and needs replacing with
  real, verifiable data — see `LAUNCH-READINESS.md` §3.
