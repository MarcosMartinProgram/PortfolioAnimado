import { useLang } from '../../context/LanguageContext';
import Sidebar from '../sidebar/Sidebar';
import './navbar.scss';

const NAV_ITEMS = [
  { key: 'inicio', target: 'inicio' },
  { key: 'servicios', target: 'servicios' },
  { key: 'proyectos', target: 'proyectos' },
  { key: 'sobreMi', target: 'sobre-mi' },
  { key: 'contacto', target: 'contacto' },
];

const Navbar = () => {
  const { t, lang, toggleLang } = useLang();

  return (
    <header className="navbar">
      <div className="navbarInner">
        <a className="brand" href="#inicio" aria-label="Marcos Martin">
          <span className="brandMark" aria-hidden="true">
            MM
          </span>
          <span className="brandName">Marcos Martin</span>
        </a>

        <nav className="desktopNav" aria-label={t.a11y.mainNav}>
          {NAV_ITEMS.map((item) => (
            <a key={item.key} href={`#${item.target}`}>
              {t.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="navbarActions">
          <a
            className="iconLink"
            href="https://www.linkedin.com/in/marcosmartinprogram/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.a11y.linkedin}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z" />
            </svg>
          </a>
          <a
            className="iconLink"
            href="https://github.com/MarcosMartinProgram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.a11y.github}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.33 4.8-4.56 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <button className="langButton" type="button" onClick={toggleLang} aria-label={t.a11y.lang}>
            <span className={lang === 'es' ? 'isActive' : ''}>ES</span>
            <span aria-hidden="true">/</span>
            <span className={lang === 'en' ? 'isActive' : ''}>EN</span>
          </button>
          <Sidebar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
