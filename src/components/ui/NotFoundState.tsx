import Button from './Button';
import SignalArc from './SignalArc';
import { Tone, useTone, cx } from './tone';

export interface NotFoundStateProps {
  title: string;
  message?: string;
  action: { label: string; to: string };
  tone?: Tone;
  className?: string;
}

/** Shown when an endpoint returns 404 for a slug/id. */
const NotFoundState = ({ title, message, action, tone, className }: NotFoundStateProps) => {
  const surface = useTone(tone);
  const dark = surface === 'dark';
  return (
    <div className={cx('flex flex-col items-start gap-5 py-8', className)}>
      <SignalArc size={56} arcs={3} color={dark ? 'cream' : 'terracotta'} />
      <h1 className={cx('text-h2', dark ? 'text-cream' : 'text-charcoal')}>{title}</h1>
      {message && <p className={cx('max-w-measure text-body', dark ? 'text-cream' : 'text-ink')}>{message}</p>}
      <Button to={action.to} variant="secondary" tone={surface}>{action.label}</Button>
    </div>
  );
};

export default NotFoundState;
