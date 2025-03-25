import { defineStore } from 'pinia'

import type {
  ICountry,
  ILanguages,
  IResponse,
  IUniversity,
} from '~/types/common'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    countries: {
      list: [] as ICountry[],
      search: [] as ICountry[],
      pagination: {
        next: null as string | null,
        count: 0,
      },
      params: {
        limit: 10,
        offset: 0,
        search: undefined as string | undefined,
      },
      loading: {
        list: true,
        more: false,
      },
    },
    languages: [] as ILanguages[],
    universities: [] as IUniversity[],
    headerTitles: {
      about: {
        about_project_title: '',
        about_project_description: '',
        about_project_icon: '',
      },
      why_uzbekistan: {
        why_uzbekistan_title: '',
        why_uzbekistan_description: '',
      },
    },
  }),
  actions: {
    fetchCountries(force?: boolean, merge = false) {
      return new Promise((resolve, reject) => {
        if (this.countries.list.length && !merge && !force) {
          resolve(this.countries)
        } else {
          if (merge) {
            this.countries.loading.more = true
          } else {
            this.countries.loading.list = true
          }
          useApi()
            .$get<IResponse<ICountry>>('/common/countries/', {
              params: this.countries.params,
            })
            .then((res) => {
              this.countries.pagination.next = res.next
              if (merge) {
                this.countries.list = [...this.countries.list, ...res.results]
              } else {
                this.countries.list = res.results
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              this.countries.loading.list = false
              this.countries.loading.more = false
            })
        }
      })
    },

    moreCountries() {
      this.countries.params.offset =
        this.countries.params.limit + this.countries.params.offset
      this.fetchCountries(false, true)
    },

    fetchLanguages(params?: { limit: number; offset: number; search: string }) {
      return new Promise((resolve, reject) => {
        if (this.languages.length) {
          resolve(this.languages)
        } else {
          useApi()
            .$get<IResponse<ILanguages>>('/common/languages/', {
              params,
            })
            .then((res) => {
              this.languages = res.results
            })
            .catch((err) => {
              reject(err)
            })
        }
      })
    },

    fetchUniversities(params?: {
      limit: number
      offset: number
      search: string
      country: string
    }) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IUniversity>>('/common/universities/global/', {
            params,
          })
          .then((res) => {
            this.universities = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
