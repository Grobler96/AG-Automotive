import { site } from '@/config/site';

/*
 * Page copy. Written to describe the process and general facts only, with no claims about
 * prices, speed, guarantees, insurance, qualifications or experience. Check with the client before changing.
 */

const area = site.area;

export const intro = {
  title: 'The mechanic that comes to you',
  lead: `No garage run. AG Automotive brings the workshop to your drive, your work or wherever the vehicle is parked, across all of ${area}.`,
  cards: [
    { kicker: '01', title: 'We come to you', text: 'At home, at work or wherever it is parked. Your vehicle stays put and the van pulls up beside it.' },
    { kicker: '02', title: 'Wet belt specialist', text: 'It is the job we are known for. Watch the film above, then read the full story on the wet belt page.' },
    { kicker: '03', title: 'Cars, vans, motorhomes', text: 'Whatever you drive, call or text with the make, model and year and tell us what it needs.' },
    { kicker: '04', title: `All of ${area}`, text: 'Leeds, Bradford, Wakefield, Huddersfield, Halifax and every town around them.' },
  ],
  coverage: `We cover all of ${area}, including Leeds, Bradford, Wakefield, ${site.towns.slice(0, -1).join(', ')} and ${site.towns[site.towns.length - 1]}, and the towns around them. We also do servicing and repairs, from brakes and clutches to batteries and diagnostics.`,
};

export const speciality = {
  title: 'Wet belts are our thing',
  text: 'A wet belt runs inside the engine, bathed in oil, and the job needs doing properly. It is the work we are best known for, and we do it at your location.',
};

export const services = {
  title: 'What we do',
  intro: 'Wet belts are the speciality, but the van carries the tools for plenty more. Here is what we do, on cars, vans and motorhomes.',
  more: 'And much more. If it is not on the list, call or text and ask.',
};

export const steps = [
  { n: '01', title: 'Call or text', text: 'Tell us the make, model and year and what the vehicle needs.' },
  { n: '02', title: 'We turn up', text: `The van comes to wherever the vehicle is: at home, at work or anywhere convenient in ${area}.` },
  { n: '03', title: 'Job done', text: 'The work is carried out right there, so there is no trip to a garage.' },
];

export const faqs = [
  { q: 'What is a mobile mechanic?', a: 'A mobile mechanic comes to you, at home, at work or anywhere convenient, instead of you taking the car to a garage.' },
  { q: 'Which areas do you cover?', a: `We cover all of ${area}: Leeds, Bradford, Wakefield, Huddersfield, Halifax and the towns around them. Call or text with your postcode and we will confirm.` },
  { q: 'What vehicles do you work on?', a: 'Cars, vans and motorhomes.' },
  { q: 'What do you specialise in?', a: 'Wet belt changes. We also carry out servicing and repairs, from brakes and clutches to batteries and diagnostics, so call or text and ask about yours.' },
  { q: 'What is a wet belt?', a: 'A wet belt is a timing belt that runs inside the engine in oil, rather than in a dry cover like a traditional timing belt. See our wet belt page for more.' },
  { q: 'How much will it cost?', a: 'It depends on the car and the job, so we quote for each one. Call or text us with your make, model and year.' },
];

// ---- the wet belt page

export const explainer = {
  title: 'What is a wet belt?',
  paras: [
    'Most engines use a chain, or a belt in its own dry cover, to keep the engine in time. A wet belt is different: it runs inside the engine, bathed in oil.',
    'Over time the rubber can break down, and small pieces can end up in the oil. Those pieces can block the oil pick up and cut the flow of oil around the engine.',
    'How often a wet belt needs changing depends on the manufacturer and the engine. Your handbook is the place to check, or ask us about your car.',
  ],
};

export const signs = {
  title: 'Signs worth checking',
  intro: 'These can have many causes, so a proper look comes first. If you see any of them, get in touch.',
  items: [
    'An oil pressure or low oil warning light',
    'An engine warning light',
    'The engine running roughly or losing power',
    'A car that is due a wet belt change by the handbook',
  ],
};

export const wetBeltSteps = [
  { n: '01', title: 'Get in touch', text: 'Call or text with the make, model and year of the car and what is happening.' },
  { n: '02', title: 'We come to you', text: `AG Automotive is a mobile mechanic, so the work is done where you are: at home, at work or anywhere convenient in ${area}.` },
  { n: '03', title: 'Belt changed', text: 'The old belt comes out, the new one goes in and the engine goes back together.' },
];

export const wetBeltIncludes = {
  title: 'What a wet belt change includes',
  items: [
    'Wet belt kit replacement: the belt, tensioners, seals and bolts',
    'Engine reassembly with new oil',
    'A full system check and test drive',
  ],
  note: 'Timing belt in a dry cover? We do those too: a complete kit replacement, with the belt, tensioner, idler and water pump if required.',
};

export const wetBeltFaqs = [
  { q: 'What is a wet belt?', a: 'A wet belt is a timing belt that runs inside the engine in oil, rather than in a dry cover like a traditional timing belt.' },
  { q: 'Which cars have a wet belt?', a: 'Several manufacturers have used wet belts in some petrol engines, including some Peugeot, Citroën, DS, Vauxhall and Ford models. If you are not sure about yours, ask us.' },
  { q: 'How often should a wet belt be changed?', a: 'It depends on the manufacturer and the engine. Follow your handbook, and do not wait for warning signs. Ask us if you want a hand working out when yours is due.' },
  { q: 'Can you do it at my home or work?', a: `Yes. We are a mobile mechanic covering ${area}, so we come to you: at home, at work or anywhere convenient. Tell us where the car is when you get in touch.` },
  { q: 'How much does a wet belt change cost?', a: 'It depends on the car, so we quote for each one. Call or text us with your make, model and year.' },
];

export const contactLines = [
  site.area && { label: 'Area', value: site.area },
  site.hours.length > 0 && { label: 'Hours', value: site.hours.join('. ') },
  site.email && { label: 'Email', value: site.email, href: `mailto:${site.email}` },
].filter(Boolean) as { label: string; value: string; href?: string }[];

// ---- the Ford Transit page (the client's own wording from his Transit flyer)

export const transit = {
  lead: 'Many Ford Transits are fitted with a wet belt: the timing belt runs inside the engine, in oil.',
  problem: [
    'Many Ford Transits are fitted with a wet belt: the timing belt runs inside the engine, in oil.',
    'Over time, the belt absorbs oil, becomes saturated and starts to break down.',
    'If the wet belt fails, it can destroy the engine.',
  ],
  signsTitle: 'Signs to look out for',
  signs: ['Dashboard warning lights', 'Poor performance or rough running'],
  signsNote: 'These can have other causes, so a proper look comes first. Do not ignore them: get your Transit checked early.',
};

export const transitFaqs = [
  { q: 'Does my Ford Transit have a wet belt?', a: 'Many Ford Transits do. Call or text with the year and engine and we will help you find out.' },
  { q: 'What does a wet belt change on a Transit include?', a: 'Wet belt kit replacement (the belt, tensioners, seals and bolts), engine reassembly with new oil, and a full system check and test drive.' },
  { q: 'Can you do it at my home or work?', a: `Yes. We are a mobile mechanic covering ${area}, so we come to you: at home, at work or anywhere convenient.` },
  { q: 'How much does it cost?', a: 'It depends on the van, so we quote for each one. Call or text us with the year and engine.' },
];
