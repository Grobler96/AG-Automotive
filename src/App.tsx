import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import WetBelt from '@/pages/WetBelt';
import AreaPage from '@/pages/AreaPage';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// scripts/prerender.mjs reads the path="/..." routes from this file to build a static page for each one
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/wet-belt-changes" element={<WetBelt />} />
        <Route path="/mobile-mechanic-leeds" element={<AreaPage />} />
        <Route path="/mobile-mechanic-wakefield" element={<AreaPage />} />
        <Route path="/mobile-mechanic-bradford" element={<AreaPage />} />
        <Route path="/contact" element={<Contact />} />
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
