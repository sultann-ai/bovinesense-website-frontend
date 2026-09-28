import { partnersService } from '../../services/partnersService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, ErrorState } from '../ui';
import LogoGrid from './LogoGrid';

const PartnersBlock = () => {
  const { status, data, retry } = useApiResource(partnersService.getAll);

  if (status === 'success' && (!data || data.length === 0)) return null;

  return (
    <SectionPanel tone="cream" id="partners" aria-labelledby="about-partners-title">
      <SectionHeading id="about-partners-title" lead="Our" accent="partners" />

      {status === 'loading' && (
        <div aria-busy="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <span className="sr-only">Loading partners…</span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-28 rounded-card" aria-hidden="true" />
          ))}
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && data && (
        <LogoGrid
          tileClassName="bg-cream-deep"
          items={data.map((p) => ({ id: p._id, name: p.name, image: p.logo, website: p.website }))}
        />
      )}
    </SectionPanel>
  );
};

export default PartnersBlock;
