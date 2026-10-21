import EngineFilm from '@/components/EngineFilm';
import { Explainer, Faq, HowItWorks, QuoteSection, Reviews, Signs } from '@/components/Sections';
import { useSEO } from '@/lib/useSEO';

export default function Home() {
  useSEO();
  return (
    <>
      <EngineFilm />
      <Explainer />
      <Signs />
      <HowItWorks />
      <Reviews />
      <Faq />
      <QuoteSection />
    </>
  );
}
