<template>
  <div
    :class="{ 'bg-white review-shadow': active }"
    class="bg-gray/20 rounded-2xl px-8 pb-7"
  >
    <div
      :class="{ 'opacity-100': active }"
      class="w-[80px] h-[80px] rounded-full relative overflow-hidden mx-auto -translate-y-10 transition-300 opacity-0"
    >
      <img
        :src="card?.photo"
        alt="review-image"
        class="w-full h-full object-cover"
      />
    </div>
    <div :class="{ 'opacity-100': active }" class="opacity-0">
      <p class="text-base !leading-130 font-medium text-dark text-center -mt-4">
        {{ card?.content }}
      </p>
      <p
        class="mt-5 text-base !leading-130 font-bold text-dark uppercase text-center"
      >
        {{ card?.author_name }}
      </p>
      <p
        class="mt-[3px] text-xs !leading-130 font-medium text-blue text-center"
      >
        {{ card?.author_region }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  card: {
    author_name: string
    photo: string
    content: string
    author_region: string
  }
  active?: boolean
}

const props = defineProps<Props>()
</script>

<style scoped>
.review-shadow {
  box-shadow: 0 20px 60px 0 rgba(6, 40, 89, 0.12);
}
</style>
