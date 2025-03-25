<template>
  <div class="border-blue-200" :class="hrStyles">
    <div class="pb-3" :class="borderStyles">
      <div class="flex-center-between gap-3">
        <p class="text-xs text-dark font-bold uppercase leading-132">
          {{ card?.title }}
        </p>
        <div class="w-8 h-8 flex-y-center rounded-md bg-blue shrink-0 p-1">
          <img :src="card?.icon" alt="causes" />
        </div>
        <!--          <img :src="card?.icon" alt="icon" />-->
        <!--                    <i class="icon-building-2 text-white text-xl" />-->
        <!--        </div>-->
      </div>
      <p class="mt-5 text-sm leading-132 font-normal text-dark">
        {{ card?.content }}
      </p>
    </div>
    <!--    <div class="h-px w-[calc(100%-12px)] bg-blue-200" :class="hrStyles" />-->
  </div>
</template>

<script setup lang="ts">
interface Props {
  index?: number
  card: {
    id: number
    title: string
    content: string
    icon: string
  }
}

const props = defineProps<Props>()

const borderStyles = computed(() => {
  if (props.index === 0) {
    return 'md:pr-3'
  } else if (props.index === 1) {
    return 'md:px-3'
  } else if (props.index === 2) {
    return 'md:pl-3'
  } else if (props.index === 3) {
    return 'md:pt-3 md:pr-3'
  } else if (props.index === 4) {
    return 'md:pt-3 md:px-3'
  }
})

const hrStyles = computed(() => {
  if (props.index === 0) {
    return 'border-b'
  } else if (props.index === 1) {
    return 'border-b'
  } else if (props.index === 2) {
    return 'border-b'
  } else if (props.index === 3) {
    return 'max-md:border-b'
  } else if (props.index === 4) {
    return 'max-md:border-b'
  }
})
</script>

<style scoped></style>
