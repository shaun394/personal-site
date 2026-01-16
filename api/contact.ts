import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;   // honeypot
  startedAt?: number; // timestamp from client
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic in-memory rate limit (works per serverless instance; good first layer)
const bucket = new Map<string, { count: number; resetAt: number }>();
function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = bucket.get(key);
  if (!current || now > current.resetAt) {
    bucket.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (current.count >= limit) return { ok: false };
  current.count += 1;
  bucket.set(key, current);
  return { ok: true };
}

function getClientIp(req: VercelRequest) {
  const xf = (req.headers["x-forwarded-for"] || "") as string;
  return xf.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Origin check (helps block random third-party posts)
  const origin = (req.headers.origin || "") as string;
  const allowedOrigin = process.env.CONTACT_ALLOWED_ORIGIN || "";
  if (allowedOrigin && origin && origin !== allowedOrigin) {
    return res.status(403).json({ ok: false, error: "Forbidden" });
  }

  const ip = getClientIp(req);
  const rl = rateLimit(ip, 5, 10 * 60 * 1000); // 5 requests / 10 minutes / IP
  if (!rl.ok) {
    return res.status(429).json({ ok: false, error: "Too many requests. Try again later." });
  }

  const body = (req.body || {}) as Body;

  // Honeypot: if filled, pretend success (don’t help bots)
  if ((body.website || "").trim()) {
    return res.status(200).json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;

  // Minimum time before submit (anti-bot)
  if (!startedAt || Date.now() - startedAt < 3500) {
    return res.status(400).json({ ok: false, error: "Please try again." });
  }

  // Validate
  if (!name || name.length > 80) return res.status(400).json({ ok: false, error: "Invalid name." });
  if (!email || email.length > 120 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Invalid email." });
  }
  if (!subject || subject.length > 120) {
    return res.status(400).json({ ok: false, error: "Invalid subject." });
  }
  if (!message || message.length < 10 || message.length > 2000) {
    return res.status(400).json({ ok: false, error: "Invalid message." });
  }

  const SMTP_HOST = process.env.SMTP_HOST!;
  const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
  const SMTP_USER = process.env.SMTP_USER!;
  const SMTP_PASS = process.env.SMTP_PASS!;
  const TO_EMAIL = process.env.TO_EMAIL!;
  const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
    return res.status(500).json({ ok: false, error: "Email service not configured." });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const safeSubject = `[Portfolio Contact] ${subject}`;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `IP: ${ip}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: safeSubject,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("CONTACT_SEND_FAILED", {
      message: err instanceof Error ? err.message : String(err),
    });

    return res.status(500).json({ ok: false, error: "Failed to send email. Please try again." });
  }
}
