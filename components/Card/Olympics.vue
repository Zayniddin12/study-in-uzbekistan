<template>
  <!-- <div
    class="p-4 border border-gray-200 bg-white-200 rounded-2xl flex flex-col justify-between gap-4"
  >
    <div>
      <UIShimmer
        v-bind="{ loading }"
        width="100%"
        height="26px"
        preloader-class="mb-2"
      >
        <p class="text-xl leading-128 text-dark font-bold line-clamp-2">
          {{ card?.title }}
        </p>
      </UIShimmer>
      <UIShimmer
        v-for="i in 4"
        v-bind="{ loading }"
        :key="i"
        width="100%"
        height="22px"
        preloader-class="mb-0.5"
      />
      <UIShimmer v-bind="{ loading }" width="100%" height="22px">
        <p
          class="text-base leading-140 font-normal text-dark mt-2 line-clamp-5"
        >
          {{ card?.short_description }}
        </p>
      </UIShimmer>
    </div>

    <div>
      <div class="flex-y-center gap-3">
        <UIShimmer v-bind="{ loading }" width="32px" height="32px">
          <div class="w-8 h-8 flex-center bg-blue rounded-md shrink-0">
            <i class="icon-calendar text-xl text-white" />
          </div>
        </UIShimmer>
        <UIShimmer v-bind="{ loading }" width="70px" height="21.12px">
          <p class="text-base leading-132 font-bold text-dark uppercase">
            {{ dayjs(card?.date).format('DD.MM.YYYY') }}
          </p>
        </UIShimmer>
      </div>
      <UIShimmer
        v-bind="{ loading }"
        width="100%"
        height="48px"
        preloader-class="mt-4"
        border-radius="8px"
      >
        <a
          :href="card?.more_info_link"
          target="_blank"
          class="w-full block mt-4"
        >
          <UIButton class="w-full" :text="$t('more')" />
        </a>
      </UIShimmer>
    </div>
  </div> -->
</template>

<script setup lang="ts">
// import dayjs from 'dayjs'

// interface Props {
//   card: {
//     id: number
//     title: string
//     short_description: string
//     date: string
//     more_info_link: string
//     university: {
//       id: number
//       name: string
//     }
//   }
//   loading?: boolean
// }

// withDefaults(defineProps<Props>(), {})
</script>
