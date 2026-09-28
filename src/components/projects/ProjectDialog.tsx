import { useRef } from 'react';
import { Project } from '../../types';
import { useModalDialog } from '../../hooks/useModalDialog';
import { Button, TagPill, Close, Check, ExternalLink, ToneContext } from '../ui';
import { normalizeStringList } from '../../utils/normalize';
import Img from '../ui/Img';

export interface ProjectDialogProps {
  project: Project;
  onClose: () => void;
}

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

/**
 * Project detail modal (there is no per-project route or endpoint).
 * role="dialog", aria-modal, focus trap, Escape closes, scroll locked,
 * focus returns to the card button that opened it (useModalDialog).
 */
const ProjectDialog = ({ project, onClose }: ProjectDialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useModalDialog(true, onClose, dialogRef);

  const features = normalizeStringList(project.features);
  const technologies = normalizeStringList(project.technologies);
  const screenshots = normalizeStringList(project.screenshots);
  const hasLinks = nonEmpty(project.liveDemoLink) || nonEmpty(project.githubLink);
  const titleId = `project-dialog-title-${project._id}`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[rgba(43,42,40,0.55)] p-0 sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-panel bg-cream p-6 text-ink sm:rounded-panel md:p-10"
      >
        <ToneContext.Provider value="light">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-pill text-charcoal hover:bg-cream-deep md:right-6 md:top-6"
          >
            <Close />
          </button>

          <h2 id={titleId} className="pr-12 text-h2 text-charcoal">{project.title}</h2>
          {project.category && <p className="mt-2 text-small">{project.category}</p>}

          {nonEmpty(project.image) && (
            <Img
              src={project.image}
              alt={project.title}
              width={1400}
              height={875}
              widths={[640, 960, 1280]}
              sizes="(min-width: 768px) 720px, 100vw"
              priority
              className="mt-6 aspect-[16/10] w-full rounded-image object-cover"
            />
          )}

          {/* Project.description is plain text in the API (not HTML). */}
          <p className="mt-6 whitespace-pre-line text-body">{project.description}</p>

          {features.length > 0 && (
            <section aria-labelledby={`${titleId}-features`} className="mt-10">
              <h3 id={`${titleId}-features`} className="text-h3 text-charcoal">Features</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {features.map((feature, i) => (
                  <li key={`${feature}-${i}`} className="flex items-start gap-3 text-body">
                    <Check size={22} className="mt-[3px] shrink-0 text-terracotta" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {technologies.length > 0 && (
            <section aria-labelledby={`${titleId}-tech`} className="mt-10">
              <h3 id={`${titleId}-tech`} className="text-h3 text-charcoal">Technologies</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                  <li key={`${tech}-${i}`}>
                    <TagPill label={tech} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {screenshots.length > 0 && (
            <section aria-labelledby={`${titleId}-shots`} className="mt-10">
              <h3 id={`${titleId}-shots`} className="text-h3 text-charcoal">Screenshots</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {screenshots.map((src, i) => (
                  <li key={`${src}-${i}`}>
                    <Img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      width={800}
                      height={500}
                      sizes="(min-width: 640px) 360px, 100vw"
                      className="aspect-[16/10] w-full rounded-image object-cover"
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasLinks && (
            <div className="mt-10 flex flex-wrap gap-4">
              {nonEmpty(project.liveDemoLink) && (
                <Button variant="secondary" href={project.liveDemoLink}>
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink size={18} />
                    Live demo
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </Button>
              )}
              {nonEmpty(project.githubLink) && (
                <Button variant="secondary" href={project.githubLink}>
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink size={18} />
                    View on GitHub
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </Button>
              )}
            </div>
          )}
        </ToneContext.Provider>
      </div>
    </div>
  );
};

export default ProjectDialog;
