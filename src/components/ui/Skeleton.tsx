import { Tone, useTone, cx } from './tone';

export interface SkeletonProps {
  variant?: 'card' | 'text' | 'image';
  /** Number of lines for the text variant. */
  lines?: number;
  tone?: Tone;
  className?: string;
}

/**
 * Loading placeholder with a slow shimmer (static under prefers-reduced-motion).
 * Decorative: wrap the loading region in an element with aria-busy="true"
 * and a visually hidden "Loading…" status for screen readers.
 */
const Skeleton = ({ variant = 'text', lines = 3, tone, className }: SkeletonProps) => {
  const surface = useTone(tone);
  const block = cx('skeleton', surface === 'dark' && 'skeleton--dark');

  if (variant === 'text') {
    return (
      <div className={cx('flex flex-col gap-3', className)} aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={cx(block, 'h-4 rounded-pill', i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full')} />
        ))}
      </div>
    );
  }

  if (variant === 'image') {
    return <div className={cx(block, 'aspect-[4/3] w-full rounded-image', className)} aria-hidden="true" />;
  }

  return (
    <div className={cx(block, 'flex flex-col gap-4 rounded-card p-[26px]', className)} aria-hidden="true">
      <div className={cx(surface === 'dark' ? 'bg-charcoal' : 'bg-cream', 'aspect-[16/9] w-full rounded-image opacity-60')} />
      <div className={cx(surface === 'dark' ? 'bg-charcoal' : 'bg-cream', 'h-5 w-3/4 rounded-pill opacity-60')} />
      <div className={cx(surface === 'dark' ? 'bg-charcoal' : 'bg-cream', 'h-4 w-full rounded-pill opacity-60')} />
      <div className={cx(surface === 'dark' ? 'bg-charcoal' : 'bg-cream', 'h-4 w-1/2 rounded-pill opacity-60')} />
    </div>
  );
};

export default Skeleton;
