import { CSSProperties, useEffect, useState } from 'react';
import { Button, SignalArc, TagPill, ToneContext, Img, cx } from '../ui';

export interface HomeHeroProps {
  /** Strongest real credential. Owner confirms the text. */
  credential: string;
  /** Hero photo. Leave undefined until the real asset exists (no stock photos). */
  image?: { src: string; alt: string };
  /**
   * Where the ear tag sits in the photo, as % of the frame. The animated
   * SignalArc radiates from this point. Adjust once the real photo is in.
   */
  earTagPoint?: { x: number; y: number };
}

// TODO(owner sign-off): placeholder headline and supporting copy.
const HEADLINE_LEAD = 'Know when a cow is sick — ';
const HEADLINE_ACCENT = 'before she shows it';
const HEADLINE_TAIL = '.';
const SUPPORTING =
  'Bovine pairs smart ear tags and neck collars with AI health analytics, so changes in each animal are flagged early.';

const ARC_SIZE = 140;

/*
 * Load sequence (~1.1s, once per page load; static under reduced motion):
 *   0ms    arc shape   scale 0.9→1 + fade, 450ms
 *   200ms  image       fade + rise 20px, 500ms
 *   300ms  pill → h1 → paragraph, fade + rise 12px, staggered 80ms
 *   750ms  buttons     fade + rise 14px, 400ms
 *   900ms  SignalArc   starts its loop
 * Everything is in the initial render (no delayed mounting), so LCP is not delayed.
 */
let heroHasPlayed = false;

type Step = { delay: number; rise: number; dur?: number; lcp?: boolean };
const seq = ({ delay, rise, dur = 500, lcp = false }: Step): CSSProperties =>
  ({
    '--hero-delay': `${delay}ms`,
    '--hero-rise': `${rise}px`,
    '--hero-dur': `${dur}ms`,
    // LCP elements start at 0.01 so the browser records them as painted immediately.
    '--hero-from-opacity': lcp ? '0.01' : '0',
  }) as CSSProperties;

const HomeHero = ({ credential, image, earTagPoint = { x: 58, y: 40 } }: HomeHeroProps) => {
  // Play only on the first mount of this page load (not when navigating back to /).
  const [play] = useState(() => !heroHasPlayed);
  useEffect(() => {
    heroHasPlayed = true;
  }, []);

  const step = (s: Step) => (play ? { className: 'hero-seq', style: seq(s) } : { className: '', style: undefined });

  const pill = step({ delay: 300, rise: 12 });
  const title = step({ delay: 380, rise: 12, lcp: true });
  const para = step({ delay: 460, rise: 12 });
  const buttons = step({ delay: 750, rise: 14, dur: 400 });
  const frame = step({ delay: 200, rise: 20, lcp: true });

  return (
    <section aria-labelledby="home-hero-title" className="overflow-x-clip bg-cream text-ink">
      <ToneContext.Provider value="light">
        <div className="container-page grid min-h-[92vh] items-center gap-12 pb-20 pt-28 md:pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          {/* Text */}
          <div className="lg:col-span-6">
            <div className={pill.className} style={pill.style}>
              <TagPill label={credential} />
            </div>
            <h1 id="home-hero-title" className={cx('mt-6 text-hero text-charcoal', title.className)} style={title.style}>
              {HEADLINE_LEAD}
              <span className="text-terracotta">{HEADLINE_ACCENT}</span>
              {HEADLINE_TAIL}
            </h1>
            <p className={cx('mt-6 max-w-measure text-body', para.className)} style={para.style}>
              {SUPPORTING}
            </p>
            <div className={cx('mt-8 flex flex-wrap gap-4', buttons.className)} style={buttons.style}>
              <Button to="/products" arrow>See the products</Button>
              <Button to="/contact" variant="secondary">Talk to us</Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
            <div
              aria-hidden="true"
              className={cx(
                'absolute -right-3 -top-6 z-0 h-[88%] w-[88%] rounded-pill bg-terracotta md:-right-8 md:-top-10',
                play && 'hero-seq-arc'
              )}
            />
            <div
              className={cx('relative z-10 aspect-[4/3] overflow-hidden rounded-image bg-cream-deep lg:aspect-[4/5]', frame.className)}
              style={frame.style}
            >
              {image ? (
                <Img
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={1500}
                  widths={[640, 960, 1200, 1600]}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="h-full w-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className="flex h-full w-full items-center justify-center">
                  {import.meta.env.DEV && <span className="text-small text-ink">Hero image needed</span>}
                </div>
              )}
              <SignalArc
                animate
                startDelay={play ? 900 : 0}
                size={ARC_SIZE}
                arcs={4}
                origin="bottom-left"
                color={image ? 'cream' : 'terracotta'}
                className="pointer-events-none absolute"
                style={{
                  left: `${earTagPoint.x}%`,
                  top: `calc(${earTagPoint.y}% - ${ARC_SIZE}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </ToneContext.Provider>
    </section>
  );
};

export default HomeHero;
