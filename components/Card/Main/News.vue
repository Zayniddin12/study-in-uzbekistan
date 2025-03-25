<template>
  <div
    :to="'/news/' + news?.id"
    class="w-full max-md:border-b first:border-t md:border-t border-blue-200 md:border-r md:last:border-r-0 group block"
  >
    <div
      :class="{ '!pl-0': isFirst, '!pr-0': isLast }"
      class="max-md:py-4 md:pt-3 px-3 flex flex-col gap-5 justify-between h-full"
    >
      <div class="max-md:flex max-md:items-center max-md:gap-3">
        <div class="w-[123px] md:w-full h-[72px] shrink-0 md:h-[168px]">
          <UIShimmer height="100%" v-bind="{ loading }" width="100%">
            <img
              :src="news?.banner"
              alt="news"
              class="object-cover w-full h-full rounded-lg grayscale-0 transition-300"
            />
          </UIShimmer>
        </div>
        <div>
          <UIShimmer
            height="24px"
            preloader-class="md:mt-5"
            v-bind="{ loading }"
            width="100%"
          >
            <NuxtLink :to="'/news/' + news?.id">
              <h4
                class="md:mt-5 !leading-130 group-hover:underline transition-300 text-sm md:text-lg line-clamp-3 font-bold text-dark"
              >
                {{ news?.title }}
              </h4>
            </NuxtLink>
          </UIShimmer>
          <UIShimmer
            height="20px"
            preloader-class="mt-1 md:mt-2"
            v-bind="{ loading }"
            width="100%"
          >
            <p
              :class="{
                'line-clamp-none':
                  isReadMore || news?.short_description.length <= 138,
              }"
              class="text-xs font-normal line-clamp-3 !leading-130 text-dark mt-1 md:mt-2"
            >
              {{ news?.short_description }}
            </p>
          </UIShimmer>

          <span
            class="text-sm text-blue font-normal cursor-pointer transition-300 hover:text-primary"
            @click="() => (isReadMore = !isReadMore)"
            >{{ isReadMore ? $t('read_less') : $t('read_more') }}</span
          >
        </div>
      </div>

      <NuxtLink :to="'/news/' + news?.id">
        <i
          v-if="!loading"
          class="icon-arrow-right-up text-[36px] text-blue opacity-0 transition-300 group-hover:opacity-100 max-md:hidden"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { INews } from '~/types/common'

interface Props {
  news: INews
  loading?: boolean
  isLast?: boolean
  isFirst?: boolean
}

defineProps<Props>()

const isReadMore = ref(false)
</script>
