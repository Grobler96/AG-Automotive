import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';
export { businessSchema } from './lib/schema';

/** Renders one route to an HTML string. Used at build time by scripts/prerender.mjs, never in the browser. */
export function render(route: string) {
  const base = import.meta.env.BASE_URL;
  const location = (base.replace(/\/$/, '') + route) || '/';
  return renderToString(
    <StaticRouter location={location} basename={base}>
      <AppRoutes />
    </StaticRouter>,
  );
}
