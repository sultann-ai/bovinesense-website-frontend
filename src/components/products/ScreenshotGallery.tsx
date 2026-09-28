import { useCallback, useRef, useState } from 'react';
import { useModalDialog } from '../../hooks/useModalDialog';
import { ArrowCircleButton, Close } from '../ui';
import Img from '../ui/Img';

export interface ScreenshotGalleryProps {
  productName: string;
  screenshots: string[];
}

/**
 * Responsive screenshot grid; each thumbnail opens a lightbox dialog.
 * Lightbox: ←/→ navigate, Escape closes, Tab is trapped, focus returns to the thumbnail.
 */
const ScreenshotGallery = ({ productName, screenshots }: ScreenshotGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const count = screenshots.length;
  const altFor = (i: number) => `${productName} screenshot ${i + 1}`;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => setOpenIndex((i) => (i === null ? i : (i - 1 + count) % count)), [count]);
  const next = useCallback(() => setOpenIndex((i) => (i === null ? i : (i + 1) % count)), [count]);

  useModalDialog(openIndex !== null, close, dialogRef, {
    onKeyDown: (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    },
  });

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {screenshots.map((src, i) => (
          <li key={`${src}-${i}`}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open ${altFor(i)} in a larger view`}
              className="card-lift block w-full overflow-hidden rounded-image bg-cream-deep"
            >
              <Img
                src={src}
                alt={altFor(i)}
                width={800}
                height={500}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="card-media aspect-[16/10] w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} screenshots`}
          data-lenis-prevent
          className="fixed inset-0 z-[70] flex flex-col bg-charcoal text-cream"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex items-center justify-between p-4 md:p-6">
            <p className="text-small" aria-live="polite">
              {openIndex + 1} / {count}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close screenshots"
              className="inline-flex h-11 w-11 items-center justify-center rounded-pill text-cream hover:bg-charcoal-soft"
            >
              <Close />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-3 px-4 pb-8 md:gap-6 md:px-6">
            {count > 1 && <ArrowCircleButton aria-label="Previous screenshot" direction="left" onClick={prev} />}
            <Img
              src={screenshots[openIndex]}
              alt={altFor(openIndex)}
              width={1600}
              height={1000}
              widths={[960, 1280, 1600, 2000]}
              sizes="90vw"
              priority
              className="h-auto max-h-[78vh] w-auto min-w-0 max-w-full flex-1 rounded-image object-contain"
            />
            {count > 1 && <ArrowCircleButton aria-label="Next screenshot" direction="right" onClick={next} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ScreenshotGallery;
