import { useEffect, useRef, useState } from 'react';
import { Button, IconLink, LinkedIn, Twitter } from '../ui';
import { copyText } from '../../utils/clipboard';

/** Copy link + LinkedIn / X share links for the current page URL. */
const ShareRow = ({ title }: { title: string }) => {
  const [message, setMessage] = useState('');
  const timer = useRef<number>();
  const url = window.location.href;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await copyText(url);
      setMessage('Copied');
    } catch {
      setMessage("Couldn't copy the link");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(''), 2500);
  };

  const encoded = encodeURIComponent(url);
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
  const x = `https://x.com/intent/tweet?url=${encoded}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Share this post" role="group">
      <Button variant="secondary" onClick={onCopy}>Copy link</Button>
      <IconLink href={linkedIn} label="Share on LinkedIn" icon={<LinkedIn size={18} />} />
      <IconLink href={x} label="Share on X" icon={<Twitter size={18} />} />
      <span aria-live="polite" className="text-small font-semibold text-charcoal">{message}</span>
    </div>
  );
};

export default ShareRow;
