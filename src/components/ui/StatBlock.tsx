import { ReactNode } from 'react';
import SignalArc from './SignalArc';
import { Tone, useTone, cx } from './tone';

export interface StatBlockProps {
  /** Must come from the API or from a value the owner supplied. Never invented. */
  value: ReactNode;
  label: string;
  /** Optional leading icon. Ignored when `signal` is true. Never pass star ratings. */
  icon?: ReactNode;
  /** Show a small SignalArc instead of an icon. */
  signal?: boolean;
  tone?: Tone;
  className?: string;
}

const StatBlock = ({ value, label, icon, signal = false, tone, className }: StatBlockProps) => {
  const surface = useTone(tone);
  const dark = surface === 'dark';

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      {signal ? (
        <SignalArc size={36} arcs={3} color={dark ? 'cream' : 'terracotta'} />
      ) : (
        icon && <span className={cx('inline-flex', dark ? 'text-cream' : 'text-charcoal')} aria-hidden="true">{icon}</span>
      )}
      {/* 44px: terracotta on cream is allowed at this size; gold is used on charcoal. */}
      <p className={cx('text-[44px] font-bold leading-none', dark ? 'text-gold' : 'text-terracotta')}>{value}</p>
      <p className={cx('text-small', dark ? 'text-cream' : 'text-ink')}>{label}</p>
    </div>
  );
};

export default StatBlock;
