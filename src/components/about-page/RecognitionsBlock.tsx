import { recognitionsService } from '../../services/recognitionsService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, ErrorState } from '../ui';
import LogoGrid from './LogoGrid';

/** Recognitions (section === "recognitions"). The "trusted" ones are on the home page. */
const RecognitionsBlock = () => {
  const { status, data, retry } = useApiResource(recognitionsService.getAll);
  const items = (data ?? []).filter((r) => r.section === 'recognitions');

  if (status === 'success' && items.length === 0) return null;

  return (
    <SectionPanel tone="charcoal" roundedTop id="recognitions" aria-labelledby="about-recognitions-title">
      <SectionHeading id="about-recognitions-title" lead="Our" accent="recognitions" />

      {status === 'loading' && (
        <div aria-busy="true" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <span className="sr-only">Loading recognitions…</span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton skeleton--dark h-28 rounded-card" aria-hidden="true" />
          ))}
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && (
        <LogoGrid
          tileClassName="bg-cream"
          items={items.map((r) => ({ id: r._id, name: r.name, image: r.image, website: r.website }))}
        />
      )}
    </SectionPanel>
  );
};

export default RecognitionsBlock;
