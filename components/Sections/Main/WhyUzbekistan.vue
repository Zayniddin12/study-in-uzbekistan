<template>
  <div class="py-7 md:py-16 bg-white">
    <div class="container grid lg:grid-cols-12 gap-6">
      <div class="lg:col-span-4">
        <UISectionTitle :title="$t('why_uzbekistan')" class="!text-left" />
        <p
          class="text-base text-dark leading-128 font-normal mt-3 md:mt-6 whitespace-pre-line"
        >
          {{ $t('why_uzbekistan_text') }}
        </p>
      </div>
      <div class="lg:col-span-8">
        <div class="hidden lg:flex gap-6">
          <CardMainWhyUzbekistan
            v-for="(card, index) in whyUzbSlider"
            :key="index"
            :active="activeIndex === index"
            v-bind="{ card }"
            @mouseenter="activeIndex = index"
          />
        </div>
      </div>
    </div>
    <div v-if="whyUzbSlider?.length > 0" class="lg:hidden">
      <ClientOnly>
        <Swiper
          :initial-slide="1"
          :slides-per-view="'auto'"
          :space-between="10"
          centered-slides
        >
          <SwiperSlide
            v-for="(card, index) in whyUzbSlider"
            :key="index"
            class="!w-[343px]"
          >
            <CardMainWhyUzbekistan active v-bind="{ card }" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/vue'

import { useHomeStore } from '~/store'

const activeIndex = ref(0)

const loading = ref(true)
const { fetchWhyUzbSlider } = useHomeStore()

const whyUzbSlider = computed(() => useHomeStore().whyUzbSlider)
Promise.allSettled([fetchWhyUzbSlider()])
  .then(() => (loading.value = false))
  .catch((err) => {
    return new Error(err)
  })
</script>
