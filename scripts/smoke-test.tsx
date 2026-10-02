/**
 * Automated smoke test — renders every route and validates every link,
 * button and form on the site.
 *
 * Run with:  npm run smoke
 *
 * This is a genuine end-to-end render test: it server-renders each page
 * component and then walks the resulting HTML.
 */
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
import { services, blogPosts } from "../src/data";
import { PAGE_META } from "../src/utils/seo";

let failures = 0;
let checks = 0;
let sectionFailures = 0;
let sectionChecks = 0;

function pass(msg: string) {
  checks++;
  sectionChecks++;
  console.log(`  \u001b[32m✓\u001b[0m ${msg}`);
}
function fail(msg: string) {
  checks++;
  failures++;
  sectionFailures++;
  sectionChecks++;
  console.log(`  \u001b[31m✗ ${msg}\u001b[0m`);
}

function section(title: string) {
  sectionFailures = 0;
  sectionChecks = 0;
  console.log(`\n\u001b[1m${title}\u001b[0m`);
}

/** Every route the app must render successfully. */
const ROUTES: string[] = [
  "/",
  "/how-it-works",
  "/about",
  "/contact",
  "/services",
  "/testimonials",
  "/faq",
  "/blog",
  "/privacy",
  "/terms",
  ...services.map((s) => `/services/${s.slug}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  "/this-route-does-not-exist",
];

/** Routes that must have their own <title> (SEO). */
const SEO_ROUTES = Object.keys(PAGE_META);

type Rendered = { route: string; html: string };

function renderRoute(route: string): Rendered {
  // The app reads window.location.hash, so stub a minimal browser env.
  const w = globalThis as unknown as { window: unknown };
  w.window = {
    location: { hash: `#${route}`, href: `http://localhost/#${route}` },
    addEventListener() {},
    removeEventListener() {},
    scrollTo() {},
    innerWidth: 1280,
    scrollY: 0,
  };
  globalThis.localStorage = {
    getItem: () => null,
    setItem() {},
    removeItem() {},
  } as unknown as Storage;
  globalThis.document = {
    getElementById: () => null,
    addEventListener() {},
    removeEventListener() {},
    querySelectorAll: () => [],
    querySelector: () => null,
    head: { querySelector: () => null, appendChild() {} },
    createElement: () => ({ setAttribute() {}, appendChild() {} }),
  } as unknown as Document;
  globalThis.IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  } as unknown as typeof IntersectionObserver;
  globalThis.sessionStorage = {
    getItem: () => null,
    setItem() {},
  } as unknown as Storage;

  return { route, html: renderToStaticMarkup(<App />) };
}

section("1. Every route renders without throwing");
const rendered: Rendered[] = [];
for (const route of ROUTES) {
  try {
    const r = renderRoute(route);
    if (!r.html || r.html.length < 500) {
      fail(`${route} — rendered suspiciously little markup (${r.html.length} chars)`);
      continue;
    }
    rendered.push(r);
    pass(`${route} (${r.html.length.toLocaleString()} chars)`);
  } catch (e) {
    fail(`${route} — THREW: ${(e as Error).message}`);
  }
}

section("2. 404 fallback works");
{
  const r = rendered.find((x) => x.route === "/this-route-does-not-exist");
  if (r?.html.includes("Page Not Found")) pass('unknown route shows "Page Not Found"');
  else fail("unknown route did not show the 404 page");
}

section("3. No leftover placeholder values anywhere");
const PLACEHOLDERS = [
  "000-0000",
  "+10000000000",
  "Coming soon",
  "Lorem ipsum",
  "TODO",
  "FIXME",
  "undefined",
  "[object Object]",
  "NaN",
];
for (const r of rendered) {
  for (const p of PLACEHOLDERS) {
    if (r.html.includes(p)) fail(`${r.route} contains placeholder text: "${p}"`);
  }
}
if (sectionFailures === 0) pass("no placeholder values found on any page");

section("4. Every internal link resolves to a real route");
{
  // Single source of truth: anything in ROUTES (minus the deliberately bad one)
  // counts as a valid link target.
  const validRoutes = new Set(
    ROUTES.filter((r) => r !== "/this-route-does-not-exist")
  );
  const seen = new Set<string>();
  for (const r of rendered) {
    for (const m of r.html.matchAll(/href="(#\/[^"]*)"/g)) {
      const target = m[1].replace(/^#/, "").split("?")[0] || "/";
      if (seen.has(`${r.route}->${target}`)) continue;
      seen.add(`${r.route}->${target}`);
      if (!validRoutes.has(target)) {
        fail(`${r.route} links to unknown route "${target}"`);
      }
    }
  }
  if (sectionFailures === 0) pass(`all internal links resolve (${seen.size} unique link targets checked)`);
}

section("5. No dead / placeholder links");
{
  const DEAD = ['href="#"', 'href=""', "href='#'"];
  for (const r of rendered) {
    for (const d of DEAD) {
      if (r.html.includes(d)) fail(`${r.route} contains a dead link: ${d}`);
    }
  }
  if (sectionFailures === 0) pass("no href=\"#\" or empty links found");
}

