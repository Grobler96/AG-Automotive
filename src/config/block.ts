/*
 * The access block. While `active` is true, every page of the site shows the suspended screen instead of the
 * site (see src/components/BlockedPage.tsx). To lift it: set `active` to false, commit and merge; the hosts
 * rebuild by themselves within a couple of minutes. Nothing else needs touching.
 */
export const block = {
  active: false,
  title: 'Access suspended',
  headline: 'This website is temporarily unavailable.',
  message: 'It has been paused by its developer. If you are the owner of this website, please contact AI by AO to restore access.',
  visitors: 'Visitors: please check back soon.',
  button: 'Contact AI by AO',
};
