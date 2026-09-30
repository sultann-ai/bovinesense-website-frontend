import { Helmet } from 'react-helmet-async';
import { servicesService } from '../services/servicesService';
import { useApiResource } from '../hooks/useApiResource';
import { SectionPanel, SectionHeading, Skeleton, ErrorState, EmptyState } from '../components/ui';
import ExpandableServiceCard from '../components/services/ExpandableServiceCard';
import { slugify } from '../utils/normalize';

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
          <div aria-busy="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <span className="sr-only">Loading services…</span>
            <Skeleton variant="text" lines={2} />
            <Skeleton variant="text" lines={2} />
            <Skeleton variant="text" lines={2} />
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
              {/* items-start: opening one card doesn't stretch the others in its row. */}
              <ul className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service, si) => (
                  <li key={`${service.title}-${si}`}>
                    <ExpandableServiceCard service={service} surface={panelTone === 'cream' ? 'cream-deep' : 'cream'} />
                  </li>
                ))}
              </ul>
            </SectionPanel>
          );
        })}
    </>
  );
};

export default Services;
