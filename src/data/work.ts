/*
 * Photos from the client's real jobs (public/work). The engine photos show no plates; the van photos have customers'
 * number plates blurred and show no homes. The files carry no location data. Captions describe only what the photo shows.
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

/** The client's van on jobs. Customers' number plates are blurred and no homes or other premises are shown. */
export const vanPhotos: WorkPhoto[] = [
  { src: 'work/van-open-doors.webp', alt: 'The AG Automotive van with its rear doors open, hi-vis jacket inside, parked beside a white van with its bonnet up and a trolley jack in front', caption: 'Roadside, bonnet up, tools to hand.' },
  { src: 'work/van-jaguar-compressor.webp', alt: 'The AG Automotive van with its side door open showing shelves of tools, next to a black car with its bonnet up and an air compressor on the ground', caption: 'The van open on a job, with the compressor out.' },
  { src: 'work/van-and-transit-custom.webp', alt: 'The AG Automotive van parked beside a grey Transit Custom with its bonnet up', caption: 'Working on a van where it is parked.' },
];

export const vanIntro = {
  title: 'We come to you',
  text: 'The van is set up as a workshop on wheels. These are real jobs, at the customer\u2019s home or workplace, anywhere in West Yorkshire.',
};
