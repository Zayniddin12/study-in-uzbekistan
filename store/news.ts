import { defineStore } from 'pinia'

import type { INews, INewsResponse } from '~/types/common'

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    newsList: [] as INews[],
    count: 0,
    isLoading: true,
  }),
  actions: {
    fetchNewsList(
      page?: number,
      size = 16,
      additionalParams?: Record<string, unknown>
    ) {
      return new Promise((resolve, reject) => {
        const params = { page_size: size, page, ...additionalParams }
        useApi()
          .$get<INewsResponse>(`common/news/`, {
            params,
          })
          .then((res) => {
            this.newsList = res.results
            this.count = res.count
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => (this.isLoading = false))
      })
    },
  },
})
