import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Phone } from 'lucide-react';
import { callouts, chapters, film, frameUrl, heroEnd, outroStart, steps } from '@/data/film';
import { site, sms, tel } from '@/config/site';
import { asset } from '@/lib/asset';

const stepFor = (v: number) => steps.reduce((n, s, i) => (v >= s.start ? i : n), 0);
const phaseFor = (v: number) => {
  if (v < heroEnd) return 'hero';
  if (v >= outroStart) return 'outro';
  const i = chapters.findIndex((c) => v >= c.at[0] && v <= c.at[1]);
  return i >= 0 ? `c${i}` : 'none';
};
const calloutFor = (v: number) => callouts.findIndex((c) => v >= c.at[0] && v <= c.at[1]);

function Actions({ className = '' }: { className?: string }) {
  // phones already have Call and Text in the bottom bar, so the film only shows them from tablet size up
  return (
    <div className={`hidden md:flex flex-wrap gap-3 ${className}`}>
      <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call {site.phoneDisplay}</a>
      <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text us</a>
    </div>
  );
}

function HeroText() {
  return (
    <>
      <p className="mono">{site.name} · {site.strap}</p>
      <h1 className="mt-3 font-display font-bold uppercase leading-[0.95] text-[clamp(2.1rem,8.5vw,5rem)]">
        Wet belt changes.<br /><span className="text-lime">We come to you.</span>
      </h1>
    </>
  );
}

