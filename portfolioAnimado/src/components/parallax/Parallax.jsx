import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import Reveal from '../reveal/Reveal';
import './parallax.scss';

const Parallax = ({ type }) => {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const isServices = type === 'services';
  const ghost = isServices
    ? lang === 'es'
      ? 'SERVICIOS'
      : 'SERVICES'
    : lang === 'es'
      ? 'PROYECTOS'
      : 'PROJECTS';

  return (
    <section className={`parallax parallax--${type}`} ref={ref}>
      <motion.div
        className="parallaxGhost"
        style={isMobile || reduce ? undefined : { y }}
        aria-hidden="true"
      >
        {ghost}
      </motion.div>

      <div className="parallaxContent">
        <Reveal>
          <p className="parallaxIndex">{isServices ? '01' : '02'}</p>
          <h2>{isServices ? t.parallax.services : t.parallax.portfolio}</h2>
          <p className="parallaxLead">{isServices ? t.services.intro : t.portfolio.intro}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Parallax;
