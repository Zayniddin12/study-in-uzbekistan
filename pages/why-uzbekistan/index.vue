<template>
  <div class="relative overflow-hidden bg-white">
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <SectionsWhyIntro />
    <div class="container py-16">
      <client-only>
        <div>
          <Swiper
            :key="trigger"
            :enabled="trigger"
            :initial-slide="1"
            :slides-per-view="'auto'"
            :space-between="24"
            centered-slides
            class="!overflow-visible"
          >
            <SwiperSlide
              v-for="(card, index) in firstList"
              :key="index"
              class="!w-[378px]"
            >
              <CardMainWhyUzbekistan
                active
                class="!w-[378px]"
                v-bind="{ card }"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </client-only>
    </div>
    <div class="mt-10 min-h-[590px]">
      <SectionsMainEducationInNumbers />
    </div>
    <div class="container pt-6 pb-16">
      <UISectionTitle
        :title="$t('education_in_uzbekistan')"
        class="!text-2.5xl !text-left"
      />
      <p class="mt-4 text-xl leading-140 text-dark max-w-[982px]">
        {{ $t('education_in_uzbekistan_text') }}
      </p>
      <div class="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardMainLiving
          v-for="(card, index) in secondList"
          :key="index"
          :to="card?.url"
          v-bind="{ card }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { useWindowSize } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import { useCommonStore } from '~/store/common'

const { t } = useI18n()
const { width } = useWindowSize()
const commonStore = useCommonStore()
const trigger = ref(false)

const firstList = ref()
const secondList = ref()
const stats = ref()

function getFirstList() {
  useApi()
    .$get('common/why-uzbekistans-2/')
    .then((res) => {
      firstList.value = res
    })
}

function getSecondList() {
  useApi()
    .$get('common/why-uzbekistans-3/')
    .then((res) => {
      secondList.value = res
    })
}

function getStats() {
  useApi()
    .$get(`common/stats/`)
    .then((res) => {
      stats.value = res
    })
}

onMounted(() => {
  getFirstList()
  getSecondList()
  getStats()
})

watch(
  () => width.value,
  () => {
    trigger.value = width.value < 1100
  },
  {
    immediate: true,
  }
)

const breadcrumbRoutes = computed(() => [
  {
    title: t('why_uzbekistan'),
    link: '/',
  },
])
</script>
