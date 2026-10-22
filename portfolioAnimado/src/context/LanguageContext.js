import { createContext, useContext } from 'react';

export const LanguageContext = createContext(null);

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used inside LanguageProvider');
  }
  return context;
};
