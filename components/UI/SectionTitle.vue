<template>
  <p class="text-center text-2xl md:text-3.5xl leading-112 font-bold text-dark font-mts" :class="labelClass">{{title}}</p>
</template>

<script setup lang="ts">


interface Props {
  title?: string
  labelClass?: string
}

defineProps<Props>()
</script>