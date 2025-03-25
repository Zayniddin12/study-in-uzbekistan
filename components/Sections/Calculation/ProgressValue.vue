<template>
  <div class="w-full rounded-full h-5 bg-white-200 relative overflow-hidden">
    <div
      class="h-5 bg-blue"
      :style="{ width: `${(value / max) * 100}%` }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  max: number
  value: number
}

defineProps<Props>()
</script>
