<template>
  <div class="py-7 md:py-16">
    <UISectionTitle :title="$t('living_condition')" />
    <div v-if="livingConditions?.length > 0" class="mt-6 md:mt-8">
      <ClientOnly>
        <Swiper v-bind="settings" class="!overflow-visible">
          <SwiperSlide
            v-for="(card, index) in livingConditions"
            :key="index"
            class="!w-[332px] md:!w-[378px]"
          >
            <CardMainLiving :card="card" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>

      <div class="flex-center gap-4 mt-6 md:mt-8">
        <button
          class="living-prev-el flex-center w-8 h-8 rounded-full border border-gray rotate-90 transition-300 hover:border-blue"
        >
          <i class="icon-chevron text-xl text-blue" />
        </button>
        <button
          class="living-next-el flex-center w-8 h-8 rounded-full border border-gray -rotate-90 transition-300 hover:border-blue"
        >
          <i class="icon-chevron text-xl text-blue" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useHomeStore } from '~/store'

const settings = {
  slidesPerView: 'auto',
  spaceBetween: 24,
  centeredSlides: false,
  initialSlide: 4,
  loop: true,
  navigation: {
    nextEl: '.living-next-el',
    prevEl: '.living-prev-el',
  },
  breakpoints: {
    '240': {
      spaceBetween: 12,
    },
    '600': {
      spaceBetween: 24,
    },
  },
  modules: [Navigation, Autoplay],
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  effect: 'cards',
}

const news = {
  title: 'Льготы для студентов',
  description:
    'Обучение в Узбекистане может позволить студентам погрузиться в богатое культурное наследие страны',
  image: '/images/fake/samarkand.png',
}
const loading = ref(true)
const { fetchlivingConditions } = useHomeStore()

const livingConditions = computed(() => useHomeStore().livingConditions)
Promise.allSettled([fetchlivingConditions()])
  .then(() => (loading.value = false))
  .catch((err) => {
    return new Error(err)
  })
</script>
