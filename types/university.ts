import type { IResponse } from '~/types/common'

export interface IUniversity {
  id: number
  name: string
}

export interface IScholarship {
  id: number
  name: string
  money_per_period?: string
  currency?: string
  money_period?: string
  money_period_display?: string
  university: IUniversity
  edu_type?: string
}

export interface IUniversityMap {
  id: number
  name: string
  location: string
  logo: string
  latitude?: string
  longitude?: string
}

export interface IScholarshipResponse extends IResponse<IScholarship> {}
