import { asset } from '@/lib/asset';

/**
 * The homepage scroll film: one continuous shot of an engine coming apart and going back together.
 * Frames are made by scripts/make-film.sh (public/film/engine/d = landscape, m = portrait).
 * Until the real footage is in, scripts/make-placeholder-film.py draws a blueprint stand in.
 *
 * Timings (0 to 1 of the whole scroll) follow the planned film: a base clip plus five extensions.
 * Re-check them against the real footage and nudge here.
 */
export const film = { frames: 120, length: 7 }; // length: scroll distance in screens

export const frameUrl = (i: number, wide: boolean) =>
  asset(`film/engine/${wide ? 'd' : 'm'}/${String(i + 1).padStart(3, '0')}.webp`);

export type Chapter = { at: [number, number]; step: string; label: string; title: string; text: string };

export const chapters: Chapter[] = [
  { at: [0.2, 0.34], step: '02', label: 'Covers off', title: 'The engine opens up.', text: 'A wet belt sits inside the engine, so the job starts by taking the covers off.' },
  { at: [0.37, 0.5], step: '03', label: 'Belt revealed', title: 'There it is.', text: 'The wet belt runs in engine oil, wrapped around the sprockets that keep the engine in time.' },
  { at: [0.53, 0.66], step: '04', label: 'Old belt out', title: 'The old belt comes off.', text: 'Over time the rubber can break down, and small pieces can end up in the oil.' },
  { at: [0.7, 0.83], step: '05', label: 'New belt on', title: 'A new belt goes on.', text: 'A fresh belt takes its place on the sprockets.' },
  { at: [0.86, 0.95], step: '06', label: 'Back together', title: 'Everything goes back.', text: 'The covers go back on and the engine is put back together.' },
];

/** Callout lines on the film (desktop only). x and y are percentages of the frame. Re-aim these when the real footage lands. */
export type Callout = { at: [number, number]; x: number; y: number; dx: number; dy: number; label: string };
export const callouts: Callout[] = [
  { at: [0.22, 0.34], x: 50, y: 17, dx: 14, dy: -6, label: 'CAM COVER' },
  { at: [0.38, 0.5], x: 42, y: 57, dx: -16, dy: -10, label: 'WET BELT' },
  { at: [0.54, 0.66], x: 42, y: 62, dx: -16, dy: 10, label: 'WORN BELT' },
  { at: [0.71, 0.83], x: 44, y: 56, dx: 16, dy: -10, label: 'NEW BELT' },
];
