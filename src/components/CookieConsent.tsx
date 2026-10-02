import { useEffect, useState } from "react";
import { grantConsent, revokeConsent } from "../utils/pixel";

export default function CookieConsent({ onPrivacy }: { onPrivacy: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const val = localStorage.getItem("hmcn_consent");
      if (val === "accepted" || val === "declined") return;
    } catch {
      return;
    }
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  function handleAccept() {
    try {
      localStorage.setItem("hmcn_consent", "accepted");
    } catch { /* noop */ }
    grantConsent();
    setVisible(false);
  }

  function handleDecline() {
    try {
      localStorage.setItem("hmcn_consent", "declined");
    } catch { /* noop */ }
    revokeConsent();
    setVisible(false);
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 99999,
        background: "#3D348B",
        animation: "cookie-slide-up 0.4s ease-out both",
      }}
    >
      <style>{`
        @keyframes cookie-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-between gap-6" style={{ padding: "16px 32px" }}>
        <div style={{ flex: "0 1 70%" }}>
          <p style={{ color: "white", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>
            🍪 We use cookies to personalise your experience and show you relevant content on Facebook and Instagram. By accepting, you agree to our use of cookies for analytics and personalised advertising.{" "}
            <button
              onClick={onPrivacy}
              style={{
                color: "#F7B801",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                padding: 0,
              }}
            >
              Privacy Policy
            </button>
          </p>
        </div>
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handleDecline}
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.5)",
              color: "white",
              fontSize: "13px",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            style={{
              background: "#F35B04",
              border: "none",
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleDecline}
            aria-label="Close cookie banner"
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              padding: "0 0 0 6px",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden" style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <p style={{ color: "white", fontSize: "13px", lineHeight: 1.5, margin: 0, paddingRight: "24px" }}>
            🍪 We use cookies to personalise your experience and show you relevant content on Facebook and Instagram. By accepting, you agree to our use of cookies for analytics and personalised advertising.{" "}
            <button
              onClick={onPrivacy}
              style={{
                color: "#F7B801",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                padding: 0,
              }}
            >
              Privacy Policy
            </button>
          </p>
          <button
            onClick={handleDecline}
            aria-label="Close cookie banner"
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "22px",
              cursor: "pointer",
              padding: 0,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
          <button
            onClick={handleDecline}
            style={{
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.5)",
              color: "white",
              fontSize: "13px",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              minHeight: "48px",
            }}
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            style={{
              background: "#F35B04",
              border: "none",
              color: "white",
              fontSize: "13px",
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              minHeight: "48px",
            }}
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
