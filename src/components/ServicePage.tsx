import { CTASection, PageHero } from "./Layout";
import LeadForm from "./LeadForm";
import Link from "./Link";
import { Service, services, testimonials } from "../data";
import { PHONE_E164 } from "../config";

type Props = { service: Service };

export default function ServicePage({ service }: Props) {
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero title={service.hero} subtitle={service.short} />

      <section className="bg-white py-14 reveal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display font-extrabold text-[#3D348B] text-2xl sm:text-3xl">What Is {service.title}?</h2>
              {service.about.map((p, i) => (
                <p key={i} className="text-[#3D348B]/70 mt-4 leading-relaxed text-base">{p}</p>
              ))}
            </div>

            <div>
              <h2 className="font-display font-extrabold text-[#3D348B] text-2xl sm:text-3xl">How We Help With {service.title}</h2>
              <ul className="mt-5 space-y-3">
                {service.howWeHelp.map((p, i) => (
                  <li key={i} className="flex gap-3 text-[#3D348B]/70 text-base">
                    <span className="w-6 h-6 mt-0.5 rounded-full bg-[#F35B04] text-white text-xs font-bold inline-flex items-center justify-center shrink-0">✓</span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F9F9FF] border-2 border-[#eeeefb] rounded-2xl p-6 sm:p-8">
              <h3 className="font-display font-bold text-[#3D348B] text-xl">Real Student Story</h3>
              <p className="text-[#F7B801] mt-2">⭐⭐⭐⭐⭐</p>
              <p className="text-[#3D348B]/80 mt-3 italic leading-relaxed text-base">"{testimonials[0].quote}"</p>
              <p className="text-sm text-[#7678ED] mt-3">— {testimonials[0].name}, {testimonials[0].location}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold bg-white text-[#3D348B] border border-[#7678ED]/30 px-2.5 py-1 rounded-full">✓ VERIFIED U.S. STUDENT</div>
            </div>

            <div>
              <h2 className="font-display font-extrabold text-[#3D348B] text-2xl sm:text-3xl">{service.title} — FAQs</h2>
              <div className="mt-5 space-y-3">
                {service.faqs.map((f, i) => (
                  <div key={i} className="border-2 border-[#eeeefb] rounded-xl p-5">
                    <p className="font-display font-bold text-[#3D348B] text-base">{f.q}</p>
                    <p className="text-[#3D348B]/70 mt-2 leading-relaxed text-base">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-[#3D348B] text-xl">Related Services</h2>
              <div className="grid sm:grid-cols-3 gap-4 mt-4">
                {related.map((r) => (
                  <Link key={r.slug} to={`/services/${r.slug}`} className="text-left bg-white border-2 border-[#eeeefb] rounded-xl p-4 lift-card">
                    <div className="text-2xl">{r.emoji}</div>
                    <div className="font-display font-bold text-[#3D348B] mt-1 text-base">{r.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-[140px] h-max space-y-5">
            <LeadForm title={`Get Help With ${service.title}`} />
            <div className="bg-[#3D348B] text-white rounded-2xl p-5 text-center">
              <div className="text-3xl">📞</div>
              <p className="text-base mt-2 opacity-90">Prefer to talk first?</p>
              {PHONE_E164 ? (
                <a href={`tel:+${PHONE_E164}`} className="btn-secondary w-full h-[54px] mt-3">Call Us 24/7</a>
              ) : (
                <p className="text-sm opacity-80 mt-3">Use the form and we'll reply in ~5 minutes, 24/7.</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}
