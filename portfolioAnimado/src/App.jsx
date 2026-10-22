import './app.scss';
import { useState } from 'react';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Cursor from './components/cursor/Cursor';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Parallax from './components/parallax/Parallax';
import Portfolio from './components/portfolio/Portfolio';
import Preloader from './components/preloader/Preloader';
import { shouldShowIntro } from './components/preloader/intro';
import Services from './components/services/Services';
import { useLang } from './context/LanguageContext';

const App = () => {
  const { t } = useLang();
  const [introDone, setIntroDone] = useState(() => !shouldShowIntro());

  return (
    <>
      <Preloader onDone={() => setIntroDone(true)} />
      <a className="skipLink" href="#contenido">
        {t.a11y.skip}
      </a>
      <Cursor />
      <Navbar />
      <main id="contenido">
        <Hero started={introDone} />
        <Parallax type="services" />
        <Services />
        <Parallax type="portfolio" />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
