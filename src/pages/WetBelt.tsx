import { AreasSection, Explainer, Faq, HowItWorks, QuoteSection, Reviews, Signs } from '@/components/Sections';
import { wetBeltFaqs, wetBeltSteps } from '@/data/content';
import HeroLogo from '@/components/HeroLogo';
import { useSEO } from '@/lib/useSEO';
import { site, sms, tel } from '@/config/site';
import { MessageSquare, Phone } from 'lucide-react';

export default function WetBelt() {
  useSEO();
  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_20%,rgba(126,211,33,0.16),transparent)]" />
        <HeroLogo />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <p className="mono">{site.name} · {site.strap}</p>
          <h1 className="mt-3 max-w-3xl font-display font-bold uppercase text-5xl sm:text-6xl leading-[0.95]">Wet belt changes in <span className="text-lime">{site.area}</span></h1>
          <p className="mt-5 max-w-xl text-lg text-paper/75">AG Automotive is a mobile mechanic, and wet belt changes are our speciality. We come to you anywhere in {site.area}.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call {site.phoneDisplay}</a>
            <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text us</a>
          </div>
        </div>
      </section>
      <Explainer />
      <Signs />
      <HowItWorks items={wetBeltSteps} />
      <Reviews />
      <Faq items={wetBeltFaqs} title="Wet belt FAQs" />
      <AreasSection />
      <QuoteSection />
    </>
  );
}
