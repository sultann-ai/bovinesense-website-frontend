import { FormEvent, useRef, useState } from 'react';
import { contactService } from '../../services/contactService';
import { GlassCard, Button, cx } from '../ui';
import { CONTACT_EMAIL } from '../../config/contact';
import {
  ContactErrors,
  ContactField,
  ContactValues,
  FIELDS,
  LIMITS,
  validateAll,
  validateField,
} from './validation';

type Status = 'idle' | 'sending' | 'success' | 'failed';

const EMPTY: ContactValues = { name: '', email: '', message: '' };

const LABELS: Record<ContactField, string> = { name: 'Name', email: 'Email', message: 'Message' };
const fieldId = (f: ContactField) => `contact-${f}`;
const errorId = (f: ContactField) => `contact-${f}-error`;

// Glass input recipe (spec): rgba cream .07 background, rgba cream .15 border, 14px radius,
// cream text, cream 45% placeholder, terracotta border on focus.
const inputClass = (invalid: boolean) =>
  cx(
    'w-full rounded-[14px] border bg-[rgba(246,241,233,0.07)] px-4 py-3 text-body text-cream',
    'placeholder:text-[rgba(246,241,233,0.45)] focus:border-terracotta',
    invalid ? 'border-gold' : 'border-[rgba(246,241,233,0.15)]'
  );

/**
 * POST /contact with exactly { name, email, message }. Submissions are stored only
 * (visible in the admin panel); the backend sends no email and has no rate limiting,
 * so the double-submit guard and honeypot below are the only protection.
 */
const ContactForm = () => {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [announcement, setAnnouncement] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);
  const inFlight = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const update = (field: ContactField, value: string) => setValues((v) => ({ ...v, [field]: value }));

  // Validate on blur (not on every keystroke).
  const onBlur = (field: ContactField) => {
    const error = validateField(field, values[field]);
    setErrors((e) => ({ ...e, [field]: error }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return; // double-submit guard

    const found = validateAll(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setShowSummary(true);
      // Focus the summary after it renders.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);

    inFlight.current = true;
    setStatus('sending');
    try {
      // Honeypot filled → a bot. Skip the request silently and show success.
      if (!honeypotRef.current?.value) {
        await contactService.create({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        });
      }
      setStatus('success');
      setValues(EMPTY);
      setAnnouncement("Thanks. We'll get back to you.");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      // Keep the typed values so nothing is lost.
      setStatus('failed');
      setAnnouncement(`That didn't send. Email us directly at ${CONTACT_EMAIL}.`);
    } finally {
      inFlight.current = false;
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrors({});
    setAnnouncement('');
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const summaryErrors = FIELDS.filter((f) => errors[f]);
  const sending = status === 'sending';

  return (
    <>
      {/* Status announcements for screen readers (success / failure). */}
      <p aria-live="polite" className="sr-only">{announcement}</p>

      {status === 'success' ? (
        <GlassCard>
          <h2 ref={successRef} tabIndex={-1} className="text-h3">Thanks. We'll get back to you.</h2>
          <div className="mt-6">
            <Button variant="ghost" onClick={reset}>Send another message</Button>
          </div>
        </GlassCard>
      ) : (
        <GlassCard>
          <form noValidate onSubmit={onSubmit} aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="text-h3">Send us a message</h2>

            {showSummary && summaryErrors.length > 0 && (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby="contact-summary-title"
                className="mt-6 rounded-[14px] border border-gold p-4"
              >
                <h3 id="contact-summary-title" className="text-small font-semibold text-gold">
                  Please fix {summaryErrors.length === 1 ? 'this' : 'these'}:
                </h3>
                <ul className="mt-2 flex flex-col gap-1">
                  {summaryErrors.map((f) => (
                    <li key={f}>
                      <a
                        href={`#${fieldId(f)}`}
                        onClick={(ev) => {
                          ev.preventDefault();
                          document.getElementById(fieldId(f))?.focus();
                        }}
                        className="text-small text-gold underline underline-offset-4"
                      >
                        {errors[f]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {status === 'failed' && (
              <p role="alert" className="mt-6 rounded-[14px] border border-gold p-4 text-small text-cream">
                That didn't send. Email us directly at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            )}

            <div className="mt-6 flex flex-col gap-5">
              {(['name', 'email'] as const).map((f) => (
                <div key={f}>
                  <label htmlFor={fieldId(f)} className="mb-2 block text-small font-semibold text-cream">
                    {LABELS[f]}
                  </label>
                  <input
                    ref={f === 'name' ? nameRef : undefined}
                    id={fieldId(f)}
                    name={f}
                    type={f === 'email' ? 'email' : 'text'}
                    autoComplete={f === 'email' ? 'email' : 'name'}
                    required
                    maxLength={f === 'name' ? LIMITS.name.max : undefined}
                    value={values[f]}
                    onChange={(ev) => update(f, ev.target.value)}
                    onBlur={() => onBlur(f)}
                    aria-invalid={errors[f] ? true : undefined}
                    aria-describedby={errorId(f)}
                    className={inputClass(!!errors[f])}
                  />
                  {/* Always rendered (never display:none) so the live region announces new errors. */}
                  <p id={errorId(f)} aria-live="polite" className={cx('text-small text-gold', errors[f] && 'mt-2')}>
                    {errors[f]}
                  </p>
                </div>
              ))}

              <div>
                <label htmlFor={fieldId('message')} className="mb-2 block text-small font-semibold text-cream">
                  {LABELS.message}
                </label>
                <textarea
                  id={fieldId('message')}
                  name="message"
                  required
                  rows={6}
                  maxLength={LIMITS.message.max}
                  value={values.message}
                  onChange={(ev) => update('message', ev.target.value)}
                  onBlur={() => onBlur('message')}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={`${errorId('message')} contact-message-count`}
                  className={cx(inputClass(!!errors.message), 'resize-y')}
                />
                <div className="mt-2 flex items-start justify-between gap-4">
                  <p id={errorId('message')} aria-live="polite" className="text-small text-gold">
                    {errors.message}
                  </p>
                  <p id="contact-message-count" className="shrink-0 text-small text-cream">
                    {values.message.length} / {LIMITS.message.max}
                  </p>
                </div>
              </div>

              {/* Honeypot: off-screen, not focusable, hidden from assistive tech. Humans never fill it. */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </div>

            <div className="mt-8">
              <Button type="submit" loading={sending} className="w-full sm:w-auto">
                {sending ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </form>
        </GlassCard>
      )}
    </>
  );
};

export default ContactForm;
