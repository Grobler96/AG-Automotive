import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

/**
 * A card that floats gently and tilts towards the finger or pointer, with a light that follows it.
 * The content is always in the page; the movement is decoration, and is off with reduced motion.
 */
export default function Card3D({ children, className = '', index = 0 }: { children: ReactNode; className?: string; index?: number }) {
  // decided after mount so the server HTML and the first browser render match
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const still = !mounted || !!reduce;
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 16 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 16 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const shine = useMotionTemplate`radial-gradient(260px circle at ${gx}% ${gy}%, rgba(126,211,33,0.22), transparent 70%)`;

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set((0.5 - py) * 14);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(30);
  };

  return (
    <div className={`card3d-float h-full ${still ? '' : 'card3d-anim'}`} style={{ animationDelay: `${(index % 4) * -1.1}s`, perspective: 900 }}>
      <motion.div
        onPointerMove={move}
        onPointerLeave={leave}
        onPointerUp={leave}
        style={still ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={`relative h-full rounded-xl border border-line bg-gradient-to-b from-panel to-carbon p-6 shadow-[0_18px_40px_-18px_rgba(126,211,33,0.35),0_2px_0_0_rgba(126,211,33,0.15)_inset] hover:border-lime/60 transition-colors ${className}`}
      >
        {!still && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-xl" style={{ backgroundImage: shine }} />}
        <div className="relative" style={still ? undefined : { transform: 'translateZ(14px)' }}>{children}</div>
      </motion.div>
    </div>
  );
}
