/** Common srcset width sets for <Img>. */
export const WIDTHS = {
  card: [400, 640, 800, 1200],
  full: [640, 960, 1280, 1600, 2000],
  logo: [160, 320, 480],
  avatar: [96, 192, 288],
} as const;

/** True for Cloudinary image delivery URLs (https://res.cloudinary.com/<cloud>/image/upload/...). */
export const isCloudinaryUrl = (url: string | undefined): url is string => {
  if (!url) return false;
  try {
    const { hostname, pathname } = new URL(url);
    return hostname === 'res.cloudinary.com' && pathname.includes('/image/upload/');
  } catch {
    return false;
  }
};

/**
 * Inserts delivery transformations into a Cloudinary URL:
 *   f_auto  → WebP/AVIF when the browser supports it
 *   q_auto  → automatic quality
 *   c_limit,w_<width> → resize down to at most `width` px (never upscales)
 * Any non-Cloudinary URL is returned untouched. Frontend-only: stored URLs are not modified.
 */
export const cloudinaryUrl = (url: string | undefined, width: number): string | undefined => {
  if (!isCloudinaryUrl(url)) return url;
  const w = Math.round(width);
  return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_limit,w_${w}/`);
};

/** `srcset` string for a Cloudinary URL at the given widths, or undefined for any other URL. */
export const cloudinarySrcSet = (url: string | undefined, widths: number[]): string | undefined => {
  if (!isCloudinaryUrl(url)) return undefined;
  return widths.map((w) => `${cloudinaryUrl(url, w)} ${w}w`).join(', ');
};

/** @deprecated Use cloudinaryUrl (same behaviour). Kept for existing callers. */
export const optimizeImage = cloudinaryUrl;

/** Shortens text to about `max` characters on a word boundary. */
export const truncate = (text: string | undefined, max = 120): string => {
  if (!text) return '';
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
};

/** "12 March 2026" */
export const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
