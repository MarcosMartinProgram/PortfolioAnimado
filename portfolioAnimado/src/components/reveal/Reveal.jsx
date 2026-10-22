import { useLayoutEffect, useRef } from 'react';

const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;

    element.style.opacity = '0';

    let animation;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        animation = element.animate(
          [
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 550,
            delay: delay * 1000,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            fill: 'none',
          },
        );

        animation.onfinish = () => {
          element.style.opacity = '';
        };
      },
      { rootMargin: '-70px 0px' },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animation) animation.cancel();
      element.style.opacity = '';
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
