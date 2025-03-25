<template>
  <div class="py-7 md:py-16 bg-blue min-h-[392px] relative overflow-hidden">
    <img
      alt="pattern"
      class="absolute top-[-60%] right-[-37%] opacity-20"
      src="/images/pattern.svg"
    />
    <div class="relative z-10 container">
      <UISectionTitle :title="title" class="text-white mb-3" />
      <p
        class="max-w-[782px] mx-auto text-white text-base leading-128 text-center"
      >
        {{ subtitle }}
      </p>

      <div class="card grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <CardMainMove v-for="(item, idx) in moveList" :key="idx" :card="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHomeStore } from '~/store'

interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
const loading = ref(true)
const { fetchMoveUzb } = useHomeStore()

const moveList = computed(() => useHomeStore().moveList)
Promise.allSettled([fetchMoveUzb()])
  .then(() => (loading.value = false))
  .catch((err) => {
    return new Error(err)
  })
</script>

<style scoped>
.card {
  filter: drop-shadow(0px 20px 65px rgba(6, 40, 89, 0.32));
}
</style>
