export const shouldShowIntro = () => {
  if (typeof window === 'undefined') return false;
  if (window.location.hash) return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
