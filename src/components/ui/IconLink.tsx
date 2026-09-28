import { ReactNode } from 'react';
import { Tone, useTone, cx } from './tone';

export interface IconLinkProps {
  href: string;
  /** Required accessible name, e.g. "Ali on LinkedIn". */
  label: string;
  icon: ReactNode;
  tone?: Tone;
  className?: string;
}

/** 44px circular icon-only link. http(s) links open in a new tab with rel="noopener noreferrer". */
const IconLink = ({ href, label, icon, tone, className }: IconLinkProps) => {
  const surface = useTone(tone);
  const external = /^(https?:)?\/\//.test(href);
  return (
    <a
      href={href}
      aria-label={external ? `${label} (opens in a new tab)` : label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cx(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-150',
        surface === 'dark'
          ? 'border-[rgba(246,241,233,0.3)] text-cream hover:bg-[rgba(246,241,233,0.07)]'
          : 'border-[rgba(58,55,51,0.25)] text-charcoal hover:bg-cream-deep',
        className
      )}
    >
      {icon}
    </a>
  );
};

export default IconLink;
