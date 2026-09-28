import DOMPurify from 'dompurify';
import { cloudinaryUrl } from './images';

/**
 * Sanitizer for rich-text HTML coming from the API (CLAUDE.md rule 9).
 * Allowed tags: p, h2–h4, ul, ol, li, strong, em, a, br, blockquote, img.
 * Allowed attributes: a → href, title, target, rel; img → src, alt.
 * Everything else (scripts, styles, event handlers, classes, ids, iframes…) is stripped.
 */
const ALLOWED_TAGS = ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'blockquote', 'img'];
const ATTRS_BY_TAG: Record<string, string[]> = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt'],
};

const purifier = DOMPurify(window);

// Per-tag attribute allowlist (DOMPurify's ALLOWED_ATTR is global, so narrow it here).
purifier.addHook('uponSanitizeAttribute', (node, data) => {
  const allowed = ATTRS_BY_TAG[node.nodeName.toLowerCase()] ?? [];
  if (!allowed.includes(data.attrName)) {
    data.keepAttr = false;
  }
});

// Links that open a new tab always get rel="noopener noreferrer".
purifier.addHook('afterSanitizeAttributes', (node) => {
  if (node.nodeName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
  if (node.nodeName === 'IMG') {
    const src = node.getAttribute('src') ?? undefined;
    const optimised = cloudinaryUrl(src, 1440);
    if (optimised && optimised !== src) node.setAttribute('src', optimised);
    node.setAttribute('loading', 'lazy');
    node.setAttribute('decoding', 'async');
    if (!node.hasAttribute('alt')) node.setAttribute('alt', '');
  }
});

export const sanitizeRichText = (html: string | undefined | null): string => {
  if (!html) return '';
  return purifier.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt'],
  });
};

/** True when the value still has visible content (text or an image) after sanitizing. */
export const hasRichTextContent = (value: string | undefined | null): boolean => {
  const raw = (value ?? '').trim();
  if (!raw) return false;
  if (!looksLikeHtml(raw)) return true;
  const clean = sanitizeRichText(raw);
  if (/<img\b/i.test(clean)) return true;
  const doc = new DOMParser().parseFromString(clean, 'text/html');
  return (doc.body.textContent ?? '').trim() !== '';
};

/** Visible text of the value after sanitizing (for word counts, previews). */
export const richTextToPlainText = (value: string | undefined | null): string => {
  const raw = (value ?? '').trim();
  if (!raw) return '';
  if (!looksLikeHtml(raw)) return raw;
  const doc = new DOMParser().parseFromString(sanitizeRichText(raw), 'text/html');
  return (doc.body.textContent ?? '').trim();
};

/** Reading time in whole minutes at 200 words per minute (minimum 1). */
export const readingMinutes = (value: string | undefined | null): number => {
  const raw = (value ?? '').trim();
  let text = raw;
  if (looksLikeHtml(raw)) {
    // Space before every tag so adjacent blocks (</h2><p>) don't merge into one word.
    const spaced = sanitizeRichText(raw).replace(/</g, ' <');
    text = new DOMParser().parseFromString(spaced, 'text/html').body.textContent ?? '';
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

/** True when the string contains HTML tags (vs. plain text with line breaks). */
export const looksLikeHtml = (value: string) => /<[a-z][\s\S]*>/i.test(value);
