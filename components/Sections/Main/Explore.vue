<template>
  <div
    id="explore-uzbekistan"
    class="py-7 md:py-16 relative overflow-hidden bg-white-200"
  >
    <UISectionTitle :title="title" class="container" />
    <img
      alt="dots"
      class="absolute-x w-[1200px]"
      src="/images/dots-pattern.svg"
    />
    <div
      v-if="places?.length > 0"
      class="mt-6 md:mt-8 container relative !bg-transparent"
    >
      <button
        v-if="places.length >= 4"
        class="explore-prev-el flex-center max-lg:hidden w-8 h-8 rounded-full border border-gray absolute-y rotate-90 transition-300 hover:border-blue max-md:hidden -left-8"
      >
        <i class="icon-chevron text-xl text-blue" />
      </button>
      <ClientOnly>
        <Swiper
          class="swiper-cards !overflow-hidden max-md:!overflow-visible rounded-xl"
          v-bind="settings"
        >
          <SwiperSlide
            v-for="(card, index) in places"
            :key="index"
            class="!w-[278px] !h-auto"
          >
            <CardMainExplore :card="card" class="h-full" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
      <button
        v-if="places.length >= 4"
        class="explore-next-el flex-center w-8 max-lg:hidden h-8 rounded-full border border-gray absolute-y -rotate-90 transition-300 hover:border-blue -right-8"
      >
        <i class="icon-chevron text-xl text-blue" />
      </button>
      <div class="flex-center hidden gap-4 mt-6 md:mt-8 max-lg:flex">
        <button
          class="living-prev-el flex-center w-8 h-8 rounded-full border border-gray rotate-90 transition-300 hover:border-blue z-50 shadow-md"
        >
          <i class="icon-chevron text-xl text-blue" />
        </button>
        <button
          class="living-next-el flex-center w-8 h-8 rounded-full border border-gray -rotate-90 transition-300 hover:border-blue z-50 shadow-md"
        >
          <i class="icon-chevron text-xl text-blue" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import type { IResponse } from '~/types/common'

const settings = {
  slidesPerView: 'auto',
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: '.explore-next-el',
    prevEl: '.explore-prev-el',
  },
  modules: [Navigation],
}

const places = ref<any>([])
interface Props {
  title: string

}

defineProps<Props>()
function getFaqs() {
  return useApi()
    .$get('common/explore-places/', {
      params: {
        limit: 25,
      },
    })
    .then((res: any) => {
      places.value = res.results
    })
    .catch((err) => {
      return new Error(err)
    })
}

getFaqs()
</script>
<!--class="explore-next-el flex-center w-8 h-8 rounded-full border border-gray absolute-y -rotate-90 transition-300 hover:border-blue -right-8"-->
