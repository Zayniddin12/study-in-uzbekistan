<template>
  <div class="py-7 md:py-16 bg-dark-100 relative overflow-hidden">
    <div
      class="container flex justify-between gap-6 md:items-center main__block"
    >
      <div class="max-w-[379px] !z-20">
        <h3
          class="text-2xl md:text-3.5xl leading-112 font-bold text-white font-mts"
        >
          {{ video?.about_project_title }}
        </h3>
        <div
          class="mb-[60px] mt-6 font-normal text-white"
          v-html="formatRichText(video?.about_project_description)"
        ></div>
        <NuxtLink to="/why-uzbekistan">
          <UIButton class="w-max" :text="$t('more')" />
        </NuxtLink>
      </div>

      <div
        class="z-[1] w-full md:w-[580px] h-[360px] cursor-pointer shadow relative before:content-['' before:absolute before:inset-0 before:z-[999]"
        @click="handleClick"
      >
        <iframe
          width="100%"
          height="100%"
          :src="`https://www.youtube.com/embed/${convertToEmbed(
            video?.about_uzbekistan_vid_link
          )}?autoplay=0&mute=1&controls=0`"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="w-full h-full absolute inset-0 rounded-2xl z-[-1]"
        ></iframe>
      </div>
      <UILightBox
        is-prev-disabled="hidden"
        is-next-disabled="hidden"
        :images="getVideoList()"
        :show="show"
        @close="closeModal"
      />
    </div>
    <img
      class="absolute right-0 top-0 hidden md:block"
      src="/images/video-pattern.svg"
      alt="image"
    />

    <svg
      class="absolute left-0 bottom-0 hidden md:block"
      width="226"
      height="226"
      viewBox="0 0 494 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_771_35546)">
        <circle cx="-19" cy="480" r="113" fill="#0067FF" />
      </g>
      <defs>
        <filter
          id="filter0_f_771_35546"
          x="-532"
          y="-33"
          width="1026"
          height="1026"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_771_35546"
          />
        </filter>
      </defs>
    </svg>
    <svg
      class="absolute -right-[10%] bottom-[50%] hidden md:block"
      width="464"
      height="480"
      viewBox="0 0 464 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_771_35547)">
        <circle cx="513" cy="66" r="113" fill="#0067FF" />
      </g>
      <defs>
        <filter
          id="filter0_f_771_35547"
          x="0"
          y="-447"
          width="1026"
          height="1026"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_771_35547"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { convertToEmbed, formatRichText } from '~/utils'

const video = ref<any>([])

const show = ref(false)

const handleClick = () => {
  show.value = true
}

const closeModal = () => {
  show.value = false
}

const getVideoList = () => {
  return [
    {
      type: 'video',
      vid_link: video.value?.about_uzbekistan_vid_link,
    },
  ]
}

function getVideo() {
  useApi()
    .$get('common/config/')
    .then((res) => {
      video.value = res
    })
    .catch((err) => {
      return new Error(err)
    })
}

getVideo()
</script>

<style scoped>
@media (max-width: 768px) {
  .main__block {
    flex-direction: column;
  }
}
</style>
