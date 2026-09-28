import { createContext, useContext } from 'react';

/**
 * Surface tone: the background a component sits on.
 * - 'light' = cream / cream-deep surfaces
 * - 'dark'  = charcoal surfaces (and inside glass cards)
 *
 * SectionPanel and GlassCard provide it; every component accepts an explicit
 * `tone` prop that overrides the context.
 */
export type Tone = 'light' | 'dark';

export const ToneContext = createContext<Tone>('light');

export const useTone = (override?: Tone): Tone => {
  const contextTone = useContext(ToneContext);
  return override ?? contextTone;
};

/** Joins truthy class names. */
export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');
