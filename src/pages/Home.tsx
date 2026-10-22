import HomeHero from '@/components/HomeHero';
import { AreasSection, VanStrip, VehicleBand, WorkGallery, Faq, HowItWorks, Intro, QuoteSection, Reviews, Services, Speciality } from '@/components/Sections';
import { useSEO } from '@/lib/useSEO';

export default function Home() {
  useSEO();
  return (
    <>
      <HomeHero />
      <VehicleBand />
      <Intro />
      <Speciality />
      <Services />
      <VanStrip />
      <WorkGallery />
      <AreasSection />
      <HowItWorks />
      <Reviews />
      <Faq title="Questions" />
      <QuoteSection />
    </>
  );
}
