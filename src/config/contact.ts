// Single source for public contact details (footer, contact page, CTA bands).

export const CONTACT_EMAIL = 'info@bovinehq.com';
export const LOCATION = 'Islamabad, Pakistan';

// Only profiles that already existed in the codebase. Do not add unverified profiles.
// This URL came from the original Contact page; the original Footer linked
// /company/zynin/ (the pre-rebrand name).
// TODO(owner): confirm this LinkedIn URL is the live company page.
export const SOCIAL_LINKS: Array<{ network: 'linkedin'; label: string; href: string }> = [
  { network: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/bovinesense/' },
];
