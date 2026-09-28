import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogService } from '../services/blogService';
import { useApiResource } from '../hooks/useApiResource';
import { BlogPost } from '../types';
import {
  SectionPanel,
  SectionHeading,
  Button,
  Skeleton,
  ErrorState,
  EmptyState,
} from '../components/ui';
import PostCard from '../components/blog-page/PostCard';
import { formatDate, WIDTHS } from '../utils/images';
import Img from '../components/ui/Img';

// GET /blog returns every post (newest first) with no pagination, category, tag or
// published field. Search and "load more" run client-side over that single payload.
// If the post count grows enough for the payload to be slow, server-side pagination
// would need an approved backend change.
const PAGE_SIZE = 9;

const matches = (post: BlogPost, q: string) =>
  post.title.toLowerCase().includes(q) || (post.excerpt ?? '').toLowerCase().includes(q);

const FeaturedPost = ({ post }: { post: BlogPost }) => (
  <article className="card-lift relative grid overflow-hidden rounded-card bg-cream-deep lg:grid-cols-12">
    <div className="overflow-hidden lg:col-span-7">
      <Img
        src={post.coverImage}
        alt={post.title}
        width={1400}
        height={875}
        widths={WIDTHS.full}
        sizes="(min-width: 1024px) 58vw, 100vw"
        priority
        className="card-media aspect-[16/10] h-full w-full object-cover lg:aspect-auto"
      />
    </div>
    <div className="flex flex-col justify-center p-[26px] md:p-10 lg:col-span-5">
      <p className="text-small">Latest post</p>
      <h2 className="mt-3 text-h2 text-charcoal">
        <Link
          to={`/blog/${post.slug}`}
          className="underline-offset-4 after:absolute after:inset-0 after:rounded-card hover:underline"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-4 text-body">{post.excerpt}</p>
      <p className="mt-6 text-small">
        {post.author} · <time dateTime={new Date(post.createdAt).toISOString()}>{formatDate(post.createdAt)}</time>
      </p>
    </div>
  </article>
);

const Blog = () => {
  const { status, data, retry } = useApiResource(blogService.getAll);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const firstNewRef = useRef<HTMLAnchorElement>(null);
  const focusNewAt = useRef<number | null>(null);

  const posts = useMemo(() => data ?? [], [data]);
  const q = query.trim().toLowerCase();
  const searching = q !== '';

  // Not searching: newest post is featured, the rest go in the grid.
  // Searching: every match goes in the grid.
  const featured = !searching ? posts[0] : undefined;
  const pool = useMemo(
    () => (searching ? posts.filter((p) => matches(p, q)) : posts.slice(1)),
    [posts, q, searching]
  );
  const shown = pool.slice(0, visibleCount);

  // New search resets paging.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [q]);

  // After "Load more", move focus to the first newly revealed post.
  useEffect(() => {
    if (focusNewAt.current !== null) {
      firstNewRef.current?.focus();
      focusNewAt.current = null;
    }
  }, [visibleCount]);

  const loadMore = () => {
    focusNewAt.current = visibleCount;
    setVisibleCount((n) => n + PAGE_SIZE);
  };

  const countLabel = searching
    ? `${pool.length} ${pool.length === 1 ? 'post matches' : 'posts match'} “${query.trim()}”`
    : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`;

  return (
    <>
      <Helmet>
        <title>Blog - Bovine</title>
        <meta name="description" content="News and writing from Bovine." />
      </Helmet>

      <SectionPanel tone="charcoal" aria-labelledby="blog-title" className="pt-32 md:pt-40">
        <SectionHeading as="h1" id="blog-title" lead="From the" accent="field" flush />
      </SectionPanel>

      <SectionPanel tone="cream" aria-label="Posts">
        {status === 'loading' && (
          <div aria-busy="true" className="flex flex-col gap-10">
            <span className="sr-only">Loading posts…</span>
            <Skeleton variant="image" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton variant="card" />
              <Skeleton variant="card" />
              <Skeleton variant="card" />
            </div>
          </div>
        )}

        {status === 'error' && <ErrorState onRetry={retry} />}

        {status === 'success' && posts.length === 0 && (
          <EmptyState message="No posts yet." action={{ label: 'Back to home', to: '/' }} />
        )}

        {status === 'success' && posts.length > 0 && (
          <>
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="w-full sm:max-w-sm">
                <label htmlFor="blog-search" className="mb-2 block text-small font-semibold text-charcoal">
                  Search posts
                </label>
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search titles and excerpts"
                  autoComplete="off"
                  className="w-full rounded-pill border border-[rgba(58,55,51,0.25)] bg-cream px-5 py-3 text-body text-ink placeholder:text-ink"
                />
              </div>
              <p aria-live="polite" className="text-small">{countLabel}</p>
            </div>

            {featured && <FeaturedPost post={featured} />}

            {searching && pool.length === 0 && (
              <EmptyState message="No posts match your search." action={{ label: 'Clear search', onClick: () => setQuery('') }} />
            )}

            {shown.length > 0 && (
              <section aria-labelledby="blog-grid-title" className={featured ? 'mt-12' : undefined}>
                <h2 id="blog-grid-title" className="sr-only">{searching ? 'Search results' : 'More posts'}</h2>
                <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {shown.map((post, i) => (
                    <li key={post._id}>
                      <PostCard post={post} ref={i === focusNewAt.current ? firstNewRef : undefined} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {pool.length > shown.length && (
              <div className="mt-12 flex justify-center">
                <Button variant="secondary" onClick={loadMore}>
                  Load more posts
                </Button>
              </div>
            )}
          </>
        )}
      </SectionPanel>
    </>
  );
};

export default Blog;
