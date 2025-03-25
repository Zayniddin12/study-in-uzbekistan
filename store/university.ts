import { defineStore } from 'pinia'

import type { IUniversity } from '~/types/common'

export const useUniversityStore = defineStore('universityStore', {
  state: () => ({
    single: {} as IUniversity,
    brief: [] as IUniversity[],
    briefPagination: {
      next: null as string | null,
      count: 0,
    },
    briefLoading: {
      list: true,
      more: false,
    },
    briefParams: {
      limit: 10,
      offset: 0,
    },
  }),
  actions: {
    fetchSingle(id: number | string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`/university/universities/${id}/`)
          .then((res) => {
            this.single = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    fetchBrief(params?: { program: number; region?: string }, merge = false) {
      return new Promise((resolve, reject) => {
        if (merge) {
          this.briefLoading.more = true
        } else {
          this.briefLoading.list = true
        }
        useApi()
          .$get(`/university/universities/brief/`, {
            params: {
              ...this.briefParams,
              ...params,
            },
          })
          .then((res) => {
            this.briefPagination.next = res.next
            this.briefPagination.count = res.count
            merge
              ? (this.brief = [...this.brief, ...res.results])
              : (this.brief = res.results)
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.briefLoading.list = false
            this.briefLoading.more = false
          })
      })
    },
    fetchMoreBrief(params?: { program: number; region?: string }) {
      this.briefParams.offset = this.briefParams.limit + this.briefParams.offset
      this.fetchBrief(params, true)
    },
  },
})
