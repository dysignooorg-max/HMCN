type Props = { size?: number; light?: boolean };

export default function Logo({ size = 40, light = true }: Props) {
  // Inline SVG version of the brand logo (graduation cap on open book inside shield)
  const navy = "#3D348B";
  const lavender = "#7678ED";
  const gold = "#F7B801";
  const orange = "#F35B04";

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="HelpMyCourseNow logo"
      >
        {/* Shield */}
        <path
          d="M8 10 Q8 6 12 6 H52 Q56 6 56 10 V36 Q56 50 32 60 Q8 50 8 36 Z"
          fill="none"
          stroke={light ? "#ffffff" : navy}
          strokeWidth="3"
        />
        {/* Stars */}
        <g fill={gold}>
          <circle cx="22" cy="16" r="1.6" />
          <circle cx="28" cy="13" r="1.8" />
          <circle cx="34" cy="13" r="2" />
          <circle cx="40" cy="13" r="1.8" />
          <circle cx="46" cy="16" r="1.6" />
        </g>
        {/* Cap */}
        <path d="M16 26 L32 20 L48 26 L32 32 Z" fill={light ? "#ffffff" : navy} />
        <rect x="30" y="32" width="4" height="6" fill={light ? "#ffffff" : navy} />
        <path d="M22 28 V36 Q22 40 32 40 Q42 40 42 36 V28" stroke={light ? "#ffffff" : navy} strokeWidth="2.5" fill="none" />
        {/* Open book */}
        <path d="M10 40 L32 46 L32 56 L10 50 Z" fill={lavender} opacity="0.9" />
        <path d="M54 40 L32 46 L32 56 L54 50 Z" fill={orange} opacity="0.9" />
        {/* Figure / Y shape */}
        <circle cx="32" cy="42" r="2.4" fill={gold} />
        <path d="M32 44 L28 50 M32 44 L36 50" stroke={gold} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className="font-display font-extrabold text-[18px] sm:text-[20px] tracking-tight"
          style={{ color: light ? "#ffffff" : navy }}
        >
          <span style={{ color: light ? "#ffffff" : navy }}>Help</span>
          <span style={{ color: light ? "#cfd0ff" : lavender }}>My</span>
          <span style={{ color: gold }}>Course</span>
          <span style={{ color: orange }}>Now</span>
        </span>
        <span
          className="text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] mt-1"
          style={{ color: light ? "#cfd0ff" : navy, opacity: 0.85 }}
        >
          EXPERT HELP. REAL RESULTS.
        </span>
      </div>
    </div>
  );
}
