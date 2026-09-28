import { MouseEventHandler } from 'react';
import { Tone, useTone, cx } from './tone';

export interface TagPillProps {
  label: string;
  /** Background the pill sits on. Defaults to surrounding context. */
  tone?: Tone;
  /** Active = terracotta background, white text. */
  active?: boolean;
  /** When provided, renders a filter <button> with aria-pressed. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const TagPill = ({ label, tone, active = false, onClick, className }: TagPillProps) => {
  const surface = useTone(tone);

  const classes = cx(
    'inline-flex items-center rounded-pill border px-[14px] py-[6px] text-small font-medium leading-none transition-colors duration-150',
    active
      ? 'border-terracotta bg-terracotta text-white'
      : surface === 'dark'
        ? 'border-[rgba(246,241,233,0.3)] text-cream'
        : 'border-[rgba(58,55,51,0.25)] text-ink',
    onClick && !active && (surface === 'dark' ? 'hover:bg-[rgba(246,241,233,0.07)]' : 'hover:bg-cream-deep'),
    className
  );

  if (onClick) {
    return (
      <button type="button" aria-pressed={active} onClick={onClick} className={classes}>
        {label}
      </button>
    );
  }

  return <span className={classes}>{label}</span>;
};

export default TagPill;
