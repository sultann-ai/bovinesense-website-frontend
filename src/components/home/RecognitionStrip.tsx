import { useState } from 'react';
import { recognitionsService } from '../../services/recognitionsService';
import { useApiResource } from '../../hooks/useApiResource';
import { Recognition } from '../../types';
import { SectionPanel, ErrorState, cx } from '../ui';
import Img from '../ui/Img';

// Each half of the marquee track holds at least this many logos, so the loop
// never shows a gap even when the API returns only one or two recognitions.
const MIN_ITEMS_PER_HALF = 8;
// Seconds per logo: keeps the scroll speed constant regardless of logo count.
const SECONDS_PER_ITEM = 3.5;

// Every logo sits on the same cream tile, in its original colours, so logos with
// their own backgrounds or dark marks stay legible on the charcoal panel.
const TILE = 'flex h-20 w-44 items-center justify-center rounded-card bg-cream px-5 py-3 transition-colors duration-150 md:h-24 md:w-52';

const Logo = ({ r, duplicate }: { r: Recognition; duplicate: boolean }) => {
  const logo = (
    <Img
      src={r.image}
      alt={duplicate ? '' : r.name}
      width={168}
      height={72}
      widths={[200, 400, 600]}
      sizes="(min-width: 768px) 168px, 136px"
      className="h-full w-full object-contain"
    />
  );
  return r.website ? (
    <a
      href={r.website}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={duplicate ? -1 : undefined}
      className={cx(TILE, 'hover:bg-white')}
    >
      {logo}
    </a>
  ) : (
    <span className={TILE}>{logo}</span>
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
        <h2 id="recognition-strip-title" className="text-body font-semibold text-cream">
          Backed and recognised by
        </h2>
        {status === 'success' && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="marquee-toggle inline-flex min-h-11 items-center rounded-pill px-4 text-small text-cream opacity-70 hover:bg-[rgba(246,241,233,0.08)] hover:opacity-100"
          >
            {paused ? 'Play' : 'Pause'}
            <span className="sr-only"> logo scrolling</span>
          </button>
        )}
      </div>

      {status === 'loading' && (
        <div aria-busy="true" className="flex gap-5 overflow-hidden">
          <span className="sr-only">Loading…</span>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} aria-hidden="true" className="skeleton skeleton--dark h-20 w-44 shrink-0 rounded-card md:h-24 md:w-52" />
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
