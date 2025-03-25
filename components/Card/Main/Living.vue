<template>
  <NuxtLink
    :to="'/living-conditions/' + card?.id"
    class="block relative h-[347px] overflow-hidden rounded-2xl group"
  >
    <img
      :src="card?.banner"
      alt="news-image"
      class="w-full h-full object-cover"
    />
    <div
      class="absolute inset-0 w-full h-full news-linear-blue transition-300 group-hover:opacity-0"
    />
    <div
      class="absolute inset-0 w-full h-full news-linear-bluer opacity-0 transition-300 group-hover:opacity-100"
    />
    <div
      class="absolute w-full h-full flex flex-col justify-end p-4 md:p-6 inset-0 z-10"
    >
      <div>
        <p
          class="text-2xl md:text-2.5xl font-bold text-white leading-custom-normal line-clamp-2"
        >
          {{ card?.title }}
        </p>
        <p
          class="text-sm md:text-base text-white !leading-130 mt-2 line-clamp-3"
        >
          {{ card?.short_description }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  card: {
    title: string
    short_description: string
    banner: string
    id: number
  }
}

defineProps<Props>()
</script>

<style scoped>
.news-linear-blue {
  background: linear-gradient(
    180deg,
    rgba(0, 27, 66, 0) 0%,
    rgba(0, 27, 67, 0.85) 60.42%
  );
}

.news-linear-bluer {
  background: linear-gradient(
    180deg,
    rgba(0, 103, 255, 0) 0%,
    rgba(0, 103, 255, 0.85) 60.42%
  );
}
</style>
