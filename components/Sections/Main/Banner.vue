<script lang="ts" setup>
import type { IBanner } from '~/types/common'
import { formatRichText } from '~/utils'

interface Props {
  banner: IBanner
}

defineProps<Props>()
</script>

<template>
  <main ref="scroll" class="h-screen relative">
    <div class="relative z-10 w-full h-full inset-0 top-0">
      <div
        class="animate-fadeAndMove absolute top-1/4 md:relative md:top-0 flex flex-col justify-between md:justify-around w-full h-full container gap-7"
      >
        <div class="w-full">
          <div class="w-full text-2.5xl md:text-[48px] max-w-[587px]">
            <p
              class="relative title-after inline leading-112 font-bold font-mts text-white bg-blue"
            >
              {{ banner?.title }} {{ banner?.colored_word }}
            </p>
            <!--            <p-->
            <!--              class="max-h-[56px] inline-flex items-center justify-center text-2.5xl md:text-[48px] font-mts font-bold px-4 text-white text-center bg-blue"-->
            <!--            >-->
            <!--              {{ banner?.colored_word }}-->
            <!--            </p>-->
          </div>
          <p
            class="text-base md:text-lg leading-normal text-dark font-normal mt-3 md:mt-6 max-w-[445px]"
            v-html="formatRichText(banner?.description)"
          />
        </div>
      </div>
    </div>
    <div class="bg-image"><img :alt="banner.title" :src="banner.image" /></div>
  </main>
</template>

<style scoped>
.title-after:after {
  content: '';
  position: absolute;
  top: -0.25em;
  right: 100%;
  bottom: -0.25em;
  width: 0.25em;
}
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.bg-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes fadeAndMove {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeAndMove {
  animation: fadeAndMove 1s ease-out; /* Adjust the duration and timing function as needed */
}
</style>
