import { useState } from 'react';
import { teamService } from '../../services/teamService';
import { useApiResource } from '../../hooks/useApiResource';
import { TeamMember } from '../../types';
import { SectionPanel, SectionHeading, IconLink, Skeleton, ErrorState, LinkedIn, Mail } from '../ui';
import { truncate } from '../../utils/images';
import RoleLabel from './RoleLabel';
import Img from '../ui/Img';

const BIO_LIMIT = 120;
const nonEmpty = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '';

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [expanded, setExpanded] = useState(false);
  const bio = member.bio ?? '';
  const long = bio.length > BIO_LIMIT;
  const bioId = `team-bio-${member._id}`;

  return (
    <article className="card-lift flex h-full flex-col rounded-card bg-cream p-[26px]">
      <div className="h-24 w-24 overflow-hidden rounded-full bg-cream-deep">
        <Img
          src={member.image}
          alt={member.name}
          width={96}
          height={96}
          widths={[96, 192, 288]}
          sizes="96px"
          className="card-media h-24 w-24 object-cover"
        />
      </div>
      <h3 className="mt-5 text-h3 text-charcoal">{member.name}</h3>
      {nonEmpty(member.role) && <RoleLabel role={member.role} />}
      <p id={bioId} className="mt-3 text-body">
        {long && !expanded ? truncate(bio, BIO_LIMIT) : bio}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={bioId}
          className="mt-2 self-start rounded-pill text-small font-semibold text-charcoal underline decoration-terracotta decoration-2 underline-offset-4"
        >
          {expanded ? 'Show less' : 'Read more'}
          <span className="sr-only"> about {member.name}</span>
        </button>
      )}
      {(nonEmpty(member.linkedin) || nonEmpty(member.email)) && (
        <ul className="mt-auto flex gap-3 pt-5" aria-label={`${member.name} links`}>
          {nonEmpty(member.linkedin) && (
            <li><IconLink href={member.linkedin} label={`${member.name} on LinkedIn`} icon={<LinkedIn size={18} />} /></li>
          )}
          {nonEmpty(member.email) && (
            <li><IconLink href={`mailto:${member.email}`} label={`Email ${member.name}`} icon={<Mail size={18} />} /></li>
          )}
        </ul>
      )}
    </article>
  );
};

const TeamBlock = () => {
  const { status, data, retry } = useApiResource(teamService.getAll);

  if (status === 'success' && (!data || data.length === 0)) return null;

  return (
    <SectionPanel tone="cream-deep" id="team" aria-labelledby="about-team-title">
      <SectionHeading id="about-team-title" lead="Our" accent="team" />

      {status === 'loading' && (
        <div aria-busy="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <span className="sr-only">Loading team…</span>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-card bg-cream p-[26px]">
              <div className="skeleton h-24 w-24 rounded-full" aria-hidden="true" />
              <Skeleton variant="text" lines={4} className="mt-5" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && data && (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((member) => (
            <li key={member._id}>
              <TeamCard member={member} />
            </li>
          ))}
        </ul>
      )}
    </SectionPanel>
  );
};

export default TeamBlock;
