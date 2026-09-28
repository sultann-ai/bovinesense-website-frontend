import { useRef } from 'react';
import SignalArc, { SignalArcOrigin } from './SignalArc';
import { useDrift } from '../../hooks/useDrift';
import { cx } from './tone';

export interface DecorArcProps {
  size: number;
  color?: 'terracotta' | 'cream';
  origin?: SignalArcOrigin;
  arcs?: 3 | 4;
  /** Positioning + opacity classes, e.g. "-right-16 -top-10 opacity-20". */
  className?: string;
}

/**
 * Large, low-opacity, static background SignalArc with a subtle scroll drift.
 * Sits behind content (z-0), is hidden below 768px, and never animates under
 * reduced motion. The parent must be `relative` with `overflow-x-clip` so it can
 * never cause horizontal overflow; content siblings should be `relative`.
 */
const DecorArc = ({ size, color = 'terracotta', origin = 'bottom-left', arcs = 4, className }: DecorArcProps) => {
  const driftRef = useRef<HTMLDivElement>(null);
  useDrift(driftRef);
  return (
    <div aria-hidden="true" className={cx('pointer-events-none absolute z-0 hidden md:block', className)}>
      <div ref={driftRef} className="will-change-transform">
        <SignalArc size={size} color={color} origin={origin} arcs={arcs} />
      </div>
    </div>
  );
};

export default DecorArc;
