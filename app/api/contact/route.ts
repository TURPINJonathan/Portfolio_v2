import nodemailer from 'nodemailer';

import { buildIncomingContactEmail } from '@/lib/email/templates/contactIncoming';
import { buildContactConfirmationEmail } from '@/lib/email/templates/contactConfirmation';
import { env } from 'process';

export const runtime = 'nodejs';

type Civility = 'madame' | 'monsieur' | 'autre' | 'non_specifiee';

interface ContactPayload {
  civility?: Civility;
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  message?: string;
  acceptPrivacyPolicy?: boolean;
  website?: string; // honeypot
}

interface RateLimitBucket {
  windowStartMs: number;
  count: number;
}

const RATE_LIMIT_GLOBAL_KEY = '__portfolio_contact_rate_limit__';

function getRateLimitStore() {
  const anyGlobal = globalThis as unknown as Record<string, unknown>;
  if (!anyGlobal[RATE_LIMIT_GLOBAL_KEY]) {
    anyGlobal[RATE_LIMIT_GLOBAL_KEY] = new Map<string, RateLimitBucket>();
  }
  return anyGlobal[RATE_LIMIT_GLOBAL_KEY] as Map<string, RateLimitBucket>;
}

function getClientIp(request: Request) {
  const headers = request.headers;
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  const candidates = [
    headers.get('x-real-ip'),
    headers.get('cf-connecting-ip'),
    headers.get('x-client-ip'),
    headers.get('x-forwarded'),
    headers.get('forwarded'),
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value) return value;
  }

  return 'unknown';
}

