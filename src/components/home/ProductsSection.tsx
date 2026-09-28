import { productsService } from '../../services/productsService';
import { useApiResource } from '../../hooks/useApiResource';
import { SectionPanel, SectionHeading, Button, Skeleton, ErrorState, EmptyState } from '../ui';
import Img from '../ui/Img';

// TODO(owner sign-off): placeholder supporting sentence.
const DESCRIPTION = 'Hardware and software built to keep every animal in your herd visible.';

const ProductsSection = () => {
  const { status, data, retry } = useApiResource(productsService.getAll);

  return (
    <SectionPanel tone="cream" id="products" aria-labelledby="home-products-title">
      <SectionHeading id="home-products-title" lead="Our" accent="Products" description={DESCRIPTION} />

      {status === 'loading' && (
        <div aria-busy="true" className="grid gap-8 md:grid-cols-2">
          <span className="sr-only">Loading products…</span>
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      )}

      {status === 'error' && <ErrorState onRetry={retry} />}

      {status === 'success' && data && data.length === 0 && <EmptyState message="Products will appear here soon." />}

      {status === 'success' && data && data.length > 0 && (
        <ul className="grid gap-8 md:grid-cols-2">
          {data.map((product) => (
            <li key={product._id}>
              <article className="card-lift flex h-full flex-col rounded-card bg-cream-deep p-[26px]">
                <div className="overflow-hidden rounded-image">
                  <Img
                    src={product.bannerImage}
                    alt={product.name}
                    width={1200}
                    height={750}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="card-media aspect-[16/10] w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-h3 text-charcoal">{product.name}</h3>
                <p className="mt-3 flex-1 text-body">{product.shortDescription}</p>
                <div className="mt-6">
                  <Button variant="ghost" to={`/products/${product.slug}`} aria-label={`Learn more about ${product.name}`}>
                    Learn more
                  </Button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </SectionPanel>
  );
};

export default ProductsSection;
