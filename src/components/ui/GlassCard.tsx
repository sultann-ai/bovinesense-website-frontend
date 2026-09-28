import { ReactNode, ElementType } from 'react';
import { Tone, ToneContext, useTone, cx } from './tone';

export interface GlassCardProps {
  children: ReactNode;
  /** Background the card sits on: 'dark' (charcoal) → .glass, 'light' (cream) → .glass-dark. */
  tone?: Tone;
  as?: ElementType;
  className?: string;
}

/**
 * Frosted card. Content inside is always rendered for a dark surface (cream text),
 * so children read tone 'dark' from context.
 */
const GlassCard = ({ children, tone, as: Tag = 'div', className }: GlassCardProps) => {
  const surface = useTone(tone);
  return (
    <Tag className={cx(surface === 'dark' ? 'glass' : 'glass-dark', 'rounded-card p-[26px] text-cream', className)}>
      <ToneContext.Provider value="dark">{children}</ToneContext.Provider>
    </Tag>
  );
};

export default GlassCard;
