import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
// built pages already contain the rendered site, so attach to it; the dev server starts empty
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
