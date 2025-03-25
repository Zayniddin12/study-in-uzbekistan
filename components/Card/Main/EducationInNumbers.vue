<template>
  <div
    class="w-full md:pr-7 max-md:border-b md:border-r last:border-[0px] last:!p-0 border-blue-200 max-md:pb-5"
  >
    <div class="flex-center-between">
      <p class="text-xs leading-132 text-dark font-bold uppercase">
        {{ card?.title }}
      </p>
      <div class="w-8 h-8 rounded-md bg-blue flex-center">
        <i :class="card?.icon" class="text-xl text-white" />
      </div>
    </div>
    <p class="text-3.5xl leading-40 text-dark font-mts font-bold mt-5 mb-2">
      {{ formatNumberSpace(card?.count) }}
    </p>
    <p
      class="text-sm leading-132 text-dark"
      v-html="formatRichText(card?.description)"
    />
  </div>
</template>

<script lang="ts" setup>
import { formatNumberSpace, formatRichText } from '~/utils'

interface Props {
  card: {
    title: string
    description: string
    count: number
    icon: string
    isK: boolean
  }
}

defineProps<Props>()

// const changeCount = (count: number) => {
//   return count > 1000 ? `${count / 1000}k+` : count
// }
</script>
