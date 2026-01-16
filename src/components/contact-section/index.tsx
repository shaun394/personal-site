import { useMemo, useRef, useState } from "react";
import { site } from "../../content/site";
import "./contact.css";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function clampLen(value: string, max: number) {
  const v = value ?? "";
  return v.length > max ? v.slice(0, max) : v;
}

export default function ContactSection() {
  const startedAtRef = useRef<number>(Date.now());

  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
    website: false,
  });

  const [status, setStatus] = useState<{
    state: "idle" | "sending" | "success" | "error";
    message?: string;
  }>({ state: "idle" });

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name) e.name = "Please enter your name.";
    if (!email) e.email = "Please enter your email.";
    else if (!isEmail(email)) e.email = "Please enter a valid email.";
    if (!subject) e.subject = "Please add a subject.";
    if (!message) e.message = "Please type a message.";

    // simple “too short” guard (also helps spam)
    if (message && message.length < 10) e.message = "Message is a bit too short.";

    return e;
  }, [form]);

  const hasErrors =
    !!errors.name || !!errors.email || !!errors.subject || !!errors.message;

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };

      // basic length limits (keeps payload sane)
      next.name = clampLen(next.name, 80);
      next.email = clampLen(next.email, 120);
      next.subject = clampLen(next.subject, 120);
      next.message = clampLen(next.message, 2000);
      next.website = clampLen(next.website, 120);

      return next;
    });
  }

  function markTouched<K extends keyof FormState>(key: K) {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // show validation if needed
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
      website: true,
    });

    // honeypot: if filled, silently succeed (don’t help bots)
    if (form.website.trim()) {
      setStatus({ state: "success", message: "Message sent." });
      return;
    }

    // minimum time on page before submit (anti-bot)
    const elapsedMs = Date.now() - startedAtRef.current;
    if (elapsedMs < 3500) {
      setStatus({
        state: "error",
        message: "Please take a second to review your message, then try again.",
      });
      return;
    }

    if (hasErrors) {
      setStatus({ state: "error", message: "Please fix the highlighted fields." });
      return;
    }

    try {
      setStatus({ state: "sending" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: form.website.trim(),
          startedAt: startedAtRef.current,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus({ state: "success", message: "Message sent. Thanks — I’ll get back to you soon." });
      setForm(initialState);
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
        website: false,
      });
      startedAtRef.current = Date.now();
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err instanceof Error ? err.message : "Could not send message. Please try again.",
      });
    }
  }

  return (
    <section className="contact-page">
      <div className="contact-wrap">
        <div className="contact-head">
          <div className="contact-pill">Contact</div>
          <h1 className="contact-title">
            Get in touch <span className="contact-title-accent">anytime</span>.
          </h1>
          <p className="contact-subtitle">
            If you’ve got a project, an opportunity, or a question — send a message below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left info card */}
          <aside className="contact-card">
            <div className="contact-card-glow" aria-hidden="true" />
            <h2 className="contact-card-title">Details</h2>

            <div className="contact-info">
              <div className="contact-info-row">
                <div className="contact-info-label">Location</div>
                <div className="contact-info-value">Cape Town, South Africa</div>
              </div>

              <div className="contact-info-row">
                <div className="contact-info-label">Email</div>
                <a className="contact-info-link" href="mailto:swanepoelshaun16@gmail.com">
                  shaun.swanepoel.dev@gmail.com
                </a>
              </div>

              <div className="contact-info-row">
                <div className="contact-info-label">Social</div>
                <div className="contact-socials">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      className="contact-social"
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-note">
              <span className="contact-dot" aria-hidden="true" />
              I usually reply within 24–48 hours.
            </div>
          </aside>

          {/* Form card */}
          <form className="contact-form" onSubmit={onSubmit}>
            <div className="contact-form-glow" aria-hidden="true" />

            {/* Honeypot */}
            <label className="contact-hp" aria-hidden="true">
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setField("website", e.target.value)}
              />
            </label>

            <div className="contact-field">
              <label className="contact-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className={`contact-input ${touched.name && errors.name ? "is-error" : ""}`}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                onBlur={() => markTouched("name")}
              />
              {touched.name && errors.name && <div className="contact-error">{errors.name}</div>}
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className={`contact-input ${touched.email && errors.email ? "is-error" : ""}`}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => markTouched("email")}
              />
              {touched.email && errors.email && <div className="contact-error">{errors.email}</div>}
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                className={`contact-input ${touched.subject && errors.subject ? "is-error" : ""}`}
                placeholder="What’s this about?"
                value={form.subject}
                onChange={(e) => setField("subject", e.target.value)}
                onBlur={() => markTouched("subject")}
              />
              {touched.subject && errors.subject && (
                <div className="contact-error">{errors.subject}</div>
              )}
            </div>

            <div className="contact-field">
              <label className="contact-label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className={`contact-textarea ${touched.message && errors.message ? "is-error" : ""}`}
                placeholder="Write your message…"
                rows={6}
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
                onBlur={() => markTouched("message")}
              />
              {touched.message && errors.message && (
                <div className="contact-error">{errors.message}</div>
              )}
            </div>

            <div className="contact-actions">
              <button className="contact-submit" type="submit" disabled={status.state === "sending"}>
                {status.state === "sending" ? "Sending…" : "Send message"}
              </button>

              {status.state !== "idle" && (
                <div
                  className={`contact-status ${
                    status.state === "success" ? "is-success" : status.state === "error" ? "is-error" : ""
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