function parseNumberEnv(name: string, fallback: number) {
  const raw = getEnv(name);
  if (!raw) return fallback;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function rateLimitOrNull(options: { key: string; max: number; windowMs: number }) {
  const store = getRateLimitStore();
  const now = Date.now();
  const bucket = store.get(options.key);

  if (!bucket || now - bucket.windowStartMs >= options.windowMs) {
    store.set(options.key, { windowStartMs: now, count: 1 });
    return null;
  }

  if (bucket.count >= options.max) {
    const retryAfterSeconds = Math.ceil((options.windowMs - (now - bucket.windowStartMs)) / 1000);
    return { retryAfterSeconds };
  }

  bucket.count += 1;
  store.set(options.key, bucket);
  return null;
}

function asTrimmedString(value: unknown) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clamp(value: string, maxLen: number) {
  return value.length > maxLen ? value.slice(0, maxLen) : value;
}

function getEnv(name: string) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function extractEmailAddress(value: string) {
  const angleMatch = value.match(/<([^>]+)>/);
  const candidate = (angleMatch?.[1] ?? value).trim();
  return isValidEmail(candidate) ? candidate : undefined;
}

function formatFromHeader(options: { name: string; address: string }) {
  const trimmedName = options.name.trim();
  if (!trimmedName) return options.address;

  const safeName = trimmedName.replaceAll('"', '\\"');
  return `"${safeName}" <${options.address}>`;
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: if filled, pretend success to avoid feeding bots.
  if (asTrimmedString(payload.website)) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const civility = payload.civility;
  const firstName = asTrimmedString(payload.firstName);
  const lastName = asTrimmedString(payload.lastName);
  const company = asTrimmedString(payload.company);
  const role = asTrimmedString(payload.role);
  const email = asTrimmedString(payload.email);
  const phone = asTrimmedString(payload.phone);
  const message = asTrimmedString(payload.message);
  const acceptPrivacyPolicy = Boolean(payload.acceptPrivacyPolicy);

  const errors: Record<string, string> = {};

  if (!civility || civility === 'non_specifiee') {
    errors.civility = 'Champ requis.';
  } else if (civility !== 'madame' && civility !== 'monsieur' && civility !== 'autre') {
    errors.civility = 'Valeur invalide.';
  }

  if (!firstName) errors.firstName = 'Champ requis.';
  if (!lastName) errors.lastName = 'Champ requis.';

  if (!email) errors.email = 'Champ requis.';
  else if (!isValidEmail(email)) errors.email = 'Email invalide.';

  if (!message) errors.message = 'Champ requis.';
  else if (message.length < 10) errors.message = 'Message trop court.';

  if (!acceptPrivacyPolicy) errors.acceptPrivacyPolicy = 'Vous devez accepter la politique de confidentialité.';

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, error: 'validation_error', fieldErrors: errors }, { status: 400 });
  }

  // At this point, these fields are guaranteed by validation above.
  const requiredFirstName = firstName as string;
  const requiredLastName = lastName as string;
  const requiredEmail = email as string;
  const requiredMessage = message as string;

  // Rate limiting (best-effort, in-memory)
  const windowMs = parseNumberEnv('CONTACT_RATE_LIMIT_WINDOW_MS', 10 * 60 * 1000);
  const maxPerIp = parseNumberEnv('CONTACT_RATE_LIMIT_MAX_PER_IP', 6);
  const maxPerEmail = parseNumberEnv('CONTACT_RATE_LIMIT_MAX_PER_EMAIL', 3);

  const clientIp = getClientIp(request);
  const ipKey = `ip:${clientIp}`;
  const ipBlocked = rateLimitOrNull({ key: ipKey, max: maxPerIp, windowMs });
  if (ipBlocked) {
    return Response.json(
      {
        ok: false,
        error: 'rate_limited',
        message: 'Trop de tentatives. Réessayez un peu plus tard.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(ipBlocked.retryAfterSeconds) },
      },
    );
  }

  const emailKey = `email:${requiredEmail.toLowerCase()}`;
  const emailBlocked = rateLimitOrNull({ key: emailKey, max: maxPerEmail, windowMs });
  if (emailBlocked) {
    return Response.json(
      {
        ok: false,
        error: 'rate_limited',
        message: 'Trop de tentatives avec cet email. Réessayez un peu plus tard.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(emailBlocked.retryAfterSeconds) },
      },
    );
  }

  const smtpHost = getEnv('CONTACT_SMTP_HOST');
  const smtpPortRaw = getEnv('CONTACT_SMTP_PORT');
  const smtpUser = getEnv('CONTACT_SMTP_USER');
  const smtpPass = getEnv('CONTACT_SMTP_PASS');
  const smtpSecureRaw = getEnv('CONTACT_SMTP_SECURE');
  const publicContactEmail = getEnv('NEXT_PUBLIC_CONTACT_EMAIL');
  const smtpFrom = getEnv('CONTACT_SMTP_FROM');
  const smtpEnvelopeFromRaw = getEnv('CONTACT_SMTP_ENVELOPE_FROM');

  const to = getEnv('CONTACT_FORM_TO') ?? getEnv('NEXT_PUBLIC_CONTACT_EMAIL');

  const siteUrl = getEnv('NEXT_PUBLIC_SITE_URL') ?? 'http://localhost:3000';
  const siteName = getEnv('NEXT_PUBLIC_SITE_NAME') ?? 'Portfolio';
  const fromName = getEnv('CONTACT_SMTP_FROM_NAME') ?? getEnv('NEXT_PUBLIC_LEGAL_OWNER_NAME') ?? siteName;

  if (!smtpHost || !smtpPortRaw || !smtpUser || !smtpPass || !to) {
    return Response.json(
      {
        ok: false,
        error: 'not_configured',
        message:
          'Formulaire non configuré. Définis CONTACT_SMTP_HOST, CONTACT_SMTP_PORT, CONTACT_SMTP_USER, CONTACT_SMTP_PASS et CONTACT_FORM_TO (ou NEXT_PUBLIC_CONTACT_EMAIL).',
      },
      { status: 500 },
    );
  }

  const smtpHostValue = smtpHost as string;
  const smtpUserValue = smtpUser as string;
  const smtpPassValue = smtpPass as string;
  const toValue = to as string;

  const smtpPort = Number(smtpPortRaw);
  if (!Number.isFinite(smtpPort) || smtpPort <= 0) {
    return Response.json({ ok: false, error: 'invalid_smtp_port' }, { status: 500 });
  }

  const smtpSecure = smtpSecureRaw ? smtpSecureRaw === 'true' || smtpSecureRaw === '1' : smtpPort === 465;

  const smtpFromValue = publicContactEmail ?? smtpFrom ?? smtpUserValue;
  const fromAddress = extractEmailAddress(smtpFromValue) ?? smtpUserValue;
  const fromHeader = formatFromHeader({ name: fromName, address: fromAddress });

  const smtpEnvelopeFrom = smtpEnvelopeFromRaw
    ? (extractEmailAddress(smtpEnvelopeFromRaw) ?? fromAddress)
    : fromAddress;

  const listUnsubscribeAddress = fromAddress;

  const transporter = nodemailer.createTransport({
    host: smtpHostValue,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUserValue,
      pass: smtpPassValue,
    },
  });

  const safeFirstName = clamp(requiredFirstName, 80);
  const safeLastName = clamp(requiredLastName, 80);
  const safeCompany = company ? clamp(company, 120) : undefined;
  const safeRole = role ? clamp(role, 120) : undefined;
  const safePhone = phone ? clamp(phone, 40) : undefined;
  const safeMessage = clamp(requiredMessage, 4000);

  const civilityLabel =
    civility === 'madame'
      ? 'Madame'
      : civility === 'monsieur'
        ? 'Monsieur'
        : civility === 'autre'
          ? 'Autre'
          : 'Non spécifiée';
  const submittedAt = new Date();
  const submittedAtParis = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(submittedAt);

  const incomingEmail = buildIncomingContactEmail({
    siteName,
    siteUrl,
    civilityLabel,
    firstName: safeFirstName,
    lastName: safeLastName,
    company: safeCompany,
    role: safeRole,
    email: requiredEmail,
    phone: safePhone,
    message: safeMessage,
    submittedAtParis,
  });

  const confirmationEmail = buildContactConfirmationEmail({
    siteName,
    siteUrl,
    firstName: safeFirstName,
    lastName: safeLastName,
    message: safeMessage,
    submittedAtParis,
    email: env.NEXT_PUBLIC_CONTACT_EMAIL ?? smtpFromValue,
    phone: env.NEXT_PUBLIC_CONTACT_PHONE ?? '',
  });

  try {
    await transporter.sendMail({
      from: fromHeader,
      to: toValue,
      replyTo: requiredEmail,
      envelope: { from: smtpEnvelopeFrom, to: toValue },
      subject: incomingEmail.subject,
      text: incomingEmail.text,
      html: incomingEmail.html,
    });
  } catch {
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  let confirmationSent = false;
  try {
    await transporter.sendMail({
      from: fromHeader,
      to: requiredEmail,
      replyTo: toValue,
      envelope: { from: smtpEnvelopeFrom, to: requiredEmail },
      subject: confirmationEmail.subject,
      text: confirmationEmail.text,
      html: confirmationEmail.html,
      headers: {
        'List-Unsubscribe': `<mailto:${listUnsubscribeAddress}>`,
      },
    });
    confirmationSent = true;
  } catch {
    // best-effort: we still return OK if the main email has been sent.
    confirmationSent = false;
  }

  return Response.json({ ok: true, confirmationSent }, { status: 200 });
}
