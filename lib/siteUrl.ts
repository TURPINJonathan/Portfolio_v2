export function getBaseUrl(): string {
  const explicitPublicUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicitPublicUrl && explicitPublicUrl.length > 0) return explicitPublicUrl;

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.length > 0) return `https://${vercelUrl}`;

  return 'http://localhost:3000';
}

export function getNormalizedBaseUrl(): string {
  return getBaseUrl().replace(/\/$/, '');
}
