import { Helmet } from 'react-helmet-async';
import { productsService } from '../services/productsService';
import { useApiResource } from '../hooks/useApiResource';
import {
  SectionPanel,
  SectionHeading,
  ArcFrame,
  TagPill,
  Button,
  Skeleton,
  ErrorState,
  EmptyState,
  cx,
  Img,
} from '../components/ui';

// Note: GET /products returns every product (no pagination, no published/draft flag),
// so everything in the database is live. Drafts would need a backend change.

const Products = () => {
  const { status, data, retry } = useApiResource(productsService.getAll);

  return (
    <>
      <Helmet>
        <title>Products - Bovine</title>
        <meta name="description" content="Products from Bovine." />
      </Helmet>

      <SectionPanel tone="cream" aria-labelledby="products-title" className="pt-32 md:pt-40">
        <SectionHeading as="h1" id="products-title" lead="Our" accent="Products" />

        {status === 'loading' && (
          <div aria-busy="true" className="flex flex-col gap-16">
            <span className="sr-only">Loading products…</span>
            {[0, 1].map((i) => (
              <div key={i} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <Skeleton variant="image" />
                <Skeleton variant="text" lines={4} />
              </div>
            ))}
          </div>
        )}

        {status === 'error' && <ErrorState onRetry={retry} />}

        {status === 'success' && data && data.length === 0 && (
          <EmptyState message="Products will appear here soon." action={{ label: 'Back to home', to: '/' }} />
        )}

        {status === 'success' && data && data.length > 0 && (
          <ul className="flex flex-col gap-20 md:gap-28">
            {data.map((product, i) => {
              const imageRight = i % 2 === 1;
              const features = (product.features ?? []).filter(Boolean).slice(0, 3);
              return (
                <li key={product._id}>
                  <article className="card-lift grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <ArcFrame
                      arcSide={imageRight ? 'top-right' : 'top-left'}
                      className={cx(imageRight && 'lg:order-2')}
                    >
                      <Img
                        src={product.bannerImage}
                        alt={product.name}
                        width={1200}
                        height={750}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={i === 0}
                        className="card-media h-full w-full object-cover"
                      />
                    </ArcFrame>

                    <div className={cx(imageRight && 'lg:order-1')}>
                      <h2 className="text-h2 text-charcoal">{product.name}</h2>
                      <p className="mt-4 max-w-measure text-body">{product.shortDescription}</p>
                      {features.length > 0 && (
                        <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${product.name} key features`}>
                          {features.map((feature, j) => (
                            <li key={`${feature}-${j}`}>
                              <TagPill label={feature} />
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-8">
                        <Button to={`/products/${product.slug}`} arrow aria-label={`See details about ${product.name}`}>
                          See details
                        </Button>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </SectionPanel>
    </>
  );
};

export default Products;
