<template>
  <main>
    <TransitionGroup name="fade">
      <div v-if="staticPageSingle" class="container mb-10 md:mb-16">
        <h2
          v-if="staticPageSingle.title"
          class="mt-[52px] mb-4 text-dark font-bold font-mts text-[28px] leading-140"
        >
          {{ staticPageSingle?.title }}
        </h2>
        <p
          v-if="staticPageSingle.body_html"
          class="static static-text text-xl font-normal text-dark leading-140 overflow-auto"
          v-html="formatRichText(staticPageSingle?.body_html)"
        ></p>
      </div>

      <div
        v-else
        class="container py-10 text-red flex items-center justify-center text-lg font-medium"
      >
        {{ $t('not_found_title') }} !
      </div>
    </TransitionGroup>
  </main>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import { useHomeStore } from '~/store'
import { formatRichText } from '~/utils'

const props = defineProps<{
  link: string
  loading: boolean
}>()

const homeStore = useHomeStore()
const staticPageSingle = computed(() => homeStore.staticPageSingle)

useSeoMeta({
  title: () => staticPageSingle.value?.title,
  ogTitle: () => staticPageSingle.value?.title,
  description: () => staticPageSingle.value?.body_html,
  ogDescription: () => staticPageSingle.value?.body_html,
  ogImage: () => staticPageSingle.value?.banner,
})

watch(
  () => props.link,
  () => {
    homeStore.fetchStaticPageSingle(props?.link)
  },
  { immediate: true, deep: true }
)
</script>
