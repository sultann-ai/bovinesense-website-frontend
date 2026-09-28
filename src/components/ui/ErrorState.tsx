import Button from './Button';
import { Tone, useTone, cx } from './tone';

export interface ErrorStateProps {
  /** Re-runs the failed request. */
  onRetry: () => void;
  /** True while the retry request is in flight. */
  retrying?: boolean;
  tone?: Tone;
  className?: string;
}

/** Shown when a request fails. */
const ErrorState = ({ onRetry, retrying = false, tone, className }: ErrorStateProps) => {
  const surface = useTone(tone);
  return (
    <div role="alert" className={cx('flex flex-col items-start gap-5 py-8', className)}>
      <p className={cx('text-body', surface === 'dark' ? 'text-cream' : 'text-ink')}>
        We couldn't load this right now.
      </p>
      <Button variant="primary" onClick={onRetry} loading={retrying}>
        Retry
      </Button>
    </div>
  );
};

export default ErrorState;
