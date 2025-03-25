<template>
  <NuxtLink
    :to="id ? 'scholarship/' + id : ''"
    class="inline-flex flex-col justify-between rounded-2xl pt-6 px-3 pb-3 bg-white group hover:bg-blue hover-effect transition-colors duration-300"
    :class="{ 'bg-white-200': isHome }"
  >
    <h3
      class="text-dark font-bold text-base md:text-xl leading-128 transition-colors duration-300 group-hover:text-white h-[56px]"
    >
      {{ name }}
    </h3>
    <div
      class="p-3 rounded-[10px] bg-gray-200 mt-6 transition-colors duration-300 group-hover:bg-white"
    >
      <div class="flex items-center">
        <div
          class="p-1.5 w-8 h-8 bg-blue rounded-md flex items-center justify-center"
        >
          <i class="icon-money text-white"></i>
        </div>
        <p
          class="inline-flex items-center text-dark ml-3 font-bold leading-132 uppercase text-sm md:text-base"
        >
          {{ formatNumberSpace(money_per_period) }} {{ currency }} /
          <span class="inline-block ml-1 font-normal text-sm lowercase">
            {{ ' ' + money_period_display }}
          </span>
        </p>
      </div>

      <div class="flex items-center mt-2">
        <div
          class="p-1.5 w-8 h-8 bg-blue rounded-md flex items-center justify-center"
        >
          <i class="icon-academic-cap text-white"></i>
        </div>
        <span class="text-dark ml-3 font-bold leading-132 text-sm md:text-base"
          >{{ edu_type }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<!--id: number-->
<!--name: string-->
<!--money_per_period?: string-->
<!--money_period?: string-->
<!--money_period_display?: string-->
<!--university: IUniversity-->
<!--edu_type?: string-->

<script setup lang="ts">
import type { IScholarship } from '~/types/university'
import { formatNumberSpace } from '~/utils'

interface Props extends IScholarship {
  isHome?: boolean
}
defineProps<Props>()
</script>

<style scoped>
.hover-effect:hover {
  box-shadow: 0 4px 16px 0 rgba(24, 24, 24, 0.06);
}
</style>
