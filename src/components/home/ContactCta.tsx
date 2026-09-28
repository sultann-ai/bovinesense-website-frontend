import { SectionPanel, SectionHeading, SignalArc, Button } from '../ui';
import { CONTACT_EMAIL } from '../../config/contact';

// TODO(owner sign-off): placeholder supporting sentence.
const SUPPORTING = 'Tell us about your herd and we will show you how Bovine fits your farm.';

const ContactCta = () => (
  <SectionPanel tone="charcoal" roundedTop id="contact" aria-labelledby="home-contact-title">
    <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-end gap-4">
          <SectionHeading id="home-contact-title" lead="Let's" accent="talk" flush />
          <SignalArc size={64} arcs={3} color="terracotta" className="mb-2 shrink-0" />
        </div>
        <p className="mt-4 max-w-measure text-body text-cream">{SUPPORTING}</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button to="/contact" arrow>Contact us</Button>
        <Button variant="secondary" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Button>
      </div>
    </div>
  </SectionPanel>
);

export default ContactCta;
