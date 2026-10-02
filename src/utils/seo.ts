/**
 * Per-route SEO metadata.
 *
 * The site is a single-page app served from one HTML file, so without this the
 * browser tab, Google result and social share preview for EVERY page showed
 * the homepage title. This sets a unique title + description per route.
 */

export type Meta = { title: string; description: string };

const HOME: Meta = {
  title:
    "HelpMyCourseNow | Expert Online Exam & Course Help USA | GED TEAS CompTIA WGU",
  description:
    "Get expert help for your online exams, GED, TEAS, WGU courses and certifications. 100% confidential. Serving students across USA. Get your free quote now!",
};

export const PAGE_META: Record<string, Meta> = {
  "/": HOME,
  "/how-it-works": {
    title: "How It Works | HelpMyCourseNow — Expert Help In 5 Minutes",
    description:
      "From your first message to your passing grade. See exactly how HelpMyCourseNow matches you with a vetted exam and course expert — usually within 5 minutes.",
  },
  "/about": {
    title: "About Us | HelpMyCourseNow — Expert Academic Help In The USA",
    description:
      "500+ vetted experts helping adult learners across America pass exams, finish courses and earn certifications. Learn about our mission and team.",
  },
  "/contact": {
    title: "Contact Us | HelpMyCourseNow — We Reply In 5 Minutes, 24/7",
    description:
      "Message us on WhatsApp, call, or fill in the form. Get a free, confidential quote for your exam or course in under 5 minutes. Available 24/7.",
  },
  "/services": {
    title: "Our Services | Online Exam & Course Help USA | HelpMyCourseNow",
    description:
      "Proctored exams, GED, TEAS, HESI, WGU, CompTIA, NCLEX, GRE and GMAT help. Browse every service and get matched with a specialist in minutes.",
  },
  "/testimonials": {
    title: "Student Testimonials & Reviews | HelpMyCourseNow",
    description:
      "Read real stories from students across the USA who passed their GED, TEAS, NCLEX, WGU courses and IT certifications with our help.",
  },
  "/faq": {
    title: "Frequently Asked Questions | HelpMyCourseNow",
    description:
      "Is it safe? Is it confidential? How fast can you help? Honest answers to the questions students ask most about our exam and course help service.",
  },
  "/blog": {
    title: "Exam Tips & Student Resources Blog | HelpMyCourseNow",
    description:
      "Free guides on GED, TEAS, NCLEX, WGU, CompTIA and online college course success — written to help you pass your next exam.",
  },
  "/privacy": {
    title: "Privacy Policy | HelpMyCourseNow",
    description:
      "How HelpMyCourseNow collects, uses and protects your personal information — including our cookie and advertising disclosure.",
  },
  "/terms": {
    title: "Terms & Conditions | HelpMyCourseNow",
    description:
      "The terms of service for using HelpMyCourseNow's private academic assistance and exam preparation services.",
  },
};

/** Fallback for a service page. */
export function serviceMeta(title: string, short: string): Meta {
  return {
    title: `${title} | Expert Help USA | HelpMyCourseNow`,
    description: short,
  };
}

/** Fallback for a blog post. */
export function blogMeta(title: string, excerpt: string): Meta {
  return { title: `${title} | HelpMyCourseNow`, description: excerpt };
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applyMeta(meta: Meta): void {
  document.title = meta.title;
  setMetaTag("name", "description", meta.description);
  setMetaTag("property", "og:title", meta.title);
  setMetaTag("property", "og:description", meta.description);
  setMetaTag("name", "twitter:title", meta.title);
  setMetaTag("name", "twitter:description", meta.description);
}
