import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from './icons';
import { cx } from './tone';

export interface ArrowCircleButtonProps {
  /** Required: the button has no visible text. */
  'aria-label': string;
  direction?: 'up-right' | 'left' | 'right';
  to?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  className?: string;
}

const ArrowCircleButton = ({
  'aria-label': ariaLabel,
  direction = 'up-right',
  to,
  href,
  onClick,
  disabled = false,
  className,
}: ArrowCircleButtonProps) => {
  const classes = cx(
    'group inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-terracotta text-white transition-colors duration-150',
    disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-terracotta-deep',
    className
  );

  const icon =
    direction === 'up-right' ? (
      <ArrowUpRight size={20} className={cx('transition-transform duration-150', !disabled && 'group-hover:-translate-y-[2px] group-hover:translate-x-[2px]')} />
    ) : (
      <ArrowLeft size={20} className={direction === 'right' ? 'rotate-180' : undefined} />
    );

  if (!disabled && to) {
    return <Link to={to} onClick={onClick} aria-label={ariaLabel} className={classes}>{icon}</Link>;
  }
  if (!disabled && href) {
    const external = /^(https?:)?\/\//.test(href);
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {icon}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={classes}>
      {icon}
    </button>
  );
};

export default ArrowCircleButton;
