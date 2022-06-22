import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { commonEN } from '@ms7/i18n'
import translationEN from 'Guide/assets/locales/en/translation.json'
import { commonPL } from '@ms7/i18n'
import translationPL from 'Guide/assets/locales/pl/translation.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translationEN,
            },
            pl: {
                translation: translationPL,
            },
        },
        load: 'languageOnly',
        debug: true,
        fallbackLng: 'pl',
        interpolation: {
            escapeValue: false, // not needed, react escapes by default
        },
    }).then()

i18n.addResourceBundle('en', 'common', commonEN)
i18n.addResourceBundle('pl', 'common', commonPL)

export default i18n