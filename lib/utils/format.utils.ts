export function normalizePhoneForTel(raw?: string): string | undefined {
  if (!raw) return undefined;
  const normalized = raw.replace(/[^\d+]/g, '').trim();
  return normalized.length > 0 ? normalized : undefined;
}
