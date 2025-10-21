import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ru: {
    translation: {
      greeting: 'Добро пожаловать, семья!',
      security: 'Данные защищены',
      searchPlaceholder: 'Искать дела, документы, ведомства...'
    }
  },
  en: {
    translation: {
      greeting: 'Welcome, family!',
      security: 'Data secured',
      searchPlaceholder: 'Search cases, documents, agencies...'
    }
  },
  nl: {
    translation: {
      greeting: 'Welkom, familie!',
      security: 'Gegevens beveiligd',
      searchPlaceholder: 'Zoek zaken, documenten, instanties...'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
