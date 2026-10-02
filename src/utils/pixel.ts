// Facebook (Meta) Pixel helper — CONSENT-GATED.
//
// The pixel script is injected ONLY after the visitor explicitly accepts
// cookies, and every conversion event is additionally guarded by the same
// check. Nothing is sent to Facebook before consent.
//
// This fixes a real bug in the original code: the pixel snippet in index.html
// called fbq('init') + fbq('track','PageView') on page load, so visitor data
// reached Facebook before anyone clicked "Accept", making the cookie banner
// legally meaningless.

import { META_PIXEL_ID } from "../config";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const CONSENT_KEY = "hmcn_consent";

type ConsentState = "accepted" | "declined" | "unset";

function consentState(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === "accepted" || v === "declined") return v;
    return "unset";
  } catch {
    // localStorage unavailable (private mode / blocked) → treat as no consent.
    return "unset";
  }
}

/** Loads fbevents.js and initialises the pixel. Safe to call repeatedly. */
export function loadPixel(): void {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  const fbq: any = function (...args: unknown[]) {
    fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

/** Called by the cookie banner when the visitor clicks "Accept All Cookies". */
export function grantConsent(): void {
  if (typeof window === "undefined") return;
  loadPixel();
  window.fbq?.("consent", "grant");
}

/** Called by the cookie banner when the visitor declines or dismisses. */
export function revokeConsent(): void {
  if (typeof window === "undefined") return;
  window.fbq?.("consent", "revoke");
}

function isConsented(): boolean {
  return consentState() === "accepted";
}

export function trackLead(): void {
  if (isConsented()) window.fbq?.("track", "Lead");
}

export function trackContact(): void {
  if (isConsented()) window.fbq?.("track", "Contact");
}

export function trackInitiateCheckout(): void {
  if (isConsented()) window.fbq?.("track", "InitiateCheckout");
}

/**
 * Called once on app start: if the visitor already accepted cookies on a
 * previous visit, re-activate the pixel without showing the banner again.
 */
export function initPixelIfConsented(): void {
  if (isConsented()) loadPixel();
}
