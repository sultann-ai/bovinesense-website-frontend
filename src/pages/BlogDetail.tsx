import { useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogService } from '../services/blogService';
import { useApiResource } from '../hooks/useApiResource';
import {
  SectionPanel,
  RichText,
  Skeleton,
  ErrorState,
  NotFoundState,
  ArrowLeft,
  Img,
} from '../components/ui';
import ShareRow from '../components/blog-page/ShareRow';
import MorePosts from '../components/blog-page/MorePosts';
import { formatDate, WIDTHS } from '../utils/images';
import { readingMinutes } from '../utils/sanitize';

const TOP_PAD = 'pt-32 md:pt-40';

const BlogDetail = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const fetchPost = useCallback(() => blogService.getBySlug(slug), [slug]);
  const { status, data: post, httpStatus, retry } = useApiResource(fetchPost);
  const minutes = useMemo(() => readingMinutes(post?.content), [post?.content]);

  if (status === 'loading') {
    return (
      <>
        <SectionPanel key="header" tone="charcoal" className={TOP_PAD}>
          <div aria-busy="true">
            <span className="sr-only">Loading post…</span>
            <Skeleton variant="text" lines={2} className="max-w-2xl" />
            <Skeleton variant="image" className="mt-10" />
          </div>
        </SectionPanel>
        <SectionPanel key="body" tone="cream">
          <Skeleton variant="text" lines={8} className="mx-auto max-w-[720px]" />
        </SectionPanel>
      </>
    );
  }

  if (status === 'error' || !post) {
    return (
      <SectionPanel key="error" tone="cream" className={TOP_PAD}>
        <Helmet>
          <title>Post not found - Bovine</title>
        </Helmet>
        {httpStatus === 404 ? (
          <NotFoundState
            title="Post not found"
            message="This post doesn't exist or has been removed."
            action={{ label: 'All posts', to: '/blog' }}
          />
        ) : (
          <ErrorState onRetry={retry} />
        )}
      </SectionPanel>
    );
  }

  const published = new Date(post.createdAt);

  return (
    <>
      <Helmet>
        <title>{post.title} - Bovine</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article aria-labelledby="post-title">
        {/* Header */}
        <SectionPanel key="header" tone="charcoal" className={TOP_PAD}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-pill text-small font-medium text-cream underline-offset-4 hover:underline"
          >
            <ArrowLeft size={18} />
            All posts
          </Link>
          <h1 id="post-title" className="mt-8 max-w-4xl text-h2 text-cream">{post.title}</h1>
          <p className="mt-5 text-small text-cream">
            {post.author} · <time dateTime={published.toISOString()}>{formatDate(published)}</time> · {minutes} min read
          </p>
          {post.coverImage && (
            <Img
              src={post.coverImage}
              alt={post.title}
              width={1600}
              height={900}
              widths={WIDTHS.full}
              sizes="(min-width: 1264px) 1136px, 100vw"
              priority
              className="mt-10 aspect-[16/9] w-full rounded-image object-cover"
            />
          )}
        </SectionPanel>

        {/* Body: sanitized API HTML (RichText → DOMPurify allow-list). */}
        <SectionPanel key="body" tone="cream">
          <div className="mx-auto max-w-[720px]">
            <RichText value={post.content} className="rich-text--article" />
            <div className="mt-12 border-t border-[rgba(58,55,51,0.25)] pt-8">
              <ShareRow title={post.title} />
            </div>
          </div>
        </SectionPanel>
      </article>

      <MorePosts currentSlug={post.slug} />
    </>
  );
};

export default BlogDetail;
