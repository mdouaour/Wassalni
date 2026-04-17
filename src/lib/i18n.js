import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en';
import fr from '../locales/fr';

const savedLang = localStorage.getItem('wasalni_lang');
const browserLang = navigator.language?.startsWith('fr') ? 'fr' : 'en';

i18n.use(initReactI18next).init({
  resources: { en, fr },
  lng: savedLang || browserLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
