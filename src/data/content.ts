import { site } from '@/config/site';

/*
 * Page copy. Written to describe the process and general facts only, with no claims about
 * prices, speed, guarantees, insurance, experience or reviews. Check with the client before changing.
 */

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

export const steps = [
  { n: '01', title: 'Get in touch', text: 'Call or text with the make, model and year of the car and what is happening.' },
  { n: '02', title: 'We come to you', text: 'AG Automotive is a mobile mechanic, so the work is done where you are.' },
  { n: '03', title: 'Belt changed', text: 'The old belt comes out, the new one goes in and the engine goes back together.' },
];

export const faqs = [
  { q: 'What is a wet belt?', a: 'A wet belt is a timing belt that runs inside the engine in oil, rather than in a dry cover like a traditional timing belt.' },
  { q: 'Which cars have a wet belt?', a: 'Several manufacturers have used wet belts in some petrol engines, including some Peugeot, Citroën, DS, Vauxhall and Ford models. If you are not sure about yours, ask us.' },
  { q: 'How often should a wet belt be changed?', a: 'It depends on the manufacturer and the engine. Follow your handbook, and do not wait for warning signs. Ask us if you want a hand working out when yours is due.' },
  { q: 'Can you do it at my home or work?', a: 'We are a mobile mechanic, so we come to you. Tell us where the car is when you get in touch.' },
  { q: 'How much does a wet belt change cost?', a: 'It depends on the car, so we quote for each one. Call or text us with your make, model and year.' },
];

export const contactLines = [
  site.area && { label: 'Area', value: site.area },
  site.hours && { label: 'Hours', value: site.hours },
].filter(Boolean) as { label: string; value: string }[];
