import { defineStore } from 'pinia'

import type {
  TAuthTokens,
  TCheckEmailData,
  TRequestOtpData,
} from '~/types/auth'
import type { IUser } from '~/types/profile'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {} as IUser,
    accessToken: '',
    refreshToken: '',
    requestOtpData: {} as TRequestOtpData,
  }),
  actions: {
    async authInit() {
      this.getTokens()
      if (!this.accessToken && !this.refreshToken) {
        return
      }
      try {
        if (this.refreshToken) {
          await this.tokenRefresher(this.refreshToken)
          await this.getProfile()
        }
      } catch (e) {}
    },
    getProfile() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`/cabinet/profile/`)
          .then((res) => {
            this.user = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    setTokens(payload: TAuthTokens) {
      if (payload?.access) {
        const access = useCookie('access_token')
        access.value = payload.access
        this.accessToken = payload.access
      }
      if (payload?.refresh) {
        const refresh = useCookie('refresh_token')
        refresh.value = payload.refresh
        this.refreshToken = payload.refresh
      }
    },
    getTokens() {
      const access = useCookie('access_token')
      const refresh = useCookie('refresh_token')
      this.accessToken = access.value
      this.refreshToken = refresh.value
      return { access: access.value, refresh: refresh.value }
    },
    tokenRefresher(token: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/common/auth/login/refresh/', {
            body: {
              refresh: token,
            },
          })
          .then((res) => {
            this.setTokens(res)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    login(payload: Record<string, unknown>) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/common/auth/login/', {
            body: {
              ...payload,
            },
          })
          .then(async (res) => {
            await this.setTokens(res)
            await this.getProfile()
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    logOut() {
      const $route = useRoute()
      const $router = useRouter()
      if ($route.path.includes('/profile')) {
        $router.push('/')
      }
      this.user = {} as IUser
      this.accessToken = ''
      this.refreshToken = ''
      const access = useCookie('access_token')
      access.value = null
      const refresh = useCookie('refresh_token')
      refresh.value = null
    },
    checkAccount(email: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<TCheckEmailData>('/common/auth/check-account/', {
            params: {
              email,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    requestOtp(email: string) {
      return new Promise((resolve, reject) => {
        const secret = useCookie('client_secret_id')
        useApi()
          .$post<TRequestOtpData>('/verification/request-otp/', {
            body: {
              type: 'email',
              address: email,
              purpose: 'reset_password',
              client_secret: secret.value,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    submitOtp(otp: number) {
      const secret = useCookie('client_secret_id')
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/verification/submit-otp/', {
            body: {
              sid: this.requestOtpData.sid,
              client_secret: secret.value,
              otp,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    resetPassword(password: string) {
      const secret = useCookie('client_secret_id')
      return new Promise((resolve, reject) => {
        useApi()
          .$post('/common/auth/password/reset/', {
            body: {
              verification: {
                sid: this.requestOtpData.sid,
                client_secret: secret.value,
              },
              password,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
