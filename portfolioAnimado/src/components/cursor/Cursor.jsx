import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './cursor.scss';

const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.4 });

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setEnabled(pointerQuery.matches && !motionQuery.matches);

    update();
    pointerQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      pointerQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setReady(true);

      const nextActive = Boolean(
        event.target.closest('a, button, input, textarea, [data-cursor="link"]'),
      );

      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled, x, y]);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add('has-custom-cursor');
    else root.classList.remove('has-custom-cursor');

    return () => root.classList.remove('has-custom-cursor');
  }, [enabled]);

  if (!enabled) return null;

  return (
    <motion.div
      className={`cursor ${ready ? 'cursor--ready' : ''} ${active ? 'cursor--active' : ''}`}
      style={{ x: springX, y: springY }}
      animate={{ scale: active ? 3.4 : 1 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      aria-hidden="true"
    />
  );
};

export default Cursor;