section("6. No placeholder phone numbers are rendered");
{
  for (const r of rendered) {
    if (r.html.includes("tel:+10000000000") || /\(000\)\s*000-0000/.test(r.html)) {
      fail(`${r.route} renders a placeholder phone number`);
    }
  }
  if (sectionFailures === 0) pass("no fake phone numbers rendered");
}

section("7. Every page has a real H1");
for (const r of rendered) {
  const h1s = [...r.html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length === 0) {
    fail(`${r.route} has NO <h1>`);
  } else if (h1s.length > 1) {
    fail(`${r.route} has ${h1s.length} <h1> tags (should be 1)`);
  }
}
if (sectionFailures === 0) pass("every route has exactly one <h1>");

section("8. Images have alt text");
{
  let bad = 0;
  for (const r of rendered) {
    for (const m of r.html.matchAll(/<img\b([^>]*)>/g)) {
      if (!/\balt=/.test(m[1])) {
        fail(`${r.route} has an <img> without alt`);
        bad++;
      }
    }
  }
  if (bad === 0) pass("all <img> tags have alt attributes");
}

section("9. Buttons have accessible labels");
{
  let bad = 0;
  for (const r of rendered) {
    for (const m of r.html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
      const attrs = m[1];
      const inner = m[2].replace(/<[^>]*>/g, "").trim();
      const hasLabel = inner.length > 0 || /aria-label=/.test(attrs);
      if (!hasLabel) {
        fail(`${r.route} has an unlabelled <button>`);
        bad++;
      }
    }
  }
  if (bad === 0) pass("all buttons have visible text or aria-label");
}

section("10. Forms have required fields and a submit control");
{
  let forms = 0;
  for (const r of rendered) {
    for (const m of r.html.matchAll(/<form\b[\s\S]*?<\/form>/g)) {
      forms++;
      const f = m[0];
      if (!/<button|type="submit"/.test(f)) fail(`${r.route} has a form with no submit button`);
      if (!/\brequired\b/.test(f)) fail(`${r.route} has a form with no required fields`);
      if (!/<input|<select|<textarea/.test(f)) fail(`${r.route} has an empty form`);
    }
  }
  if (sectionFailures === 0) pass(`${forms} forms have submit controls, required fields and inputs`);
}

section("11. Brand consistency");
{
  for (const r of rendered) {
    if (!r.html.includes("HelpMyCourseNow") && !r.route.startsWith("/blog/")) {
      fail(`${r.route} does not mention the brand name`);
    }
  }
  if (sectionFailures === 0) pass("brand name present on all pages");
}

section("12. Sticky header offsets line up (no overlap)");
{
  const home = rendered.find((r) => r.route === "/")!.html;
  const heightMatch = home.match(/style="height:(\d+)px"/);
  const barMatch = home.match(/style="top:(\d+)px"/g) || [];
  if (!heightMatch) {
    fail("could not find the announcement bar height");
  } else {
    const announce = Number(heightMatch[1]);
    const tops = barMatch.map((t) => Number(t.match(/(\d+)px/)![1]));
    if (tops.includes(announce)) {
      pass(`navbar sticky top (${announce}px) matches announcement bar height`);
    } else {
      fail(`navbar top offset ${JSON.stringify(tops)} does not match announcement height ${announce}px — bars will overlap`);
    }
  }
}

section("13. Nav uses real links (crawlable, openable in new tab)");
{
  const home = rendered.find((r) => r.route === "/")!.html;
  const navLinks = [...home.matchAll(/<a[^>]+href="#\/(about|contact|blog|faq|services|how-it-works)[^"]*"/g)];
  if (navLinks.length >= 5) {
    pass(`${navLinks.length} navigation targets are real <a href> links`);
  } else {
    fail(`only ${navLinks.length} nav links found — navigation may still be button-based`);
  }
  // Crawl the whole site starting at "/" following real href="#/..." links,
  // exactly as a search-engine crawler would. Every page must be discoverable.
  const linksFrom = (route: string): string[] => {
    const r = rendered.find((x) => x.route === route);
    if (!r) return [];
    return [...r.html.matchAll(/href="#([^"]*)"/g)]
      .map((m) => m[1].split("?")[0] || "/")
      .filter((h) => h.startsWith("/"));
  };

  const visited = new Set<string>(["/"]);
  const queue = ["/"];
  while (queue.length) {
    const current = queue.shift()!;
    for (const target of linksFrom(current)) {
      if (!visited.has(target)) {
        visited.add(target);
        queue.push(target);
      }
    }
  }

  const orphans = ROUTES.filter(
    (r) => r !== "/this-route-does-not-exist" && !visited.has(r)
  );
  if (orphans.length === 0) {
    pass(`all ${ROUTES.length - 1} pages reachable by crawling from the homepage`);
  } else {
    fail(`orphaned (unlinked) pages: ${orphans.join(", ")}`);
  }
}

console.log("\n" + "─".repeat(60));
if (failures === 0) {
  console.log(`\u001b[32m\u001b[1mALL CHECKS PASSED\u001b[0m — ${checks} checks across ${ROUTES.length} routes`);
} else {
  console.log(`\u001b[31m\u001b[1m${failures} FAILURE(S)\u001b[0m out of ${checks} checks`);
}
console.log("─".repeat(60) + "\n");
process.exit(failures === 0 ? 0 : 1);
