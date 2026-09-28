import { blogService } from '../../services/blogService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, Skeleton, ErrorState } from '../ui';
import PostCard from './PostCard';

/** Up to 3 other posts (newest first), excluding the current slug. Hidden when there are none. */
const MorePosts = ({ currentSlug }: { currentSlug: string }) => {
  const { status, data, retry } = useApiResource(blogService.getAll);
  const others = (data ?? []).filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (status === 'success' && others.length === 0) return null;

  return (
    <SectionPanel tone="cream-deep" aria-labelledby="more-posts-title">
      <SectionHeading id="more-posts-title" lead="More" accent="posts" />

      {status === 'loading' && (
        <div aria-busy="true" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <span className="sr-only">Loading posts…</span>
          <Skeleton variant="card" />
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {others.map((post) => (
            <li key={post._id}>
              <PostCard post={post} surface="cream" />
            </li>
          ))}
        </ul>
      )}
    </SectionPanel>
  );
};

export default MorePosts;
