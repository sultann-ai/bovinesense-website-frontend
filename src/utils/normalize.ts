/**
 * Defensive normaliser for API string-array fields (Project.tags / features /
 * technologies / screenshots). The old admin panel sent some arrays as
 * JSON-encoded strings, so stored values can look like any of:
 *   ["a", "b"]            → used as-is
 *   ['["a","b"]']         → single element that parses as a JSON array → ["a", "b"]
 *   "a, b"                → plain string → split on commas → ["a", "b"]
 *   '["a","b"]'           → string that parses as a JSON array → ["a", "b"]
 * Always returns trimmed, non-empty strings. Never throws. Frontend-only;
 * the backend data is not modified.
 */
const parseJsonArray = (value: string): unknown[] | null => {
  const trimmed = value.trim();
  if (!trimmed.startsWith('[')) return null;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const clean = (items: unknown[]): string[] =>
  items
    .filter((item): item is string | number => typeof item === 'string' || typeof item === 'number')
    .map((item) => String(item).trim())
    .filter(Boolean);

export const normalizeStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    if (value.length === 1 && typeof value[0] === 'string') {
      const parsed = parseJsonArray(value[0]);
      if (parsed) return clean(parsed);
    }
    return clean(value);
  }
  if (typeof value === 'string') {
    const parsed = parseJsonArray(value);
    if (parsed) return clean(parsed);
    return clean(value.split(','));
  }
  return [];
};

/** "AI/ML" → "ai-ml", "Web Development" → "web-development". */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
