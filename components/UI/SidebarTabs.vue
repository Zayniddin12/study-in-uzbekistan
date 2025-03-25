<template>
  <div
    class="default-shadow relative w-full bg-white rounded-2xl p-1.5 space-y-1"
  >
    <NuxtLink
      v-for="(item, index) in tabs"
      :key="index"
      class="flex-shrink-0 rounded-xl select-none transition-300 flex-y-center p-3 gap-2 hover:bg-gray-100/[14%] group"
      exact-active-class="bg-gray-100/[14%] active"
      :to="item?.link"
    >
      <span
        :class="item?.icon"
        class="text-xl leading-5 shrink-0 text-gray group-[.active]:text-blue"
      />
      <p class="text-sm text-dark font-medium leading-5">
        {{ $t(item?.title) }}
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tabs: {
    title: string,
    icon: string,
    link: string
  }[]
}
const props = defineProps<Props>()

</script>