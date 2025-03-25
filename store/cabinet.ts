import { defineStore } from 'pinia'

import type { IProfileAndCabinet } from '~/types/common'

export const cabinetStore = defineStore('cabinetStore', {
  state: () => ({
    cabinetList: [] as IProfileAndCabinet[],
    cabinetApplication: [] as IProfileAndCabinet[],
    cabinetApplicationCount: 0,
    cabinetApplicationLoading: true,
    programId: '',
    step: 0,
  }),
  actions: {
    fetchCabinet() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`cabinet/profile/`)
          .then((res: any) => {
            this.cabinetList = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    fetchCabinetApplication(page: number) {
      return new Promise((resolve, reject) => {
        this.cabinetApplicationLoading = true
        useApi()
          .$get(`cabinet/applications/`, {
            params: {
              offset: page * 10 - 10,
              limit: 10,
            },
          })
          .then((res: any) => {
            this.cabinetApplication = res.results
            this.cabinetApplicationCount = res.count
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.cabinetApplicationLoading = false
          })
      })
    },
    setProgramId(payload: string) {
      this.programId = payload
    },
  },
})
