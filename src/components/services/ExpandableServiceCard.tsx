import { useId, useState } from 'react';
import { ServiceItem } from '../../types';
import { normalizeStringList } from '../../utils/normalize';
import { ServiceIcon, TagPill, ChevronRight, cx } from '../ui';

export interface ExpandableServiceCardProps {
  service: ServiceItem;
  /** 'glass' on charcoal (home teaser), or a solid cream surface on cream panels. */
  surface: 'glass' | 'cream' | 'cream-deep';
}

/**
 * Compact service card: icon + title only. "Show more" reveals the description
 * and feature pills in place. The button is omitted when there is nothing to reveal.
 */
const ExpandableServiceCard = ({ service, surface }: ExpandableServiceCardProps) => {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const features = normalizeStringList(service.features);
  const hasDetails = Boolean(service.description?.trim()) || features.length > 0;
  const dark = surface === 'glass';

  return (
    <article
      className={cx(
        'card-lift rounded-card p-5',
        dark ? 'glass text-cream' : surface === 'cream' ? 'bg-cream' : 'bg-cream-deep'
      )}
    >
      <div className="flex items-center gap-4">
        {/* 44px terracotta-tinted circle: a terracotta layer at low opacity behind a full-strength icon. */}
        <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center">
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-terracotta opacity-[0.14]" />
          <ServiceIcon name={service.icon} size={22} className="relative text-terracotta" />
        </span>
        <h3 className={cx('text-h3', dark ? 'text-cream' : 'text-charcoal')}>{service.title}</h3>
      </div>

      {hasDetails && (
        <>
          <div id={detailsId} hidden={!open} className="mt-4 animate-fade-in">
            {service.description && <p className="text-body">{service.description}</p>}
            {features.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${service.title} features`}>
                {features.map((feature, i) => (
                  <li key={`${feature}-${i}`}>
                    <TagPill label={feature} tone={dark ? 'dark' : 'light'} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={detailsId}
            className={cx(
              'mt-4 inline-flex items-center gap-1.5 rounded-pill text-small font-semibold',
              'underline-offset-4 decoration-terracotta decoration-2 hover:underline',
              dark ? 'text-cream' : 'text-charcoal'
            )}
          >
            {open ? 'Show less' : 'Show more'}
            <span className="sr-only"> about {service.title}</span>
            <ChevronRight
              size={16}
              className={cx('transition-transform duration-200', open ? '-rotate-90' : 'rotate-90')}
            />
          </button>
        </>
      )}
    </article>
  );
};

export default ExpandableServiceCard;
