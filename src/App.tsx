import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import BlockedPage from '@/components/BlockedPage';
import { block } from '@/config/block';
import Home from '@/pages/Home';
import WetBelt from '@/pages/WetBelt';
import AreaPage from '@/pages/AreaPage';
import TransitPage from '@/pages/TransitPage';
import { Privacy, Terms } from '@/pages/Legal';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// scripts/prerender.mjs reads the path="/..." routes from this file to build a static page for each one
export function AppRoutes() {
  // the access block replaces the whole site on every address (see src/config/block.ts)
  if (block.active) return <BlockedPage />;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/wet-belt-changes" element={<WetBelt />} />
        <Route path="/ford-transit-wet-belt-replacement" element={<TransitPage />} />
        <Route path="/mobile-mechanic-leeds" element={<AreaPage />} />
        <Route path="/mobile-mechanic-wakefield" element={<AreaPage />} />
        <Route path="/mobile-mechanic-bradford" element={<AreaPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
