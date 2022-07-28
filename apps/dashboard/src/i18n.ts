import i18next, { Resource } from 'i18next'
import translationEN from '@/assets/locales/en/translation.json'
import translationPL from '@/assets/locales/pl/translation.json'
import { getDefaultI18n } from '@ms7/i18n'

const resources: Resource = {
    en: { translation: translationEN },
    pl: { translation: translationPL },
}

const i18n = getDefaultI18n(i18next.createInstance(), resources)

export default i18n