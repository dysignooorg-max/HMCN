import { useState } from "react";
import { examOptions } from "../data";
import { trackLead } from "../utils/pixel";
import { submitLead } from "../utils/lead";
import { chatUrl } from "../config";

type Props = {
  variant?: "card" | "compact" | "inline";
  title?: string;
  buttonLabel?: string;
  /** Identifies which form produced the lead, useful in your CRM. */
  source?: string;
};

export default function LeadForm({
  variant = "card",
  title = "Get Your Free Quote Now",
  buttonLabel = "GET MY FREE QUOTE →",
  source = "quote-form",
}: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "handoff" | "error">("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    contact: "",
    exam: "",
    deadline: "",
    company: "", // honeypot
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");

    const result = await submitLead({ ...data, source });

    if (result.ok && result.mode === "endpoint") {
      trackLead();
      setState("sent");
    } else if (result.ok) {
      trackLead();
      setState("handoff");
    } else {
      setError(result.error);
      setState("error");
    }
  }

  const wrapClasses =
    variant === "card"
      ? "bg-white rounded-2xl shadow-[0_18px_50px_rgba(20,15,80,0.18)] p-6 sm:p-7 border border-white"
      : variant === "compact"
        ? "bg-white rounded-xl shadow-[0_8px_25px_rgba(20,15,80,0.08)] p-5 border border-[#eeeefb]"
        : "";

  if (state === "sent") {
    return (
      <div className={wrapClasses}>
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#F35B04] mx-auto flex items-center justify-center text-white text-3xl">✓</div>
          <h3 className="font-display font-bold text-[#3D348B] text-2xl mt-4">You're In!</h3>
          <p className="text-[#3D348B]/70 mt-2 text-base">
            An expert will message you within <strong>5 minutes</strong>. Check your phone or email.
          </p>
          <a href={chatUrl()} target="_blank" rel="noopener noreferrer"
            className="btn-cta w-full mt-5 h-[54px] text-base">
            💬 Message Us Now
          </a>
        </div>
      </div>
    );
  }

  // Used when no backend is configured yet: we opened WhatsApp/email for them.
  if (state === "handoff") {
    return (
      <div className={wrapClasses}>
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#F7B801] mx-auto flex items-center justify-center text-[#2A2565] text-3xl">↗</div>
          <h3 className="font-display font-bold text-[#3D348B] text-2xl mt-4">Almost Done — Press Send</h3>
          <p className="text-[#3D348B]/70 mt-2 text-base">
            We've opened a message with your details. <strong>Just hit send</strong> and an expert will reply within 5 minutes.
          </p>
          <p className="text-sm text-[#7678ED] mt-3">
            Message didn't open? Use the button below.
          </p>
          <a href={chatUrl()} target="_blank" rel="noopener noreferrer"
            className="btn-cta w-full mt-4 h-[54px] text-base">
            💬 Message Us Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapClasses}>
      <div className="flex items-center justify-between gap-3 mb-1">
        <h3 className="font-display font-bold text-[#3D348B] text-xl sm:text-[22px]">{title}</h3>
        <span className="text-[11px] font-bold bg-[#F7B801] text-[#2A2565] px-2.5 py-1 rounded-full">FREE</span>
      </div>
      <p className="text-sm text-[#7678ED] mb-4">🔒 100% private. No obligation. Reply in 5 minutes.</p>

      <form onSubmit={onSubmit} className="space-y-3">
        <label htmlFor={`${source}-name`} className="sr-only">Your name</label>
        <input id={`${source}-name`} required className="field" placeholder="Your Name"
          value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

        <label htmlFor={`${source}-contact`} className="sr-only">Your email or WhatsApp number</label>
        <input id={`${source}-contact`} required className="field" placeholder="Your Email or WhatsApp #"
          value={data.contact} onChange={(e) => setData({ ...data, contact: e.target.value })} />

        <label htmlFor={`${source}-exam`} className="sr-only">Select your exam or course</label>
        <select id={`${source}-exam`} required className="field" value={data.exam}
          onChange={(e) => setData({ ...data, exam: e.target.value })}>
          <option value="">Select Your Exam or Course</option>
          {examOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>

        <label htmlFor={`${source}-deadline`} className="sr-only">Your deadline</label>
        <input id={`${source}-deadline`} required className="field" placeholder="Your Deadline (e.g. 'In 5 days')"
          value={data.deadline} onChange={(e) => setData({ ...data, deadline: e.target.value })} />

        {/* Honeypot: hidden from humans, bots fill it in. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
          className="hidden" value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })} />

        <button type="submit" disabled={state === "sending"}
          className="btn-cta w-full h-[58px] text-[17px] font-extrabold disabled:opacity-70 disabled:cursor-wait">
          {state === "sending" ? "SENDING…" : buttonLabel}
        </button>

        {state === "error" && (
          <p role="alert" className="text-sm text-[#F35B04] text-center">
            {error || "Something went wrong."} Please try{" "}
            <a href={chatUrl()} target="_blank" rel="noopener noreferrer" className="underline font-bold">
              messaging us directly
            </a>.
          </p>
        )}

        <div className="flex items-center justify-center gap-3 text-[11px] text-[#7678ED] pt-1">
          <span>🔒 SSL Secured</span>
          <span>•</span>
          <span>🛡️ Privacy Protected</span>
          <span>•</span>
          <span>⭐ 4.9/5</span>
        </div>
      </form>
    </div>
  );
}
