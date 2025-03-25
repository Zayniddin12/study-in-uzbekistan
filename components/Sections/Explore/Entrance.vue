<template>
  <div
    class="aspect-[1440/700] relative overflow-hidden bg-no-repeat bg-cover bg-center flex items-end justify-center pb-8 z-10 px-4 md:px-2"
  >
    <div class="bg-cover bg-center">
      <img
        class="absolute w-full object-cover top-0 left-0 h-full"
        :src="data?.banner"
        alt="n0_img"
      />
    </div>
    <div class="max-w-[782px] relative z-10 w-full">
      <h1
        class="text-2xl md:text-2.5xl text-white leading-112 font-bold font-mts mb-5"
      >
        {{ data?.title }}
      </h1>
      <div class="grid grid-cols-3 gap-x-5 gap-y-6">
        <div
          v-for="(item, index) in infoList"
          :key="index"
          class="flex-y-center gap-3"
        >
          <i :class="`${item?.icon} text-3.5xl leading-8 text-white`" />
          <div>
            <p class="text-xs font-medium text-white md:text-gray leading-112">
              {{ $t(item?.label) }}
            </p>
            <p class="text-sm font-bold text-white leading-112 mt-1">
              {{ formatNumberSpace(item?.value) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <span class="gradient absolute w-full h-full inset-0 z-0" />
  </div>
</template>

<script setup lang="ts">
import type { IExplorePlaces } from '~/types/common'

interface Props {
  data: IExplorePlaces
}
const props = defineProps<Props>()

const infoList = computed(() => {
  return [
    {
      icon: 'icon-users-group',
      label: 'population',
      value: props.data?.population,
    },
    {
      icon: 'icon-bus',
      label: 'railway_transports',
      value: props.data?.railway_stations_count,
    },
    {
      icon: 'icon-building',
      label: 'museums',
      value: props.data?.museums_count,
    },
    {
      icon: 'icon-airplane',
      label: 'airports',
      value: props.data?.airports_count,
    },
    {
      icon: 'icon-building-2',
      label: 'universitys',
      value: props.data?.universities_count,
    },
    {
      icon: 'icon-bookmark',
      label: 'libraries',
      value: props.data?.libraries_count,
    },
  ]
})
</script>

<style scoped>
.gradient {
  background: linear-gradient(
    180deg,
    rgba(0, 27, 66, 0) 2.34%,
    rgba(0, 27, 67, 0) 28.32%,
    rgba(0, 27, 67, 0.54) 69.41%,
    rgba(0, 27, 67, 0.85) 100%
  );
}
</style>
