import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import Reveal from '../reveal/Reveal';
import './portfolio.scss';

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
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const ArrowBack = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

const Portfolio = () => {
  const { t } = useLang();
  const stackRef = useRef(null);
  const cardRefs = useRef([]);
  const frontRefs = useRef([]);
  const closeRefs = useRef([]);
  const [flipped, setFlipped] = useState(null);
  const items = t.portfolio.items;
  const total = String(items.length).padStart(2, '0');

  const openCard = (index) => {
    setFlipped(items[index].title);
    requestAnimationFrame(() => closeRefs.current[index]?.focus());
  };

  const closeCard = (index) => {
    setFlipped(null);
    requestAnimationFrame(() => frontRefs.current[index]?.focus());
  };

  useEffect(() => {
    if (!flipped) return undefined;

    const index = items.findIndex((item) => item.title === flipped);

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setFlipped(null);
      requestAnimationFrame(() => frontRefs.current[index]?.focus());
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [flipped, items]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const wrappers = cardRefs.current.filter(Boolean);
    let metrics = [];
    let frame = 0;

    const measure = () => {
      const stackTop = stack.getBoundingClientRect().top + window.scrollY;
      const gap = parseFloat(window.getComputedStyle(stack).rowGap) || 0;
      let nextTop = stackTop;

      metrics = wrappers.map((el) => {
        const styles = window.getComputedStyle(el);
        const stickyTop = parseFloat(styles.top) || 0;
        const metric = {
          el,
          active: styles.position === 'sticky',
          stuckAt: nextTop - stickyTop,
          inert: el.hasAttribute('inert'),
        };

        nextTop += el.offsetHeight + gap;
        return metric;
      });
    };

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;

      metrics.forEach((metric, index) => {
        const next = metrics[index + 1];
        let cover = 0;

        if (metric.active && next) {
          const span = Math.max(1, next.stuckAt - metric.stuckAt);
          cover = Math.min(1, Math.max(0, (scrollY - metric.stuckAt) / span));
        }

        metric.el.style.setProperty('--cover', cover.toFixed(3));

        const shouldBeInert = cover > 0.7;
        if (shouldBeInert !== metric.inert) {
          if (shouldBeInert) metric.el.setAttribute('inert', '');
          else metric.el.removeAttribute('inert');
          metric.inert = shouldBeInert;
        }
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const remeasure = () => {
      measure();
      requestUpdate();
    };

    measure();
    update();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', remeasure);

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(remeasure) : null;
    observer?.observe(stack);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', remeasure);
      observer?.disconnect();
      wrappers.forEach((el) => el.removeAttribute('inert'));
    };
  }, [items]);

  return (
    <section className="portfolio section" id="proyectos">
      <div className="sectionInner">
        <Reveal className="sectionHead">
          <p className="eyebrow">{t.portfolio.eyebrow}</p>
          <h2>{t.portfolio.title}</h2>
          <p className="sectionLead">{t.portfolio.intro}</p>
        </Reveal>

        <div className="projectStack" ref={stackRef}>
          {items.map((item, index) => {
            const isFlipped = flipped === item.title;

            return (
              <div
                className="projectCardWrap"
                key={item.title}
                style={{ '--i': index, zIndex: index + 1 }}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
              >
                <article className={`projectCard${isFlipped ? ' isFlipped' : ''}`}>
                  <button
                    type="button"
                    className="projectFront"
                    ref={(el) => {
                      frontRefs.current[index] = el;
                    }}
                    aria-expanded={isFlipped}
                    aria-controls={`project-details-${index}`}
                    aria-label={`${item.title} — ${t.portfolio.details}`}
                    tabIndex={isFlipped ? -1 : 0}
                    onClick={() => (isFlipped ? closeCard(index) : openCard(index))}
                  >
                    <img
                      src={item.image}
                      alt=""
                      width="1440"
                      height="900"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="projectIndex" aria-hidden="true">
                      <span>{String(index + 1).padStart(2, '0')}</span> / {total}
                    </span>
                    <span className="projectCue" aria-hidden="true">
                      {t.portfolio.details}
                      <Arrow />
                    </span>
                  </button>

                  <div
                    className="projectBack"
                    id={`project-details-${index}`}
                    inert={isFlipped ? undefined : ''}
                    aria-hidden={!isFlipped}
                  >
                    <button
                      type="button"
                      className="projectClose"
                      ref={(el) => {
                        closeRefs.current[index] = el;
                      }}
                      onClick={() => closeCard(index)}
                    >
                      <ArrowBack />
                      {t.portfolio.close}
                    </button>

                    <div className="projectBackInner">
                      <p className="projectNumber">
                        <span>{String(index + 1).padStart(2, '0')}</span> / {total}
                      </p>
                      <h3>{item.title}</h3>
                      <p className="projectSubtitle">{item.subtitle}</p>
                      <p className="projectDesc">{item.desc}</p>

                      <ul className="tags" aria-label={item.title}>
                        {item.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>

                      <div className="projectLinks">
                        <a
                          className="btn btnPrimary btnSm"
                          href={item.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t.portfolio.demo}
                          <Arrow />
                        </a>
                        {item.code ? (
                          <a
                            className="btn btnGhost btnSm"
                            href={item.code}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.portfolio.code}
                          </a>
                        ) : (
                          <span className="projectPrivate">{t.portfolio.private}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
