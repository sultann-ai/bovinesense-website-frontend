import { useMemo } from 'react';
import { sanitizeRichText, looksLikeHtml } from '../../utils/sanitize';
import { cx } from './tone';

export interface RichTextProps {
  /** HTML (or plain text) from the API. Always sanitized before rendering. */
  value: string | undefined | null;
  className?: string;
}

/**
 * The only approved way to render API HTML (CLAUDE.md rule 9).
 * Plain text without tags is rendered as paragraphs split on blank lines.
 */
const RichText = ({ value, className }: RichTextProps) => {
  const content = useMemo(() => {
    const raw = (value ?? '').trim();
    if (!raw) return null;
    if (looksLikeHtml(raw)) return { html: sanitizeRichText(raw) };
    return { paragraphs: raw.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) };
  }, [value]);

  if (!content) return null;

  if ('html' in content) {
    // Sanitized by DOMPurify with a strict tag/attribute allowlist (utils/sanitize.ts).
    return <div className={cx('rich-text', className)} dangerouslySetInnerHTML={{ __html: content.html ?? '' }} />;
  }

  return (
    <div className={cx('rich-text', className)}>
      {content.paragraphs.map((p, i) => (
        <p key={i} className="whitespace-pre-line">{p}</p>
      ))}
    </div>
  );
};

export default RichText;
