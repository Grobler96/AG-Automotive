import { asset } from '@/lib/asset';

/**
 * The homepage scroll film: one continuous shot of an engine coming apart, the wet belt coming off and a new
 * belt going on. Frames are made by scripts/make-film.sh from the finished clip:
 *   public/film/engine/d  landscape frames (1280x720) for landscape screens
 *   public/film/engine/m  4:3 frames (960x720) for portrait screens, shown in a window with the words below
 *
 * Timings are 0 to 1 of the whole film (36 seconds: a base clip plus four extensions). They were set from the
 * real footage; re-check them if the film is ever re-cut.
 */
export const film = { frames: 252, length: 7 }; // length: scroll distance in screens

export const frameUrl = (i: number, wide: boolean) =>
  asset(`film/engine/${wide ? 'd' : 'm'}/${String(i + 1).padStart(3, '0')}.webp`);

/** The film's segments, shown in the HUD. */
export const steps = [
  { name: 'The engine', start: 0 },
  { name: 'Covers off', start: 0.22 },
  { name: 'Belt revealed', start: 0.42 },
  { name: 'Old belt out', start: 0.61 },
  { name: 'New belt on', start: 0.8 },
];
export const heroEnd = 0.2;
export const outroStart = 0.95;

export type Chapter = { at: [number, number]; step: string; label: string; title: string; text: string };

export const chapters: Chapter[] = [
  { at: [0.24, 0.4], step: '02', label: 'Covers off', title: 'The engine opens up.', text: 'A wet belt sits inside the engine, so the job starts by taking the covers off.' },
  { at: [0.46, 0.6], step: '03', label: 'Belt revealed', title: 'There it is.', text: 'The wet belt runs in engine oil, wrapped around the sprockets that keep the engine in time.' },
  { at: [0.64, 0.78], step: '04', label: 'Old belt out', title: 'The old belt comes off.', text: 'Over time the rubber can break down, and small pieces can end up in the oil.' },
  { at: [0.82, 0.94], step: '05', label: 'New belt on', title: 'A new belt goes on.', text: 'A fresh belt takes its place on the sprockets.' },
];

/** Callout lines on the film (landscape screens only). x and y are percentages of the frame. */
export type Callout = { at: [number, number]; x: number; y: number; dx: number; dy: number; label: string };
export const callouts: Callout[] = [
  { at: [0.26, 0.4], x: 40, y: 22, dx: 14, dy: -8, label: 'CAM COVER' },
  { at: [0.48, 0.6], x: 62, y: 29, dx: -12, dy: -10, label: 'WET BELT' },
  { at: [0.66, 0.77], x: 46, y: 40, dx: -14, dy: -14, label: 'WORN BELT' },
  { at: [0.83, 0.93], x: 46, y: 42, dx: 14, dy: -14, label: 'NEW BELT' },
];
