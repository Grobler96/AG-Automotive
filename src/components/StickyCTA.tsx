import { MessageSquare, Phone } from 'lucide-react';
import { sms, tel } from '@/config/site';

/** Phone only: Call and Text always within thumb reach. */
export default function StickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-[4.5rem] px-3 py-2.5 grid grid-cols-2 gap-3 bg-ink/95 backdrop-blur border-t border-line">
      <a href={tel} className="btn btn-lime"><Phone size={16} aria-hidden="true" /> Call now</a>
      <a href={sms} className="btn btn-ghost"><MessageSquare size={16} aria-hidden="true" /> Text us</a>
    </div>
  );
}
