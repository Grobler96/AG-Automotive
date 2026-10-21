/*
 * Photos from the client's real jobs (public/work). Only engine and parts photos are used: no number plates, no customers'
 * homes or other vehicles, and the files carry no location data. Captions describe only what the photo shows.
 * Check with the client that each one is from one of his jobs before launch.
 */
export type WorkPhoto = { src: string; alt: string; caption: string };

export const workPhotos: WorkPhoto[] = [
  { src: 'work/belt-exposed.webp', alt: 'An engine with the timing cover off, showing the belt, sprockets and water pump', caption: 'Timing cover off, belt and sprockets exposed.' },
  { src: 'work/wet-belt-in-oil.webp', alt: 'A belt running inside the engine, sitting in oil, on its camshaft sprockets', caption: 'A wet belt inside the engine, in oil.' },
  { src: 'work/old-belt-cracked.webp', alt: 'Close up of an old timing belt with a cracked surface held in a gloved hand', caption: 'An old belt, with the surface cracking.' },
  { src: 'work/old-belt-piece.webp', alt: 'A piece of old belt material held in an oily gloved hand', caption: 'A piece of old belt.' },
  { src: 'work/old-kit-removed.webp', alt: 'An old timing belt, tensioner, idler roller and water pump laid out after removal', caption: 'The old belt, tensioner, idler and water pump, removed.' },
  { src: 'work/old-belt-removed.webp', alt: 'An old belt and oil covered tensioners laid out on the ground after removal', caption: 'An old belt and tensioners, removed.' },
  { src: 'work/new-belt-fitted.webp', alt: 'A new timing belt fitted around the camshaft sprockets', caption: 'A new belt fitted.' },
  { src: 'work/new-belt-in-place.webp', alt: 'A new belt in place on the sprockets, with its printed markings visible', caption: 'New belt in place.' },
];

export const workIntro = {
  title: 'From real jobs',
  text: 'Photos from jobs we have done: the belt in place, what comes out, and the new belt going on.',
};
