import { ReactNode } from 'react';
import { Tone, useTone, cx } from './tone';

export interface SectionHeadingProps {
  /** Text before the accent word, e.g. "Our". */
  lead?: string;
  /** The single colored word, e.g. "Products". */
  accent: string;
  /** Optional supporting paragraph: right column on desktop, below on mobile. */
  description?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  tone?: Tone;
  /** Drop the default bottom margin (when the heading sits inside a custom layout). */
  flush?: boolean;
  className?: string;
}

/**
 * The ONLY component allowed to color a single word.
 * Accent is terracotta on cream (heading size ≥ 30px, so it meets the large-text rule)
 * and gold on charcoal (terracotta on charcoal is only ~3:1).
 */
const SectionHeading = ({ lead, accent, description, as: Tag = 'h2', id, tone, flush = false, className }: SectionHeadingProps) => {
  const surface = useTone(tone);

  return (
    <div className={cx('gap-8', !flush && 'mb-10 md:mb-14', !!description && 'md:grid md:grid-cols-2 md:items-end', className)}>
      <Tag id={id} className={cx('text-h2', surface === 'dark' ? 'text-cream' : 'text-charcoal')}>
        {lead && <>{lead} </>}
        <span className={surface === 'dark' ? 'text-gold' : 'text-terracotta'}>{accent}</span>
      </Tag>
      {description && (
        <p className={cx('mt-4 max-w-measure text-body md:mt-0', surface === 'dark' ? 'text-cream' : 'text-ink')}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
