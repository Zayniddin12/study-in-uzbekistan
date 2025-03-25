<template>
  <div class="overflow-x-hidden max-w-full">
    <ClientOnly>
      <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      <SectionsExploreEntrance v-bind="{ data }" />
      <div
        class="explore-static-text max-w-[982px] mx-auto px-4 mt-6"
        v-html="formatRichText(data?.body_html)"
      />

      <div class="w-[782px] mx-auto px-4">
        <h2 class="text-lg md:text-xl text-dark mb-3 font-medium !pt-4">
          {{ $t('media_materials') }}
        </h2>
        <div>
          <CardMediaMaterials
            class="grid !grid-cols-5 gap-3"
            v-bind="{ images: data?.media }"
            @handle-img="handleImg"
          />
          <UILightBox
            :active="activeIndex"
            :images="data?.media"
            v-bind="{ show }"
            @close="closeModal"
          />
        </div>
      </div>

      <div
        class="single-footer max-w-[982px] mx-auto mt-8 pt-6 pb-16 px-4 border-t border-gray-200 flex-center-between max-md:flex-col max-md:items-start gap-3"
      >
        <div
          class="flex-y-center max-md:flex-col max-md:items-start gap-3 md:gap-8"
        >
          <UIButtonShare :link="getFullLink" :title="data?.title" />
          <UIButtonCopy />
        </div>
        <UIButtonPrint />
      </div>
      <div v-if="universities.length" class="container pb-8 lg:pb-16">
        <div class="flex justify-between items-end my-8">
          <UISectionTitle :title="$t('universities_current_country')" />
        </div>
        <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          <CardUniversity
            v-for="(card, index) in universities"
            :key="index"
            v-bind="{ card }"
          />
        </div>
        <NuxtLink
          class="group mt-6 flex-y-center gap-2 text-base leading-normal font-medium text-dark hover:text-blue transition-300"
          :to="`/universities/?region=${regionIdQuery}`"
        >
          <UIButton class="px-8 py-3" variant="secondary">
            {{ $t('universities_list') }}
            <i class="icon-arrow-right text-blue text-xl" />
          </UIButton>
        </NuxtLink>
      </div>
      <GoogleMap class="h-[460px] w-full relative z-0" v-bind="settings">
        <CustomMarker :options="markerOptions">
          <div class="absolute left-0 bottom-0 w-8 -translate-x-1/2">
            <img src="/images/svg/marker.svg" alt="marker" class="w-8" />
            <div
              class="w-6 h-6 rounded-full border border-white/[14%] absolute top-1 right-1"
            >
              <img
                :src="data.banner"
                class="w-full h-full rounded-full object-cover"
                alt="company"
              />
            </div>
          </div>
        </CustomMarker>
      </GoogleMap>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CustomMarker, GoogleMap } from 'vue3-google-map'

import type { IMenistryTeam, IResponse } from '~/types/common'
import type { IBreadcrumb } from '~/types/components/breadcrumb'
import { formatRichText } from '~/utils'

const activeIndex = ref(0)
const show = ref(false)

const handleImg = (id: number) => {
  show.value = true
  activeIndex.value = id
}

function closeModal() {
  activeIndex.value = 0
  show.value = false
}

const { t } = useI18n()

const breadcrumbRoutes = [
  {
    title: t('explore_uzbekistan'),
    link: '/?section=explore-uzbekistan',
  },
  {
    title: 'Самарканд',
    link: '',
  },
] as IBreadcrumb[]

const route = useRoute()
const data = ref({})
const regionIdQuery = ref(0)

const getFullLink = computed(() => {
  if (process.client) {
    return window.location.href
  }
})
await useAsyncData('news-single', () =>
  useApi()
    .$get<IMenistryTeam>(`common/explore-places/${route.params.slug}/`)
    .then((res) => {
      data.value = res
      getUniversities(res.region_id)
      queryRegionId(res.region_id)
    })
    .catch((err) => {
      throw new Error(err)
    })
)

const universities = ref<any>([])

function getUniversities(regionId: number) {
  useApi()
    .$get('/university/universities/', {
      params: {
        region: regionId,
        page_size: 3,
      },
    })
    .then((res: IResponse<any>) => {
      universities.value = res?.results
      regionIdQuery.value = regionId
    })
}
const markerOptions = ref({
  position: { lat: data.value?.latitude, lng: data.value?.longitude },
})

const settings = {
  center: { lat: data.value?.latitude, lng: data.value?.longitude },
  apiKey: 'AIzaSyBug8FkbhjIu8_2IxPEvyeNQHZNLvBZycA',
  disableDefaultUI: false,
  zoom: 10,
  zoomControl: true,
  fullscreenControl: false,
}
</script>

<style scoped>
.explore-static-text > img {
  width: 982px !important;
  border-radius: 20px !important;
}
</style>

<style>
.explore-static-text > * {
  margin: 0 auto 16px auto !important;
  max-width: 782px;
}

.explore-static-text img,
.explore-static-text blockquote {
  max-width: 100% !important;
}

.explore-static-text p,
.explore-static-text li {
  color: #181818;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.explore-static-text ol,
.explore-static-text ul {
  padding-left: 24px;
}

.explore-static-text ul li {
  list-style: none;
  position: relative;
  margin-bottom: 8px;
}

.explore-static-text li::before {
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
    rgba(0, 27, 67, 0) 29.17%,
    rgba(0, 27, 67, 0.37) 60.94%,
    rgba(0, 27, 67, 0.85) 100%
  );
}

.explore-static-text ol li {
  list-style: disc;
}

.explore-static-text a {
  color: #4489f7;
}

.explore-static-text a:hover {
  text-decoration: underline;
}

.explore-static-text img {
  border-radius: 20px;
}

.explore-static-text b {
  font-weight: 500;
}

.explore-static-text h4 {
  color: #4489f7;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  padding-bottom: 12px;
  margin-bottom: 12px !important;
  position: relative;
}

.explore-static-text h4:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  background: #4489f7;
  height: 1px;
  width: 100%;
  max-width: 130px;
}

.explore-static-text blockquote {
  margin: 20px 0;
  padding: 24px;
  position: relative;
  background: #e1e8f0;
  border-radius: 20px;
  overflow: hidden;
}

.explore-static-text blockquote p {
  margin-top: 0;
  padding-top: 0;
}

.explore-static-text blockquote p,
.explore-static-text blockquote {
  position: relative;
  z-index: 10;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: #181818;
}

.explore-static-text blockquote h2 {
  position: relative;
  z-index: 10;
  font-size: 20px;
  font-weight: 400;
  color: #121c25;
  line-height: 130%;
}

.explore-static-text h2 {
  position: relative;
  z-index: 10;
  color: #181818;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
}

.explore-static-text blockquote:after {
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

.video_size {
  max-width: 147px !important;
  min-width: 147px !important;
  max-height: 92px !important;
  min-height: 92px !important;
}
</style>
