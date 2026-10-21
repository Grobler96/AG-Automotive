/**
 * Facts about the business. Anything not confirmed with the client is left empty on purpose:
 * the site only shows a section when its value is filled in, and never invents details.
 * Confirmed so far: the area (all of West Yorkshire), the services (from his flyer: the list below is his, word for word, with
 * 'and much more' on the end) and the vehicles (cars, vans and motorhomes).
 */
export const site = {
  name: 'AG Automotive',
  strap: 'The Mobile Mechanic',
  phone: '07375419123',
  phoneDisplay: '07375 419123',
  email: 'anygray91@gmail.com' as string,
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
    { title: 'Servicing and maintenance', text: 'Servicing and maintenance for your vehicle.' },
    { title: 'Diagnostics and engine management light', text: 'The engine management light (EML) and other faults diagnosed.' },
    { title: 'Brake discs and pads', text: 'Brake disc and pad replacement.' },
    { title: 'Clutches and gearbox', text: 'Clutch and gearbox repairs.' },
    { title: 'Cam belts, timing belts and wet belts', text: 'Cam belt, timing belt and wet belt replacement. Wet belts are our speciality.', highlight: true },
    { title: 'Batteries', text: 'Battery replacement.' },
    { title: 'Alternators', text: 'Alternator replacement.' },
    { title: 'Starter motors', text: 'Starter motor replacement.' },
    { title: 'Suspension and steering', text: 'Suspension and steering repairs.' },
    { title: 'Electrical and lighting', text: 'Electrical faults and lighting.' },
    { title: 'Cooling and heating', text: 'Cooling and heating system repairs.' },
    { title: 'DPF issues', text: 'Diesel particulate filter (DPF) problems.' },
  ] as { title: string; text: string; highlight?: boolean }[],
  /** What he works on, from his flyer. */
  vehicles: ['cars', 'vans', 'motorhomes'] as string[],
  /** Opening hours as shown on the site, one line each. Keep in step with openingHours below. */
  hours: ['Monday to Friday, 8am to 6pm', 'Saturday, 8am to 12pm'] as string[],
  /** The same hours for Google (structured data). */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '12:00' },
  ] as { days: string[]; opens: string; closes: string }[],
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
  { path: '/ford-transit-wet-belt-replacement/', label: 'Ford Transit wet belts' },
  { path: '/contact/', label: 'Contact' },
];

export const tel = `tel:${site.phone}`;
export const sms = `sms:${site.phone}`;
