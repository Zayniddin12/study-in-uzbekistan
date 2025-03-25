import { isJwtExpired } from 'jwt-check-expiration'
import type { NitroFetchRequest } from 'nitropack'
import type { FetchOptions } from 'ofetch'

import { useCustomToast } from '~/composables/useCustomToast'
import { useAuthStore } from '~/store/auth'
import { errorHandler } from '~/utils'

export const useApi = (apiUrl?: string) => {
  const baseURL = apiUrl || (import.meta.env.VITE_API_BASE_URL as string)
  const locale = useCookie('locale')
  const loading = ref(false)
  const refresh = useCookie('refresh_token')
  const headers = {}
  const isExpired = ref(false)
  const retryCount = ref(0)
  const store = useAuthStore()
  const token = useCookie('access_token')
  const { showToast } = useCustomToast()
  if (token.value) {
    isExpired.value = isJwtExpired(token.value)
    Object.assign(headers, {
      Authorization: 'Bearer ' + token.value || store.accessToken,
    })
  }
  function $service(options?: FetchOptions) {
    return $fetch.create({
      ...options,
      baseURL,
      timeout: 5000,
      headers: {
        ...options?.headers,
        'Accept-Language': locale.value || 'en',
        ...headers,
      },
      onResponseError({ response: { status } }): Promise<void> | void {
        if (status === 401 || status === 403) {
          token.value = undefined
          Object.assign(headers, {
            Authorization: undefined,
          })
          store.logOut()
        }
      },
    })
  }
  function $get<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      $service(options)(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (
            error.response?.status !== 401 &&
            error.response?.status !== 403
          ) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $post<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'POST' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (
            error.response?.status !== 401 &&
            error.response?.status !== 403
          ) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $put<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PUT' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (
            error.response?.status !== 401 &&
            error.response?.status !== 403
          ) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $patch<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PATCH' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status !== 401 && error.response.status !== 403) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $delete<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'DELETE' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status !== 401 && error.response.status !== 403) {
            if (errorHandler(error.response)) {
              showToast(errorHandler(error.response) as string, 'error')
            }
          }
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    loading,
    baseURL,
    $get,
    $post,
    $put,
    $patch,
    $delete,
  }
}
