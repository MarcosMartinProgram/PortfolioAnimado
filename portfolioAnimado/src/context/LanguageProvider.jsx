import { useEffect, useMemo, useState } from 'react';
import { content } from '../content';
import { LanguageContext } from './LanguageContext';

const getInitialLang = () => {
  const saved = localStorage.getItem('mm-lang');
  if (saved === 'es' || saved === 'en') return saved;
  const browserLang = navigator.language ? navigator.language.toLowerCase() : 'en';
  return browserLang.startsWith('es') ? 'es' : 'en';
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    localStorage.setItem('mm-lang', lang);
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      t: content[lang],
      toggleLang: () => setLang((prev) => (prev === 'es' ? 'en' : 'es')),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
