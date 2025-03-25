<template>
  <div class="relative overflow-y-hidden h-screen w-full">
    <LayoutsHeader />
    <div class="container h-screen relative flex items-center">
      <div class="main__content relative ml-20">
        <p class="title">
          {{ $t('not_found') }}
        </p>
        <p class="subtitle">{{ $t('temporarily_unavailable') }}</p>
        <NuxtLink to="/">
          <UIButton
            class="px-14 py-3"
            variant="primary"
            :text="$t('back_to_home')"
          ></UIButton>
        </NuxtLink>
      </div>
      <div class="error_img absolute">
        <img src="/images/img.png" alt="404" />
      </div>
    </div>
    <ModalAuth :key="state" v-bind="{ show, state }" @close="show = false" />
  </div>
</template>

<script setup>
import { useClientSecret } from '~/composables/useClientSecret'
import { useAuthStore } from '~/store/auth'
import { useCommonStore } from '~/store/common'

const route = useRoute()
const store = useAuthStore()
const commonStore = useCommonStore()
const { init } = useClientSecret()
defineProps(['error'])
const { $listen } = useNuxtApp()

const show = ref(false)
const state = ref('login')

$listen('open-auth', (e) => {
  state.value = e
  commonStore.fetchCountries().then(() => {
    show.value = true
  })
})
const data = useAsyncData('init', async () => await store.authInit())
onMounted(() => {
  if (process.client) {
    init()
  }
})

if ('setup' in route.query) {
  throw new Error('error in setup')
}
if ('mounted' in route.query) {
  onMounted(() => {
    throw new Error('error in mounted')
  })
}
</script>

<style scoped>
header {
  top: 0;
  background: white;
}
.title {
  color: #0f29a4;
  font-size: 56px;
  font-style: normal;
  font-weight: 900;
  line-height: 120%;
  font-family: 'MTS';
}
.main__content {
  width: 571px;
  align-content: start;
  margin-left: 100px;
}
.subtitle {
  color: #181818;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin: 16px 0 52px 0;
  width: 479px;
}
.error_img {
  margin-bottom: -79px;
  right: 14px;
}
@media screen and (max-width: 768px) {
  .title {
    font-size: 36px;
  }
  .main__content {
    width: 100%;
    margin-left: 0;
    z-index: 20;
  }
  .subtitle {
    width: 100%;
  }
}
</style>
