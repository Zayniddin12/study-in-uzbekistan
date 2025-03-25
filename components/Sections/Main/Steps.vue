<template>
  <div class="py-7 md:py-16 overflow-hidden">
    <div class="container">
      <UISectionTitle :title="moveToObj.title" />
      <p
        class="text-center max-w-[782px] mx-auto mt-3 text-base leading-128 font-normal text-dark"
        v-html="formatRichText(moveToObj?.step_description)"
      />
    </div>

    <div class="mt-12 container flex items-center w-full overflow-x-scroll">
      <ClientOnly class="w-full">
        <div
          v-for="(card, index) in steps"
          :key="index"
          class="!w-[287px] max-lg:!min-w-[287px]"
        >
          <NuxtLink to="/steps-for-admission">
            <CardMainStep active-link="" v-bind="{ index, card }" />
          </NuxtLink>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { reactive } from 'vue'

import { formatRichText } from '~/utils'

const moveToObj = ref({
  title: '',
  subtitle: '',
})

const activeLink = ref('')

const steps = reactive([
  {
    title: '',
    description: '',
    link: '',
  },
  {
    title: '',
    description: 'for_admission_first_step',
    link: '',
  },
  {
    title: '',
    description: 'for_admission_first_step',
    link: '',
  },
  {
    title: '',
    description: '',
    link: '/',
  },
  {
    title: '',
    description: '',
    link: '/',
  },
])

const getContentSteps = () => {
  useApi()
    .$get('/common/steps/')
    .then((res) => {
      moveToObj.value.title = res?.step_title
      moveToObj.value.subtitle = res?.step_description
      steps[0].title = res?.step1_title
      steps[0].description = res?.step1_description
      steps[0].link = res?.step1_url
      activeLink.value = res?.step1_url
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
      steps[4].link = res?.step5_ur
    })
}

onMounted(() => getContentSteps())
</script>
<!--!w-[287px]-->
