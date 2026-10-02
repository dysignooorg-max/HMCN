/**
 * Lead capture.
 *
 * Three delivery strategies, chosen automatically:
 *
 *   1. LEAD_ENDPOINT set  → POST JSON to your form backend / CRM webhook.
 *                           Fully automatic, nothing for the visitor to do.
 *   2. WHATSAPP_URL set   → open a pre-filled WhatsApp chat with all details.
 *   3. otherwise          → open a pre-filled email to EMAIL.
 *
 * Strategy 2/3 exist so a lead is NEVER silently lost if the endpoint hasn't
 * been configured yet. The previous implementation discarded submissions
 * entirely while still showing a success message.
 */

import { EMAIL, WHATSAPP_URL, LEAD_ENDPOINT } from "../config";

export type Lead = {
  name: string;
  contact: string;
  /** Optional — not every form collects these. */
  email?: string;
  phone?: string;
  exam?: string;
  deadline?: string;
  message?: string;
  /** Which form produced this lead, for analytics. */
  source?: string;
  /** Honeypot — must always be empty. */
  company?: string;
};

export type LeadResult =
  | { ok: true; mode: "endpoint" }
  | { ok: true; mode: "handoff"; url: string }
  | { ok: false; error: string };

function isSpam(lead: Lead): boolean {
  return typeof lead.company === "string" && lead.company.trim() !== "";
}

function buildSummary(lead: Lead): string {
  return [
    `Name: ${lead.name}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.phone ? `Phone/WhatsApp: ${lead.phone}` : null,
    !lead.email && !lead.phone ? `Contact: ${lead.contact}` : null,
    lead.exam ? `Exam/Course: ${lead.exam}` : null,
    lead.deadline ? `Deadline: ${lead.deadline}` : null,
    lead.message ? `Details: ${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

async function postToEndpoint(lead: Lead): Promise<LeadResult> {
  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    throw new Error(`Server responded ${res.status}`);
  }
  return { ok: true, mode: "endpoint" };
}

/** Opens WhatsApp/mail with the lead pre-filled, so the message can be sent. */
function handoff(lead: Lead): LeadResult {
  const summary = buildSummary(lead);
  const url = WHATSAPP_URL
    ? `${WHATSAPP_URL}${WHATSAPP_URL.includes("?") ? "&" : "?"}text=${encodeURIComponent(summary)}`
    : `mailto:${EMAIL}?subject=${encodeURIComponent("New enquiry from the website")}&body=${encodeURIComponent(summary)}`;

  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return { ok: true, mode: "handoff", url };
}

export async function submitLead(lead: Lead): Promise<LeadResult> {
  if (isSpam(lead)) {
    // Pretend it worked so bots don't learn anything.
    return { ok: true, mode: "endpoint" };
  }

  if (LEAD_ENDPOINT) {
    try {
      return await postToEndpoint(lead);
    } catch (e) {
      // Don't lose the lead — fall back to a manual handoff.
      console.warn("Lead endpoint failed, falling back to handoff:", e);
      return handoff(lead);
    }
  }

  return handoff(lead);
}

/** True when a fully automatic backend is configured. */
export function hasLeadEndpoint(): boolean {
  return LEAD_ENDPOINT.length > 0;
}
