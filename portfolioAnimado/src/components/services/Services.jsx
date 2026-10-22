import { useLang } from '../../context/LanguageContext';
import Reveal from '../reveal/Reveal';
import './services.scss';

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

const ICONS = [
  <svg
    key="systems"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>,
  <svg
    key="commerce"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 4h2l2.3 11h10.9L21 8H6" />
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
  </svg>,
  <svg
    key="api"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 9 4 12l4 3M16 9l4 3-4 3M13 5l-2 14" />
  </svg>,
];

const Services = () => {
  const { t } = useLang();

  return (
    <section className="services section" id="servicios">
      <div className="sectionInner">
        <Reveal className="sectionHead">
          <p className="eyebrow">{t.services.eyebrow}</p>
          <h2>{t.services.title}</h2>
          <p className="sectionLead">{t.services.intro}</p>
        </Reveal>

        <div className="serviceGrid">
          {t.services.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07}>
              <article className="serviceCard">
                <div className="serviceTop">
                  <span className="serviceIcon" aria-hidden="true">
                    {ICONS[index]}
                  </span>
                  <span className="serviceIndex" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <a className="textLink servicesCta" href="#contacto">
            {t.services.cta}
            <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
