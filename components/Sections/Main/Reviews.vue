<template>
  <div class="py-7 md:py-16 relative overflow-hidden bg-white">
    <UISectionTitle :title="$t('reviews')" class="container relative z-10" />
    <img
      src="/images/blockquote.svg"
      class="absolute w-full max-w-[252px] md:max-w-[773px] max-md:top-0 max-md:left-[-40px] md:bottom-0 md:left-8"
      alt="block"
    />
    <div v-if="review?.length > 0" class="mt-16 container">
      <div class="relative z-10">
        <button
          class="review-prev-el flex-center w-8 h-8 rounded-full border border-gray absolute-y rotate-90 transition-300 hover:border-blue max-md:hidden left-2 lg:left-[120px]"
          :class="{
            '!cursor-default hover:border-gray opacity-50 bg-white-200':
              isPrevDisabled,
          }"
        >
          <i class="icon-chevron text-xl text-blue" />
        </button>
        <ClientOnly>
          <Swiper
            v-bind="settings"
            :initial-slide="0"
            class="!w-full !max-w-[636px] mx-auto !overflow-visible"
            @realIndexChange="changeIndex"
          >
            <SwiperSlide v-for="(card, index) in review" :key="index">
              <CardMainReview :card="card" :active="index === realIndex" />
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
        <button
          class="review-next-el flex-center w-8 h-8 rounded-full border border-gray absolute-y -rotate-90 transition-300 hover:border-blue max-md:hidden right-2 lg:right-[120px]"
          :class="{
            '!cursor-default hover:border-gray opacity-50 bg-white-200':
              isNextDisabled,
          }"
        >
          <i class="icon-chevron text-xl text-blue" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useHomeStore } from '~/store'

const settings = {
  effect: 'cards',
  visible: true,
  loop: true,
  grabCursor: true,
  cardsEffect: {
    perSlideOffset: 8, // Space between cards in px
    perSlideRotate: 0, // Rotation of cards in degrees
    rotate: 0,
    slideShadows: false,
  },
  navigation: {
    nextEl: '.review-next-el',
    prevEl: '.review-prev-el',
  },
  modules: [EffectCards, Navigation],
}

const realIndex = ref(0)
const isNextDisabled = computed(
  () => realIndex.value === review.value.length - 1
)
const isPrevDisabled = computed(() => realIndex.value === 0)

function changeIndex(e: any) {
  realIndex.value = e.realIndex
}

const loading = ref(true)
const { fetchReview } = useHomeStore()

const review = computed(() => useHomeStore().review)
Promise.allSettled([fetchReview()])
  .then(() => (loading.value = false))
  .catch((err) => {
    return new Error(err)
  })
</script>

<style>
.swiper-cards .swiper-slide {
  overflow: visible !important;
}
</style>
