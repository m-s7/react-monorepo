import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import commonEN from '@/assets/locales/en/common.json'
import translationEN from '@/assets/locales/en/translation.json'
import commonPL from '@/assets/locales/pl/common.json'
import translationPL from '@/assets/locales/pl/translation.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: commonEN,
                translation: translationEN,
            },
            pl: {
                common: commonPL,
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

export default i18n