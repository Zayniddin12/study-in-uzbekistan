import { useI18n } from 'vue-i18n'

export const useLanguageSwitcher = () => {
  const { locale } = useI18n()

  const languagesList = [
    {
      name: "O'zbekcha",
      code: 'uz',
      flag: '/images/svg/flag/uz.svg',
    },
    {
      name: 'English',
      code: 'en',
      flag: '/images/svg/flag/en.svg',
    },
    {
      name: 'Русский',
      code: 'ru',
      flag: '/images/svg/flag/ru.svg',
    },
    {
      name: 'German',
      code: 'de',
      flag: '/images/svg/flag/de.svg',
    },

    {
      name: 'French',
      code: 'fr',
      flag: '/images/svg/flag/fr.svg',
    },
    {
      name: 'Spanish',
      code: 'es',
      flag: '/images/svg/flag/es.svg',
    },
  ]

  const currentLanguage = computed(() =>
    languagesList.find((lang) => lang.code === locale.value)
  )

  function changeLocale(_locale: string) {
    useCookie('locale').value = _locale
    locale.value = _locale
    window.location.reload()
  }

  return { currentLanguage, languagesList, changeLocale }
}
