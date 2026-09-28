import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/images';
import { cx } from '../ui';
import Img from '../ui/Img';

export interface PostCardProps {
  post: BlogPost;
  headingLevel?: 'h2' | 'h3';
  /** Card background (contrast with the panel it sits on). */
  surface?: 'cream' | 'cream-deep';
}

/**
 * Blog post card: cover 16:10, title (stretched link to /blog/:slug), excerpt clamped
 * to 3 lines, author and date. The forwarded ref points at the link (for focus management).
 */
const PostCard = forwardRef<HTMLAnchorElement, PostCardProps>(
  ({ post, headingLevel: Heading = 'h3', surface = 'cream-deep' }, ref) => (
    <article
      className={cx(
        'card-lift relative flex h-full flex-col rounded-card p-[26px]',
        surface === 'cream-deep' ? 'bg-cream-deep' : 'bg-cream'
      )}
    >
      <div className="overflow-hidden rounded-image">
        <Img
          src={post.coverImage}
          alt={post.title}
          width={800}
          height={500}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="card-media aspect-[16/10] w-full object-cover"
        />
      </div>
      <Heading className="mt-6 text-h3 text-charcoal">
        <Link
          ref={ref}
          to={`/blog/${post.slug}`}
          className="underline-offset-4 after:absolute after:inset-0 after:rounded-card hover:underline"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="mt-3 line-clamp-3 flex-1 text-body">{post.excerpt}</p>
      <p className="mt-5 text-small">
        {post.author} · <time dateTime={new Date(post.createdAt).toISOString()}>{formatDate(post.createdAt)}</time>
      </p>
    </article>
  )
);

PostCard.displayName = 'PostCard';

export default PostCard;
