# AG Automotive

Website for AG Automotive, a mobile mechanic specialising in wet belt changes.
Vite, React, TypeScript, Tailwind and framer-motion. Deploys to GitHub Pages with the workflow in `.github/workflows/deploy.yml`.

## The idea

The wet belt page (`/wet-belt-changes/`) has a pinned scroll film under its heading: one continuous shot of an engine coming apart in sections, the wet belt coming off, a new belt going on and the engine going back together. A code driven HUD (step counter, progress rail, scan line, callouts) sits on top. The homepage opens with a normal hero (the van, the promise, Call and Text) and links to the film, because the client did not want the film as the first thing visitors see. The film frames only load on the wet belt page.

- Smoothness: every frame is downloaded once but only the ~25 around the scroll position are decoded at full size (`src/components/filmStore.ts`), decoding runs off the main thread, and the canvas is capped to the frame resolution. Decoding all 252 at once would take about 1GB of memory and make the browser re-decode frames mid scroll.
- Landscape screens get full bleed frames. Portrait screens get a square window at the top with the words below. Frames load coarse first and blend between neighbours.
- With `prefers-reduced-motion` the film is replaced by the same story as plain content.
- Phones get a Call and Text bar at the bottom at all times.

## Run it

```
npm install
npm run dev
npm run lint && npm run typecheck && npm run build
```

## The film

`public/film/engine` holds the scroll frames, made from the finished Veo film (a base clip plus four extensions, 36 seconds, one continuous shot) with `bash scripts/make-film.sh film.mp4` (needs ffmpeg). It writes 7 frames a second: `d` (1280x720) for landscape screens and `m` (960x720) for portrait screens, where it sits in a square window with the words below. A visitor downloads about 10MB, coarse frames first, so it is scrubbable almost at once.

To use a different film, re-run the script, set `film.frames` in `src/data/film.ts` to the number it prints, then re-time `steps`, `chapters` and `callouts` in the same file against the new footage. Landscape screens show callout labels pointing at parts of the engine; their positions are percentages of the frame.

## Fill in before launch

`src/config/site.ts` holds the business facts. Anything empty is hidden, nothing is invented:

- `area` is West Yorkshire; `email` and `hours` (Monday to Friday 8am to 6pm, Saturday 8am to 12pm) are filled in and show in the footer and quote section. `openingHours` is the same data for Google, so change both together. Google's business data (`src/lib/schema.ts`) is built from this file and prerendered into every page, so it always matches the page.
- `towns` (extra towns across West Yorkshire), `districts` (areas within Leeds, Wakefield and Bradford, shown on each town page) and `services` (the "What we do" section) are filled in from what the client confirmed: all of West Yorkshire, and the service list and vehicles (cars, vans and motorhomes) copied from his flyer, ending with "and much more". Only add to the service list what he says he does.
- `formEndpoint`: a form service URL (for example Formspree). While empty, the quote section shows Call and Text buttons instead of a form.
- `reviews`: real customer reviews, word for word, with permission.

## Job photos

`public/work` holds photos from the client's real jobs (list and captions in `src/data/work.ts`), shown in a "From real jobs" gallery on the homepage, the wet belt page and the Ford Transit page. The van photos ("We come to you") have customers' number plates blurred; photos showing homes, street names or another company's vehicles were left out. The files carry no location data. Captions describe only what the photo shows. To add more, follow the same rule: no plates, no identifiable homes or people, and strip the metadata.

## Launch checklist (audited)

Checked against the "what makes a site real" and "before you launch" lists:

- Done: custom 404 page, call to action in the first screen (plus a Call and Text bar on phones), a unique title and description on every page, social share image, favicon and app icons, `robots.txt`, `sitemap.xml`, alt text on every image, mobile layout and menu, hosting on HTTPS, privacy policy (`/privacy/`) and website terms (`/terms/`).
- Not needed, because the site has no backend: API keys, database keys and row level security, server side auth, passwords and sessions, input validation, SQL queries, file uploads, rate limiting and bot protection. Nothing secret is in the repo, and `npm audit --omit=dev` reports 0 issues (the remaining audit notices are in build tools and are not shipped).
- Fonts are served from this site, not Google, so no visitor data goes to a third party. There are no cookies, so no cookie banner is needed.
- GitHub Pages cannot set custom security headers. Moving to Cloudflare Pages or Netlify later would allow them.
- Waiting on the client: a contact form and thank you page (set `formEndpoint` in `src/config/site.ts`), analytics (needs an account; add a cookie free tool and update the privacy page when added), and a postal address if he wants one shown (he works from his van, so none is shown).
- If a form or analytics is added, update `src/pages/Legal.tsx` first.

## Claims deliberately left off the site

The client's flyers also say "all work guaranteed", "5 star service, check our reviews", "competitive prices", "honest prices", "fast turnaround" and "a small job now saves big bills later". None are on the site: a guarantee needs its exact terms, there are no reviews to point to yet, and the rest cannot be shown to be true. Add any of them only when the client confirms it and can back it up.

## Copy to confirm with the client

`src/data/content.ts` describes the process and general facts only. Check with the client before launch, especially:

- The Ford Transit page (`/ford-transit-wet-belt-replacement/`) uses his flyer's wording and nothing more: check it, especially "many Ford Transits are fitted with a wet belt".
- Which makes and models have wet belts (the FAQ names some Peugeot, Citroën, DS, Vauxhall and Ford models).
- The warning signs list.
- That "we come to you" and "at your location" match how he works.

No prices, speed, guarantees, insurance, qualifications or experience claims are made anywhere.

## Hosting

The site lives at https://www.agautomotiveleeds.co.uk (Vercel, building with `npm run build`; no settings needed because `SITE_URL` defaults to this address). Every page's canonical link, social tags, structured data and sitemap use that address. The bare domain (agautomotiveleeds.co.uk) redirects to `www`.

The GitHub Pages copy (workflow in `.github/workflows/deploy.yml`, built with `BASE_PATH=/AG-Automotive/`) still works as a backup, and its pages point at the real domain as their canonical address so search engines do not treat it as a duplicate. Once the real domain is settled, Pages can be switched off in the repo settings.
