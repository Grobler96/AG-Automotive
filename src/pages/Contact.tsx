import { QuoteSection } from '@/components/Sections';
import { useSEO } from '@/lib/useSEO';

export default function Contact() {
  useSEO();
  return (
    <>
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-4">
          <h1 className="font-display font-bold uppercase text-5xl sm:text-6xl leading-[0.95]">Contact <span className="text-lime">AG Automotive</span></h1>
        </div>
      </section>
      <QuoteSection />
    </>
  );
}
