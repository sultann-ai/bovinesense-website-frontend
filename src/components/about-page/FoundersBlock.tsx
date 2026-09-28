import { foundersService } from '../../services/foundersService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, ArcFrame, IconLink, Skeleton, ErrorState, LinkedIn, Twitter, Mail } from '../ui';
import RoleLabel from './RoleLabel';
import Img from '../ui/Img';

const nonEmpty = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';

const FoundersBlock = () => {
  const { status, data, retry } = useApiResource(foundersService.getAll);

  if (status === 'success' && (!data || data.length === 0)) return null;

  return (
    <SectionPanel tone="cream" id="founders" aria-labelledby="about-founders-title">
      <SectionHeading id="about-founders-title" lead="Meet the" accent="founders" />

      {status === 'loading' && (
        <div aria-busy="true" className="grid gap-12 md:grid-cols-2">
          <span className="sr-only">Loading founders…</span>
          {[0, 1].map((i) => (
            <div key={i}>
              <div className="skeleton aspect-square w-full rounded-image" aria-hidden="true" />
              <Skeleton variant="text" lines={4} className="mt-8" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && data && (
        <ul className="grid gap-x-12 gap-y-16 md:grid-cols-2">
          {data.map((founder, i) => (
            <li key={founder._id}>
              <article className="card-lift">
                <ArcFrame arcSide={i % 2 === 0 ? 'top-right' : 'top-left'} aspectClassName="aspect-square">
                  <Img
                    src={founder.image}
                    alt={founder.name}
                    width={900}
                    height={900}
                    widths={[400, 640, 900, 1200]}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="card-media h-full w-full object-cover"
                  />
                </ArcFrame>
                <h3 className="mt-8 text-h3 text-charcoal">{founder.name}</h3>
                {nonEmpty(founder.role) && <RoleLabel role={founder.role} />}
                <p className="mt-4 max-w-measure text-body">{founder.bio}</p>
                {(nonEmpty(founder.linkedin) || nonEmpty(founder.twitter) || nonEmpty(founder.email)) && (
                  <ul className="mt-6 flex gap-3" aria-label={`${founder.name} links`}>
                    {nonEmpty(founder.linkedin) && (
                      <li><IconLink href={founder.linkedin} label={`${founder.name} on LinkedIn`} icon={<LinkedIn size={18} />} /></li>
                    )}
                    {nonEmpty(founder.twitter) && (
                      <li><IconLink href={founder.twitter} label={`${founder.name} on Twitter`} icon={<Twitter size={18} />} /></li>
                    )}
                    {nonEmpty(founder.email) && (
                      <li><IconLink href={`mailto:${founder.email}`} label={`Email ${founder.name}`} icon={<Mail size={18} />} /></li>
                    )}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </SectionPanel>
  );
};

export default FoundersBlock;
