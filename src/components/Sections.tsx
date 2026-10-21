import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Mail, MessageSquare, Phone } from 'lucide-react';
import Reveal from './Reveal';
import { Link } from 'react-router-dom';
import { areas, type Area } from '@/data/areas';
import { vanIntro, vanPhotos, workIntro, workPhotos } from '@/data/work';
import { asset } from '@/lib/asset';
import { contactLines, explainer, faqs, intro, services, signs, speciality, steps } from '@/data/content';
import { site, sms, tel } from '@/config/site';

export const Wrap = ({ id, children, tone = 'ink' }: { id?: string; children: React.ReactNode; tone?: 'ink' | 'carbon' }) => (
  <section id={id} className={`${tone === 'carbon' ? 'bg-carbon' : 'bg-ink'} border-t border-line scroll-mt-20`}>
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">{children}</div>
  </section>
);

export { default as Reveal } from './Reveal';

export function Includes({ title, items, note }: { title: string; items: string[]; note?: string }) {
  return (
    <Wrap>
      <Reveal>
        <p className="mono">// The job</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{title}</h2>
      </Reveal>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t} delay={i * 0.06}>
            <li className="h-full flex items-start gap-4 rounded-lg border border-line bg-panel p-5 list-none">
              <Check size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-lime" />
              <span className="text-lg">{t}</span>
            </li>
          </Reveal>
        ))}
      </ul>
      {note && <Reveal><p className="mt-8 max-w-3xl text-paper/70">{note}</p></Reveal>}
    </Wrap>
  );
}

