import { blogService } from '../../services/blogService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, Skeleton, ErrorState } from '../ui';
import PostCard from '../blog-page/PostCard';

/** Three latest posts. The whole section is hidden when there are no posts. */
const BlogSection = () => {
  const { status, data, retry } = useApiResource(blogService.getAll);
  const posts = (data ?? []).slice(0, 3);

  if (status === 'success' && posts.length === 0) return null;

  return (
    <SectionPanel tone="cream" id="blog" aria-labelledby="home-blog-title">
      <SectionHeading id="home-blog-title" lead="From the" accent="blog" />

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
          {posts.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </SectionPanel>
  );
};

export default BlogSection;
