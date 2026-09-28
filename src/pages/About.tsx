import { Helmet } from 'react-helmet-async';
import { SectionPanel, SectionHeading, DecorArc } from '../components/ui';
import FoundersBlock from '../components/about-page/FoundersBlock';
import TeamBlock from '../components/about-page/TeamBlock';
import RecognitionsBlock from '../components/about-page/RecognitionsBlock';
import PartnersBlock from '../components/about-page/PartnersBlock';
import ContactCta from '../components/home/ContactCta';

// TODO(owner sign-off): placeholder company paragraph and meta description.
const INTRO =
  'Bovine builds AI and IoT tools for livestock health monitoring, from on-animal devices to the analytics that turn their data into early warnings.';
const META_DESCRIPTION = 'About Bovine — AI-powered livestock health monitoring.';

/**
 * About. Founders, team, recognitions and partners each fetch independently,
 * handle their own loading/error state, and hide themselves when empty.
 */
const About = () => (
  <>
    <Helmet>
      <title>About - Bovine</title>
      <meta name="description" content={META_DESCRIPTION} />
    </Helmet>

    <SectionPanel tone="charcoal" aria-labelledby="about-title" className="relative overflow-x-clip pt-32 md:pt-40">
      {/* Sits in the header's top padding band, clear of the heading and paragraph. */}
      <DecorArc size={150} origin="top-right" className="-top-36 right-0 opacity-30" />
      <div className="relative">
        <SectionHeading as="h1" id="about-title" lead="About" accent="Bovine" description={INTRO} flush />
      </div>
    </SectionPanel>

    <FoundersBlock />
    <TeamBlock />
    <RecognitionsBlock />
    <PartnersBlock />
    <ContactCta />
  </>
);

export default About;
