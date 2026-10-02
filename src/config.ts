/**
 * ============================================================================
 *  BUSINESS CONFIGURATION — FILL THESE IN BEFORE GOING LIVE
 * ============================================================================
 *
 *  Everything below marked "TODO" is currently a placeholder. Anything left
 *  blank degrades gracefully (e.g. an unset WhatsApp number hides the
 *  WhatsApp label instead of showing a broken link), but you must complete
 *  these before launch.
 */

/** Meta (Facebook) Pixel ID used for ad tracking. */
export const META_PIXEL_ID: string = "1006351395297013";

/**
 * Facebook page/profile URL.
 * TODO: this currently points to a personal profile (profile.php?id=...).
 *       Create a proper Facebook Business Page and use that URL instead —
 *       personal profiles can be restricted or banned without notice.
 */
export const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61589640929259";

/**
 * Where lead form submissions are sent.
 *
 * OPTIONS (all have a free tier):
 *   • Formspree  → "https://formspree.io/f/YOUR_ID"
 *   • Web3Forms  → "https://api.web3forms.com/submit"  (put the key in the body)
 *   • Your own API / Zapier / Make / n8n webhook URL
 *
 * Leave empty ("") and the site falls back to opening a pre-filled
 * WhatsApp or email message so the lead is still delivered manually —
 * just slower for the visitor.
 */
export const LEAD_ENDPOINT: string = "";

/**
 * WhatsApp click-to-chat link.
 *
 * Format: "https://wa.me/<country code><number>" — digits only, no "+",
 * spaces, dashes or brackets, or the link 404s in the WhatsApp app.
 */
export const WHATSAPP_URL: string = "https://wa.me/12143560059";

/**
 * Public phone number, digits only, in E.164 format (no "+" or dashes).
 *
 * Used for the `tel:` fallback and for Schema.org structured data.
 * NOTE: on this site phone links deliberately open WhatsApp instead of
 * dialling — see `phoneUrl()` below and `PHONE_OPENS_WHATSAPP`.
 */
export const PHONE_E164: string = "12143560059";

/** Phone number as displayed to humans. */
export const PHONE_DISPLAY: string = "+1 (214) 356-0059";

/**
 * When true, every phone link opens a WhatsApp chat instead of dialling.
 *
 * Set by the site owner: tapping the phone number or any "call" button
 * should start a WhatsApp conversation, so enquiries always land in
 * WhatsApp rather than being missed as a missed call.
 *
 * Flip to `false` to restore normal `tel:` dialling.
 */
export const PHONE_OPENS_WHATSAPP = true;

/** Support inbox. TODO: confirm this mailbox exists and is monitored. */
export const EMAIL: string = "hello@helpmycoursenow.com";

/** Privacy contact. TODO: confirm this mailbox exists and is monitored. */
export const PRIVACY_EMAIL: string = "privacy@helpmycoursenow.com";

/**
 * Optional explainer video for the "How It Works" page.
 *
 * Use an EMBED url, e.g. "https://www.youtube.com/embed/VIDEO_ID".
 * Leave empty ("") and the video block is hidden completely — no
 * "Coming soon" placeholder is shown to visitors.
 */
export const VIDEO_EMBED_URL: string = "";

/** Instagram profile URL. */
export const INSTAGRAM_URL: string = "";

/**
 * Best available "talk to a human now" link, in priority order.
 * Used by the floating chat button, sticky mobile bar and every WhatsApp CTA.
 */
export function chatUrl(): string {
  return WHATSAPP_URL || FACEBOOK_URL;
}

/**
 * Where the phone number and every "call" button should point.
 *
 * With `PHONE_OPENS_WHATSAPP` enabled (the current setting) this returns the
 * WhatsApp chat link, so tapping the phone number opens WhatsApp rather than
 * the dialler. Otherwise it falls back to a normal `tel:` link.
 */
export function phoneUrl(): string {
  if (PHONE_OPENS_WHATSAPP && WHATSAPP_URL) return WHATSAPP_URL;
  if (WHATSAPP_URL && !PHONE_E164) return WHATSAPP_URL;
  return `tel:+${PHONE_E164}`;
}

/**
 * Opens WhatsApp with an optional pre-filled message.
 * Used for phone/WhatsApp CTAs so the visitor never has to type the number.
 */
export function whatsappUrl(message?: string): string {
  const base = WHATSAPP_URL || FACEBOOK_URL;
  if (!message || !WHATSAPP_URL) return base;
  return `${base}${base.includes("?") ? "&" : "?"}text=${encodeURIComponent(message)}`;
}

/** True when a real WhatsApp number has been configured. */
export function hasWhatsApp(): boolean {
  return WHATSAPP_URL.length > 0;
}

/** True when phone numbers/buttons open WhatsApp instead of dialling. */
export function phoneOpensWhatsApp(): boolean {
  return PHONE_OPENS_WHATSAPP && hasWhatsApp();
}

/**
 * Layout constants — these MUST stay in sync with each other.
 *
 * ANNOUNCE_H  the orange announcement bar
 * HEADER_H    the purple navbar
 * HEADER_BORDER_H  the gold separator under the navbar
 *
 * The navbar and the scroll CTA bar use these as their sticky `top` offsets.
 * Previously they were hard-coded (42px / 117px) and did not match the real
 * rendered heights, so the bars overlapped each other.
 */
export const ANNOUNCE_H = 44;
export const HEADER_H = 72;
export const HEADER_BORDER_H = 3;

/** Latest year shown in the footer copyright. */
export const COPYRIGHT_YEAR = new Date().getFullYear();
