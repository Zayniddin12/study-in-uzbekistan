<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="w-full max-w-[982px] mx-auto mt-4 h-auto relative">
      <div
        class="overlay absolute left-0 top-0 w-full h-full flex items-end justify-center"
      >
        <div class="max-w-[782px] container mx-auto w-full mb-8">
          <div class="text-white flex items-center gap-5 mb-4">
            <div class="flex items-center gap-1 md:gap-3">
              <i class="icon-calendar text-xs md:text-xl"></i>
              <span class="text-base md:text-lg font-medium leading-140">{{
                dayjs(data?.published_at).format('DD.MM.YYYY')
              }}</span>
            </div>

            <div class="w-[1px] h-4 md:h-[24px] bg-white/40"></div>

            <div class="flex items-center gap-1 md:gap-3">
              <i class="icon-eye text-xs md:text-xl"></i>
              <span class="text-sm md:text-lg font-medium leading-140">{{
                data?.views_count
              }}</span>
            </div>
          </div>

          <h1
            class="text-white font-mts text-lg lg:text-[28px] leading-112 font-bold"
          >
            {{ data?.title }}
          </h1>
        </div>
      </div>
      <img
        :src="data?.banner"
        alt="news-why"
        class="w-full object-cover h-full"
      />
    </div>
    <div class="max-w-[982px] w-full container pt-6">
      <h5 class="mb-4 text-2xl text-dark leading-130 font-medium">
        {{ data?.short_description }}
      </h5>
      <div
        class="static-text break-words"
        v-html="formatRichText(data?.body_html)"
      />
      <div
        class="single-footer container mt-8 pt-6 pb-16 border-t border-gray-200 flex-center-between max-md:flex-col max-md:items-start gap-3"
      >
        <div
          class="flex-y-center max-md:flex-col max-md:items-start gap-3 md:gap-8"
        >
          <UIButtonShare :link="getFullLink" :title="data?.title" />
          <UIButtonCopy />
        </div>
        <UIButtonPrint />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import type { INewsSingle } from '~/types/common'
import { formatRichText } from '~/utils'

const { t } = useI18n()
const route = useRoute()
const breadcrumbRoutes = ref([
  {
    title: t('news'),
    link: '/news',
  },
])

const getFullLink = computed(() => {
  if (process.client) {
    return window.location.href
  }
})

const { data } = await useAsyncData('news-single', () =>
  useApi().$get<INewsSingle>(`/common/news/${route.params.slug}/`)
)
useSeoMeta({
  title: data?.value?.title,
  description: data?.value?.short_description,
  ogTitle: data?.value?.title,
  ogDescription: data?.value?.short_description,
  twitterTitle: data?.value?.title,
  twitterDescription: data?.value?.short_description,
  ogImage: data?.value?.banner,
  twitterImage: data?.value?.banner,
})
</script>

<style>
.static-text > * {
  margin: 0 auto 16px auto !important;
  max-width: 982px;
}

.static-text img,
.static-text blockquote {
  max-width: 100% !important;
}

.static-text p,
.static-text li {
  color: #181818;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.static-text ol,
.static-text ul {
  padding-left: 24px;
}

.static-text ul li {
  list-style: none;
  position: relative;
  margin-bottom: 8px;
}

.static-text li::before {
  content: '';
  width: 3px;
  height: 3px;
  border-radius: 99px;
  background: #000;
  position: absolute;
  top: 12px;
  left: -16px;
}

.overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 27, 66, 0) 0%,
    rgba(0, 27, 67, 0) 23.17%,
    rgba(0, 27, 67, 0.67) 60.94%,
    rgba(0, 27, 67, 0.85) 100%
  );
}

.static-text ol li {
  list-style: none;
}

.static-text a {
  color: #4489f7;
}

.static-text a:hover {
  text-decoration: underline;
}

.static-text img {
  border-radius: 20px;
}

.static-text b {
  font-weight: 500;
}

.static-text h4 {
  color: #4489f7;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  padding-bottom: 12px;
  margin-bottom: 12px !important;
  position: relative;
}

.static-text h4:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  background: #4489f7;
  height: 1px;
  width: 130px;
}

.static-text blockquote {
  margin: 20px 0;
  padding: 24px;
  position: relative;
  background: #e1e8f0;
  border-radius: 20px;
  overflow: hidden;
}

.static-text blockquote p {
  margin-top: 0;
  padding-top: 0;
}

.static-text blockquote p,
.static-text blockquote {
  position: relative;
  z-index: 10;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: #181818;
}

.static-text blockquote h2 {
  position: relative;
  z-index: 10;
  font-size: 20px;
  font-weight: 400;
  color: #121c25;
  line-height: 130%;
}

.static-text blockquote:after {
  content: '\e900';
  font-family: icomoon;
  position: absolute;
  left: 20px;
  top: 24px;
  color: #0067ff;
  opacity: 0.22;
  font-size: 20px;
  line-height: 20px;
}

/*.static-text blockquote:before {*/
/*  content: '';*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top: 0;*/
/*  width: 4px;*/
/*  height: 100%;*/
/*  background: #4489f7;*/
/*}*/
</style>
