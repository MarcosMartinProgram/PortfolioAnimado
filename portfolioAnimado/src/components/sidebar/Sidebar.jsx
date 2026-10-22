import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import './sidebar.scss';

const LINKS = [
  { key: 'inicio', target: 'inicio' },
  { key: 'servicios', target: 'servicios' },
  { key: 'proyectos', target: 'proyectos' },
  { key: 'sobreMi', target: 'sobre-mi' },
  { key: 'contacto', target: 'contacto' },
];

const Sidebar = () => {
  const { t, lang, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll('a[href], button:not([disabled])'),
      ).filter((element) => element.tabIndex !== -1);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)');
    const handleChange = (event) => {
      if (event.matches) setOpen(false);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const tabIndex = open ? 0 : -1;

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menuToggle"
        onClick={() => setOpen(true)}
        aria-label={t.a11y.menu}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span />
        <span />
        <span />
      </button>

      {createPortal(
        <motion.div
          id="mobile-menu"
        ref={panelRef}
        className={`menuOverlay ${open ? 'isOpen' : ''}`}
        role="dialog"
        aria-modal={open ? 'true' : undefined}
        aria-label={t.a11y.mainNav}
        aria-hidden={!open}
        initial={false}
        animate={{ clipPath: open ? 'circle(150% at 100% 0%)' : 'circle(0% at 100% 0%)' }}
        transition={{ duration: reduce ? 0 : 0.55, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="menuTop">
          <span className="menuBrand" aria-hidden="true">
            MM<span>.</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            className="menuClose"
            onClick={closeMenu}
            aria-label={t.a11y.close}
            tabIndex={tabIndex}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="menuNav" aria-label={t.a11y.mainNav}>
          {LINKS.map((item, index) => (
            <a key={item.key} href={`#${item.target}`} onClick={closeMenu} tabIndex={tabIndex}>
              <span className="menuIndex" aria-hidden="true">
                0{index + 1}
              </span>
              <span>{t.nav[item.key]}</span>
            </a>
          ))}
        </nav>

        <div className="menuFoot">
          <a className="menuEmail" href="mailto:martinmarcospablo@gmail.com" tabIndex={tabIndex}>
            martinmarcospablo@gmail.com
          </a>
          <div className="menuMeta">
            <a
              href="https://www.linkedin.com/in/marcosmartinprogram/"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tabIndex}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/MarcosMartinProgram"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tabIndex}
            >
              GitHub
            </a>
            <button
              type="button"
              className="menuLang"
              onClick={toggleLang}
              tabIndex={tabIndex}
              aria-label={t.a11y.lang}
            >
              {lang === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        </div>
        </motion.div>,
        document.body,
      )}
    </>
  );
};

export default Sidebar;
