import i18n from 'i18next';
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n.use(HttpApi)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init<HttpBackendOptions>({
        partialBundledLanguages: true,
        keySeparator: '.',
        interpolation: {
            escapeValue: false
        },
        detection: {
            lookupLocalStorage: 'lang',
            lookupSessionStorage: 'lang',
        },
        backend: {
            loadPath: '/api/translations/lang/{{lng}}',
            crossDomain: true,
        }
    });

export default i18n;
