import { site } from '@/config/site';
import { asset } from '@/lib/asset';

/** The full logo, shown on the empty right of the inner page headers (large screens only). */
export default function HeroLogo({ small = false }: { small?: boolean }) {
  return (
    <img
      src={asset('logo-full.webp')}
      alt={`${site.name}, ${site.strap}`}
      width="720"
      height="487"
      className={`hidden lg:block absolute right-10 xl:right-24 top-1/2 -translate-y-1/2 ${small ? 'w-52 xl:w-60' : 'w-80 xl:w-[26rem]'} h-auto drop-shadow-[0_0_40px_rgba(126,211,33,0.18)]`}
    />
  );
}
