import { ReactNode } from 'react';
import { ToneContext, cx } from './tone';
import { useReveal } from '../../hooks/useReveal';

export type PanelTone = 'cream' | 'cream-deep' | 'charcoal';

export interface SectionPanelProps {
  children: ReactNode;
  tone?: PanelTone;
  /**
   * 40px top corners. The panel is pulled up by 40px and stacked above the
   * previous section so it appears to slide over it.
   */
  roundedTop?: boolean;
  /** With roundedTop: pull up 40px over the section above (default). Set false when nothing sits above. */
  overlapPrevious?: boolean;
  id?: string;
  'aria-labelledby'?: string;
  className?: string;
  /** Fade + rise the content in when it scrolls into view (below-the-fold only, ≥768px, not under reduced motion). */
  reveal?: boolean;
  /** Classes for the inner 1200px container. */
  containerClassName?: string;
}

const toneClasses: Record<PanelTone, string> = {
  cream: 'bg-cream text-ink',
  'cream-deep': 'bg-cream-deep text-ink',
  charcoal: 'bg-charcoal text-cream',
};

const SectionPanel = ({
  children,
  tone = 'cream',
  roundedTop = false,
  overlapPrevious = true,
  id,
  'aria-labelledby': labelledBy,
  className,
  containerClassName,
  reveal = true,
}: SectionPanelProps) => {
  // The content (not the background) is revealed, so no gap opens behind the panel.
  const revealRef = useReveal<HTMLDivElement>(reveal);
  return (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cx(
      'section w-full',
      toneClasses[tone],
      roundedTop && 'relative z-10 rounded-t-panel',
      roundedTop && overlapPrevious && '-mt-10',
      className
    )}
  >
    <ToneContext.Provider value={tone === 'charcoal' ? 'dark' : 'light'}>
      {/* `relative`: a stable containing block for decorative children, before and after the reveal transform. */}
      <div ref={revealRef} className={cx('container-page relative', containerClassName)}>{children}</div>
    </ToneContext.Provider>
  </section>
  );
};

export default SectionPanel;
