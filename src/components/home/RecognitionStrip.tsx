import { useState } from 'react';
import { recognitionsService } from '../../services/recognitionsService';
import { useApiResource } from '../../hooks/useApiResource';
import { Recognition } from '../../types';
import { SectionPanel, Skeleton, ErrorState, cx } from '../ui';
import Img from '../ui/Img';

// Each half of the marquee track holds at least this many logos, so the loop
// never shows a gap even when the API returns only one or two recognitions.
const MIN_ITEMS_PER_HALF = 8;
// Seconds per logo: keeps the scroll speed constant regardless of logo count.
const SECONDS_PER_ITEM = 3;

const Logo = ({ r, duplicate }: { r: Recognition; duplicate: boolean }) => {
  // Logos are rendered as a light silhouette on charcoal.
  const logo = (
    <Img
      src={r.image}
      alt={duplicate ? '' : r.name}
      width={160}
      height={40}
      widths={[160, 320, 480]}
      sizes="160px"
      className="h-10 w-40 object-contain opacity-80 transition-opacity duration-150 [filter:brightness(0)_invert(1)] group-hover:opacity-100"
    />
  );
  return r.website ? (
    <a
      href={r.website}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      className="group inline-flex rounded-image"
    >
      {logo}
    </a>
  ) : (
    <span className="group inline-flex">{logo}</span>
  );
};

/**
 * "Backed and recognised by" logo marquee: scrolls right-to-left in a loop.
 * Pauses on hover, keyboard focus and via the pause button. Static (wrapped
 * row, no duplicates) under prefers-reduced-motion. Hidden when there are no
 * trusted recognitions.
 */
const RecognitionStrip = () => {
  const { status, data, retry } = useApiResource(recognitionsService.getAll);
  const [paused, setPaused] = useState(false);
  const trusted = (data ?? []).filter((r) => (r.section ?? 'trusted') === 'trusted');

  if (status === 'success' && trusted.length === 0) return null;

  const reps = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / Math.max(trusted.length, 1)));
  const half = Array.from({ length: reps }, () => trusted).flat();
  // Only the very first copy of each logo is exposed to assistive tech and Tab.
  const track = [...half, ...half].map((r, i) => ({ r, duplicate: i >= trusted.length, key: `${r._id}-${i}` }));

  return (
    <SectionPanel tone="charcoal" roundedTop aria-labelledby="recognition-strip-title" className="py-12 md:py-14">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 id="recognition-strip-title" className="text-small text-cream opacity-60">
          Backed and recognised by
        </h2>
        {status === 'success' && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="marquee-toggle rounded-pill px-3 py-1 text-small text-cream opacity-70 hover:bg-[rgba(246,241,233,0.08)] hover:opacity-100"
          >
            {paused ? 'Play' : 'Pause'}
            <span className="sr-only"> logo scrolling</span>
          </button>
        )}
      </div>

      {status === 'loading' && (
        <div aria-busy="true" className="flex flex-wrap gap-8">
          <span className="sr-only">Loading…</span>
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} variant="text" lines={1} className="w-28" />
          ))}
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && (
        <div className="marquee">
          <ul
            className={cx('marquee__track', paused && 'marquee__track--paused')}
            style={{ animationDuration: `${half.length * SECONDS_PER_ITEM}s` }}
          >
            {track.map(({ r, duplicate, key }) => (
              <li key={key} aria-hidden={duplicate || undefined} className={cx('shrink-0', duplicate && 'marquee__dup')}>
                <Logo r={r} duplicate={duplicate} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SectionPanel>
  );
};

export default RecognitionStrip;
