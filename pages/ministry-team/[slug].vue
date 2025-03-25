<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container pt-6 pb-16 grid md:grid-cols-4 gap-6 items-start">
      <div class="md:col-span-3 default-shadow rounded-2xl">
        <p
          class="py-4 px-6 bg-blue rounded-t-2xl text-white text-base leading-130 font-normal"
        >
          {{ data?.ministry }}
        </p>
        <div class="p-6 rounded-b-2xl bg-white">
          <div class="flex-y-center gap-5 max-md:flex-col max-md:!items-start">
            <img
              :alt="data?.full_name"
              :src="data?.photo"
              class="rounded-2xl border border-gray-200 max-w-[224px] aspect-[224/182] object-cover"
            />
            <div>
              <h2 class="text-dark text-2xl !leading-130 font-bold mb-2">
                {{ data?.full_name }}
              </h2>
              <p class="text-lg !leading-130 font-normal text-blue">
                {{ data?.position }}
              </p>
              <div class="mt-5 flex flex-col gap-3">
                <a
                  :href="`tel:${data?.phone}`"
                  class="flex-y-center gap-2 text-dark font-medium !leading-130 hover:text-blue transition-300"
                >
                  <i class="icon-phone text-2xl leading-6 text-gray" />
                  {{ phoneNumberFormatter(data?.phone) }}
                </a>
                <a
                  :href="`mailto:${data?.email}`"
                  class="flex-y-center gap-2 text-dark font-medium leading-130 hover:text-blue transition-300"
                >
                  <i class="icon-email text-2xl leading-6 text-gray" />
                  {{ data?.email }}
                </a>
              </div>
            </div>
          </div>
          <h2 class="text-2xl leading-130 text-dark font-medium mt-6 mb-3">
            {{ $t('biography') }}
          </h2>
          <p class="text-dark text-lg leading-130 font-normal">
            {{ data?.about }}
          </p>
        </div>
      </div>
<!--      <div-->
<!--        v-if="data?.ustav"-->
<!--        class="download-secs rounded-2xl bg-white default-shadow p-5"-->
<!--      >-->
<!--        <h5 class="mb-5 text-sm font-normal leading-112 text-gray">-->
<!--          {{ $t('charter') }}-->
<!--        </h5>-->
<!--        <UIButton-->
<!--          :text="$t('download')"-->
<!--          class="w-full"-->
<!--          icon-left="icon-download-file"-->
<!--          size="sm"-->
<!--          @click="print"-->
<!--        />-->
<!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { IMenistryTeam } from '~/types/common'

const { t } = useI18n()

const breadcrumbRoutes = computed(() => {
  const routes = [
    {
      title: t('about_project'),
      link: '/about-project',
    },
  ]

  if (data.value) {
    routes.push({
      title: data?.value?.full_name,
      link: '',
    })
  }

  return routes
})

const route = useRoute()

const { data } = await useAsyncData('news-single', () =>
  useApi().$get<IMenistryTeam>(`common/ministry-members/${route.params.slug}/`)
)

useSeoMeta({
  title: data?.value?.full_name,
  description: data?.value?.ministry,
  ogTitle: data?.value?.full_name,
  ogDescription: data?.value?.ministry,
  twitterTitle: data?.value?.full_name,
  twitterDescription: data?.value?.ministry,
  ogImage: data?.value?.photo,
  twitterImage: data?.value?.photo,
})
const print = () => {
  return new Promise((resolve, reject) => {
    const text =
      'https' + data?.value?.ustav.slice(4, data?.value?.ustav.length)
    fetch(text, {
      method: 'GET',
    })
      .then((result) => {
        return result.blob()
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Document.pdf')
        link.click()
        link.remove()
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
</script>
