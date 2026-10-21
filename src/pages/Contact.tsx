import { QuoteSection } from '@/components/Sections';
import HeroLogo from '@/components/HeroLogo';
import { useSEO } from '@/lib/useSEO';
import { site } from '@/config/site';

export default function Contact() {
  useSEO();
  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <HeroLogo small />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-4">
          <h1 className="font-display font-bold uppercase text-5xl sm:text-6xl leading-[0.95]">Contact <span className="text-lime">AG Automotive</span></h1>
          <p className="mt-4 text-lg text-paper/75">Your mobile mechanic in {site.area}.</p>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
