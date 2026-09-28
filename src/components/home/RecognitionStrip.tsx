import { recognitionsService } from '../../services/recognitionsService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, Skeleton, ErrorState } from '../ui';
import Img from '../ui/Img';

/** "Backed and recognised by" logo strip. Hidden when there are no trusted recognitions. */
const RecognitionStrip = () => {
  const { status, data, retry } = useApiResource(recognitionsService.getAll);
  const trusted = (data ?? []).filter((r) => (r.section ?? 'trusted') === 'trusted');

  if (status === 'success' && trusted.length === 0) return null;

  return (
    <SectionPanel tone="charcoal" roundedTop aria-labelledby="recognition-strip-title" className="py-12 md:py-14">
      <h2 id="recognition-strip-title" className="mb-6 text-small text-cream opacity-60">
        Backed and recognised by
      </h2>

      {status === 'loading' && (
        <div aria-busy="true" className="flex flex-wrap gap-8">
          <span className="sr-only">Loading…</span>
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} variant="text" lines={1} className="w-28" />
          ))}
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && (
        <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
          {trusted.map((r) => {
            // Logos are rendered as a light silhouette on charcoal.
            const logo = (
              <Img
                src={r.image}
                alt={r.name}
                width={160}
                height={40}
                widths={[160, 320, 480]}
                sizes="160px"
                className="h-10 w-40 object-contain opacity-80 transition-opacity duration-150 [filter:brightness(0)_invert(1)] group-hover:opacity-100"
              />
            );
            return (
              <li key={r._id}>
                {r.website ? (
                  <a href={r.website} target="_blank" rel="noopener noreferrer" className="group inline-flex rounded-image">
                    {logo}
                  </a>
                ) : (
                  <span className="group inline-flex">{logo}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SectionPanel>
  );
};

export default RecognitionStrip;
