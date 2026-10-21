import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';

export default function NotFound() {
  useSEO(true);
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-28 text-center">
      <p className="mono">// 404</p>
      <h1 className="mt-3 font-display font-bold uppercase text-5xl">Page not found</h1>
      <p className="mt-4 text-paper/70">That page has gone for a service.</p>
      <Link to="/" className="btn btn-lime mt-8">Back to the garage</Link>
    </section>
  );
}
