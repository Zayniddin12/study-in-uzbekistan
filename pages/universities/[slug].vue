<template>
  <div>
    <div id="otm_breadcrumb" class="max-lg:hidden"></div>
    <div
      class="lg:container flex flex-col lg:grid grid-cols-12 lg:gap-6 lg:mt-6 lg:mb-10"
    >
      <div class="col-span-3 max-lg:order-last">
        <SectionsUniversitySidebar v-bind="{ single }" />
      </div>
      <div class="col-span-9">
        <SectionsUniversityHeader
          :card="{
            title: single?.name,
            avatar: single?.logo,
            background: single?.banner,
          }"
          :list="universityTabsList"
          v-bind="{ active }"
          :initial="initialActive"
          @on-tab-change="onTabChange"
        >
          <NuxtPage />
        </SectionsUniversityHeader>
        <div
          v-if="route.params.program"
          class="step-shadow w-full rounded-2xl bg-white px-4 lg:px-6 py-3 lg:py-4 mt-5 flex flex-col md:flex-row sm:justify-end"
        >
          <UIButton
            :text="$t('send_to_apply_edu')"
            class="w-full sm:w-auto"
            @click="getVuzId"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { universityTabsList } from '~/data/university'
import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'
import { useUniversityStore } from '~/store/university'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const universityStore = useUniversityStore()
const authStore = useAuthStore()
const { $event } = useNuxtApp()

const single = computed(() => universityStore.single)

const active = computed(() => {
  const tab = route.name?.split('-')[2]
  return tab || universityTabsList[0].value
})

const initialActive = computed(() => {
  const foundData = universityTabsList?.find(
    (item) => item.value === active.value
  )

  // find index and return
  return foundData ? universityTabsList.indexOf(foundData) : 0
})

universityStore.fetchSingle(route.params.slug)

const { data } = await useAsyncData('fetchSingleUniversity', () =>
  useApi().$get(`/university/universities/${route.params.slug}/`)
)

const store = cabinetStore()

function getVuzId() {
  store.setProgramId(String(route.params.program))

  // check auth
  if (Object.keys(authStore.user).length === 0) {
    return $event('open-auth', 'login')
  }

  router.push('/profile/edit')
}

useSeoMeta({
  title: data?.value?.name,
  description: data?.value?.student_success_text,
  twitterTitle: data?.value?.title,
  twitterDescription: data?.value?.student_success_text,
  ogTitle: data?.value?.name,
  ogDescription: data?.value?.student_success_text,
  ogImage: data?.value?.banner,
  twitterImage: data?.value?.banner,
})

const onTabChange = (tab: string) => {
  router.push(`/universities/${route.params.slug}/${tab}`)
}
</script>

<style scoped>
.router-link-active {
  color: #0067ff;
}
</style>
