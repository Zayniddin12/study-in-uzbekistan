import { useI18n } from 'vue-i18n'

import type { IApplication } from '~/types/application'
import type { IInfo } from '~/types/components/info'

export const personalInfo = (user: any): IInfo[] => {
  const { t } = useI18n()
  const genderIconClass =
    user?.gender === 'male'
      ? 'icon-Men'
      : user?.gender === 'female'
      ? 'icon-women'
      : ''
  const genderColorClass = user?.gender === 'male' ? 'blue' : 'pink'
  const genderLabel = user?.gender ? t(`${user.gender}`, user.gender) : '-'

  const genderInfo = user?.gender
    ? {
        label: 'gender',
        value: genderLabel,
        valueClass: 'gap-2',
        prefixValue: `<i class="text-xl leading-5 ${genderIconClass} text-${genderColorClass}" />`,
      }
    : {
        label: 'gender',
        value: '-',
      }

  return [
    {
      label: 'last_name',
      value: user?.last_name ?? '-',
    },
    {
      label: 'name',
      value: user?.first_name ?? '-',
    },
    {
      label: 'third_name',
      value: user?.middle_name ?? '-',
    },
    {
      label: 'birth_date',
      value: user?.birth_date ?? '-',
    },
    genderInfo,
    {
      label: 'citizenship',
      value: user?.country?.name ?? '-',
    },
  ]
}

export const contactInfo = (user: any): IInfo[] => {
  const { t } = useI18n()
  return [
    {
      label: 'email',
      labelClass: 'gap-1',
      suffixLabel: `<i class="icon-info text-base leading-4 text-red" />`,
      value: user?.contact_email ?? '-',
      suffixValue: `<span class="text-xs text-blue">${t(
        'confirm_email'
      )}</span>`,
      valueClass: 'gap-1 !items-end',
    },
    {
      label: 'phone',
      value: user?.contact_phone ?? '-',
    },
    {
      label: 'telegram',
      value: user?.contact_telegram ?? '-',
      valueClass: 'gap-2',
      prefixValue: `<span class="icon-contact-telegram text-xl leading-5 text-blue" />`,
    },
    {
      label: 'whatsapp',
      value: user?.contact_whatsapp ?? '-',
      valueClass: 'gap-2',
      prefixValue: `<span class="icon-contact-whatsup text-xl leading-5 text-green-100" />`,
    },
  ]
}

export const eduSkills = (user: any): IInfo[] => {
  return [
    {
      label: 'level_education_available',
      value: user?.edu_degree?.name ?? '-',
    },
    {
      label: 'country_graduated_education',
      value: user?.edu_country?.name ?? '-',
    },
    {
      label: 'name_education_block',
      value: user?.edu_place ?? '-',
    },
    {
      label: 'start_of_end',
      value: user.edu_started_year ?? '-',
    },
    {
      label: 'date_of_end',
      value: user.edu_finished_year ?? '-',
    },
    {
      label: 'mother_language',
      value: user?.native_lang?.name ?? '-',
    },
    {
      label: 'language',
      value: user?.english_level ?? '-',
    },
  ]
}

export const ENGLISH_LEVELS = () => {
  const { t } = useI18n()
  return [
    {
      id: 1,
      name: t('english_levels.basic'),
    },
    {
      id: 2,
      name: t('english_levels.intermediate'),
    },
    {
      id: 3,
      name: t('english_levels.advanced'),
    },
  ]
}

export const whereStudy = (user: any): IInfo[] => {
  return [
    {
      label: 'level_of_education',
      value: user?.study_plan_degree?.name ?? '-',
    },
    {
      label: 'additional_education',
      value: user?.study_plan_year ?? '-',
    },
    {
      label: 'plan_year_enter',
      value: user?.study_plan_year ?? '-',
    },
    // {
    //     label: 'program',
    //     value: 'Подготовительные отделения',
    // },
  ]
}

export const formEducation = (user: any): IInfo[] => {
  return [
    {
      label: 'education_form',
      value: user?.study_plan_form_display ?? '-',
    },
    {
      label: 'areas_of_training',
      value: user?.study_plan_univer_direction?.name ?? '-',
    },
  ]
}
//
// const formLabel = (() => {
//     switch (studyPlanForm) {
//         case 1:
//             return 'Full time';
//         case 2:
//             return 'Part time';
//         case 3:
//             return 'EXtraumal';
//         case 4:
//             return 'Remote';
//         default:
//             return '-';
//     }
// }

export const motiveLetter = (user: any): IInfo => {
  return {
    label: 'letter',
    value: user?.motivational_letter ?? '-',
  }
}

export const applicationList: IApplication[] = [
  {
    title:
      'Ташкентский университет информационных технологий имени Мухаммада Аль-Хорезми',
    id: 160254,
    date: new Date().toDateString(),
    status: 'in_moderation',
    avatar: 'https://picsum.photos/200/200',
  },
  {
    title: 'Самаркандская институт экономики и сервиса ',
    id: 12332,
    date: new Date().toDateString(),
    status: 'accepted',
    avatar: 'https://picsum.photos/200/200',
  },
]

export const englishLevelsEnum = ['basic', 'intermediate', 'advanced']
