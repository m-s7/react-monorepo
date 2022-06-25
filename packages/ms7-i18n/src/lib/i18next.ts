import { i18n, Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import commonEN from './locales/en/common.json' assert { type: 'json' }
import commonPL from './locales/pl/common.json' assert { type: 'json' }

export const getDefaultI18n = (i18nInstance: i18n, resources: Resource): i18n => {
    i18nInstance
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources,
            load: 'languageOnly',
            debug: process.env.NODE_ENV === 'development',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false, // not needed, react escapes by default
            },
        }).then()

    i18nInstance.addResourceBundle('en', 'translation', commonEN)
    i18nInstance.addResourceBundle('pl', 'translation', commonPL)

    return i18nInstance
}
