import { CSSProperties } from 'react';
import { cx } from './tone';

export type SignalArcOrigin = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export interface SignalArcProps {
  /** Rendered width/height in px. */
  size?: number;
  color?: 'terracotta' | 'cream';
  /** Number of concentric arcs. */
  arcs?: 3 | 4;
  /** Arcs fade + scale outward in sequence on a 2.4s loop. Static under prefers-reduced-motion. */
  animate?: boolean;
  /** Corner the signal radiates from. */
  origin?: SignalArcOrigin;
  className?: string;
  /** Milliseconds before the loop starts (arcs stay hidden until then). Only with animate. */
  startDelay?: number;
  /** For absolute positioning (e.g. anchoring the origin to a point on an image). */
  style?: CSSProperties;
}

// Geometry is drawn for a bottom-left origin in a 100×100 box, then mirrored.
const RADII = [30, 50, 70, 90];

const mirror: Record<SignalArcOrigin, string | undefined> = {
  'bottom-left': undefined,
  'bottom-right': 'translate(100 0) scale(-1 1)',
  'top-left': 'translate(0 100) scale(1 -1)',
  'top-right': 'translate(100 100) scale(-1 -1)',
};

/** Brand signature motif: concentric arcs radiating from a corner. Decorative only. */
const SignalArc = ({
  size = 120,
  color = 'terracotta',
  arcs = 4,
  animate = false,
  origin = 'bottom-left',
  startDelay = 0,
  className,
  style,
}: SignalArcProps) => {
  const radii = RADII.slice(0, arcs);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={style}
      className={cx('signal-arc', animate && 'signal-arc--animate', color === 'cream' ? 'text-cream' : 'text-terracotta', className)}
    >
      <g transform={mirror[origin]}>
        <circle cx="4" cy="96" r="4" fill="currentColor" />
        {radii.map((r, i) => (
          <path
            key={r}
            className="signal-arc__ring"
            style={{ animationDelay: `${startDelay + i * 300}ms` }}
            d={`M 0 ${100 - r} A ${r} ${r} 0 0 1 ${r} 100`}
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
};

export default SignalArc;
