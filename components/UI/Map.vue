<template>
  <section>
    <div v-if="false" ref="filterCard" class="max-lg:container max-lg:mb-6">
      <div class="flex justify-center items-center">
        <div
          :class="selectMap"
          class="w-full lg:absolute top-8 z-10 flex-center-between max-md:flex-col gap-4 p-4 lg:bg-white/[48%] rounded-2xl border border-white/20 container"
        >
          <FormSelect
            v-model="filter.level"
            :options="degrees"
            :placeholder="$t('level_of_education')"
            class="w-full"
            label-class="!text-xs"
            label-key="name"
            selected-option-styles="h-11"
            value-key="id"
          />
          <FormSelect
            v-model="filter.direction"
            :options="directions"
            :placeholder="$t('direction_of_study')"
            class="w-full"
            label-class="!text-xs"
            label-key="name"
            selected-option-styles="h-11"
            value-key="id"
          />
          <FormSelect
            v-model="filter.region"
            :options="regions"
            :placeholder="$t('city')"
            class="w-full"
            label-class="!text-xs"
            label-key="name"
            selected-option-styles="h-11"
            value-key="id"
          />
          <UIButton
            :text="$t('search')"
            class="max-md:w-full h-11"
            @click="submit"
          />
        </div>
      </div>
    </div>
    <div class="h-[460px] relative">
      <GoogleMap class="h-[460px] w-full relative z-0" v-bind="settings">
        <MarkerCluster>
          <CustomMarker
            v-for="(card, i) in locations"
            :key="i"
            :options="{
              position: { lat: card?.latitude, lng: card?.longitude },
            }"
            @click="router.push('/universities/' + card?.id)"
          >
            <div class="absolute left-0 bottom-0 w-8 -translate-x-1/2">
              <img src="/images/svg/marker.svg" alt="marker" class="w-8" />
              <div
                class="w-6 h-6 rounded-full border border-white/[14%] absolute top-1 right-1"
              >
                <img
                  :src="card.logo"
                  class="w-full h-full rounded-full object-cover"
                  alt="company"
                />
              </div>
            </div>
          </CustomMarker>
        </MarkerCluster>
      </GoogleMap>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CustomMarker, GoogleMap, MarkerCluster } from 'vue3-google-map'

import type { IResponse } from '~/types/common'

const { t } = useI18n()
const router = useRouter()

const degrees = ref<any>([])
const directions = ref<any>([])
const regions = ref<any>([])

const filter = reactive({
  region: '',
  direction: '',
  level: '',
})

interface Props {
  selectMap?: string
  locations: {
    id: number
    name: string
    logo: string
    latitude: number
    longitude: number
  }[]
}

withDefaults(defineProps<Props>(), {})

const settings = {
  center: { lat: 41.3775, lng: 64.5853 },
  apiKey: 'AIzaSyBug8FkbhjIu8_2IxPEvyeNQHZNLvBZycA',
  disableDefaultUI: false,
  zoom: 6,
  zoomControl: true,
  fullscreenControl: false,
}

const filterCard = ref<HTMLDivElement>()

function getDegrees() {
  return useApi()
    .$get('/common/education-degrees/')
    .then((res: IResponse) => {
      degrees.value = [
        {
          name: t('all_degrees'),
          id: '',
        },
        ...res.results,
      ]
    })
}

function getDirections() {
  return useApi()
    .$get('/university/education-directions/')
    .then((res: IResponse) => {
      directions.value = [
        {
          name: t('all_directions'),
          id: '',
        },
        ...res.results,
      ]
    })
}

function getRegions() {
  return useApi()
    .$get('/common/regions/', {
      params: {
        limit: 20,
      },
    })
    .then((res: IResponse) => {
      regions.value = [
        {
          name: t('all_regions'),
          id: '',
        },
        ...res.results,
      ]
    })
}

onMounted(async () => {
  await Promise.all([getDegrees(), getRegions(), getDirections()]);
})

function submit() {
  router.push({
    name: 'programs',
    query: {
      degree: filter.level || undefined,
      direction: filter.direction || undefined,
      region: filter.region || undefined,
    },
  })
}
const center = { lat: -28.024, lng: 140.887 }
</script>

<style>
.ymaps-2-1-79-map-copyrights-promo,
.ymaps-2-1-79-copyright__content-cell {
  display: none !important;
}

.ymaps-2-1-79-inner-panes::after {
  content: '';
  width: 100vw;
  height: 460px;
  position: absolute;
  background: #001b4238;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
