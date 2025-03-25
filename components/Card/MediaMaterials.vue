<template>
  <div class="grid grid-cols-6 gap-3">
    <div
      v-for="(item, index) in images"
      :key="item.id"
      class="rounded-lg overflow-hidden relative max-h-[84px] video_size"
    >
      <img
        v-if="item?.type === 'image'"
        :src="item.image"
        alt="media image"
        class="cursor-pointer object-cover"
        @click="handleImg(index)"
      />
      <div
        v-if="item?.type === 'video'"
        class="cursor-pointer w-full h-full relative"
        @click="handleImg(index)"
      >
        <img
          :src="getYouTubeThumbnail(item?.vid_link)"
          alt="media image"
          class="cursor-pointer w-full h-full object-cover"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <svg
            width="32"
            height="22"
            viewBox="0 0 32 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.995 3.50001C30.6287 2.15401 29.5721 1.10001 28.2176 0.74001C26.3983 0.0420099 8.77613 -0.29999 3.66419 0.76001C2.30972 1.12401 1.24909 2.17401 0.886827 3.52001C0.0656945 7.10001 0.00330459 14.84 0.906952 18.5C1.27324 19.846 2.32985 20.9 3.68431 21.26C7.28683 22.084 24.4139 22.2 28.2378 21.26C29.5922 20.896 30.6529 19.846 31.0151 18.5C31.8906 14.6 31.953 7.34001 30.995 3.50001Z"
              fill="#FF0000"
            />
            <path
              d="M21.1334 11L12.922 6.32001V15.68L21.1334 11Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertToEmbed } from '~/utils'

interface Props {
  images: () => []
}

defineProps<Props>()

const emits = defineEmits<{
  (e: 'handleImg', id: number): void
}>()
const video = ref<any>([])
const handleImg = (id: number) => {
  emits('handleImg', id)
}

function getYouTubeThumbnail(videoUrl: string, quality = 'hqdefault') {
  const thumbnailBaseUrl = 'https://img.youtube.com/vi/'
  return `${thumbnailBaseUrl}${convertToEmbed(videoUrl)}/${quality}.jpg`
}
</script>