/** Reduced motion: no pinned film, just the story as plain content. */
function StaticStory() {
  return (
    <section className="relative bg-ink" aria-label="How a wet belt change works">
      <img src={asset('film/engine/d/001.webp')} alt="" className="w-full max-h-[70vh] object-cover" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <HeroText />
        <Actions className="mt-6" />
        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {chapters.map((c) => (
            <li key={c.step} className="rounded-lg border border-line bg-panel p-5">
              <p className="mono">Step {c.step} · {c.label}</p>
              <h2 className="mt-2 text-2xl font-bold">{c.title}</h2>
              <p className="mt-2 text-paper/75">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function PinnedFilm() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | undefined)[]>([]);
  const target = useRef(0);
  const dirty = useRef(true);
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth > window.innerHeight);
  const [phase, setPhase] = useState('hero');
  const [step, setStep] = useState(0);
  const [co, setCo] = useState(-1);
  const [loaded, setLoaded] = useState(0);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // function form on purpose: array form can run on a native scroll timeline that mis-times inside a pinned section
  const fill = useTransform(scrollYProgress, (v) => v);
  const pct = useTransform(scrollYProgress, (v) => `${String(Math.round(v * 100)).padStart(3, '0')}%`);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    target.current = v;
    setPhase(phaseFor(v));
    setStep(stepFor(v));
    setCo(calloutFor(v));
  });

  // landscape screens get landscape frames, portrait screens get portrait frames
  useEffect(() => {
    const onResize = () => setWide(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // frames load coarse first (every 12th, then 6th ...) so the film is scrubbable almost at once
  useEffect(() => {
    let cancelled = false;
    images.current = [];
    setLoaded(0);
    const order: number[] = [];
    const seen = new Set<number>();
    for (const stepSize of [12, 6, 3, 1]) {
      for (let i = 0; i < film.frames; i += stepSize) if (!seen.has(i)) { seen.add(i); order.push(i); }
    }
    let next = 0, count = 0;
    const pump = () => {
      if (cancelled || next >= order.length) return;
      const i = order[next++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (cancelled) return;
        images.current[i] = img;
        dirty.current = true;
        if (++count % 6 === 0 || count === film.frames) setLoaded(Math.round((count / film.frames) * 100));
        pump();
      };
      img.onerror = pump;
      img.src = frameUrl(i, wide);
    };
    for (let k = 0; k < 6; k++) pump();
    return () => { cancelled = true; };
  }, [wide]);

  // draw loop: eases toward the scroll position and blends neighbouring frames, only while on screen
  useEffect(() => {
    const cv = canvas.current, sec = section.current;
    if (!cv || !sec) return;
    let raf = 0, running = false, cur = target.current, drawn = -1;

    const nearest = (i: number) => {
      for (let o = 0; o < film.frames; o++) {
        const img = images.current[i - o] ?? images.current[i + o];
        if (img) return img;
      }
      return undefined;
    };
    const paint = (g: CanvasRenderingContext2D, img: HTMLImageElement, alpha: number) => {
      const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      g.globalAlpha = alpha;
      g.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
      g.globalAlpha = 1;
    };
    const draw = (p: number) => {
      const g = cv.getContext('2d');
      if (!g) return;
      const f = Math.min(Math.max(p, 0), 1) * (film.frames - 1);
      const i0 = Math.floor(f), t = f - i0;
      const a = nearest(i0);
      if (!a) return;
      paint(g, a, 1);
      const b = t > 0.03 ? nearest(Math.min(i0 + 1, film.frames - 1)) : undefined;
      if (b && b !== a) paint(g, b, t);
    };
    const size = () => {
      const r = cv.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.max(1, Math.round(r.width * d));
      cv.height = Math.max(1, Math.round(r.height * d));
      dirty.current = true;
    };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const diff = target.current - cur;
      cur = Math.abs(diff) < 0.0002 ? target.current : cur + diff * 0.14;
      if (cur !== drawn || dirty.current) { draw(cur); drawn = cur; dirty.current = false; }
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; tick(); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }, { rootMargin: '200px' });
    size();
    io.observe(sec);
    window.addEventListener('resize', size);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, []);

  const chapterIndex = phase.startsWith('c') ? Number(phase.slice(1)) : -1;
  const chapter = chapterIndex >= 0 ? chapters[chapterIndex] : null;
  const callout = wide && co >= 0 ? callouts[co] : null;

  return (
    <section ref={section} className="relative" style={{ height: `${film.length * 100}vh` }} aria-label="How a wet belt change works: scroll to take the engine apart">
      <div className="sticky top-16 h-[calc(100vh-8.5rem)] h-[calc(100svh-8.5rem)] md:h-[calc(100vh-4rem)] md:h-[calc(100svh-4rem)] overflow-hidden bg-ink">
        {/* landscape screens: full bleed. Portrait screens: a square window near the top (words go below), faded into the black */}
        <div className={wide ? 'absolute inset-0' : 'absolute inset-x-0 top-9 aspect-square [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]'}>
          <canvas ref={canvas} role="img" aria-label="An engine coming apart, the old wet belt coming off and a new one going on" className="absolute inset-0 w-full h-full" />
        </div>
        <div aria-hidden="true" className="film-grain absolute inset-0 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_90%_at_50%_45%,transparent_45%,rgba(5,5,5,0.85))]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        {/* HUD */}
        <div aria-hidden="true" className="absolute inset-3 sm:inset-5 pointer-events-none">
          {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c) => (
            <span key={c} className={`absolute w-5 h-5 border-lime/70 ${c}`} />
          ))}
          <span className="scanline absolute inset-x-0 top-0 h-px bg-lime/60 shadow-[0_0_14px_2px_rgba(126,211,33,0.5)]" />
          <div className="absolute top-2 left-3 sm:left-4 mono text-lime/90 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" /> Step {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')} · {steps[step].name}
          </div>
          <motion.div className="absolute top-2 right-3 sm:right-4 mono text-lime/70">{pct}</motion.div>
          <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 h-40 w-px bg-line">
            <motion.div style={{ scaleY: fill }} className="origin-top w-full h-full bg-lime shadow-[0_0_10px_rgba(126,211,33,0.8)]" />
          </div>
          {loaded < 100 && <div className="absolute bottom-2 left-3 sm:left-4 mono text-lime/50">Loading film {loaded}%</div>}
        </div>

        {/* callout lines on the film (desktop) */}
        <AnimatePresence>
          {callout && (
            <motion.div key={co} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1={callout.x} y1={callout.y} x2={callout.x + callout.dx} y2={callout.y + callout.dy} stroke="#7ED321" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="absolute w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-lime shadow-[0_0_12px_3px_rgba(126,211,33,0.7)]" style={{ left: `${callout.x}%`, top: `${callout.y}%` }} />
              <span className="absolute mono text-butter whitespace-nowrap -translate-y-1/2" style={{ left: `${callout.x + callout.dx + (callout.dx < 0 ? -1 : 1)}%`, top: `${callout.y + callout.dy}%`, transform: `translate(${callout.dx < 0 ? '-100%' : '0'}, -50%)` }}>{callout.label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* words */}
        <AnimatePresence mode="wait">
          {phase === 'hero' && (
            <motion.div key="hero" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}
              className="absolute inset-x-0 bottom-8 md:bottom-12 px-5 sm:px-10 max-w-3xl">
              <HeroText />
              <Actions className="mt-6" />
              <p className="mt-6 mono text-paper/55">Scroll to take the engine apart</p>
            </motion.div>
          )}
          {chapter && (
            <motion.div key={chapter.step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}
              className="absolute inset-x-0 bottom-8 md:bottom-12 px-5 sm:px-10 max-w-xl">
              <p className="mono">Step {chapter.step} · {chapter.label}</p>
              <h2 className="mt-2 font-display font-bold uppercase text-[clamp(1.9rem,6vw,3.4rem)] leading-[0.98]">{chapter.title}</h2>
              <p className="mt-3 text-paper/80 [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">{chapter.text}</p>
            </motion.div>
          )}
          {phase === 'outro' && (
            <motion.div key="outro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
              className="absolute inset-x-0 bottom-8 md:bottom-12 px-5 sm:px-10 max-w-3xl">
              <h2 className="font-display font-bold uppercase text-[clamp(2rem,7vw,4rem)] leading-[0.95]">Wet belt due?<br /><span className="text-lime">Give us a call.</span></h2>
              <Actions className="mt-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function EngineFilm() {
  const reduce = useReducedMotion();
  return reduce ? <StaticStory /> : <PinnedFilm />;
}
