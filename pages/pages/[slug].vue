<template>
  <div>
    <Breadcrumb :breadcrumb="breadcrumbMenus" class="mb-8" />
    <div class="max-w-[982px] px-4 mx-auto mb-10 md:mb-16">
      <h2
        v-if="data?.title"
        class="mt-[52px] mb-4 text-dark font-bold font-mts text-[28px] leading-140"
      >
        {{ data?.title }}
      </h2>
      <p
        v-if="data?.body_html"
        class="text-xl font-normal text-dark leading-140"
        v-html="formatRichText(data?.body_html)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import Breadcrumb from '~/components/UI/Breadcrumb.vue'
import { formatRichText } from '~/utils'

const { t } = useI18n()
const route = useRoute()

const { data } = await useAsyncData('static-pages', () =>
  useApi().$get(`common/pages/${route?.params?.slug}/`)
)
// const getStaticPageSingle = () => {
//   console.log(route.params?.slug.toString())
//   // if (route.params?.slug !== '/' && route.params?.slug) {
//   //   homeStore.fetchStaticPageSingle(route.params?.slug.toString())
//   // }
// }
//
// getStaticPageSingle()

// const staticPageSingle = computed(() => homeStore.staticPageSingle)

const breadcrumbMenus = computed(() => [
  { title: data?.value?.title, link: '/materials' },
])

useSeoMeta({
  title: () => data?.value?.title,
  ogTitle: () => data?.value?.title,
  description: () => data?.value?.body_html,
  ogDescription: () => data?.value?.body_html,
  ogImage: () => data?.value?.banner,
})
</script>
