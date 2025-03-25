import { defineStore } from 'pinia'

import type { IScholarship, IScholarshipResponse } from '~/types/university'

export const useScholarshipStore = defineStore('scholarshipStore', {
  state: () => ({
    scholarshipList: [] as IScholarship[],
    count: 0,
    isLoading: true,
  }),
  actions: {
    fetchScholarshipList(
      page?: number,
      limit = 16,
      additionalParams?: Record<string, unknown>
    ) {
      return new Promise((resolve, reject) => {
        const params = { limit, page, ...additionalParams }
        useApi()
          .$get<IScholarshipResponse>(`university/scholarships/`, {
            params,
          })
          .then((res) => {
            this.scholarshipList = res.results
            this.count = res.count
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.isLoading = false))
      })
    },
  },
})
