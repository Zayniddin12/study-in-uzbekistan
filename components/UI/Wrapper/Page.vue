<script setup lang="ts">
interface Props{
  title: string
}
defineProps<Props>()
</script>

<template>
  <div class="default-shadow w-full rounded-2xl bg-white">
  <div class="p-6 border-b border-gray-50" v-if="title">
    <h2
      class="text-xl text-dark leading-112 font-medium font-mts"
    >
      {{ $t(title) }}
    </h2>
  </div>
  <div class="p-6">
    <slot />
  </div>
</div>
</template>

<style scoped>

</style>