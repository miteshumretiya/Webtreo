import { NextResponse } from "next/server";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  budget?: unknown;
  types?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Contact form endpoint. Accepts JSON (from the enhanced form) or a regular
 * form post (no-JS fallback, redirected to /thanks). If CONTACT_WEBHOOK_URL is
 * set (Slack, Zapier, Make, Formspree…), the enquiry is forwarded there.
 */
export async function POST(request: Request) {
  const isJson = request.headers.get("content-type")?.includes("application/json");
  let body: Payload;
  try {
    if (isJson) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = { ...Object.fromEntries(form), types: form.getAll("types") };
    }
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // bots fill the hidden field — pretend success, store nothing
  if (str(body.website)) return respond(isJson, request.url);

  const enquiry = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    company: str(body.company, 200),
    budget: str(body.budget, 40),
    types: Array.isArray(body.types) ? body.types.map((t) => str(t, 40)).filter(Boolean).slice(0, 10) : [],
    message: str(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  if (enquiry.name.length < 2) errors.name = "Name is required";
  if (!EMAIL.test(enquiry.email)) errors.email = "A valid email is required";
  if (enquiry.message.length < 10) errors.message = "Message is too short";
  if (Object.keys(errors).length) {
    return isJson
      ? NextResponse.json({ ok: false, errors }, { status: 422 })
      : NextResponse.redirect(new URL("/#contact", request.url), 303);
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `New Webtreo enquiry from ${enquiry.name} <${enquiry.email}>`, ...enquiry }),
      });
    } catch (err) {
      console.error("[contact] webhook failed", err);
      return isJson
        ? NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 })
        : NextResponse.redirect(new URL("/#contact", request.url), 303);
    }
  } else {
    console.info("[contact] new enquiry", { ...enquiry, message: `${enquiry.message.slice(0, 80)}…` });
  }

  return respond(isJson, request.url);
}

function respond(isJson: boolean | undefined, url: string) {
  return isJson ? NextResponse.json({ ok: true }) : NextResponse.redirect(new URL("/thanks", url), 303);
}
