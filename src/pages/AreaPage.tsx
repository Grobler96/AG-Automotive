import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Phone } from 'lucide-react';
import { AreaIntro, AreasSection, Faq, HowItWorks, QuoteSection, Reviews, Speciality } from '@/components/Sections';
import { areaByPath, areas } from '@/data/areas';
import { useSEO } from '@/lib/useSEO';
import { site, sms, tel } from '@/config/site';
import NotFound from './NotFound';

/** One page per town: /mobile-mechanic-leeds, /mobile-mechanic-wakefield, /mobile-mechanic-bradford. */
export default function AreaPage() {
  const { pathname } = useLocation();
  const area = areaByPath(pathname) ?? areas[0];
  useSEO(!areaByPath(pathname));
  if (!areaByPath(pathname)) return <NotFound />;
  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_20%,rgba(126,211,33,0.16),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <nav aria-label="Breadcrumb" className="mono !text-paper/50 mb-6">
            <Link to="/" className="hover:text-lime">Home</Link> / <span className="text-lime">Mobile mechanic in {area.name}</span>
          </nav>
          <h1 className="max-w-3xl font-display font-bold uppercase text-5xl sm:text-6xl leading-[0.95]">Mobile mechanic in <span className="text-lime">{area.name}</span></h1>
          <p className="mt-5 max-w-xl text-lg text-paper/75">{area.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call {site.phoneDisplay}</a>
            <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text us</a>
          </div>
        </div>
      </section>
      <AreaIntro area={area} />
      <Speciality />
      <HowItWorks />
      <Reviews />
      <Faq items={area.faqs} title={`${area.name} questions`} />
      <AreasSection exclude={area.slug} title="Also covering" />
      <QuoteSection />
    </>
  );
}
