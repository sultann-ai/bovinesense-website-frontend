import { projectsService } from '../../services/projectsService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, TagPill, Button, Skeleton, ErrorState, EmptyState } from '../ui';
import { truncate } from '../../utils/images';
import { normalizeStringList } from '../../utils/normalize';
import Img from '../ui/Img';

/** Three most recent projects, linking to /projects. */
const ProjectsSection = () => {
  const { status, data, retry } = useApiResource(projectsService.getAll);
  const projects = [...(data ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <SectionPanel tone="cream-deep" id="projects" aria-labelledby="home-projects-title">
      <SectionHeading id="home-projects-title" lead="Recent" accent="Projects" />

      {status === 'loading' && (
        <div aria-busy="true" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <span className="sr-only">Loading projects…</span>
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && projects.length === 0 && <EmptyState message="Projects will appear here soon." />}

      {status === 'success' && projects.length > 0 && (
        <>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project._id}>
                <article className="card-lift flex h-full flex-col rounded-card bg-cream p-[26px]">
                  <div className="overflow-hidden rounded-image">
                    <Img
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={500}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="card-media aspect-[16/10] w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-6 text-h3 text-charcoal">{project.title}</h3>
                  <p className="mt-3 flex-1 text-body">{truncate(project.description, 120)}</p>
                  {normalizeStringList(project.tags).length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} tags`}>
                      {normalizeStringList(project.tags).map((tag, i) => (
                        <li key={`${tag}-${i}`}>
                          <TagPill label={tag} />
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button variant="ghost" to="/projects">All projects</Button>
          </div>
        </>
      )}
    </SectionPanel>
  );
};

export default ProjectsSection;
