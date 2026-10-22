import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { asset } from '@/lib/asset';

/** The full logo, shown on the empty right of the inner page headers (large screens only). It links to the home page. */
export default function HeroLogo({ small = false }: { small?: boolean }) {
  return (
    <Link to="/" aria-label={`${site.name}, ${site.strap}: home`} className={`hidden lg:block absolute z-10 right-10 xl:right-24 top-1/2 -translate-y-1/2 ${small ? 'w-52 xl:w-60' : 'w-80 xl:w-[26rem]'}`}>
      <img
        src={asset('logo-full.webp')}
        alt=""
        width="720"
        height="487"
        className="w-full h-auto drop-shadow-[0_0_40px_rgba(126,211,33,0.18)]"
      />
    </Link>
  );
}
