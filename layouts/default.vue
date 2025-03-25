<template>
  <div>
    <UITest />
    <LayoutsHeader />
    <div class="min-h-[calc(100vh-108px)]">
      <slot />
    </div>
    <LayoutsFooter />
    <!--    <ModalAuth v-bind="{ show, state }" @close="show = false" />-->
    <!--    <LayoutsLoader />-->
  </div>
</template>
<script setup lang="ts">
// import { useCommonStore } from '~/store/common'
//
// const router = useRouter()
// const { $listen } = useNuxtApp()
// const store = useCommonStore()
//
// const show = ref(false)
// const state = ref('login')
// $listen('open-auth', (e) => {
//   show.value = true
//   store.fetchCountries()
//   router.replace({ query: { verified: undefined } })
// })
enum ESTATE {
  login = 'login',
  register = 'register',
  password = 'password',
}
</script>
