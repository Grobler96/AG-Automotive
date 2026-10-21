import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, MessageSquare, Phone, X } from 'lucide-react';
import { areas } from '@/data/areas';
import { nav, site, sms, tel } from '@/config/site';
import { asset } from '@/lib/asset';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="sticky top-0 z-50 h-16 bg-ink/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label={`${site.name}, ${site.strap}: home`}>
          <img src={asset('logo-mark.webp')} alt="" width="480" height="205" className="h-6 sm:h-8 w-auto" />
          <span className="flex items-baseline gap-3">
            <span className="font-display font-bold text-base sm:text-xl whitespace-nowrap tracking-wide text-lime">AG AUTOMOTIVE</span>
            <span className="hidden lg:inline font-display uppercase tracking-[0.25em] text-[11px] text-butter/80">{site.strap}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-3 sm:gap-6">
          {nav.map((n) => (
            <NavLink key={n.path} to={n.path} className={({ isActive }) => `hidden md:inline font-display uppercase tracking-wider text-sm ${isActive ? 'text-lime' : 'text-paper/70 hover:text-paper'}`}>
              {n.label}
            </NavLink>
          ))}
          <a href={tel} className="btn btn-lime !py-2 !px-4"><Phone size={16} aria-hidden="true" /> <span className="hidden sm:inline">{site.phoneDisplay}</span><span className="sm:hidden">Call</span></a>
          <button type="button" className="md:hidden -mr-1 p-2 text-paper" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </nav>
      </div>
      {open && (
        <div id="mobile-menu" className="md:hidden absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-ink border-b border-line shadow-2xl">
          <div className="px-4 py-5 space-y-6">
            <ul className="space-y-1">
              {[{ path: '/', label: 'Home' }, ...nav].map((n) => (
                <li key={n.path}><Link to={n.path} className="block py-3 font-display font-bold uppercase tracking-wider text-lg border-b border-line text-paper">{n.label}</Link></li>
              ))}
            </ul>
            <div>
              <p className="mono mb-2">// Areas</p>
              <ul className="space-y-1">
                {areas.map((a) => <li key={a.slug}><Link to={`${a.path}/`} className="block py-2 text-paper/80">Mobile mechanic {a.name}</Link></li>)}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3 pb-24">
              <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call</a>
              <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
