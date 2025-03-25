<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbMenus" />

    <div class="pt-8 pb-16">
      <div class="max-w-[782px] w-full mx-auto">
        <h2 class="heading-1">
          {{ data?.name }}
        </h2>

        <div
          class="p-3 bg-gray-200 grid md:grid-cols-2 gap-4 mt-4 rounded-[10px] mb-6"
        >
          <div class="flex items-center">
            <div
              class="p-1.5 w-8 h-8 bg-blue rounded-md flex items-center justify-center"
            >
              <i class="icon-money text-white"></i>
            </div>
            <p
              class="text-dark flex items-center ml-3 font-bold leading-132 uppercase text-sm md:text-base"
            >
              {{ data?.money_per_period }} /
              <span class="inline-block ml-1 font-normal text-sm lowercase">{{
                data?.money_period_display
              }}</span>
            </p>
          </div>
          <div class="flex items-center">
            <div
              class="p-1.5 w-8 h-8 bg-blue rounded-md flex items-center justify-center"
            >
              <i class="icon-academic-cap text-white"></i>
            </div>
            <span
              class="text-dark ml-3 font-bold leading-132 text-sm md:text-base"
              >{{ data?.edu_type }}</span
            >
          </div>
          <div class="flex items-center">
            <div
              class="p-1.5 w-8 h-8 bg-blue rounded-md flex items-center justify-center"
            >
              <i class="icon-building text-white"></i>
            </div>
            <span
              class="text-dark ml-3 font-bold leading-132 uppercase text-sm md:text-base"
              >{{ data?.university.name }}</span
            >
          </div>
          <div class="flex items-center">
            <div
              class="p-1.5 w-8 h-8 bg-yellow rounded-md flex items-center justify-center"
            >
              <i class="icon-clock text-white"></i>
            </div>
            <span
              class="text-dark ml-3 font-bold leading-132 uppercase text-sm md:text-base"
              >{{ dayjs(data?.valid_until).format('DD.MM.YYYY') }}</span
            >
          </div>
        </div>

        <div
          class="static-text"
          v-html="convertBlocksToHTML(data?.body_editorjs?.blocks)"
        />

        <div class="w-full bg-gray-200 h-[1px] my-6"></div>

        <UIButton :text="$t('online_application')" @click="checkAuth" />
      </div>
      <div
        class="single-footer container mt-8 pt-6 pb-16 border-t border-gray-200 flex-center-between max-md:flex-col max-md:items-start gap-3"
      >
        <div
          class="flex-y-center max-md:flex-col max-md:items-start gap-3 md:gap-8"
        >
          <UIButtonShare :title="data?.name" :link="getFullLink" />
          <UIButtonCopy />
        </div>

        <UIButtonPrint />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import { convertBlocksToHTML } from '~/helpers'
import { useAuthStore } from '~/store/auth'
import type { IScholarship } from '~/types/university'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { $event } = useNuxtApp()

const isClicked = ref(false)

const getFullLink = computed(() => {
  return window.location.href
})

const { data } = useAsyncData('scholarshipSingle', () =>
  useApi().$get<IScholarship>(`/university/scholarships/${route.params.slug}/`)
)

const breadcrumbMenus = computed(() => [
  {
    title: t('scholarship'),
    link: '/scholarship',
  },
  {
    title: data.value?.name,
    link: '',
  },
])

const checkAuth = () => {
  isClicked.value = true

  if (!Object.keys(authStore.user).length) {
    return $event('open-auth', 'login')
  }

  router.push({ path: '/profile/edit' })
}

// watch user
watch(
  () => authStore.user,
  () => {
    if (Object.keys(authStore.user).length && isClicked.value) {
      router.push({ path: '/profile/edit' })
    }
  }
)
</script>

<style scoped></style>
