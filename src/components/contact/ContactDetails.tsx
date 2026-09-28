import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, LinkedIn, IconLink } from '../ui';
import { CONTACT_EMAIL, LOCATION, SOCIAL_LINKS } from '../../config/contact';
import { copyText } from '../../utils/clipboard';

// TODO(owner sign-off): reply-time expectation. Deliberately contains no number until you supply one.
const REPLY_EXPECTATION = "We read every message and will reply as soon as we can.";

const SOCIAL_ICONS = { linkedin: <LinkedIn size={18} /> };

/** Right column: email (+ copy), location, social links, reply expectation. No phone, no map. */
const ContactDetails = () => {
  const [copied, setCopied] = useState('');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await copyText(CONTACT_EMAIL);
      setCopied('Email address copied');
    } catch {
      setCopied("Couldn't copy the email address");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(''), 2500);
  };

  return (
    <div className="flex flex-col gap-8 text-cream">
      <div>
        <h2 className="text-small font-semibold">Email</h2>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-3 rounded-pill text-body font-semibold underline-offset-4 hover:underline"
          >
            <Mail size={22} className="shrink-0 text-gold" />
            {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-pill border border-[rgba(246,241,233,0.3)] px-4 py-2 text-small font-semibold hover:bg-[rgba(246,241,233,0.07)]"
          >
            Copy<span className="sr-only"> email address</span>
          </button>
          <span aria-live="polite" className="text-small">{copied}</span>
        </div>
      </div>

      <div>
        <h2 className="text-small font-semibold">Location</h2>
        <p className="mt-3 inline-flex items-center gap-3 text-body">
          <MapPin size={22} className="shrink-0 text-gold" />
          {LOCATION}
        </p>
      </div>

      {SOCIAL_LINKS.length > 0 && (
        <div>
          <h2 className="text-small font-semibold">Follow</h2>
          <ul className="mt-3 flex gap-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.href}>
                <IconLink href={s.href} label={`Bovine on ${s.label}`} icon={SOCIAL_ICONS[s.network]} tone="dark" />
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="max-w-measure text-body">{REPLY_EXPECTATION}</p>
    </div>
  );
};

export default ContactDetails;
