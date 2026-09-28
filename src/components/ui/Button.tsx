import { ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from './icons';
import { Tone, useTone, cx } from './tone';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  /** 'compact' trims vertical padding to 12px so the button fits a 44px slot (e.g. the header pill). */
  size?: 'default' | 'compact';
  /** Background the button sits on. Defaults to the surrounding SectionPanel/GlassCard. */
  tone?: Tone;
  /** Trailing ArrowUpRight. Default: true for ghost, false otherwise. */
  arrow?: boolean;
  /** Internal route → react-router Link. */
  to?: string;
  /** External URL (http, mailto, tel) → <a>. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  'aria-label'?: string;
}

const isExternal = (href: string) => /^(https?:)?\/\//.test(href);

const Spinner = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  tone,
  arrow,
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const surface = useTone(tone);
  const showArrow = arrow ?? variant === 'ghost';
  const inactive = disabled || loading;

  const base =
    'group inline-flex items-center justify-center gap-2 rounded-pill text-[17px] font-semibold leading-[1.2] transition-colors duration-150';

  const compact = size === 'compact';

  const variants: Record<ButtonVariant, string> = {
    // White text on terracotta (4.7:1). Never change to terracotta text.
    primary: cx(
      'bg-terracotta px-7 text-white',
      compact ? 'py-[12px]' : 'py-[14px]',
      !inactive && 'hover:bg-terracotta-deep'
    ),
    secondary: cx(
      'border bg-transparent px-7',
      compact ? 'py-[11px]' : 'py-[13px]', // 1px border keeps the primary height
      surface === 'dark'
        ? cx('border-[rgba(246,241,233,0.3)] text-cream', !inactive && 'hover:bg-[rgba(246,241,233,0.07)]')
        : cx('border-[rgba(58,55,51,0.25)] text-ink', !inactive && 'hover:bg-cream-deep')
    ),
    ghost: cx(
      'px-0 py-1',
      surface === 'dark' ? 'text-cream' : 'text-charcoal',
      !inactive && 'hover:underline underline-offset-4'
    ),
  };

  // Arrow color: inherits on filled/secondary; terracotta (cream) / gold (charcoal) accent on ghost.
  const arrowColor =
    variant === 'ghost' ? (surface === 'dark' ? 'text-gold' : 'text-terracotta') : '';

  const classes = cx(base, variants[variant], inactive && 'cursor-not-allowed opacity-60', className);

  const content = (
    <>
      {loading && <Spinner />}
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={18}
          className={cx(
            'shrink-0 transition-transform duration-150',
            !inactive && 'group-hover:-translate-y-[2px] group-hover:translate-x-[2px]',
            arrowColor
          )}
        />
      )}
    </>
  );

  if (!inactive && to) {
    return (
      <Link to={to} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (!inactive && href) {
    const external = isExternal(href);
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={inactive}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
};

export default Button;
