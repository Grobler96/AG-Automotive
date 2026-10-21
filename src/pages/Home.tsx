import EngineFilm from '@/components/EngineFilm';
import { AreasSection, Faq, HowItWorks, Intro, QuoteSection, Reviews, Services, Speciality } from '@/components/Sections';
import { useSEO } from '@/lib/useSEO';

export default function Home() {
  useSEO();
  return (
    <>
      <EngineFilm />
      <Intro />
      <Speciality />
      <Services />
      <AreasSection />
      <HowItWorks />
      <Reviews />
      <Faq title="Questions" />
      <QuoteSection />
    </>
  );
}
