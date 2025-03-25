export interface IResponse<T = unknown> {
  count: number
  next: string | null
  previous: null | string
  results: T[]
}

export interface ICountry {
  id: number
  name: string
  code: string
}

export interface ILanguages {
  code: string
  name: string
}

export interface IFooter {
  id: number
  title: string
  url: string
  links: []
}

export interface INews {
  id: number
  title: string
  short_description: string
  banner: string
  published_at: string
  views_count: number
}

export interface ILivingCondition {
  id: number
  title: string
  short_description: string
  banner: string
  body_html: string
}

export interface INewsResponse extends IResponse<INews> {}

export interface ICommonPageSingle {
  body_editorjs: {
    time: number
    blocks: [
      {
        id: number
        data: {
          text: string
        }
        type: string
      }
    ]
    version: string
  }
  body_html: string
}

export interface INewsSingle extends INews, ICommonPageSingle {}

export interface IStaticPageSingle {
  id: number
  title: string
  banner: string
  body_editorjs: {
    time: number
    blocks: [
      {
        id: number
        data: {
          text: string
        }
        type: string
      }
    ]
    version: string
  }
  body_html: string
}

export interface IUniversity {
  id: number
  name: string
  type: string
  type_display: string
  phone: string
  tg_whatsapp_phone: string
  email: string
  website: string
  region: {
    id: number
    name: string
  }
  address: string
  latitude: number
  longitude: number
  logo: string
  banner: string
  foundation_year: number
  students_count: number
  migrant_students_count: number
  faculties_count: number
  departments_count: number
  study_forms: number[]
  study_forms_display: string
  teachers_count: number
  professors_count: number
  associate_professors_count: number
  science_doctors_count: number
  science_candidates_count: number
  foreign_teachers_count: number
  main_programs: {
    count: number
    by_degree: {
      degree: string
      count: number
    }[]
  }
  extra_programs: {
    count: number
    by_type: {
      type: string
      count: number
    }[]
  }
  about_editorjs: any
  student_success_text: string
  conditions_for_foreign_students_editorjs: any
  international_partnership_editorjs: any
  media: string[]
}

export interface IProfileAndCabinet {
  user_id: number
  photo: string
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  gender: string
  country: number
  contact_email: string
  contact_phone: string
  contact_telegram: string
  contact_whatsapp: string
  edu_degree: string
  edu_country: number
  edu_place: string
  edu_finished_year: number
  edu_started_year: number | string
  native_lang: string
  native_lang_text: string
  english_level: string
  english_level_display: string
  study_plan_degree: string
  study_plan_degree_extra: string
  study_plan_year: string
  study_plan_univer: string
  study_plan_univer_direction: string
  study_plan_form: string
  study_plan_form_display: string
  motivational_letter: string
}

export interface IWhyUzbSlider {
  id: number
  title: string
  short_description: string
  banner: string
  url: string
}

export interface IStats {
  universities_count: number
  migrant_students_count: number
  universities_with_high_ranking_count: number
}

export interface IReview {
  id: number
  author_name: string
  author_country: string
  author_region: string
  photo: string
  content: string
}

export interface IMoveList {
  id: number
  title: string
  short_description: string
  icon: string
  url: string
}

export interface IMenistryTeam {
  id: number
  full_name: string
  photo: string
  ministry: string
  position: string
  phone: string
  email: string
  about: string
  body_html: string
  latitude: number
  region_id: number
  ustav: string
}

export interface IExplorePlaces {
  id: number
  title: string
  type: string
  type_display: string
  phone: string
  tg_whatsapp_phone: string
  email: string
  website: string
  region: {
    id: number
    name: string
  }
  address: string
  latitude: number
  longitude: number
  logo: string
  banner: string
  foundation_year: number
  students_count: number
  migrant_students_count: number
  faculties_count: number
  departments_count: number
  study_forms: number[]
  study_forms_display: string
  teachers_count: number
  professors_count: number
  associate_professors_count: number
  science_doctors_count: number
  science_candidates_count: number
  foreign_teachers_count: number
  main_programs: {
    count: number
    by_degree: {
      degree: string
      count: number
    }[]
  }
  extra_programs: {
    count: number
    by_type: {
      type: string
      count: number
    }[]
  }
  about_editorjs: any
  student_success_text: string
  conditions_for_foreign_students_editorjs: any
  international_partnership_editorjs: any
  media: string[]
  airports_count: number
  libraries_count: number
  museums_count: number
  population: number
  universities_count: number
  railway_stations_count: number
}

export interface IBanner {
  id: number
  title: string
  colored_word: string
  description: string
  image: string
}

export interface ISteps {
  step_title: string
  step_description: string
  step_url: string
  step1_title: string
  step1_description: string
  step1_url: string
  step2_title: string
  step2_description: string
  step2_url: string
  step3_title: string
  step3_description: string
  step3_url: string
  step4_title: string
  step4_description: string
  step4_url: string
  step5_title: string
  step5_description: string
  step5_url: string
}

export interface IStudyType {
  id: number
  name: string
}
export interface IStudyPeriod {
  id: number
  name: string
}

export interface IgetTitles{
  uzbekistan_text:string
  uzbekistan_subtext:string
  uzbekistan_learning:string
}
