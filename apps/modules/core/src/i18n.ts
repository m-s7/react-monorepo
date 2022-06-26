import i18next, { Resource } from 'i18next'
import { getDefaultI18n } from '@ms7/i18n'
import translationEN from 'Core/assets/locales/en/translation.json'
import translationPL from 'Core/assets/locales/pl/translation.json'

const resources: Resource = {
    en: { translation: translationEN },
    pl: { translation: translationPL },
}

const i18n = getDefaultI18n(i18next.createInstance(), resources)

export default i18n
