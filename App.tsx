import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ServicePage from "./components/ServicePage";
import {
  HowItWorksPage,
  AboutPage,
  ContactPage,
  TestimonialsPage,
  FAQPage,
  BlogPage,
  BlogPostPage,
  LegalPage,
} from "./components/Pages";
import { services } from "./data";

function getPath(): string {
  const h = window.location.hash;
  if (h.startsWith("#")) return h.slice(1) || "/";
  return "/";
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

  function navigate(p: string) {
    window.location.hash = p;
  }

  let page: React.ReactNode = null;

  if (path === "/" || path === "") {
    page = <Home navigate={navigate} />;
  } else if (path === "/how-it-works") {
    page = <HowItWorksPage navigate={navigate} />;
  } else if (path === "/about") {
    page = <AboutPage navigate={navigate} />;
  } else if (path === "/contact") {
    page = <ContactPage navigate={navigate} />;
  } else if (path === "/testimonials") {
    page = <TestimonialsPage navigate={navigate} />;
  } else if (path === "/faq") {
    page = <FAQPage navigate={navigate} />;
  } else if (path === "/blog") {
    page = <BlogPage navigate={navigate} />;
  } else if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    page = <BlogPostPage slug={slug} navigate={navigate} />;
  } else if (path.startsWith("/services/")) {
    const slug = path.replace("/services/", "");
    const svc = services.find((s) => s.slug === slug);
    if (svc) {
      page = <ServicePage service={svc} navigate={navigate} />;
    } else {
      page = <NotFound navigate={navigate} />;
    }
  } else if (path === "/privacy") {
    page = <LegalPage kind="privacy" navigate={navigate} />;
  } else if (path === "/terms") {
    page = <LegalPage kind="terms" navigate={navigate} />;
  } else {
    page = <NotFound navigate={navigate} />;
  }

  return (
    <Layout navigate={navigate} current={path}>
      {page}
    </Layout>
  );
}

function NotFound({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="section-pad bg-white text-center max-w-3xl mx-auto px-4">
      <div className="text-6xl">🤔</div>
      <h1 className="font-display font-extrabold text-4xl text-[#3D348B] mt-4">Page Not Found</h1>
      <p className="text-gray-600 mt-3">Looks like that link is missing. Let's get you home.</p>
      <button onClick={() => navigate("/")} className="btn-cta mt-6 h-[54px] px-7 inline-flex items-center">← Back To Home</button>
    </section>
  );
}
