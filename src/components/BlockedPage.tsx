import { ArrowRight, Lock } from 'lucide-react';
import { block } from '@/config/block';
import { film } from '@/data/film';
import { site } from '@/config/site';

const readout = [
  ['SITE', 'SUSPENDED', true],
  ['PAGES BUILT', '9', false],
  ['SCROLL FILM', `${film.frames} FRAMES`, false],
  ['AREAS COVERED', 'LEEDS / WAKEFIELD / BRADFORD', false],
  ['TO RESTORE', 'CONTACT AI BY AO', false],
] as const;

/** The access block screen. Static markup and CSS animation only, so it prerenders and hydrates like any other page. */
export default function BlockedPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="block-grid fixed inset-x-0 bottom-0 -z-10 h-[85vh]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_50%_42%,rgba(126,211,33,0.20),transparent_70%)]" />
      <div aria-hidden="true" className="film-grain absolute inset-0 -z-10" />
      <div aria-hidden="true" className="scanline absolute inset-x-0 top-0 -z-10 h-1/3 bg-gradient-to-b from-transparent via-lime/20 to-transparent" />
      {/* corner brackets and status line, like the film's HUD */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 sm:inset-6">
        <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-lime/70" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-lime/70" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-lime/70" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-lime/70" />
      </div>
      <p className="mono absolute left-7 top-7 sm:left-12 sm:top-10"><span className="block-blink mr-2 inline-block h-2 w-2 rounded-full bg-lime" />{site.name} · System status</p>

      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="relative h-32 w-32 sm:h-36 sm:w-36" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="block-ring-a absolute inset-0 h-full w-full">
            <circle cx="100" cy="100" r="96" fill="none" stroke="#7ED321" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 10" />
            <circle cx="100" cy="4" r="3.5" fill="#7ED321" />
          </svg>
          <svg viewBox="0 0 200 200" className="block-ring-b absolute inset-0 h-full w-full">
            <circle cx="100" cy="100" r="78" fill="none" stroke="#7ED321" strokeOpacity="0.8" strokeWidth="2" strokeDasharray="90 40 20 40" />
            <circle cx="100" cy="100" r="62" fill="none" stroke="#FFF3A0" strokeOpacity="0.25" strokeWidth="1" />
          </svg>
          <div className="block-pulse absolute inset-[2.5rem] flex items-center justify-center rounded-full border border-lime/70 bg-ink/80 sm:inset-11">
            <Lock className="h-7 w-7 text-lime sm:h-8 sm:w-8" />
          </div>
        </div>

        <h1 className="block-glitch mt-8 font-display font-bold uppercase leading-[0.95] text-[clamp(2.2rem,8.5vw,4.5rem)]" data-text={block.title}>{block.title}</h1>
        <p className="mt-4 font-display text-lg font-bold uppercase tracking-wider text-lime sm:text-xl">{block.headline}</p>
        <p className="mt-3 max-w-xl text-base sm:text-lg text-paper/80">{block.message}</p>

        <div className="mt-6 w-full max-w-md rounded-lg border border-lime/40 bg-panel/80 p-4 text-left font-display text-[13px] tracking-wider shadow-glow backdrop-blur sm:text-sm">
          {readout.map(([k, v, alert], i) => (
            <p key={k} className="block-line flex flex-wrap gap-x-2 py-0.5" style={{ animationDelay: `${0.4 + i * 0.45}s` }}>
              <span className="text-lime">&gt;</span>
              <span className="text-paper/60">{k}</span>
              <span aria-hidden="true" className="min-w-4 flex-1 overflow-hidden whitespace-nowrap text-paper/25">{'.'.repeat(40)}</span>
              <span className={alert ? 'font-bold text-butter' : 'font-bold text-paper'}>{v}</span>
            </p>
          ))}
          <p className="block-line mt-1 text-lime" style={{ animationDelay: `${0.4 + readout.length * 0.45}s` }}>&gt; <span className="block-blink">_</span></p>
        </div>

        <a href={site.credit.href} target="_blank" rel="noopener" className="btn btn-lime mt-6">{block.button} <ArrowRight size={16} aria-hidden="true" /></a>
        <p className="mt-4 text-sm text-paper/55">{block.visitors}</p>
      </div>
    </main>
  );
}
