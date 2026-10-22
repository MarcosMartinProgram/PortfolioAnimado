import { useLang } from '../../context/LanguageContext';
import './footer.scss';

const Footer = () => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerRow">
          <a className="footerBrand" href="#inicio">
            MM<span>.</span>
          </a>
          <p className="footerCopy">
            © {year} Marcos Martin. {t.footer.rights}
          </p>
          <nav className="footerLinks" aria-label={t.a11y.mainNav}>
            <a href="https://github.com/MarcosMartinProgram" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/marcosmartinprogram/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:martinmarcospablo@gmail.com">Email</a>
          </nav>
        </div>
        <p className="footerNote">{t.footer.made}</p>
      </div>
    </footer>
  );
};

export default Footer;
