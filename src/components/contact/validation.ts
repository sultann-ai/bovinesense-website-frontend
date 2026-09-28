export type ContactField = 'name' | 'email' | 'message';
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 20, max: 2000 },
} as const;

// Pragmatic format check (the backend does not validate email format):
// something@something.tld, no spaces, TLD of 2+ characters.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[^\s@.]{2,}$/;

export const validateField = (field: ContactField, raw: string): string | undefined => {
  const value = raw.trim();
  switch (field) {
    case 'name':
      if (!value) return 'Enter your name.';
      if (value.length < LIMITS.name.min) return `Name must be at least ${LIMITS.name.min} characters.`;
      if (value.length > LIMITS.name.max) return `Name must be ${LIMITS.name.max} characters or fewer.`;
      return undefined;
    case 'email':
      if (!value) return 'Enter your email address.';
      if (!EMAIL_RE.test(value)) return 'Enter a valid email address, like name@example.com.';
      return undefined;
    case 'message':
      if (!value) return 'Enter a message.';
      if (value.length < LIMITS.message.min) return `Message must be at least ${LIMITS.message.min} characters.`;
      if (value.length > LIMITS.message.max) return `Message must be ${LIMITS.message.max} characters or fewer.`;
      return undefined;
  }
};

export const FIELDS: ContactField[] = ['name', 'email', 'message'];

export const validateAll = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {};
  for (const field of FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
};
