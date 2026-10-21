/**
 * Facts about the business. Anything not confirmed with the client is left empty on purpose:
 * the site only shows a section when its value is filled in, and never invents details.
 */
export const site = {
  name: 'AG Automotive',
  strap: 'The Mobile Mechanic',
  phone: '07375419123',
  phoneDisplay: '07375 419123',
  /** Fill in once confirmed. Shown in the footer and contact page. */
  email: '' as string,
  /** Where the business works, e.g. "Leeds and Bradford". Leave empty until confirmed. */
  area: '' as string,
  /** Opening hours, e.g. "Monday to Saturday, 8am to 6pm". Leave empty until confirmed. */
  hours: '' as string,
  /**
   * Quote form endpoint (e.g. a Formspree form URL). While this is empty the quote section shows
   * Call and Text buttons instead of a form, so nothing on the page pretends to work when it doesn't.
   */
  formEndpoint: '' as string,
  /** Real customer reviews, word for word, with permission: [{ quote: '...', name: 'A. Customer' }]. Section hides when empty. */
  reviews: [] as { quote: string; name: string }[],
  credit: { label: 'Website by AI by AO', href: 'https://www.aibyao.com' },
};

export const nav = [
  { path: '/wet-belt-changes', label: 'Wet belt changes' },
  { path: '/contact', label: 'Contact' },
];

export const tel = `tel:${site.phone}`;
export const sms = `sms:${site.phone}`;
