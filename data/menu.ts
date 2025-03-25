import { useI18n } from 'vue-i18n'

import type { TMenu } from '~/types/menu'

export type Links = {
  id: number
  text: string
  url: string
  name: TMenu | string
}
export const menuLinks = (): Array<Links> => {
  const { t } = useI18n()

  return [
    {
      id: 1,
      text: t('why_uzbekistan'),
      url: '/why-uzbekistan',
      name: 'why_uzbekistan',
    },
    {
      id: 2,
      text: t('programs_and_universities'),
      url: '/programs-and-universities',
      name: 'programs_universities',
    },
    {
      id: 3,
      text: t('entry_procedure'),
      url: '/entry-procedure',
      name: 'entry_procedure',
    },
    {
      id: 4,
      text: t('about_project'),
      url: '/about-project',
      name: 'about',
    },
  ]
}