export function Explainer() {
  return (
    <Wrap>
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="mono">// The job</p>
          <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{explainer.title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg text-paper/80">
          {explainer.paras.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </div>
    </Wrap>
  );
}

export function Signs() {
  return (
    <Wrap tone="carbon">
      <Reveal>
        <p className="mono">// Know the signs</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{signs.title}</h2>
        <p className="mt-4 max-w-2xl text-paper/70">{signs.intro}</p>
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {signs.items.map((s, i) => (
          <Reveal key={s} delay={i * 0.06}>
            <li className="flex items-start gap-4 rounded-lg border border-line bg-panel p-5 list-none">
              <span className="font-display font-bold text-lime">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-lg">{s}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </Wrap>
  );
}

export function Intro() {
  return (
    <Wrap>
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="mono">// {site.name}</p>
          <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{intro.title}</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg text-paper/80">
          {intro.paras.map((p) => <p key={p}>{p}</p>)}
        </Reveal>
      </div>
    </Wrap>
  );
}

export function Speciality() {
  return (
    <Wrap tone="carbon">
      <Reveal>
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] items-center rounded-xl border border-lime/40 bg-panel p-6 sm:p-10 shadow-glow">
          <div>
            <p className="mono">// Specialist work</p>
            <h2 className="mt-3 font-display font-bold uppercase text-3xl sm:text-4xl leading-[0.98]">{speciality.title}</h2>
            <p className="mt-4 text-lg text-paper/80 max-w-xl">{speciality.text}</p>
          </div>
          <div className="md:justify-self-end">
            <Link to="/wet-belt-changes/" className="btn btn-lime">Everything about wet belts <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </Reveal>
    </Wrap>
  );
}

/** The lime strip from his flyer: what he works on, and where. */
export function VehicleBand() {
  return (
    <div className="bg-lime text-ink">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 font-display font-bold uppercase tracking-[0.25em] text-xs sm:text-sm">
        <span>{site.vehicles.join(' · ')}</span>
        <span className="hidden sm:inline opacity-50">/</span>
        <span>Covering all {site.area}</span>
      </div>
    </div>
  );
}

export function WorkGallery({ title = workIntro.title }: { title?: string }) {
  return (
    <Wrap tone="carbon">
      <Reveal>
        <p className="mono">// The work</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{title}</h2>
        <p className="mt-4 max-w-2xl text-paper/70">{workIntro.text}</p>
      </Reveal>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {workPhotos.map((p, i) => (
          <Reveal key={p.src} delay={(i % 4) * 0.05} className="h-full">
            <li className="list-none h-full">
              <figure className="h-full flex flex-col overflow-hidden rounded-lg border border-line bg-panel">
                <img src={asset(p.src)} alt={p.alt} width="900" height="1200" loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover" />
                <figcaption className="flex-1 p-3 text-sm text-paper/75">{p.caption}</figcaption>
              </figure>
            </li>
          </Reveal>
        ))}
      </ul>
    </Wrap>
  );
}

export function VanStrip() {
  return (
    <Wrap>
      <Reveal>
        <p className="mono">// On the road</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{vanIntro.title}</h2>
        <p className="mt-4 max-w-2xl text-paper/70">{vanIntro.text}</p>
      </Reveal>
      <ul className="mt-10 grid gap-3 sm:gap-4 sm:grid-cols-3">
        {vanPhotos.map((p, i) => (
          <Reveal key={p.src} delay={i * 0.06} className="h-full">
            <li className="list-none h-full">
              <figure className="h-full flex flex-col overflow-hidden rounded-lg border border-line bg-panel">
                <img src={asset(p.src)} alt={p.alt} width="1050" height="950" loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
                <figcaption className="flex-1 p-3 text-sm text-paper/75">{p.caption}</figcaption>
              </figure>
            </li>
          </Reveal>
        ))}
      </ul>
    </Wrap>
  );
}

export function Services() {
  if (site.services.length === 0) return null;
  return (
    <Wrap>
      <Reveal>
        <p className="mono">// Services</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{services.title}</h2>
        <p className="mt-4 max-w-2xl text-paper/70">{services.intro}</p>
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <li className={`h-full rounded-lg border bg-panel p-5 list-none ${s.highlight ? 'border-lime shadow-glow' : 'border-line'}`}>
              {s.highlight && <p className="mono mb-2">Our speciality</p>}
              <h3 className="text-xl font-bold uppercase">{s.title}</h3>
              <p className="mt-2 text-paper/75">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ul>
      <Reveal><p className="mt-8 text-lg text-paper/80">{services.more}</p></Reveal>
    </Wrap>
  );
}

export function AreasSection({ exclude, title = 'Areas we cover' }: { exclude?: Area['slug']; title?: string }) {
  const list = areas.filter((a) => a.slug !== exclude);
  return (
    <Wrap tone="carbon">
      <Reveal>
        <p className="mono">// Where we work</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{title}</h2>
        <p className="mt-4 max-w-2xl text-paper/70">AG Automotive is a mobile mechanic covering {site.area}. Pick your area to see how it works near you.</p>
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {list.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.06}>
            <li className="list-none h-full">
              <Link to={`${a.path}/`} className="group block h-full rounded-lg border border-line bg-panel p-6 hover:border-lime transition-colors">
                <h3 className="text-2xl font-bold uppercase">Mobile mechanic in {a.name}</h3>
                <p className="mt-2 text-paper/70">Wet belt specialist, covering {a.name}.</p>
                <span className="mt-4 inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wide text-lime">See {a.name} <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </Wrap>
  );
}

export function AreaIntro({ area }: { area: Area }) {
  const districts = site.districts[area.slug] ?? [];
  return (
    <Wrap>
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="mono">// {area.name}</p>
          <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">A mobile mechanic for {area.name}</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg text-paper/80">
          {area.paras.map((p) => <p key={p}>{p}</p>)}
          {districts.length > 0 && <p className="text-paper/70">In {area.name} we cover {districts.join(', ')} and the surrounding areas.</p>}
        </Reveal>
      </div>
    </Wrap>
  );
}

type Step = { n: string; title: string; text: string };
export function HowItWorks({ items = steps }: { items?: Step[] }) {
  return (
    <Wrap>
      <Reveal>
        <p className="mono">// How it works</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">Three steps.</h2>
      </Reveal>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <li className="h-full rounded-lg border border-line bg-panel p-6 list-none">
              <p className="font-display font-bold text-5xl text-lime/90">{s.n}</p>
              <h3 className="mt-4 text-2xl font-bold uppercase">{s.title}</h3>
              <p className="mt-2 text-paper/75">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Wrap>
  );
}

export function Reviews() {
  if (site.reviews.length === 0) return null;
  return (
    <Wrap tone="carbon">
      <Reveal><p className="mono">// Customers say</p></Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {site.reviews.map((r) => (
          <Reveal key={r.name + r.quote}>
            <figure className="h-full rounded-lg border border-line bg-panel p-6">
              <blockquote className="text-lg">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 mono">{r.name}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Wrap>
  );
}

type Qa = { q: string; a: string };
export function Faq({ items = faqs, title = 'Questions' }: { items?: Qa[]; title?: string }) {
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <Wrap tone="carbon">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Reveal>
        <p className="mono">// Questions</p>
        <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{title}</h2>
      </Reveal>
      <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold text-xl">
              {f.q}
              <span aria-hidden="true" className="text-lime text-2xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-paper/75 max-w-2xl">{f.a}</p>
          </details>
        ))}
      </div>
    </Wrap>
  );
}

function QuoteForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch(site.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(e.currentTarget) });
      setState(res.ok ? 'sent' : 'error');
    } catch { setState('error'); }
  };
  if (state === 'sent') return <p className="rounded-lg border border-lime/50 bg-panel p-6 text-lg">Thanks, we have your message and will be in touch.</p>;
  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="grid gap-1.5"><span className="mono">Your name</span><input name="name" required autoComplete="name" className="field" /></label>
      <label className="grid gap-1.5"><span className="mono">Phone number</span><input name="phone" type="tel" required autoComplete="tel" className="field" /></label>
      <label className="grid gap-1.5"><span className="mono">Car make, model and year</span><input name="car" required className="field" /></label>
      <label className="grid gap-1.5"><span className="mono">What do you need doing, and where is the car?</span><textarea name="message" rows={4} className="field" /></label>
      <button type="submit" disabled={state === 'sending'} className="btn btn-lime justify-self-start disabled:opacity-60">{state === 'sending' ? 'Sending' : 'Send my details'}</button>
      {state === 'error' && <p role="alert" className="text-butter">That did not send. Please call or text us instead.</p>}
    </form>
  );
}

export function QuoteSection() {
  return (
    <Wrap id="quote">
      <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
        <Reveal>
          <p className="mono">// Get a quote</p>
          <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">Tell us the car.<br /><span className="text-lime">We will come to you.</span></h2>
          <p className="mt-5 text-paper/75 max-w-md">Send the make, model and year, what you need doing and where in {site.area} the car is. We will come back to you with a quote.</p>
          {contactLines.length > 0 && (
            <dl className="mt-6 space-y-1 text-paper/75">
              {contactLines.map((l) => <div key={l.label} className="flex gap-3"><dt className="mono !text-paper/50 w-14 pt-1">{l.label}</dt><dd>{l.href ? <a href={l.href} className="underline decoration-lime/50 underline-offset-4 hover:text-lime">{l.value}</a> : l.value}</dd></div>)}
            </dl>
          )}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-xl border border-line bg-panel p-6 sm:p-8 shadow-glow">
            {site.formEndpoint ? <QuoteForm /> : null}
            <div className={site.formEndpoint ? 'mt-8 pt-6 border-t border-line' : ''}>
              <p className="mono">{site.formEndpoint ? 'Or talk to us' : 'Talk to us'}</p>
              <a href={tel} className="mt-3 block font-display font-bold text-3xl sm:text-4xl text-volt hover:text-lime">{site.phoneDisplay}</a>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call now</a>
                <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text us</a>
                {site.email && <a href={`mailto:${site.email}`} className="btn btn-ghost"><Mail size={16} aria-hidden="true" /> Email us</a>}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Wrap>
  );
}
