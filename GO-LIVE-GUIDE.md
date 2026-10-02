# Go-Live Guide — Vercel

Step-by-step, in order. Steps 1–2 are blocking; the rest can follow.

---

## Step 1 — Merge the pull request ⚠️ BLOCKING

**https://github.com/dysignooorg-max/HMCN/pull/1**

Click the green **"Merge pull request"** button, then **"Confirm merge"**.

**Why this is required:** Vercel deploys the `main` branch. Your `main` still
contains the original broken layout, where `index.html` points at
`/src/main.tsx` but that file sits in the root folder. The build fails with:

```
Unable to parse HTML; parse5 error code disallowed-content-in-noscript-in-head
error during build: [vite:build-html] Failed to resolve /src/main.tsx
```

Nothing else in this guide works until this is merged.

**How to confirm it worked:** open `https://github.com/dysignooorg-max/HMCN`
and check that a `src` folder now exists in the file list. If the root still
shows `App.tsx`, `Home.tsx`, `main.tsx` loose at the top level, the merge
didn't happen.

---

## Step 2 — Let Vercel redeploy

You already connected the project, so this happens automatically on merge.

1. Go to **vercel.com → your `hmcn` project → Deployments**
2. Wait for a new deployment triggered by the merge (about 60 seconds)
3. It should show **Ready** with a green dot

If it fails, open the failing deployment → **Logs** and send me the error.

**Optional but recommended — check these settings:**

**Settings → Build and Deployment:**

| Setting | Correct value |
|---|---|
| Framework Preset | Vite (auto-detected) |
| Build Command | `npm run verify` (comes from `vercel.json`) |
| Output Directory | `dist` (comes from `vercel.json`) |
| Install Command | `npm install` (leave default) |
| Node.js Version | 22.x |

`vercel.json` already sets the build command to `npm run verify`, which runs a
type-check plus 42 automated checks. **A broken build cannot reach production.**

Your temporary URL will be something like `https://hmcn-xxxx.vercel.app`.
Test everything here before adding the custom domain.

---

## Step 3 — Set `LEAD_ENDPOINT` 🔴 IMPORTANT

**This is the one real gap.** Right now, when a visitor submits a form, the
site opens WhatsApp with their details pre-filled — but **they have to press
send themselves.** If they close the tab instead, the lead is lost and you'll
never know.

**Fix (5 minutes, free):**

1. Go to **https://formspree.io** and create a free account (50 submissions/month)
2. Create a new form — call it "HMCN Website Leads"
3. Copy the endpoint URL it gives you — looks like `https://formspree.io/f/abcdwxyz`
4. Open `src/config.ts` and set:

```ts
export const LEAD_ENDPOINT: string = "https://formspree.io/f/YOUR_ID_HERE";
```

5. Commit and push — Vercel redeploys automatically

**After this**, form submissions are delivered to Formspree automatically and
forwarded to your email. WhatsApp stays as a backup. You can also connect
Formspree to Google Sheets or Slack from their dashboard.

> Alternatives if you prefer: **Web3Forms** (`https://api.web3forms.com/submit`,
> 250/month) or a **Zapier / Make / n8n** webhook.

---

## Step 4 — Confirm your mailboxes exist

These are displayed and linked on the live site:

| Address | Where it appears | What it needs to do |
|---|---|---|
| `hello@helpmycoursenow.com` | Footer, contact page | Receive enquiries |
| `privacy@helpmycoursenow.com` | Privacy Policy | Receive data-deletion requests — this is a **legal obligation** you state in your own policy |

If either doesn't exist, either create it or update the address in
`src/config.ts`.

---

## Step 5 — Add your custom domain

**In Vercel:** Settings → Domains → add `helpmycoursenow.com` and
`www.helpmycoursenow.com`.

**In your domain registrar's DNS panel:**

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

> ⚠️ Vercel may show you different values — **use whatever Vercel displays**,
> as these can change.

Then in Vercel, set `www` (or the apex) as the primary domain and enable
**Redirect to primary** so you don't have two live URLs competing in Google.

**HTTPS is automatic** — Vercel issues the certificate within a few minutes.

**Do you have registrar access?** If someone else registered the domain for
you, you'll need the DNS login. Vercel will keep working fine on the
`.vercel.app` URL in the meantime.

No code changes are needed for the domain — the canonical and `og:url` tags in
`index.html` already point at `https://www.helpmycoursenow.com/`.

---

## Step 6 — Verify the live site

Work through this on the **real URL, on a real phone**. I've verified
everything I can without a browser, but visual layout needs human eyes.

