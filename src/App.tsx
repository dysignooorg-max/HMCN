import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Link from "./components/Link";
import Home from "./components/Home";
import ServicePage from "./components/ServicePage";
import {
  HowItWorksPage,
  AboutPage,
  ContactPage,
  TestimonialsPage,
  FAQPage,
  BlogPage,
  ServicesIndexPage,
  BlogPostPage,
  LegalPage,
} from "./components/Pages";
import { services, blogPosts } from "./data";
import { PAGE_META, applyMeta, serviceMeta, blogMeta } from "./utils/seo";

function getPath(): string {
  const h = window.location.hash;
  if (h.startsWith("#")) return h.slice(1) || "/";
  return "/";
}

/** Chooses the right title/description for the current route. */
function metaForPath(path: string) {
  if (PAGE_META[path]) return PAGE_META[path];
  if (path.startsWith("/services/")) {
    const svc = services.find((s) => s.slug === path.replace("/services/", ""));
    if (svc) return serviceMeta(svc.title, svc.short);
  }
  if (path.startsWith("/blog/")) {
    const post = blogPosts.find((p) => p.slug === path.replace("/blog/", ""));
    if (post) return blogMeta(post.title, post.excerpt);
  }
  return {
    title: "Page Not Found | HelpMyCourseNow",
    description: "That page could not be found.",
  };
}

export default function App() {
  const [path, setPath] = useState<string>(getPath());

  useEffect(() => {
    const onHash = () => {
      setPath(getPath());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Keep the tab title / meta description in sync with the current route.
  useEffect(() => {
    applyMeta(metaForPath(path));
  }, [path]);

  function navigate(p: string) {
    window.location.hash = p;
  }

  let page: React.ReactNode = null;

  if (path === "/" || path === "") {
    page = <Home />;
  } else if (path === "/how-it-works") {
    page = <HowItWorksPage />;
  } else if (path === "/about") {
    page = <AboutPage />;
  } else if (path === "/contact") {
    page = <ContactPage />;
  } else if (path === "/services") {
    page = <ServicesIndexPage />;
  } else if (path === "/testimonials") {
    page = <TestimonialsPage />;
  } else if (path === "/faq") {
    page = <FAQPage />;
  } else if (path === "/blog") {
    page = <BlogPage />;
  } else if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    page = <BlogPostPage slug={slug} />;
  } else if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "");
    const svc = services.find((s) => s.slug === slug);
    if (svc) {
      page = <ServicePage service={svc} />;
    } else {
      page = <NotFound />;
    }
  } else if (path === "/privacy") {
    page = <LegalPage kind="privacy" />;
  } else if (path === "/terms") {
    page = <LegalPage kind="terms" />;
  } else {
    page = <NotFound />;
  }

  return (
    <Layout navigate={navigate} current={path}>
      {page}
    </Layout>
  );
}

function NotFound() {
  return (
    <section className="section-pad bg-white text-center max-w-3xl mx-auto px-4">
      <div className="text-6xl">🤔</div>
      <h1 className="font-display font-extrabold text-4xl text-[#3D348B] mt-4">Page Not Found</h1>
      <p className="text-gray-600 mt-3">Looks like that link is missing. Let's get you home.</p>
      <Link to="/" className="btn-cta mt-6 h-[54px] px-7 inline-flex items-center">← Back To Home</Link>
    </section>
  );
}
