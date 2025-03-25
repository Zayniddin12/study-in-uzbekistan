<template>
  <div class="container my-16 md:my-[92px] relative">
    <img
      alt="logo"
      class="absolute right-[-20%] -top-10 opacity-50"
      src="/images/uz-pattern-logo.svg"
    />
    <div class="relative z-10">
      <UISectionTitle :title="titleInfo[0]?.why_uzbekistan_title" label-class="!text-left !text-2.5xl" />
      <div
        class="max-w-[782px] text-xl leading-140 font-normal text-dark mt-4"
        v-html="formatRichText(titleInfo[0]?.why_uzbekistan_description)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { useCommonStore } from '~/store/common'
import { formatRichText } from '~/utils'
import type { IResponse } from '~/types/common'

const commonStore = useCommonStore()

const title = ref('')
const description = ref('')
const titleInfo = ref({})

function getRegions() {
  return useApi()
    .$get('/common/why-uzbekistan-info/')
    .then((res: IResponse) => {
      titleInfo.value = res.results
    })
}

getRegions()

onMounted(() => {
  const storedTitle = localStorage.getItem('title')
  const storedDescription = localStorage.getItem('description')
  if (storedTitle && storedDescription) {
    title.value = storedTitle
    description.value = storedDescription
  } else {
    title.value = commonStore.headerTitles.why_uzbekistan.why_uzbekistan_title
    description.value =
      commonStore.headerTitles.why_uzbekistan.why_uzbekistan_description
    localStorage.setItem('title', title.value)
    localStorage.setItem('description', description.value)
  }
})
</script>
