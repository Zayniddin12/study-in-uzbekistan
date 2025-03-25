<template>
<div class="flex-y-center gap-3">
  <i class="text-2xl text-blue" :class="card?.icon" />
  <div class="flex flex-col gap-1">
    <p class="text-xs leading-112 text-gray">{{card?.title}}</p>
    <a :href="card?.link" class="text-sm leading-112 text-dark font-bold transition-300" :class="{'hover:text-blue': isHover}" :target="targetBlank ? '_blank' : ''">{{card?.value}}</a>
  </div>
</div>
</template>

<script setup lang="ts">

interface Props {
  card: {
    icon: string
    title: string
    value: string
    link?: string
  }
  isHover?: boolean
  targetBlank?: boolean
}

defineProps<Props>()
</script>