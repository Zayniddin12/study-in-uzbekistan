<template>
  <Modal
    v-bind="{ show }"
    no-header
    body-class="!bg-transparent !max-w-[784px] !overflow-visible"
    has-close-icon
  >
    <div class="relative w-full">
      <button
        v-if="images.length > 1"
        v-bind="{ show: shouldShowButtons.value }"
        class="slider-prev w-8 h-8 flex-center rounded-full transition-300 group hover:bg-white absolute -left-16 absolute-y cursor-pointer border border-white/40 hover:border-transparent"
        :class="{
          '!cursor-default opacity-50 !bg-gray': isPrevDisabled,
        }"
      >
        <i
          class="icon-arrow-right text-base text-white transition-300 group-hover:text-blue block rotate-180"
          :class="{ 'group-hover:!text-white': isPrevDisabled }"
        />
      </button>
      <ClientOnly>
        <Swiper
          v-bind="settings"
          @swiper="onInit"
          @active-index-change="sliderChange"
        >
          <SwiperSlide v-for="(item, index) in images" :key="index">
            <div class="aspect-video overflow-hidden relative rounded-lg">
              <img
                v-if="item?.type === 'image'"
                :src="item.image"
                alt="images"
                class="w-full h-full object-cover"
              />
              <div v-if="item?.type === 'video'" class="w-full h-full">
                <iframe
                  :key="activeIndex"
                  class="w-full h-full"
                  :src="`https://www.youtube.com/embed/${convertToEmbed(
                    item.vid_link
                  )}?rel=0`"
                  allowfullscreen
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
      <button
        v-if="images.length > 1"
        v-bind="{ show: shouldShowButtons.value }"
        class="slider-next w-8 h-8 flex-center rounded-full transition-300 group hover:bg-white absolute -right-16 absolute-y cursor-pointer border border-white/40 hover:border-transparent"
        :class="{
          '!cursor-default opacity-50 !bg-gray': isNextDisabled,
        }"
        :disabled="isNextDisabled"
      >
        <i
          class="icon-arrow-right text-base text-white transition-300 group-hover:text-blue block"
          :class="{ 'group-hover:!text-white': isNextDisabled }"
        />
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import { Keyboard, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

interface Props {
  images: {
    type: string
    image?: string
    vid_link?: string
  }[]
  active: number
  show?: boolean
}
const shouldShowButtons = computed(() => props.images.length > 1)
const props = defineProps<Props>()

const settings = computed(() => {
  return {
    spaceBetween: 20,
    grabCursor: true,
    keyboard: { enabled: true },
    initialSlide: props.active,
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    modules: [Navigation, Keyboard],
  }
})

const emit = defineEmits(['change'])
const imageSlider = ref()
const activeIndex = ref()
const isNextDisabled = ref(false)
const isPrevDisabled = ref(false)

function sliderChange(e: any) {
  activeIndex.value = e?.activeIndex
  emit('change', e?.activeIndex)

  isNextDisabled.value = e.activeIndex === props.images.length - 1
  isPrevDisabled.value = e.activeIndex === 0
}

function onInit(swiper: any) {
  imageSlider.value = swiper
}
onMounted(() => {
  setTimeout(() => {
    imageSlider.value?.slideTo(props.active)
  }, 100)
})

watch(
  () => props.active,
  () => {
    setTimeout(() => {
      imageSlider.value?.slideTo(props.active)
    }, 100)
  }
)
</script>

<style scoped>
.gallery-shadow {
  background: linear-gradient(180deg, rgba(7, 9, 28, 0) 57.52%, #07091c 100%);
}
</style>
