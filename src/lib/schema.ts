import { site } from '@/config/site';

/** The business as structured data for Google, built from src/config/site.ts so it never drifts from the page. Prerendered into every page. */
export function businessSchema(siteUrl: string) {
  const international = `+44${site.phone.replace(/^0/, '')}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${siteUrl}/#business`,
    name: site.name,
    description: `Mobile mechanic covering all of ${site.area} for servicing, repairs and wet belt changes.`,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.jpg`,
    logo: `${siteUrl}/logo.jpg`,
    telephone: international,
    ...(site.email ? { email: site.email } : {}),
    address: { '@type': 'PostalAddress', addressRegion: site.area, addressCountry: 'GB' },
    areaServed: { '@type': 'AdministrativeArea', name: site.area },
    openingHoursSpecification: site.openingHours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mobile mechanic services',
      itemListElement: [{ title: 'Wet belt changes', text: 'Our speciality.' }, ...site.services].map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.text },
      })),
    },
  };
}
