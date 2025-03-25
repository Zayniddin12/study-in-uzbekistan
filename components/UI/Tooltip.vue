<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="show"
      class="absolute-x top-[-50px] z-10"
    >
      <div class="relative flex-center">
        <div
          class="absolute w-2.5 h-2.5 rotate-45 rounded-sm bg-dark"
          :class="{ 'top-8 absolute-x': isTop }"
        ></div>
      </div>
      <div
        class="tooltip bg-dark rounded-lg px-4 py-2 text-sm leading-normal text-white relative whitespace-nowrap"
      >
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
interface Props {
  show?: boolean
  isTop?: boolean
}
defineProps<Props>()
</script>
