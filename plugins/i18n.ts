import { createI18n } from 'vue-i18n'

import en from '@/i18n/en.json'
import ru from '@/i18n/ru.json'
import ca from '@/i18n/uk.json'
import uz from '@/i18n/uz.json'
import es from '@/i18n/es.json'
import fr from '@/i18n/fr.json'
import de from '@/i18n/de.json'

const messages = {
  uz,
  ru,
  en,
  ca,
  es,
  de,
  fr
}
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: useCookie('locale').value ?? 'en',
    messages,
  })

  vueApp.use(i18n)
})
