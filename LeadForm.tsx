import { useState } from "react";
import { examOptions } from "../data";
import { trackLead } from "../utils/pixel";

const FB_LINK = "https://www.facebook.com/profile.php?id=61589640929259";

type Props = {
  variant?: "card" | "compact" | "inline";
  title?: string;
  buttonLabel?: string;
};

export default function LeadForm({
  variant = "card",
  title = "Get Your Free Quote Now",
  buttonLabel = "GET MY FREE QUOTE →",
}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({ name: "", contact: "", exam: "", deadline: "" });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackLead();
    setSubmitted(true);
  }

  const wrapClasses =
    variant === "card"
      ? "bg-white rounded-2xl shadow-[0_18px_50px_rgba(20,15,80,0.18)] p-6 sm:p-7 border border-white"
      : variant === "compact"
        ? "bg-white rounded-xl shadow-[0_8px_25px_rgba(20,15,80,0.08)] p-5 border border-[#eeeefb]"
        : "";

  if (submitted) {
    return (
      <div className={wrapClasses}>
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#F35B04] mx-auto flex items-center justify-center text-white text-3xl">✓</div>
          <h3 className="font-display font-bold text-[#3D348B] text-2xl mt-4">You're In!</h3>
          <p className="text-[#3D348B]/70 mt-2 text-base">An expert will message you within <strong>5 minutes</strong>. Check your phone or email.</p>
          <a href={FB_LINK} target="_blank" rel="noopener noreferrer"
            className="btn-cta w-full mt-5 h-[54px] text-base">
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
        <input required className="field" placeholder="Your Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <input required className="field" placeholder="Your Email or WhatsApp #" value={data.contact} onChange={(e) => setData({ ...data, contact: e.target.value })} />
        <select required className="field" value={data.exam} onChange={(e) => setData({ ...data, exam: e.target.value })}>
          <option value="">Select Your Exam or Course</option>
          {examOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <input required className="field" placeholder="Your Deadline (e.g. 'In 5 days')" value={data.deadline} onChange={(e) => setData({ ...data, deadline: e.target.value })} />
        <button type="submit" className="btn-cta w-full h-[58px] text-[17px] font-extrabold">{buttonLabel}</button>
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
