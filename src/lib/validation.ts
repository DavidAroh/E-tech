/** Shared client/server validation helpers for forms */

export const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  industry: 80,
  service: 120,
  message: 2000,
  newsletter: 254,
} as const;

export function isEmail(value: string): boolean {
  if (value.length > LIMITS.email) return false;
  // Practical RFC 5322-ish check (not perfect, good enough for intake)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function clampText(value: string, max: number): string {
  return value.trim().slice(0, max);
}

export function isPastDate(isoDate: string): boolean {
  if (!isoDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(`${isoDate}T00:00:00`);
  return d < today;
}

export function isOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}
