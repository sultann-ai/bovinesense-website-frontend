import { ReactNode } from 'react';
import { cx } from './tone';

export interface ArcFrameProps {
  children: ReactNode;
  /** Corner the terracotta arc shape is offset towards. */
  arcSide?: 'top-right' | 'top-left';
  /** Aspect-ratio classes for the frame, e.g. "aspect-[16/10]". */
  aspectClassName?: string;
  className?: string;
}

/** Rounded image frame with a terracotta pill-shaped arc sitting behind it. */
const ArcFrame = ({ children, arcSide = 'top-right', aspectClassName = 'aspect-[16/10]', className }: ArcFrameProps) => (
  <div className={cx('relative', className)}>
    <div
      aria-hidden="true"
      className={cx(
        'absolute -top-5 z-0 h-[85%] w-[85%] rounded-pill bg-terracotta md:-top-8',
        arcSide === 'top-right' ? '-right-3 md:-right-6' : '-left-3 md:-left-6'
      )}
    />
    <div className={cx('relative z-10 overflow-hidden rounded-image bg-cream-deep', aspectClassName)}>{children}</div>
  </div>
);

export default ArcFrame;
