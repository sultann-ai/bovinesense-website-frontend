import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { productsService } from '../services/productsService';
import { useApiResource } from '../hooks/useApiResource';
import {
  SectionPanel,
  ArcFrame,
  Button,
  RichText,
  Skeleton,
  ErrorState,
  NotFoundState,
  ArrowLeft,
  Check,
  ExternalLink,
  Img,
} from '../components/ui';
import ScreenshotGallery from '../components/products/ScreenshotGallery';
import { hasRichTextContent } from '../utils/sanitize';

const nonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

const TopPad = 'pt-32 md:pt-40';

const ProductDetail = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const fetchProduct = useCallback(() => productsService.getBySlug(slug), [slug]);
  const { status, data: product, httpStatus, retry } = useApiResource(fetchProduct);

  if (status === 'loading') {
    return (
      <>
        <SectionPanel key="header" tone="charcoal" className={TopPad}>
          <div aria-busy="true" className="grid gap-10 lg:grid-cols-2">
            <span className="sr-only">Loading product…</span>
            <Skeleton variant="text" lines={3} />
            <Skeleton variant="image" />
          </div>
        </SectionPanel>
        <SectionPanel key="body" tone="cream">
          <div className="max-w-[760px]">
            <Skeleton variant="text" lines={6} />
          </div>
        </SectionPanel>
      </>
    );
  }

  if (status === 'error' || !product) {
    return (
      <SectionPanel key="error" tone="cream" className={TopPad}>
        <Helmet>
          <title>Product not found - Bovine</title>
        </Helmet>
        {httpStatus === 404 ? (
          <NotFoundState
            title="Product not found"
            message="This product doesn't exist or is no longer available."
            action={{ label: 'All products', to: '/products' }}
          />
        ) : (
          <ErrorState onRetry={retry} />
        )}
      </SectionPanel>
    );
  }

  const features = (product.features ?? []).filter(nonEmpty);
  const screenshots = (product.screenshots ?? []).filter(nonEmpty);
  const hasLinks = nonEmpty(product.githubLink) || nonEmpty(product.liveLink);

  return (
    <>
      <Helmet>
        <title>{product.name} - Bovine</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>

      {/* Header */}
      <SectionPanel key="header" tone="charcoal" aria-labelledby="product-title" className={TopPad}>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-pill text-small font-medium text-cream underline-offset-4 hover:underline"
        >
          <ArrowLeft size={18} />
          All products
        </Link>
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 id="product-title" className="text-hero text-cream">{product.name}</h1>
            <p className="mt-6 max-w-measure text-body text-cream">{product.shortDescription}</p>
          </div>
          {nonEmpty(product.bannerImage) && (
            <ArcFrame arcSide="top-right">
              <Img
                src={product.bannerImage}
                alt={product.name}
                width={1400}
                height={875}
                widths={[640, 960, 1280, 1600]}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </ArcFrame>
          )}
        </div>
      </SectionPanel>

      {/* Body */}
      <SectionPanel key="body" tone="cream">
        <div className="flex max-w-[760px] flex-col gap-16">
          {hasRichTextContent(product.fullDescription) && (
            <section aria-labelledby="product-what">
              <h2 id="product-what" className="text-h2 text-charcoal">What it does</h2>
              <RichText value={product.fullDescription} className="mt-6" />
            </section>
          )}

          {features.length > 0 && (
            <section aria-labelledby="product-features">
              <h2 id="product-features" className="text-h2 text-charcoal">Features</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {features.map((feature, i) => (
                  <li key={`${feature}-${i}`} className="flex items-start gap-3 text-body">
                    <Check size={22} className="mt-[3px] shrink-0 text-terracotta" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {screenshots.length > 0 && (
          <section aria-labelledby="product-screenshots" className="mt-16">
            <h2 id="product-screenshots" className="mb-6 text-h2 text-charcoal">Screenshots</h2>
            <ScreenshotGallery productName={product.name} screenshots={screenshots} />
          </section>
        )}

        {hasLinks && (
            <div className="mt-16 flex flex-wrap gap-4">
              {nonEmpty(product.liveLink) && (
                <Button variant="secondary" href={product.liveLink}>
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink size={18} />
                    Visit live site
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </Button>
              )}
              {nonEmpty(product.githubLink) && (
                <Button variant="secondary" href={product.githubLink}>
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink size={18} />
                    View on GitHub
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </Button>
              )}
            </div>
        )}
      </SectionPanel>

      {/* Footer band */}
      <SectionPanel tone="charcoal" roundedTop aria-labelledby="product-cta">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 id="product-cta" className="text-h2 text-cream">Interested in {product.name}?</h2>
          <Button to="/contact" arrow>Talk to us</Button>
        </div>
      </SectionPanel>
    </>
  );
};

export default ProductDetail;
