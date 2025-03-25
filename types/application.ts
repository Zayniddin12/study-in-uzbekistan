import type { TStatus } from '~/types/components/status'

export interface IApplication {
  photo: {
    file: string
  }
  study_plan_univer: {
    name: string
  }
  id: number
  date: string
  status_display: TStatus
}
