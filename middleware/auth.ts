import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { $event } = useNuxtApp()
  const tokens = authStore.getTokens()
  if (!tokens.access || !tokens.refresh) {
    $event('open-required')
    return navigateTo('/', { redirectCode: 301 })
  }
  // await authStore.refreshTokens()
  // return abortNavigation()
})
