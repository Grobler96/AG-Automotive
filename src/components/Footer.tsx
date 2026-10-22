import { Link } from 'react-router-dom';
import { nav, site, tel } from '@/config/site';
import { areas } from '@/data/areas';
import { asset } from '@/lib/asset';

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <img src={asset('logo-full.webp')} alt={`${site.name}, ${site.strap}`} width="720" height="487" className="w-56 h-auto" loading="lazy" />
          {site.area && <p className="mt-4 max-w-xs text-paper/65">Mobile mechanic covering {site.area}. Wet belt changes are our speciality.</p>}
        </div>
        <div>
          <h2 className="mono">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => <li key={n.path}><Link to={n.path} className="text-paper/75 hover:text-lime">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mono">Areas</h2>
          <ul className="mt-4 space-y-2.5">
            {areas.map((a) => <li key={a.slug}><Link to={`${a.path}/`} className="text-paper/75 hover:text-lime">Mobile mechanic {a.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mono">Get in touch</h2>
          <ul className="mt-4 space-y-2.5 text-paper/75">
            <li><a href={tel} className="hover:text-lime">{site.phoneDisplay}</a></li>
            {site.email && <li><a href={`mailto:${site.email}`} className="hover:text-lime">{site.email}</a></li>}
            {site.area && <li>{site.area}</li>}
            {site.hours.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-sm text-paper/55">
          <p>&copy; {new Date().getFullYear()} {site.name}</p>
          {/* a normal followable link, and no noreferrer, so aibyao.com sees the visits it sends */}
          <span className="flex gap-4"><Link to="/privacy/" className="hover:text-lime">Privacy</Link><Link to="/terms/" className="hover:text-lime">Terms</Link></span>
          <a href={site.credit.href} target="_blank" rel="noopener" className="text-paper/80 underline decoration-lime/60 underline-offset-4 hover:text-lime">{site.credit.label}</a>
        </div>
      </div>
    </footer>
  );
}
