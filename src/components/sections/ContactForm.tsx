"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { budgets, projectTypes } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-none border-0 border-b border-paper/25 bg-transparent px-0 py-3 text-lg text-paper outline-none transition-colors placeholder:text-paper/55 hover:border-paper/50 focus:border-blue-soft focus-visible:outline-none aria-[invalid=true]:border-blue-soft";

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email so we can reply.";
  if (message.length < 10) errors.message = "A sentence or two about the project helps us prepare.";
  return errors;
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm text-paper" role="alert">
      <span aria-hidden="true" className="grid size-4 place-items-center rounded-[3px] bg-blue-soft text-[10px] font-bold text-ink">
        !
      </span>
      {children}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          budget: data.get("budget"),
          types: data.getAll("types"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center gap-6" role="status" aria-live="polite">
        <span className="grid size-16 place-items-center rounded-[18px] bg-blue text-paper" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="size-8">
            <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="t-h3 max-w-[16ch]">Thanks — your brief is in.</h3>
        <p className="max-w-[44ch] text-paper/75">
          Aria will reply within one working day with a few questions and some times for a 30-minute intro call.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="min-h-11 font-semibold text-blue-soft underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action="/api/contact" method="post" onSubmit={onSubmit} noValidate className="relative grid gap-8" aria-describedby="form-note">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
        <div>
          <label htmlFor="cf-name" className="t-label text-mute-dark">
            Your name *
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            placeholder="Kristina Moore"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
          />
          <ErrorText id="cf-name-err">{errors.name}</ErrorText>
        </div>
        <div>
          <label htmlFor="cf-email" className="t-label text-mute-dark">
            Work email *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="kristina@company.com"
            className={field}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
          />
          <ErrorText id="cf-email-err">{errors.email}</ErrorText>
        </div>
      </div>

      <div>
        <label htmlFor="cf-company" className="t-label text-mute-dark">
          Company or current website
        </label>
        <input id="cf-company" name="company" autoComplete="organization" placeholder="company.com" className={field} />
      </div>

      <fieldset>
        <legend className="t-label mb-3 text-mute-dark">What do you need?</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((t, i) => (
            <label key={t} className="relative">
              <input type="checkbox" name="types" value={t} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-paper/20 px-4 text-[0.9375rem] font-medium transition-colors hover:border-paper/50 peer-checked:border-blue peer-checked:bg-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-soft">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="t-label mb-3 text-mute-dark">Budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b, i) => (
            <label key={b} className="relative">
              <input type="radio" name="budget" value={b} defaultChecked={i === 1} className="peer sr-only" />
              <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-paper/20 px-4 text-[0.9375rem] font-medium transition-colors hover:border-paper/50 peer-checked:border-paper peer-checked:bg-paper peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-soft">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="cf-message" className="t-label text-mute-dark">
          Tell us about the project *
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={3}
          required
          placeholder="Goals, timeline, links you love…"
          className={`${field} resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
        />
        <ErrorText id="cf-message-err">{errors.message}</ErrorText>
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p id="form-note" className="max-w-[36ch] text-sm text-mute-dark">
          We&rsquo;ll only use your details to reply. See our{" "}
          <a href="/privacy" className="text-paper underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send request"}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-sm text-paper" role="alert">
          Something went wrong on our side. Please email{" "}
          <a className="underline" href="mailto:hello@webtreo.com">
            hello@webtreo.com
          </a>{" "}
          and we&rsquo;ll pick it up from there.
        </p>
      )}
    </form>
  );
}
