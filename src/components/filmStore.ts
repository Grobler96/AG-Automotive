/**
 * Holds the film's frames without hogging memory.
 *
 * Every frame is downloaded once and kept compressed (about 45KB each). Only the frames near the playhead are
 * decoded to full size, because a decoded 1280x720 frame is about 3.7MB, so all 252 at once would be close to 1GB
 * and the browser would start throwing decoded frames away and re-decoding them mid scroll, which shows up as lag.
 * A small low resolution copy of every 12th frame is always kept, so a fast jump always has something to show.
 * Decoding uses createImageBitmap, which runs off the main thread.
 */

const WINDOW = 12; // frames kept fully decoded either side of the playhead
const ANCHOR = 12; // every Nth frame also keeps a small always-on copy
const THUMB_WIDTH = 640;
const MAX_DECODES = 3;
const MAX_FETCHES = 6;

export type FrameStore = {
  /** Tell the store which frame is on screen so it decodes the ones around it. */
  setCenter(i: number): void;
  /** Best frame available for index i (sharp if it is decoded, otherwise the nearest sharp or small one). */
  get(i: number): ImageBitmap | undefined;
  dispose(): void;
};

export function createFrameStore(count: number, urlFor: (i: number) => string, onChange: () => void, onProgress: (done: number) => void): FrameStore {
  const blobs: (Blob | undefined)[] = [];
  const full = new Map<number, ImageBitmap>();
  const thumbs = new Map<number, ImageBitmap>();
  const decoding = new Set<number>();
  let center = 0, inflight = 0, disposed = false, fetched = 0;

  const order: number[] = [];
  const seen = new Set<number>();
  for (const step of [ANCHOR, 6, 3, 1]) {
    for (let i = 0; i < count; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
  }

  const inWindow = (i: number) => Math.abs(i - center) <= WINDOW;

  const decodeNext = () => {
    while (!disposed && inflight < MAX_DECODES) {
      let best = -1;
      for (let o = 0; o <= WINDOW && best < 0; o++) {
        for (const i of o === 0 ? [center] : [center + o, center - o]) {
          if (i >= 0 && i < count && blobs[i] && !full.has(i) && !decoding.has(i)) { best = i; break; }
        }
      }
      if (best < 0) return;
      const i = best;
      decoding.add(i);
      inflight++;
      createImageBitmap(blobs[i]!)
        .then((bmp) => {
          if (disposed || !inWindow(i)) bmp.close();
          else { full.set(i, bmp); onChange(); }
        })
        .catch(() => undefined)
        .finally(() => { decoding.delete(i); inflight--; decodeNext(); });
    }
  };

  const makeThumb = (i: number) => {
    createImageBitmap(blobs[i]!, { resizeWidth: THUMB_WIDTH, resizeQuality: 'low' })
      .then((bmp) => { if (disposed) bmp.close(); else { thumbs.set(i, bmp); onChange(); } })
      .catch(() => undefined);
  };

  let next = 0, fetching = 0;
  const pump = () => {
    while (!disposed && fetching < MAX_FETCHES && next < order.length) {
      const i = order[next++];
      fetching++;
      fetch(urlFor(i))
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((blob) => {
          if (disposed) return;
          blobs[i] = blob;
          onProgress(++fetched);
          if (i % ANCHOR === 0) makeThumb(i);
          if (inWindow(i)) decodeNext();
        })
        .catch(() => undefined)
        .finally(() => { fetching--; pump(); });
    }
  };
  pump();

  return {
    setCenter(i) {
      if (i === center) return;
      center = i;
      for (const [k, bmp] of full) {
        if (Math.abs(k - center) > WINDOW + 4) { bmp.close(); full.delete(k); }
      }
      decodeNext();
    },
    get(i) {
      const sharp = full.get(i);
      if (sharp) return sharp;
      for (let o = 1; o <= 6; o++) {
        const near = full.get(i - o) ?? full.get(i + o);
        if (near) return near;
      }
      let best: ImageBitmap | undefined, bestD = Infinity;
      for (const [k, bmp] of thumbs) {
        const d = Math.abs(k - i);
        if (d < bestD) { bestD = d; best = bmp; }
      }
      return best;
    },
    dispose() {
      disposed = true;
      for (const bmp of full.values()) bmp.close();
      for (const bmp of thumbs.values()) bmp.close();
      full.clear();
      thumbs.clear();
    },
  };
}