**Functionality**
- [ ] Homepage loads with images, colours and fonts — not a blank page
- [ ] Click every nav item: Home, How It Works, Services (hover it), Blog, About, Contact, Testimonials, FAQ, Privacy, Terms
- [ ] Open a service page and a blog post
- [ ] Blog search box filters articles; category links filter too
- [ ] Type a junk URL like `/HMCN/#/nonsense` → shows "Page Not Found"

**WhatsApp — test on your phone** 📱
- [ ] Tap the floating green button → opens WhatsApp with a message pre-typed
- [ ] Tap the phone number in the footer → opens WhatsApp (not the dialler)
- [ ] Tap "💬 WhatsApp" in the header
- [ ] **You receive these messages.** If a link says *"phone number shared via url is invalid"*, the number isn't registered on WhatsApp

**Forms — the most important checks**
- [ ] Submit the quote form → success message appears
- [ ] Submit the contact form → success message appears
- [ ] **Submit with `LEAD_ENDPOINT` set → the lead actually arrives** (check Formspree dashboard + your inbox)
- [ ] On desktop, move your mouse toward the browser tab → exit-intent popup appears, and its submission arrives too

**Cookie consent**
- [ ] Banner appears after ~1.5 seconds
- [ ] Click **Decline**, reload → banner stays hidden
- [ ] Clear cookies, click **Accept**, reload → banner stays hidden, and the Meta Pixel fires (check with the Meta Pixel Helper browser extension)

**Mobile layout** — where I couldn't test
- [ ] Sticky bottom bar, floating WhatsApp button and cookie banner don't overlap
- [ ] Announcement bar and navbar don't overlap when scrolled
- [ ] Text is readable, no horizontal scrolling
- [ ] Tap targets are comfortable

**Share preview**
- [ ] Paste your URL into WhatsApp or Facebook — it should show the purple "Expert Help. Real Results." card, not a blank grey box

---

## Step 7 — After it's live

**Google Search Console** — https://search.google.com/search-console
1. Add `helpmycoursenow.com` as a property and verify (Vercel makes this easy via DNS)
2. Submit `https://www.helpmycoursenow.com/sitemap.xml`
3. Use **URL Inspection → Request Indexing** on the homepage

> **Expect limited results.** The site uses hash routing (`/#/about`), so Google
> treats the whole site as one page. Only the homepage can rank. Fixing this is
> the single biggest SEO win available — documented in `README.md` under
> "Switching to real URLs". Worth doing once you're live; I can do it for you.

**Meta Pixel** — confirm events are landing in **Events Manager** after you
accept cookies on the live site.

**Uptime monitoring** — free options: UptimeRobot or BetterStack. They'll email
you if the site goes down.

---

## Step 8 — Decide what to do about the content

You asked me not to change the marketing copy, so I haven't. Two things are
worth a deliberate decision before you start spending on ads:

1. **Fabricated social proof.** The testimonials, "✓ VERIFIED U.S. STUDENT"
   badges, "10,243 reviews", "10,000+ students / 500+ experts / 99.6% pass
   rate", the four leadership names, and the rotating *"Tasha from Georgia just
   got matched"* popups (randomly generated every 22 seconds in `Layout.tsx`)
   are invented. Fake reviews and testimonials are an FTC enforcement priority.
2. **Service descriptions** stating that experts bypass proctoring detection and
   take proctored exams on the customer's behalf. This affects whether Meta
   approves your ad account and whether mainstream payment processors will work
   with you.

I've laid out the options in `LAUNCH-READINESS.md`. If you'd like, I'll swap the
fabricated content for real empty templates ready for actual testimonials, and
rewrite the service pages around legitimate prep and tutoring — same brand,
design and SEO targets, verified and deployed the same day.

---

## Quick reference

| Task | Where |
|---|---|
| Merge the PR (blocking) | https://github.com/dysignooorg-max/HMCN/pull/1 |
| Vercel dashboard | https://vercel.com/dashboard |
| Business settings | `src/config.ts` |
| Pre-launch test suite | `npm run verify` |
| Launch checklist (original audit) | `LAUNCH-READINESS.md` |
| Current status | `LAUNCH-STATUS.md` |
| Developer docs | `README.md` |

---

## Minimum to go live

1. ✅ Merge PR #1
2. ✅ Confirm the Vercel deploy goes green
3. ✅ Set `LEAD_ENDPOINT`
4. ✅ Confirm both mailboxes work
5. ✅ Test the forms and WhatsApp on your phone

Everything else can follow afterwards.
