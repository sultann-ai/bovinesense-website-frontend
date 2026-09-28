import { Helmet } from 'react-helmet-async';
import { servicesService } from '../services/servicesService';
import { useApiResource } from '../hooks/useApiResource';
import {
  SectionPanel,
  SectionHeading,
  ServiceIcon,
  TagPill,
  Skeleton,
  ErrorState,
  EmptyState,
  cx,
} from '../components/ui';
import { normalizeStringList, slugify } from '../utils/normalize';

// TODO(owner sign-off): placeholder supporting paragraph.
const INTRO = 'From on-farm hardware to the software and AI behind it, these are the services we offer.';

const Services = () => {
  const { status, data, retry } = useApiResource(servicesService.getAll);
  const groups = (data ?? []).filter((g) => Array.isArray(g.services) && g.services.length > 0);

  return (
    <>
      <Helmet>
        <title>Services - Bovine</title>
        <meta name="description" content="Services from Bovine." />
      </Helmet>

      <SectionPanel tone="charcoal" aria-labelledby="services-title" className="pt-32 md:pt-40">
        <SectionHeading as="h1" id="services-title" lead="What we" accent="do" description={INTRO} flush />
      </SectionPanel>

      {status === 'loading' && (
        <SectionPanel tone="cream">
          <div aria-busy="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <span className="sr-only">Loading services…</span>
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        </SectionPanel>
      )}

      {status === 'error' && (
        <SectionPanel tone="cream">
          <ErrorState onRetry={retry} />
        </SectionPanel>
      )}

      {status === 'success' && groups.length === 0 && (
        <SectionPanel tone="cream">
          <EmptyState message="Services will appear here soon." action={{ label: 'Back to home', to: '/' }} />
        </SectionPanel>
      )}

      {status === 'success' &&
        groups.map((group, gi) => {
          const panelTone = gi % 2 === 0 ? 'cream' : 'cream-deep';
          const headingId = `services-${slugify(group.category) || gi}`;
          return (
            <SectionPanel key={group._id} tone={panelTone} id={slugify(group.category) || undefined} aria-labelledby={headingId}>
              <h2 id={headingId} className="mb-10 text-h2 text-charcoal md:mb-14">{group.category}</h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service, si) => {
                  const features = normalizeStringList(service.features);
                  return (
                    <li key={`${service.title}-${si}`}>
                      <article
                        className={cx(
                          'card-lift flex h-full flex-col rounded-card p-[26px]',
                          panelTone === 'cream' ? 'bg-cream-deep' : 'bg-cream'
                        )}
                      >
                        {/* 52px terracotta-tinted circle: a terracotta layer at low opacity behind a full-strength icon. */}
                        <span className="relative inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center">
                          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-terracotta opacity-[0.14]" />
                          <ServiceIcon name={service.icon} size={24} className="relative text-terracotta" />
                        </span>
                        <h3 className="mt-5 text-h3 text-charcoal">{service.title}</h3>
                        <p className="mt-3 flex-1 text-body">{service.description}</p>
                        {features.length > 0 && (
                          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${service.title} features`}>
                            {features.map((feature, fi) => (
                              <li key={`${feature}-${fi}`}>
                                <TagPill label={feature} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    </li>
                  );
                })}
              </ul>
            </SectionPanel>
          );
        })}
    </>
  );
};

export default Services;
