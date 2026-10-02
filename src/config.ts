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
 * WhatsApp click-to-chat link, e.g. "https://wa.me/15551234567".
 * Strongly recommended. Several buttons are styled bright WhatsApp green and
 * labelled "Chat With Us Now"; with this empty they render as "Message Us"
 * and point at Facebook instead.
 * Also used as the fallback destination for lead forms.
 */
export const WHATSAPP_URL: string = "";

/**
 * Public phone number, digits only, in E.164 format (no spaces or dashes).
 * Leave empty ("") and every "Call Us 24/7" button hides itself rather than
 * dialling a dead number. Set it and the buttons appear automatically.
 */
export const PHONE_E164: string = "";

/** Phone number as displayed to humans, e.g. "+1 (555) 123-4567". */
export const PHONE_DISPLAY: string = "";

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
 * Used by the floating chat button and the sticky mobile bar.
 */
export function chatUrl(): string {
  return WHATSAPP_URL || FACEBOOK_URL;
}

/** True when a real WhatsApp number has been configured. */
export function hasWhatsApp(): boolean {
  return WHATSAPP_URL.length > 0;
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
