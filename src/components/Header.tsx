import { Link, NavLink } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { nav, site, tel } from '@/config/site';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-ink/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-baseline gap-3" aria-label={`${site.name}, ${site.strap}: home`}>
          <span className="font-display font-bold text-xl tracking-wide text-lime">AG AUTOMOTIVE</span>
          <span className="hidden sm:inline font-display uppercase tracking-[0.25em] text-[11px] text-butter/80">{site.strap}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          {nav.map((n) => (
            <NavLink key={n.path} to={n.path} className={({ isActive }) => `hidden md:inline font-display uppercase tracking-wider text-sm ${isActive ? 'text-lime' : 'text-paper/70 hover:text-paper'}`}>
              {n.label}
            </NavLink>
          ))}
          <a href={tel} className="btn btn-lime !py-2 !px-4"><Phone size={16} aria-hidden="true" /> <span className="hidden sm:inline">{site.phoneDisplay}</span><span className="sm:hidden">Call</span></a>
        </nav>
      </div>
    </header>
  );
}
