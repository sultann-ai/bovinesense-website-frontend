import { Helmet } from 'react-helmet-async';
import HomeHero from '../components/home/HomeHero';
import RecognitionStrip from '../components/home/RecognitionStrip';
import ProductsSection from '../components/home/ProductsSection';
import ServicesTeaser from '../components/home/ServicesTeaser';
import ProjectsSection from '../components/home/ProjectsSection';
import BlogSection from '../components/home/BlogSection';
import ContactCta from '../components/home/ContactCta';

// TODO(owner sign-off): credential text and meta description.
const CREDENTIAL = 'Incubated at NEIC · NVIDIA Inception';
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

    {/* No hero image asset yet: HomeHero renders a placeholder until `image` is passed. */}
    <HomeHero credential={CREDENTIAL} />
    <RecognitionStrip />
    <ProductsSection />
    <ServicesTeaser />
    <ProjectsSection />
    <BlogSection />
    <ContactCta />
  </>
);

export default Home;
