/**
 * Facts about the business. Anything not confirmed with the client is left empty on purpose:
 * the site only shows a section when its value is filled in, and never invents details.
 * Confirmed so far: the area (all of West Yorkshire) and that he does all mechanic services. The service list below is the
 * standard set of mechanical work; he should confirm each line.
 */
export const site = {
  name: 'AG Automotive',
  strap: 'The Mobile Mechanic',
  phone: '07375419123',
  phoneDisplay: '07375 419123',
  /** Fill in once confirmed. Shown in the footer and contact page. */
  email: '' as string,
  /** Where the business works. */
  area: 'West Yorkshire' as string,
  /** Towns he covers beyond Leeds, Bradford and Wakefield (which have their own pages). He covers all of West Yorkshire. */
  towns: ['Huddersfield', 'Halifax', 'Keighley', 'Dewsbury', 'Batley', 'Brighouse', 'Holmfirth', 'Hebden Bridge'] as string[],
  /** Districts he covers within each town, keyed by area slug, e.g. { leeds: ['Headingley', 'Morley'] }. Each list shows on its town page once filled in; leave empty until he confirms. */
  districts: {
    leeds: ['Headingley', 'Chapel Allerton', 'Roundhay', 'Moortown', 'Horsforth', 'Pudsey', 'Morley', 'Otley', 'Wetherby', 'Garforth', 'Rothwell', 'Guiseley'],
    wakefield: ['Pontefract', 'Castleford', 'Normanton', 'Ossett', 'Horbury', 'Featherstone', 'Hemsworth', 'Knottingley', 'South Elmsall', 'Crofton'],
    bradford: ['Shipley', 'Bingley', 'Keighley', 'Ilkley', 'Baildon', 'Saltaire', 'Idle', 'Eccleshill', 'Queensbury', 'Thornton'],
  } as Record<string, string[]>,
  /** What he does besides wet belts: [{ title: 'Servicing', text: 'One line.' }]. Leave empty until he confirms; the section hides when empty. */
  services: [
    { title: 'Servicing', text: 'Interim and full services at your location.' },
    { title: 'Brakes', text: 'Brake pads, discs and other brake repairs.' },
    { title: 'Clutches', text: 'Clutch repair and replacement.' },
    { title: 'Diagnostics', text: 'Warning lights and faults looked into and diagnosed.' },
    { title: 'Timing belts and chains', text: 'Timing belt and chain replacement, as well as our wet belt speciality.' },
    { title: 'Suspension and steering', text: 'Suspension and steering repairs.' },
    { title: 'Batteries and charging', text: 'Battery, starter motor and alternator replacement.' },
    { title: 'Oil and cooling', text: 'Oil and filter changes, and cooling system repairs.' },
    { title: 'Exhausts', text: 'Exhaust repairs.' },
    { title: 'MOT repairs', text: 'Repairs to get your car through its MOT.' },
  ] as { title: string; text: string }[],
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
  { path: '/wet-belt-changes/', label: 'Wet belt changes' },
  { path: '/contact/', label: 'Contact' },
];

export const tel = `tel:${site.phone}`;
export const sms = `sms:${site.phone}`;
