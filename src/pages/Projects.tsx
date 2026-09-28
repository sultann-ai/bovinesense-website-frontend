import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projectsService } from '../services/projectsService';
import { useApiResource } from '../hooks/useApiResource';
import { Project } from '../types';
import {
  SectionPanel,
  SectionHeading,
  DecorArc,
  TagPill,
  Skeleton,
  ErrorState,
  EmptyState,
  Img,
} from '../components/ui';
import ProjectDialog from '../components/projects/ProjectDialog';
import { normalizeStringList, slugify } from '../utils/normalize';
import { truncate } from '../utils/images';

// Order of the backend enum (docs/BACKEND.md §8.7). Only values present in the data are shown.
const CATEGORY_ORDER = ['Web Development', 'Mobile Development', 'AI/ML', 'Data Science', 'DevOps', 'Other'];
const categoryOf = (p: Project) => p.category || 'Other';

const Projects = () => {
  const { status, data, retry } = useApiResource(projectsService.getAll);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const projects = useMemo(() => data ?? [], [data]);

  const categories = useMemo(() => {
    const present = new Set(projects.map(categoryOf));
    const known = CATEGORY_ORDER.filter((c) => present.has(c));
    const unknown = [...present].filter((c) => !CATEGORY_ORDER.includes(c)).sort();
    return [...known, ...unknown];
  }, [projects]);

  // ?category=ai-ml → "AI/ML". Unknown or missing values mean "All".
  const selected = categories.find((c) => slugify(c) === searchParams.get('category')) ?? null;
  const visible = selected ? projects.filter((p) => categoryOf(p) === selected) : projects;

  const choose = (category: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (category) next.set('category', slugify(category));
    else next.delete('category');
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };

  const countLabel = `Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}${selected ? ` in ${selected}` : ''}`;

  return (
    <>
      <Helmet>
        <title>Projects - Bovine</title>
        <meta name="description" content="Projects by Bovine." />
      </Helmet>

      <SectionPanel tone="charcoal" aria-labelledby="projects-title" className="overflow-x-clip pt-32 md:pt-40">
        {/* Right side of the header; the heading is short and left-aligned. */}
        <DecorArc size={300} origin="top-right" className="-right-8 -top-28 opacity-30" />
        <div className="relative">
          <SectionHeading as="h1" id="projects-title" lead="Our" accent="work" flush />
        </div>
      </SectionPanel>

      <SectionPanel tone="cream" aria-label="Project list">
        {status === 'loading' && (
          <div aria-busy="true" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <span className="sr-only">Loading projects…</span>
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        )}

        {status === 'error' && <ErrorState onRetry={retry} />}

        {status === 'success' && projects.length === 0 && (
          <EmptyState message="Projects will appear here soon." action={{ label: 'Back to home', to: '/' }} />
        )}

        {status === 'success' && projects.length > 0 && (
          <>
            {categories.length > 0 && (
              <div role="group" aria-label="Filter projects by category" className="mb-6 flex flex-wrap gap-3">
                <TagPill label="All" active={!selected} onClick={() => choose(null)} />
                {categories.map((c) => (
                  <TagPill key={c} label={c} active={selected === c} onClick={() => choose(c)} />
                ))}
              </div>
            )}

            <p aria-live="polite" className="mb-10 text-small">{countLabel}</p>

            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => {
                const tags = normalizeStringList(project.tags);
                const technologies = normalizeStringList(project.technologies);
                return (
                  <li key={project._id}>
                    <article className="card-lift relative flex h-full flex-col rounded-card bg-cream-deep p-[26px]">
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
                      <h2 className="mt-6 text-h3 text-charcoal">
                        {/* Stretched button: the whole card opens the dialog; focus returns here on close. */}
                        <button
                          type="button"
                          onClick={() => setOpenProject(project)}
                          aria-haspopup="dialog"
                          className="text-left underline-offset-4 after:absolute after:inset-0 after:rounded-card hover:underline"
                        >
                          {project.title}
                        </button>
                      </h2>
                      <p className="mt-3 flex-1 text-body">{truncate(project.description, 140)}</p>
                      {tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} tags`}>
                          {tags.map((tag, i) => (
                            <li key={`${tag}-${i}`}>
                              <TagPill label={tag} />
                            </li>
                          ))}
                        </ul>
                      )}
                      {technologies.length > 0 && (
                        <p className="mt-4 text-small">{technologies.join(' · ')}</p>
                      )}
                    </article>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </SectionPanel>

      {openProject && <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  );
};

export default Projects;
