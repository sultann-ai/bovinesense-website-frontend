import { Helmet } from 'react-helmet-async';
import { SectionPanel, SectionHeading, SignalArc, DecorArc } from '../components/ui';
import ContactForm from '../components/contact/ContactForm';
import ContactDetails from '../components/contact/ContactDetails';

const Contact = () => (
  <>
    <Helmet>
      <title>Contact - Bovine</title>
      <meta name="description" content="Get in touch with Bovine." />
    </Helmet>

    {/* Cream band clears the floating nav; the charcoal panel's rounded top sits below it. */}
    <div className="bg-cream pt-28 md:pt-32">
      <SectionPanel tone="charcoal" roundedTop overlapPrevious={false} aria-labelledby="contact-title" className="overflow-x-clip">
        <div className="flex items-end gap-4">
          <SectionHeading as="h1" id="contact-title" lead="Let's" accent="talk" flush />
          <SignalArc size={72} arcs={3} color="terracotta" className="mb-2 shrink-0" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-7">
            {/* Behind the glass form only, so the glass has something to frost. */}
            <DecorArc size={460} origin="top-left" className="-left-12 -top-10 opacity-35" />
            <DecorArc size={360} color="cream" origin="bottom-right" className="-bottom-12 -right-8 opacity-10" />
            <div className="relative">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5">
            <ContactDetails />
          </div>
        </div>
      </SectionPanel>
    </div>
  </>
);

export default Contact;
