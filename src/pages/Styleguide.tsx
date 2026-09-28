import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  TagPill,
  ArrowCircleButton,
  GlassCard,
  SectionPanel,
  SectionHeading,
  SignalArc,
  StatBlock,
  Skeleton,
  EmptyState,
  ErrorState,
  ServiceIcon,
  ToneContext,
  Tone,
  cx,
  ArrowUpRight,
  ArrowLeft,
  Menu,
  Close,
  Mail,
  Phone,
  MapPin,
  LinkedIn,
  Twitter,
  GitHub,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Check,
  Download,
} from '../components/ui';
import { productsService } from '../services/productsService';
import { blogService } from '../services/blogService';

// TEMPORARY: design-system check page. Remove before launch.

/** One demo surface: cream (light) or charcoal (dark). Children read the tone from context. */
const Surface = ({ tone, children, className }: { tone: Tone; children: ReactNode; className?: string }) => (
  <div
    className={cx(
      'rounded-card p-6 md:p-8',
      tone === 'dark' ? 'bg-charcoal text-cream' : 'bg-cream text-ink',
      className
    )}
  >
    <ToneContext.Provider value={tone}>
      <p className="mb-5 text-small">{tone === 'dark' ? 'On charcoal' : 'On cream'}</p>
      {children}
    </ToneContext.Provider>
  </div>
);

/** Renders the same demo on cream and on charcoal. */
const Both = ({ children }: { children: ReactNode }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <Surface tone="light">{children}</Surface>
    <Surface tone="dark">{children}</Surface>
  </div>
);

const Block = ({ id, title, children }: { id: string; title: string; children: ReactNode }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="mt-20 first:mt-0">
    <h2 id={`${id}-title`} className="mb-6 text-h2 text-charcoal">{title}</h2>
    {children}
  </section>
);

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-4">{children}</div>
);

const icons = {
  ArrowUpRight, ArrowLeft, Menu, Close, Mail, Phone, MapPin, LinkedIn, Twitter,
  GitHub, ExternalLink, ChevronLeft, ChevronRight, Check, Download,
};

type DemoState = 'live' | 'loading' | 'empty' | 'error';

