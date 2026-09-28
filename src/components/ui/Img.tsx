import { cloudinarySrcSet, cloudinaryUrl, isCloudinaryUrl, WIDTHS } from '../../utils/images';

export interface ImgProps {
  src: string | undefined;
  alt: string;
  /** Intrinsic width/height: reserves the aspect ratio so nothing shifts while loading. */
  width: number;
  height: number;
  /** srcset widths (Cloudinary only). */
  widths?: readonly number[];
  /** `sizes` attribute describing the rendered width. */
  sizes?: string;
  /** Above-the-fold hero/LCP image: eager + high priority. Everything else is lazy. */
  priority?: boolean;
  className?: string;
}

/**
 * The one way to render content images. Adds Cloudinary f_auto/q_auto/width
 * transformations + srcset, explicit dimensions, lazy loading and async decoding.
 * Non-Cloudinary URLs are rendered as-is.
 */
const Img = ({ src, alt, width, height, widths = WIDTHS.card, sizes, priority = false, className }: ImgProps) => {
  const cloud = isCloudinaryUrl(src);
  const largest = widths[widths.length - 1] ?? width;
  return (
    <img
      src={cloud ? cloudinaryUrl(src, largest) : src}
      srcSet={cloud ? cloudinarySrcSet(src, [...widths]) : undefined}
      sizes={cloud ? sizes ?? '100vw' : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchpriority: 'high' } : {})}
      className={className}
    />
  );
};

export default Img;
