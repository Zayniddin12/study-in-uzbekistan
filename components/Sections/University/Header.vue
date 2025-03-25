<template>
  <div class="bg-white lg:rounded-2xl">
    <div v-if="$route.name !== 'universities-slug-program-program'">
      <div
        class="university-header w-full lg:h-[400px] relative overflow-hidden lg:rounded-t-2xl"
      >
        <img
          :src="card?.background"
          alt="university-single"
          class="w-full h-full object-cover aspect-[16/9] md:aspect-square"
        />
      </div>
      <div class="px-6">
        <UIAvatar
          :image="card?.avatar"
          class="!w-[92px] !h-[92px] mt-[-46px]"
        />
        <p class="mt-6 text-xl leading-112 text-dark font-bold">
          {{ card?.title }}
        </p>
      </div>

      <div class="border-b mt-6">
        <div class="relative -mb-px">
          <div
            class="programs-tab-prev-el absolute h-full pr-6 top-0 left-0 z-10 flex-center pl-1 linear-white-tab-right rotate-180 transition-300"
          >
            <button
              class="w-8 h-8 rounded-full bg-white-200 border border-gray-200 flex-center -rotate-90 group hover:border-blue transition-300"
            >
              <i
                class="icon-chevron group-hover:text-blue transition-300 text-lg text-gray"
              />
            </button>
          </div>
          <ClientOnly>
            <Swiper
              :initial-slide="initial - 1"
              class="!px-6"
              v-bind="settings"
            >
              <SwiperSlide
                v-for="(card, index) in list"
                :key="index"
                class="!w-max"
              >
                <div
                  :class="{ '!text-blue bg-opacity-100': tab === card?.value }"
                  class="relative px-3 text-sm !leading-130 text-gray pb-2.5 pt-3 transition-300 cursor-pointer"
                  @click="activateTab(card?.value)"
                >
                  {{ $t(card?.label) }}
                  <div
                    :class="{ 'opacity-100': tab === card.value }"
                    class="linear-bg-tab opacity-0 absolute inset-0 w-full h-full transition-300"
                  />
                  <div
                    :class="{ 'opacity-100': tab === card.value }"
                    class="bg-blue opacity-0 absolute bottom-0 left-0 w-full h-0.5 rounded-t-lg transition-300"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </ClientOnly>
          <div
            class="programs-tab-next-el absolute h-full pr-6 top-0 right-0 z-10 flex-center pl-1 linear-white-tab-right transition-300"
          >
            <button
              class="w-8 h-8 rounded-full bg-white-200 border border-gray-200 flex-center -rotate-90 group hover:border-blue transition-300"
            >
              <i
                class="icon-chevron group-hover:text-blue transition-300 text-lg text-gray"
              />
            </button>
          </div>
        </div>
        <!--    <UITab v-bind="{list}" v-model="tab" class="-mb-px" />-->
      </div>
    </div>
    <div class="p-6 overflow-hidden">
      <slot>Content</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const settings = {
  slidesPerView: 'auto',
  spaceBetween: 8,
  navigation: {
    nextEl: '.programs-tab-next-el',
    prevEl: '.programs-tab-prev-el',
  },
  modules: [Navigation],
}

interface Props {
  list: {
    label: string
    value: string
  }[]
  card: {
    title: string
    background: string
    avatar: string
  }
  active?: string
  initial?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['on-tab-change'])
const tab = ref(props.active)

const activateTab = (value: string) => {
  tab.value = value
  emit('on-tab-change', value)
}

watch(
  () => props.active,
  () => {
    tab.value = props.active
  }
)
</script>

<style scoped>
.linear-bg-tab {
  background: linear-gradient(
    180deg,
    rgba(0, 103, 255, 0) 0%,
    rgba(0, 103, 255, 0.1) 100%
  );
}

.linear-white-tab-right {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
}

.swiper-button-disabled {
  pointer-events: none !important;
  opacity: 0 !important;
}

.university-header::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background: #001b4233;
}
</style>
