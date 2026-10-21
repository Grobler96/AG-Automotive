import EngineFilm from '@/components/EngineFilm';
import { AreasSection, VehicleBand, WorkGallery, Faq, HowItWorks, Intro, QuoteSection, Reviews, Services, Speciality } from '@/components/Sections';
import { useSEO } from '@/lib/useSEO';

export default function Home() {
  useSEO();
  return (
    <>
      <EngineFilm />
      <VehicleBand />
      <Intro />
      <Speciality />
      <Services />
      <WorkGallery />
      <AreasSection />
      <HowItWorks />
      <Reviews />
      <Faq title="Questions" />
      <QuoteSection />
    </>
  );
}
