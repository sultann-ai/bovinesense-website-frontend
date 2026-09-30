import { Helmet } from 'react-helmet-async';
import HomeHero from '../components/home/HomeHero';
import RecognitionStrip from '../components/home/RecognitionStrip';
import ProductsSection from '../components/home/ProductsSection';
import ServicesTeaser from '../components/home/ServicesTeaser';
import ProjectsSection from '../components/home/ProjectsSection';
import BlogSection from '../components/home/BlogSection';
import ContactCta from '../components/home/ContactCta';

// Resized WebP copies of public/hero-eartag.jpg (the original stays as the fallback src).
const HERO_IMAGE = {
  src: '/hero-eartag.jpg',
  srcSet: [640, 960, 1200, 1600].map((w) => `/hero-eartag-${w}.webp ${w}w`).join(', '),
  alt: 'A black and white dairy cow wearing a Bovine smart neck collar',
};

// Right edge of the collar's sensor unit in the photo (% of the frame): the SignalArc radiates from here.
const COLLAR_POINT = { x: 48, y: 51 };

// TODO(owner sign-off): credential text and meta description.
const CREDENTIAL = 'Proudly Build in Pakistan ';
const META_DESCRIPTION = 'Bovine — AI-powered livestock health monitoring.';

/**
 * Home. Every data section fetches its own endpoint on mount, so the requests
 * run in parallel and a failing endpoint only affects its own section.
 */
const Home = () => (
  <>
    <Helmet>
      <title>Bovine</title>
      <meta name="description" content={META_DESCRIPTION} />
    </Helmet>

    <HomeHero credential={CREDENTIAL} image={HERO_IMAGE} earTagPoint={COLLAR_POINT} />
    <RecognitionStrip />
    <ProductsSection />
    <ServicesTeaser />
    <ProjectsSection />
    <BlogSection />
    <ContactCta />
  </>
);

export default Home;
