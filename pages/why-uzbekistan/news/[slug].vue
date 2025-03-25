<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div v-if="single?.banner" class="max-w-[982px] w-full container pt-6">
      <div class="aspect-video">
        <img
          :src="single?.banner"
          alt="news-why"
          class="w-full object-cover h-full rounded-[20px]"
        />
      </div>
      <UISectionTitle
        :title="single?.title"
        class="!text-left !text-2.5xl max-w-[982px] mx-auto my-8"
      />
      <div class="static-text" v-html="formatRichText(single?.body_html)" />
      <div
        class="single-footer md:container mt-8 pt-6 pb-16 border-t border-gray-200 flex-center-between max-md:flex-col max-md:items-start gap-3"
      >
        <div
          class="flex-y-center max-md:flex-col max-md:items-start gap-3 md:gap-8"
        >
          <UIButtonShare :link="getFullLink" :title="single?.title" />
          <UIButtonCopy />
        </div>
        <UIButtonPrint />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { convertBlocksToHTML } from '~/helpers'
import { formatRichText } from '~/utils'

const { t } = useI18n()
const route = useRoute()

const loading = ref(true)
const single = ref()

function getSingle() {
  return useApi()
    .$get(`common/pages/${route.params?.slug}/`)
    .then((res: any) => {
      single.value = res
    })
    .finally(() => (loading.value = false))
}

getSingle()

const { data } = await useAsyncData('fetchSinglePostWhyUzbekistan', () =>
  useApi().$get(`common/pages/${route.params?.slug}/`)
)

const getFullLink = computed(() => {
  if (process.client) {
    return window.location.href
  }
})

useSeoMeta({
  title: data.value?.title,
  // description: data.value?.content,
  // twitterTitle: data.value?.title,
  // twitterDescription: data.value?.content,
  ogTitle: data.value?.title,
  // ogDescription: data.value?.content,
  // ogImage: data.value?.banner?.[EImageSize.LARGE],
  // twitterImage: data.value?.banner?.[EImageSize.LARGE],
  // twitterCard: 'summary',
  // twitterSite: '@ijtimoiysayt',
})

const breadcrumbRoutes = computed(() => [
  {
    title: t('why_uzbekistan'),
    link: '/why-uzbekistan',
  },
  {
    title: 'Узбекских университеты в мировых рейтингах',
    link: '/',
  },
])
</script>
