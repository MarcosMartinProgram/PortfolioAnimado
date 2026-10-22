import { useLang } from '../../context/LanguageContext';
import './hero.scss';

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Hero = ({ started = false }) => {
  const { t } = useLang();

  return (
    <section className={`hero ${started ? 'isStarted' : ''}`} id="inicio">
      <div className="heroGrid">
        <div className="heroCopy">
          <p className="eyebrow heroItem" style={{ '--i': 0 }}>
            <span className="dot" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>

          <h1>
            <span className="line">
              <span>{t.hero.titleA}</span>
            </span>
            <span className="line">
              <span className="accent">{t.hero.titleB}</span>
            </span>
          </h1>

          <p className="heroLead heroItem" style={{ '--i': 3 }}>
            {t.hero.lead}
          </p>

          <div className="heroActions heroItem" style={{ '--i': 4 }}>
            <a className="btn btnPrimary" href="#proyectos">
              {t.hero.ctaProjects}
              <Arrow />
            </a>
            <a className="btn btnGhost" href="#contacto">
              {t.hero.ctaContact}
            </a>
          </div>

          <p className="heroNote heroItem" style={{ '--i': 5 }}>
            {t.hero.note}
          </p>
        </div>

        <div className="heroVisual">
          <span className="heroGlow" aria-hidden="true" />
          <img
            src="/Hero.webp"
            alt={t.hero.imageAlt}
            width="1162"
            height="1280"
            decoding="async"
          />
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marqueeTrack">
          {[...t.hero.marquee, ...t.hero.marquee].map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
