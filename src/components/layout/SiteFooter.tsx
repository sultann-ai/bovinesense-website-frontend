import { useEffect, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { productsService } from '../../services/productsService';
import { Product } from '../../types';
import { SignalArc, LinkedIn, Mail, MapPin } from '../ui';
import { WORDMARK_ON_DARK } from './navItems';
import { CONTACT_EMAIL, LOCATION, SOCIAL_LINKS } from '../../config/contact';

// TODO(owner sign-off): placeholder positioning sentence. Replace with the approved wording.
const POSITIONING = 'AI-powered livestock health monitoring';

const SOCIAL_ICONS = { linkedin: <LinkedIn size={18} /> };

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const linkClass = 'text-cream underline-offset-4 hover:underline';

const Column = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h2 className="mb-4 text-small font-semibold text-cream">{title}</h2>
    {children}
  </div>
);

const SiteFooter = () => {
  // Products come from the API. While loading, on failure or when empty, the column is omitted.
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    productsService
      .getAll()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setProducts(data.filter((p) => p.slug && p.name));
      })
      .catch(() => {
        /* Intentionally silent: the footer renders without the Products column. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream">
      <SignalArc
        size={420}
        color="cream"
        origin="bottom-right"
        className="pointer-events-none absolute bottom-0 right-0 opacity-[0.06]"
      />

      <div className="container-page relative py-section">
        {/* Row 1 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <Link to="/" aria-label="Bovine — home" className="inline-flex w-fit shrink-0 rounded-pill">
            <img
              src={WORDMARK_ON_DARK.src}
              width={WORDMARK_ON_DARK.width}
              height={WORDMARK_ON_DARK.height}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-body text-cream">{POSITIONING}</p>
        </div>

        {/* Row 2 */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 && (
            <Column title="Products">
              <ul className="flex flex-col gap-3">
                {products.map((product) => (
                  <li key={product._id}>
                    <Link to={`/products/${product.slug}`} className={linkClass}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          )}

          <Column title="Company">
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Contact">
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkClass} inline-flex items-center gap-2`}>
                  <Mail size={18} />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin size={18} />
                {LOCATION}
              </li>
            </ul>
          </Column>

          {SOCIAL_LINKS.length > 0 && (
            <Column title="Follow">
              <ul className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} inline-flex items-center gap-2`}
                    >
                      {SOCIAL_ICONS[social.network]}
                      {social.label}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Column>
          )}
        </div>

        {/* Row 3 */}
        <div className="mt-12 border-t border-[rgba(246,241,233,0.12)] pt-6">
          <p className="text-small text-cream opacity-60">
            © {year} BovineSense (Private) Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
