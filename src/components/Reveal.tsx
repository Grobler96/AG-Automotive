import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Slides up as it scrolls into view. It is never transparent, so the text is always in the page for search engines and slow connections. */
export default function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
