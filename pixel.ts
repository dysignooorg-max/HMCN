// Facebook Pixel event helper.
// Events ONLY fire when localStorage "hmcn_consent" === "accepted".

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function isConsented(): boolean {
  try {
    return localStorage.getItem("hmcn_consent") === "accepted";
  } catch {
    return false;
  }
}

export function trackLead(): void {
  if (isConsented() && window.fbq) {
    window.fbq("track", "Lead");
  }
}

export function trackContact(): void {
  if (isConsented() && window.fbq) {
    window.fbq("track", "Contact");
  }
}

export function trackInitiateCheckout(): void {
  if (isConsented() && window.fbq) {
    window.fbq("track", "InitiateCheckout");
  }
}
