import { useLang } from '../../context/LanguageContext';
import Reveal from '../reveal/Reveal';
import './about.scss';

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

const About = () => {
  const { t } = useLang();

  return (
    <section className="about section" id="sobre-mi">
      <div className="sectionInner aboutGrid">
        <Reveal>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>{t.about.title}</h2>
          <div className="aboutText">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a className="textLink aboutCta" href="#proyectos">
            {t.about.cta}
            <Arrow />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="facts">
            {t.about.facts.map((fact) => (
              <div className="fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
