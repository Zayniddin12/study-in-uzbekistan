<template>
  <div>
    <Breadcrumb :breadcrumb="breadcrumbMenus" />
    <div class="py-4 md:pt-8 md:pb-16">
      <div class="container">
        <UISectionTitle :title="moveToObj.title" class="!text-left" />
        <p
          class="mt-3 md:text-xl leading-140 font-normal text-dark"
          v-html="formatRichText(moveToObj?.subtitle)"
        />
      </div>

      <div class="mt-8 container flex-y-center overflow-x-scroll">
        <div
          v-for="(card, index) in steps"
          :key="index"
          class="!w-[287px] max-lg:!min-w-[287px]"
        >
          <CardMainStep
            :active-link="activeLink"
            :class="{ 'bg-red-500': card?.link }"
            v-bind="{ index, card }"
            @active="activeLink = $event"
          />
        </div>
      </div>

      <CardMainStepStatic :link="activeLink" :loading="loading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import Breadcrumb from '~/components/UI/Breadcrumb.vue'
import { useHomeStore } from '~/store'
import { formatRichText } from '~/utils'

const { t } = useI18n()

const breadcrumbMenus = computed(() => {
  return [
    {
      title: t('five_steps_admission'),
      link: '/steps-for-admission',
    },
  ]
})

const activeLink = ref('')
const loading = ref(false)

const moveToObj = ref({
  title: '',
  subtitle: '',
})

const steps = reactive<
  {
    title: string
    description: string
    link: string
    // activeCard: boolean
  }[]
>([
  {
    title: '',
    description: '',
    link: '',
  },
  {
    title: '',
    description: '',
    link: '',
  },
  {
    title: '',
    description: '',
    link: '',
  },
  {
    title: '',
    description: '',
    link: '',
  },
  {
    title: '',
    description: '',
    link: '',
  },
])

const getContentSteps = () => {
  loading.value = true
  useApi()
    .$get('/common/steps/')
    .then((res) => {
      activeLink.value = res?.step1_url

      moveToObj.value.title = res?.step_title
      moveToObj.value.subtitle = res?.step_description
      steps[0].title = res?.step1_title
      steps[0].description = res?.step1_description
      steps[0].link = res?.step1_url
      steps[1].title = res?.step2_title
      steps[1].description = res?.step2_description
      steps[1].link = res?.step2_url
      steps[2].title = res?.step3_title
      steps[2].description = res?.step3_description
      steps[2].link = res?.step3_url

      steps[3].title = res?.step4_title
      steps[3].description = res?.step4_description
      steps[3].link = res?.step4_url

      steps[4].title = res?.step5_title
      steps[4].description = res?.step5_description
      steps[4].link = res?.step5_url
    })
}

onMounted(() => getContentSteps())
</script>
