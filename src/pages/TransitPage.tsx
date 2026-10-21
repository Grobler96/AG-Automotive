import { Link } from 'react-router-dom';
import { MessageSquare, Phone } from 'lucide-react';
import { AreasSection, Faq, HowItWorks, Includes, QuoteSection, Reveal, WorkGallery, Wrap } from '@/components/Sections';
import HeroLogo from '@/components/HeroLogo';
import { transit, transitFaqs, wetBeltIncludes, wetBeltSteps } from '@/data/content';
import { useSEO } from '@/lib/useSEO';
import { site, sms, tel } from '@/config/site';

/** /ford-transit-wet-belt-replacement: worded from the client's own Transit flyer, with nothing added. */
export default function TransitPage() {
  useSEO();
  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_20%,rgba(126,211,33,0.16),transparent)]" />
        <HeroLogo />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <nav aria-label="Breadcrumb" className="mono !text-paper/50 mb-6">
            <Link to="/" className="hover:text-lime">Home</Link> / <Link to="/wet-belt-changes/" className="hover:text-lime">Wet belt changes</Link> / <span className="text-lime">Ford Transit</span>
          </nav>
          <h1 className="max-w-3xl font-display font-bold uppercase text-5xl sm:text-6xl leading-[0.95]">Wet belt problems in your <span className="text-lime">Ford Transit?</span></h1>
          <p className="mt-5 max-w-xl text-lg text-paper/75">{site.name} is a mobile mechanic covering {site.area}, and wet belts are our speciality. We come to you: at home, at work or anywhere convenient.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call {site.phoneDisplay}</a>
            <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text us</a>
          </div>
        </div>
      </section>

      <Wrap>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal>
            <p className="mono">// The problem</p>
            <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">The wet belt in a Transit</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg text-paper/80">
            {transit.problem.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
        </div>
      </Wrap>

      <Wrap tone="carbon">
        <Reveal>
          <p className="mono">// Know the signs</p>
          <h2 className="mt-3 font-display font-bold uppercase text-4xl sm:text-5xl leading-[0.98]">{transit.signsTitle}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {transit.signs.map((s, i) => (
            <Reveal key={s} delay={i * 0.06}>
              <li className="flex items-start gap-4 rounded-lg border border-line bg-panel p-5 list-none">
                <span className="font-display font-bold text-lime">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-lg">{s}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal><p className="mt-8 max-w-3xl text-paper/70">{transit.signsNote}</p></Reveal>
      </Wrap>

      <Includes title="What the job includes" items={wetBeltIncludes.items} />
      <WorkGallery />
      <HowItWorks items={wetBeltSteps} />
      <Faq items={transitFaqs} title="Ford Transit wet belt FAQs" />
      <AreasSection />
      <QuoteSection />
    </>
  );
}
