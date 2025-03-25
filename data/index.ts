import { useI18n } from 'vue-i18n'

export const whyUzbekistanData = [
  {
    title: 'Преимущества',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны, включая ее язык, музыку, кухню и искусство.',
    link: 'https://www.google.com/',
    image: '/images/fake/image-fake.png',
  },
  {
    title: 'Преимущества',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны, включая ее язык, музыку, кухню и искусство.',
    link: 'https://www.google.com/',
    image: '/images/fake/image-fake.png',
  },
  {
    title: 'Преимущества',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны, включая ее язык, музыку, кухню и искусство.',
    link: 'https://www.google.com/',
    image: '/images/fake/image-fake.png',
  },
]

export const inNumbers = (number: any) => {
  const { t } = useI18n()
  return [
    {
      title: number?.universities_count_title,
      description: number?.universities_count_description,
      count: number?.universities_count ?? 0,
      icon: 'icon-building-2',
    },
    {
      title: number?.migrant_students_title,
      description: number?.migrant_students_description,
      count: number?.migrant_students_count ?? 0,
      isK: number?.migrant_students_count ?? 0 > 1000,
      icon: 'icon-users-group',
    },
    {
      title: number?.universities_programs_count_title,
      description: number?.universities_programs_count_description,
      count: number?.universities_program ?? 0,
      icon: 'icon-ranking',
    },
  ]
}

export const reviews = [
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      '20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста. 20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. 20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана 20 мая в Венеции открылась 18-я Венецианская архитектурная биеннале, на которой национальный‌ павильон Узбекистана Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
  {
    review:
      'Очень круто. Я учусь в Великобритании в течение 4 лет через этот проект. Обучение в Узбекистане может предложить много возможностей для личного и академического роста.',
    full_name: 'Шохрух Бахтияров',
    avatar: '/images/fake/samarkand.png',
    address: 'Баку, Азербайджан',
  },
]

export const studyInUzbekistanData = [
  // {
  //   title: 'Олимпиады',
  //   description:
  //     'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
  //   image: '/images/fake/samarkand.png',
  //   link: '/why-uzbekistan/olympics',
  // },
  {
    title: 'Зимние и летние школы',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/winter-summer-colleges',
  },
  {
    title: 'Подготовительные отделения',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/winter-summer-colleges',
  },
  {
    title: 'Бакалавриат или специалитет',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/news/1',
  },
  {
    title: 'Магистратура',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/news/1',
  },
  {
    title: 'Аспирантура',
    description:
      'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
    image: '/images/fake/samarkand.png',
    link: '/why-uzbekistan/news/1',
  },
]
