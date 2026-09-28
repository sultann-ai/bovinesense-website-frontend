import { servicesService } from '../../services/servicesService';
import { useApiResource } from '../../hooks/useApiResource';
import {
  SectionPanel,
  SectionHeading,
  GlassCard,
  TagPill,
  Button,
  ServiceIcon,
  DecorArc,
  Skeleton,
  ErrorState,
  EmptyState,
} from '../ui';

/** Services teaser: the first category group from GET /services, as glass cards on charcoal. */
const ServicesTeaser = () => {
  const { status, data, retry } = useApiResource(servicesService.getAll);
  const group = data?.[0];

  return (
    <SectionPanel tone="charcoal" roundedTop id="services" aria-labelledby="home-services-title" className="overflow-x-clip">
      {/* Large faint arcs give the glass something to frost. */}
      {/* Large faint arcs behind the glass cards (so the glass frosts them) and in the empty bottom-right corner. */}
      <DecorArc size={520} origin="bottom-left" className="bottom-24 left-[20%] opacity-25" />
      <DecorArc size={420} color="cream" origin="bottom-right" className="-bottom-16 -right-16 opacity-10" />

      <div className="relative">
        <SectionHeading
          id="home-services-title"
          lead="Our"
          accent="Services"
          description={status === 'success' && group ? group.category : undefined}
        />

        {status === 'loading' && (
          <div aria-busy="true" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <span className="sr-only">Loading services…</span>
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        )}

        {status === 'error' && <ErrorState onRetry={retry} />}

        {status === 'success' && (!group || group.services.length === 0) && (
          <EmptyState message="Services will appear here soon." />
        )}

        {status === 'success' && group && group.services.length > 0 && (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {group.services.map((service, i) => (
              <li key={`${service.title}-${i}`}>
                <GlassCard as="article" className="card-lift h-full">
                  <ServiceIcon name={service.icon} size={28} className="text-terracotta" />
                  <h3 className="mt-5 text-h3">{service.title}</h3>
                  <p className="mt-3 text-body">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${service.title} features`}>
                      {service.features.map((feature, j) => (
                        <li key={`${feature}-${j}`}>
                          <TagPill label={feature} />
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <Button variant="ghost" to="/services">All services</Button>
        </div>
      </div>
    </SectionPanel>
  );
};

export default ServicesTeaser;
