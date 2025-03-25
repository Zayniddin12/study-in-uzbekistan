<template>
  <h2
    class="text-2xl md:text-2.5xl leading-112 font-bold text-dark"
    :class="labelClass"
  >
    {{ title }}
  </h2>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  labelClass?: string
}

defineProps<Props>()
</script>
