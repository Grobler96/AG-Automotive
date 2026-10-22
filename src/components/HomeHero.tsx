import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { site, sms, tel } from '@/config/site';
import { asset } from '@/lib/asset';

/** The first screen of the homepage: the van, the promise and Call and Text. The scroll film lives on the wet belt page. */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink min-h-[calc(100svh-4rem)] flex items-end md:items-center">
      <img
        src={asset('work/van-open-doors.webp')}
        alt="The AG Automotive van parked at a job with its rear doors open and tools inside"
        width="1400"
        height="1050"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_50%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/20 md:bg-gradient-to-r md:from-ink md:via-ink/80 md:to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_15%_90%,rgba(126,211,33,0.18),transparent)]" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-28 pb-28 md:py-24">
        <p className="mono">{site.name} · {site.strap}</p>
        <h1 className="mt-3 max-w-3xl font-display font-bold uppercase leading-[0.95] text-[clamp(2.4rem,9vw,5.2rem)]">
          Mobile mechanic in <span className="text-lime">{site.area}</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg sm:text-xl text-paper/85">The mechanic that comes to you. Cars, vans and motorhomes, at your home, your work or wherever they are parked.</p>
        <div className="mt-7 hidden md:flex flex-wrap gap-3">
          <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call {site.phoneDisplay}</a>
          <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text us</a>
        </div>
        <p className="mt-6">
          <Link to="/wet-belt-changes/" className="inline-flex items-center gap-2 font-display font-bold uppercase tracking-wider text-sm text-butter hover:text-lime">
            Wet belt specialists: watch a wet belt change <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
