import { defineStore } from 'pinia'

import type { ILivingCondition, INewsResponse } from '~/types/common'

export const useLivingConditionStore = defineStore('livingConditions', {
  state: () => ({
    livingConditions: [] as ILivingCondition[],
    count: 0,
    isLoading: true,
  }),
  actions: {
    fetchConditionList(
      page?: number,
      size = 12,
      additionalParams?: Record<string, unknown>
    ) {
      return new Promise((resolve, reject) => {
        const params = { page_size: size, page, ...additionalParams }

        useApi()
          .$get<INewsResponse>(`common/living-conditions/`, {
            params,
          })
          .then((res) => {
            this.livingConditions = res.results
            this.count = res.count
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.isLoading = false))
      })
    },
    changeLoadingState() {
      this.isLoading = true
    },
  },
})