const Styleguide = () => {
  const [filter, setFilter] = useState('All');
  const [demoState, setDemoState] = useState<DemoState>('live');
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [retrying, setRetrying] = useState(false);
  const [counts, setCounts] = useState<{ products: number; posts: number } | null>(null);

  // Live data demo: counts come from the API, never invented.
  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const [products, posts] = await Promise.all([productsService.getAll(), blogService.getAll()]);
      setCounts({ products: products.length, posts: posts.length });
      setStatus('ready');
    } catch {
      setStatus('error');
    } finally {
      setRetrying(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const retry = () => {
    setRetrying(true);
    setDemoState('live');
    load();
  };

  const effective: DemoState | 'ready' = demoState === 'live' ? status : demoState;

  const renderStats = () => {
    if (effective === 'loading') {
      return (
        <div aria-busy="true" className="grid gap-6 sm:grid-cols-2">
          <span className="sr-only">Loading…</span>
          <Skeleton variant="text" lines={2} />
          <Skeleton variant="text" lines={2} />
        </div>
      );
    }
    if (effective === 'error') return <ErrorState onRetry={retry} retrying={retrying} />;
    if (effective === 'empty' || !counts) return <EmptyState message="Nothing to show yet." />;
    return (
      <div className="grid gap-8 sm:grid-cols-2">
        <StatBlock signal value={counts.products} label="Products (live from API)" />
        <StatBlock icon={<Check />} value={counts.posts} label="Blog posts (live from API)" />
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Styleguide - Bovine</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="bg-cream-deep text-ink">
        {/* Type */}
        <section className="section pt-32 md:pt-40" aria-labelledby="styleguide-type">
          <div className="container-page">
            <h1 id="styleguide-type" className="text-hero text-charcoal">
              Design foundation for <span className="text-terracotta">Bovine</span>
            </h1>
            <p className="mt-6 max-w-measure text-body">
              This temporary page checks the foundation tokens and every shared component on
              both cream and charcoal. Tab through the page to check focus rings.
            </p>
            <p className="mt-4 text-small">Small text sample at 14 pixels.</p>
            <h2 className="mt-12 text-h2 text-charcoal">Section heading</h2>
            <h3 className="mt-6 text-h3 text-charcoal">Card title</h3>
          </div>
        </section>

        <div className="container-page pb-section">
          <Block id="buttons" title="Button">
            <Both>
              <div className="flex flex-col gap-5">
                <Row>
                  <Button>Primary</Button>
                  <Button arrow>Primary with arrow</Button>
                  <Button disabled>Disabled</Button>
                  <Button loading>Loading</Button>
                </Row>
                <Row>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="secondary" arrow>With arrow</Button>
                  <Button variant="secondary" disabled>Disabled</Button>
                  <Button variant="secondary" loading>Loading</Button>
                </Row>
                <Row>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="ghost" disabled>Ghost disabled</Button>
                </Row>
                <Row>
                  <Button to="/styleguide#tags" arrow>Router link</Button>
                  <Button variant="secondary" href="https://www.linkedin.com/company/bovinesense/" arrow>
                    External link
                  </Button>
                </Row>
              </div>
            </Both>
          </Block>

          <Block id="tags" title="TagPill">
            <Both>
              <div className="flex flex-col gap-5">
                <Row>
                  <TagPill label="Static tag" />
                  <TagPill label="Active tag" active />
                </Row>
                <div role="group" aria-label="Example filter" className="flex flex-wrap gap-3">
                  {['All', 'Hardware', 'Software'].map((f) => (
                    <TagPill key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
                  ))}
                </div>
              </div>
            </Both>
          </Block>

          <Block id="arrow-circle" title="ArrowCircleButton">
            <Both>
              <Row>
                <ArrowCircleButton aria-label="Open example" />
                <ArrowCircleButton aria-label="Previous" direction="left" />
                <ArrowCircleButton aria-label="Next" direction="right" />
                <ArrowCircleButton aria-label="Disabled example" disabled />
              </Row>
            </Both>
          </Block>

          <Block id="glass" title="GlassCard">
            <Both>
              <div className="relative overflow-hidden rounded-panel px-4 py-12">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta"
                />
                <GlassCard className="relative mx-auto max-w-sm">
                  <h3 className="text-h3">Glass card</h3>
                  <p className="mt-3 text-body">The circle behind should look frosted.</p>
                  <div className="mt-5">
                    <Button variant="ghost">Ghost inside glass</Button>
                  </div>
                </GlassCard>
              </div>
            </Both>
          </Block>

          <Block id="heading" title="SectionHeading">
            <Both>
              <SectionHeading lead="Our" accent="Products" />
              <SectionHeading
                lead="Latest"
                accent="Posts"
                description="Supporting paragraph: sits to the right on desktop and below on mobile."
              />
            </Both>
          </Block>

          <Block id="signal" title="SignalArc">
            <Both>
              <div className="flex flex-wrap items-end gap-6">
                <SignalArc size={96} origin="bottom-left" animate />
                <SignalArc size={96} origin="bottom-right" arcs={3} animate />
                <SignalArc size={96} origin="top-left" />
                <SignalArc size={96} origin="top-right" arcs={3} />
                <SignalArc size={96} color="cream" animate />
              </div>
              <p className="mt-4 text-small">First two and last animate; they stop under reduced motion.</p>
            </Both>
          </Block>

          <Block id="states" title="StatBlock, Skeleton, EmptyState, ErrorState">
            <div role="group" aria-label="Force a state" className="mb-6 flex flex-wrap gap-3">
              {(['live', 'loading', 'empty', 'error'] as DemoState[]).map((s) => (
                <TagPill key={s} label={s === 'live' ? 'Live data' : `Show ${s}`} active={demoState === s} onClick={() => setDemoState(s)} />
              ))}
            </div>
            <Both>{renderStats()}</Both>

            <h3 className="mb-4 mt-10 text-h3 text-charcoal">Skeleton variants</h3>
            <Both>
              <div className="grid gap-6 sm:grid-cols-2">
                <Skeleton variant="card" />
                <div className="flex flex-col gap-6">
                  <Skeleton variant="image" />
                  <Skeleton variant="text" lines={3} />
                </div>
              </div>
            </Both>

            <h3 className="mb-4 mt-10 text-h3 text-charcoal">Empty and error</h3>
            <Both>
              <EmptyState message="No blog posts yet." action={{ label: 'Back to home', to: '/' }} />
              <ErrorState onRetry={retry} retrying={retrying} />
            </Both>
          </Block>

          <Block id="icons" title="Icons">
            <Both>
              <ul className="grid grid-cols-3 gap-5 sm:grid-cols-5">
                {Object.entries(icons).map(([name, Icon]) => (
                  <li key={name} className="flex flex-col items-center gap-2 text-center">
                    <Icon />
                    <span className="text-small">{name}</span>
                  </li>
                ))}
              </ul>
            </Both>
          </Block>

          <Block id="service-icon" title="ServiceIcon (react-icons resolver)">
            <Both>
              <Row>
                <ServiceIcon name="FaBrain" size={32} />
                <ServiceIcon name="FaCloud" size={32} />
                <ServiceIcon name="FaRobot" size={32} />
                <ServiceIcon name="fas fa-unknown" size={32} />
                <span className="text-small">Last one: unknown name → neutral fallback</span>
              </Row>
            </Both>
          </Block>
        </div>

        {/* SectionPanel demo: full-width, charcoal slides over cream-deep with rounded top. */}
        <SectionPanel tone="cream" aria-labelledby="panel-cream">
          <SectionHeading id="panel-cream" lead="SectionPanel" accent="cream" />
        </SectionPanel>
        <SectionPanel tone="cream-deep" aria-labelledby="panel-cream-deep">
          <SectionHeading id="panel-cream-deep" lead="SectionPanel" accent="cream-deep" />
        </SectionPanel>
        <SectionPanel tone="charcoal" roundedTop id="panel-charcoal" aria-labelledby="panel-charcoal-title">
          <SectionHeading
            id="panel-charcoal-title"
            lead="SectionPanel"
            accent="charcoal"
            description="Rounded top corners slide over the section above."
          />
          <Button arrow>Primary on charcoal</Button>
        </SectionPanel>
      </div>
    </>
  );
};

export default Styleguide;
