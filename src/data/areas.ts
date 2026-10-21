import { site } from '@/config/site';

/*
 * Local area pages. Each page says only what is true of every visitor to it: AG Automotive is a mobile mechanic
 * covering the town, wet belts are the speciality, and the contact details. No local statistics, journey times,
 * prices or reviews are invented. Districts, local jobs and local reviews appear once the client supplies them
 * (site.districts, site.reviews), which is what makes each page genuinely its own.
 */

export type Area = {
  slug: 'leeds' | 'wakefield' | 'bradford';
  path: string;
  name: string;
  /** Short line used in cards and the lead paragraph. */
  lead: string;
  paras: string[];
  faqs: { q: string; a: string }[];
};

const faqsFor = (name: string, slug: string) => {
  const districts = site.districts[slug] ?? [];
  const where = districts.length > 0 ? `We work across ${name}, including ${districts.join(', ')}.` : `We work across ${name}.`;
  return [
  { q: `Do you cover ${name}?`, a: `Yes. AG Automotive is a mobile mechanic covering ${name} and the rest of ${site.area}.` },
  { q: `Which parts of ${name} do you cover?`, a: `${where} Call or text with your postcode and we will confirm we can get to you.` },
  { q: `Can you change a wet belt in ${name}?`, a: `Yes. Wet belt changes are our speciality, and we do them where the car is in ${name}. Our wet belt page explains the job.` },
  { q: `How much does it cost in ${name}?`, a: 'It depends on the car and the job, so we quote for each one. Call or text us with your make, model and year.' },
  ];
};

export const areas: Area[] = [
  {
    slug: 'leeds',
    path: '/mobile-mechanic-leeds',
    name: 'Leeds',
    lead: 'AG Automotive is a mobile mechanic covering Leeds. We come to you, and wet belt changes are our speciality.',
    paras: [
      'If you live or work in Leeds, getting the car to a garage and back takes time you may not have. A mobile mechanic turns that round: we come to the car, wherever it is in Leeds.',
      'Wet belt changes are our speciality. If your car has a wet belt, or you are not sure whether it does, call or text with the make, model and year and we will help you work it out.',
      'We also carry out the full range of mechanical work in Leeds, from servicing to repairs: see what we do below.',
    ],
    faqs: faqsFor('Leeds', 'leeds'),
  },
  {
    slug: 'wakefield',
    path: '/mobile-mechanic-wakefield',
    name: 'Wakefield',
    lead: 'AG Automotive is a mobile mechanic covering Wakefield. We come to you, and wet belt changes are our speciality.',
    paras: [
      'Whether your car is at home in Wakefield or parked up at work, there is no need to arrange a lift and a day without it. We come to the car, wherever it is in Wakefield.',
      'Our speciality is wet belt changes. Not sure if your car has one? Call or text with the make, model and year and we will help you find out.',
      'We also carry out the full range of mechanical work in Wakefield, from servicing to repairs: see what we do below.',
    ],
    faqs: faqsFor('Wakefield', 'wakefield'),
  },
  {
    slug: 'bradford',
    path: '/mobile-mechanic-bradford',
    name: 'Bradford',
    lead: 'AG Automotive is a mobile mechanic covering Bradford. We come to you, and wet belt changes are our speciality.',
    paras: [
      'Taking the car to a garage in Bradford means dropping it off, finding a way home and going back for it later. A mobile mechanic skips all of that: we come to the car, wherever it is in Bradford.',
      'Wet belts are what we specialise in. If you think your car may have one, send us the make, model and year and we will tell you what we can do.',
      'We also carry out the full range of mechanical work in Bradford, from servicing to repairs: see what we do below.',
    ],
    faqs: faqsFor('Bradford', 'bradford'),
  },
];

export const areaByPath = (pathname: string) => areas.find((a) => pathname.replace(/\/+$/, '').endsWith(a.path));
