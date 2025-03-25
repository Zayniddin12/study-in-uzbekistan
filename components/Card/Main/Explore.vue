<template>
  <NuxtLink
    :to="`/explore/${card?.id}`"
    class="card border-2 border-white rounded-2xl relative overflow-hidden hover:border-blue transition-300 block group"
  >
    <div class="h-[208px]">
      <img
        :src="card?.banner"
        alt="explore-image"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="p-5 pt-4 bg-gray-200 h-full">
      <p
        class="text-lg leading-6 font-bold text-dark font-mts group-hover:text-blue transition-300"
      >
        {{ card?.title }}
      </p>
      <div class="mt-3 flex-y-center gap-7">
        <div>
          <p class="text-xs leading-132 text-dark">{{ $t('population') }}</p>

          <p class="mt-0.5 text-sm leading-normal font-mts font-medium">
            {{ $t('population_count', { count: card?.population }) }}
          </p>
        </div>
        <div>
          <p class="text-xs leading-132 text-dark">{{ $t('universities') }}</p>

          <p class="mt-0.5 text-sm leading-normal font-mts font-medium">
            {{ card?.universities_count }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  card: {
    id: string
    title: string
    population: number
    universities_count: number
    banner: string
  }
}

defineProps<Props>()
</script>

<style scoped>

</style>
