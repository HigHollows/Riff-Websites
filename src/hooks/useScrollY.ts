import { useEffect, useRef } from 'react';

/**
 * Appelle `cb(scrollY)` au plus une fois par frame. Aucune mise à jour d'état React :
 * les consommateurs écrivent directement des variables CSS.
 */
export function useScrollFrame(cb: (y: number) => void) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      ref.current(window.scrollY);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
