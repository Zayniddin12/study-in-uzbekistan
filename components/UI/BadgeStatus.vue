<template>
  <div
    class="flex-y-center gap-1 text-xs font-normal leading-normal"
    :class="detectColor"
  >
    <i class="text-base leading-4" :class="detectIcon" />
    {{ statusDisplay }}
  </div>
</template>

<script setup lang="ts">
import type { TStatus } from '~/types/components/status'

interface Props {
  status: TStatus
  statusDisplay: string
}
const props = defineProps<Props>()

const detectColor = computed(() => {
  switch (props.status) {
    case 'accepted':
      return 'text-green'
    case 'rejected':
      return 'text-red'
    default:
      return 'text-yellow'
  }
})

const detectIcon = computed(() => {
  switch (props.status) {
    case 'accepted':
      return 'icon-tick-stroke'
    case 'rejected':
      return 'icon-xmark-circle'
    default:
      return 'icon-clock'
  }
})
</script>
