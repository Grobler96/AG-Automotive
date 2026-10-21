# AG Automotive

Website for AG Automotive, a mobile mechanic specialising in wet belt changes.
Vite, React, TypeScript, Tailwind and framer-motion. Deploys to GitHub Pages with the workflow in `.github/workflows/deploy.yml`.

## The idea

The homepage opens with a pinned scroll film: one continuous shot of an engine coming apart in sections, the wet belt coming off, a new belt going on and the engine going back together. A code driven HUD (step counter, progress rail, scan line, callouts) sits on top.

- Desktop uses landscape frames, phones use portrait frames. Frames load coarse first, so the film is scrubbable almost straight away.
- With `prefers-reduced-motion` the film is replaced by the same story as plain content.
- Phones get a Call and Text bar at the bottom at all times.

## Run it

```
npm install
npm run dev
npm run lint && npm run typecheck && npm run build
```

## Swap in the real film

The site currently runs on a drawn placeholder (`scripts/make-placeholder-film.py`) so the scroll mechanics can be tested.

1. Make the engine film in Flow (one continuous shot, 16:9, engine centred so phones can crop it).
2. `bash scripts/make-film.sh path/to/film.mp4` (needs ffmpeg). It writes `public/film/engine/d` and `/m`.
3. Set `film.frames` in `src/data/film.ts` to the number it prints.
4. Re-time `chapters` and re-aim `callouts` in `src/data/film.ts` against the real footage. The timings assume a base clip plus five extensions of about equal length.

## Fill in before launch

`src/config/site.ts` holds the business facts. Anything empty is hidden, nothing is invented:

- `email`, `area`, `hours`: show in the footer and quote section once filled in.
- `formEndpoint`: a form service URL (for example Formspree). While empty, the quote section shows Call and Text buttons instead of a form.
- `reviews`: real customer reviews, word for word, with permission.

## Copy to confirm with the client

`src/data/content.ts` describes the process and general facts only. Check with the client before launch, especially:

- Which makes and models have wet belts (the FAQ names some Peugeot, Citroën, DS, Vauxhall and Ford models).
- The warning signs list.
- That "we come to you" and "at your location" match how he works.

No prices, speed, guarantees, insurance, qualifications or experience claims are made anywhere.

## Hosting

GitHub Pages: turn it on in the repo settings (Pages, Source: GitHub Actions). The workflow builds with `BASE_PATH=/AG-Automotive/`. For a custom domain, set `BASE_PATH` to `/` and `SITE_URL` to the domain in the workflow.
