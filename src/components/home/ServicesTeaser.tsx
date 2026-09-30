import { servicesService } from '../../services/servicesService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, Button, DecorArc, Skeleton, ErrorState, EmptyState } from '../ui';
import ExpandableServiceCard from '../services/ExpandableServiceCard';

/** Services teaser: the first category group from GET /services, as compact glass cards on charcoal. */
const ServicesTeaser = () => {
  const { status, data, retry } = useApiResource(servicesService.getAll);
  const group = data?.[0];

  return (
    <SectionPanel tone="charcoal" roundedTop id="services" aria-labelledby="home-services-title" className="overflow-x-clip">
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
          <div aria-busy="true" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <span className="sr-only">Loading services…</span>
            <Skeleton variant="text" lines={2} />
            <Skeleton variant="text" lines={2} />
            <Skeleton variant="text" lines={2} />
          </div>
        )}

        {status === 'error' && <ErrorState onRetry={retry} />}

        {status === 'success' && (!group || group.services.length === 0) && (
          <EmptyState message="Services will appear here soon." />
        )}

        {status === 'success' && group && group.services.length > 0 && (
          // items-start: opening one card doesn't stretch the others in its row.
          <ul className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.services.map((service, i) => (
              <li key={`${service.title}-${i}`}>
                <ExpandableServiceCard service={service} surface="glass" />
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
