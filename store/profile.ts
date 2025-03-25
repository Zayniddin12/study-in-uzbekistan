import type { ICountry, IResponse } from '~/types/common'
import type {
  EducationDegrees,
  IEducationDirections,
  ImageUploader,
  IProfileFeatures,
  IUser,
} from '~/types/profile'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    educationDegrees: [] as EducationDegrees[],
    educationDirections: [] as IEducationDirections[],
    educationDegreesLoading: true,
    imageId: '',
    countriesCount: 0,
    educationSearch: '',
    directions: {
      list: [] as EducationDegrees[],
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
  }),

  actions: {
    fetchEducationDegrees(params?: {
      search: string
      id: string
      limit: number
      offset: number
    }) {
      return new Promise((resolve, reject) => {
        if (this.educationDegrees.length) {
          resolve(this.educationDegrees)
        } else {
          this.educationDegreesLoading = true
          useApi()
            .$get<IResponse<EducationDegrees>>('/common/education-degrees/', {
              params,
            })
            .then((res) => {
              this.educationDegrees = res.results
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              this.educationDegreesLoading = false
            })
        }
      })
    },

    fetchEducationDirections(force?: boolean, merge = false) {
      return new Promise((resolve, reject) => {
        if (this.directions.list.length && !merge && !force) {
          resolve(this.directions)
        } else {
          if (merge) {
            this.directions.loading.more = true
          } else {
            this.directions.loading.list = true
          }
          useApi()
            .$get<IResponse<EducationDegrees>>(
              '/common/school_program_directions/',
              {
                params: this.directions.params,
              }
            )
            .then((res) => {
              this.directions.pagination.next = res.next
              if (merge) {
                this.directions.list = [...this.directions.list, ...res.results]
              } else {
                this.directions.list = res.results
              }
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => {
              this.directions.loading.list = false
              this.directions.loading.more = false
            })
        }
      })
    },

    moreDirections() {
      this.directions.params.offset =
        this.directions.params.limit + this.directions.params.offset
      this.fetchEducationDirections(false, true)
    },

    saveProfile(profile: IProfileFeatures): Promise<IUser> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IUser>('/cabinet/profile/save/', { body: profile })
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
    },

    async submitProfile(profileFeatures: IProfileFeatures) {
      // return new Promise((resolve, reject) => {
      const token = useCookie('access_token')
      return await fetch(
        import.meta.env.VITE_API_BASE_URL + 'cabinet/applications/submit/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.value,
          },
          body: JSON.stringify(profileFeatures),
        }
      )
      // useApi()
      //   .$post<IProfileFeatures>('/cabinet/applications/submit/', {
      //     body: profileFeatures,
      //   })
      //   .then((res) => {
      //     resolve(res)
      //   })
      //   .catch((err) => reject(err))
      // })
    },

    uploadProfileImage(image: File | string): Promise<ImageUploader> {
      const formData = new FormData()
      formData.append('file', image)

      return new Promise((resolve, reject) => {
        useApi()
          .$post<ImageUploader>('/common/file-upload/', {
            body: formData,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err))
      })
    },
  },
})
