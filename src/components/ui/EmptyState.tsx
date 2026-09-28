import Button from './Button';
import { Tone, useTone, cx } from './tone';

export interface EmptyStateProps {
  /** Short line, e.g. "No blog posts yet." */
  message: string;
  action?: { label: string; to?: string; href?: string; onClick?: () => void };
  tone?: Tone;
  className?: string;
}

/** Shown when an endpoint returns []. */
const EmptyState = ({ message, action, tone, className }: EmptyStateProps) => {
  const surface = useTone(tone);
  return (
    <div className={cx('flex flex-col items-start gap-5 py-8', className)}>
      <p className={cx('text-body', surface === 'dark' ? 'text-cream' : 'text-ink')}>{message}</p>
      {action && (
        <Button variant="secondary" tone={surface} to={action.to} href={action.href} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
