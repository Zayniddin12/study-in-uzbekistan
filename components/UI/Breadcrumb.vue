<template>
  <div
    class="breadcrumb bg-gray-200 py-2.5 hidden-on-print overflow-x-hidden hidden md:block"
  >
    <div class="container flex items-center gap-1.5 md:overflow-hidden">
      <NuxtLink
        to="/"
        class="flex items-center gap-[14px] text-dark font-medium leading-normal text-sm transition-300 hover:text-blue group"
      >
        <i
          class="icon-home text-base leading-4 text-blue transition-300 group-hover:text-blue"
        ></i>
        <p>{{ $t('main') }}</p>
      </NuxtLink>
      <div
        v-for="(item, index) in breadcrumb"
        :key="index"
        class="flex items-center gap-1 group shrink-0"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.44922 11.52L7.04922 0.47998H8.54922L4.94922 11.52H3.44922Z"
            fill="#A0ABB8"
          />
        </svg>

        <!--        <i class="icon-chevron text-gray text-sm leading-[14px] -rotate-90" />-->
        <NuxtLink
          :to="item?.link"
          :class="{
            'pointer-events-none !text-dark/40 ':
              index === breadcrumb?.length - 1,
          }"
          class="transition-300 flex cursor-pointer items-center text-dark leading-normal font-medium text-sm min-w-max breadcrumb-menu line-clamp-1 whitespace-nowrap hover:text-blue"
        >
          {{ item?.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IBreadcrumb } from '~/types/components/breadcrumb'

interface Props {
  breadcrumb: IBreadcrumb[]
}
defineProps<Props>()
</script>
