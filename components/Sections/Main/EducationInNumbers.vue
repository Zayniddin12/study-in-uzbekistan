<template>
  <div class="bg-white-200 py-7 md:py-16 relative">
    <div class="container relative z-10">
      <i18n-t
        class="text-2xl md:text-3.5xl text-center text-dark leading-112 font-bold font-mts"
        keypath="uzbekistan_in_numbers"
        tag="p"
      >
        <template #numbers>
          <span class="px-4 py-1.5 text-white bg-blue max-md:inline-block">{{
            $t('in_numbers')
          }}</span>
        </template>
      </i18n-t>

      <div
        class="p-7 bg-gray-200 border-[3px] border-white rounded-2xl in-number-shadow mt-8 grid md:grid-cols-3 gap-5 md:gap-7"
      >
        <CardMainEducationInNumbers
          v-for="(card, index) in inNumbers(stats)"
          :key="index"
          v-bind="{ card }"
        />
      </div>
    </div>
    <img
      alt="pattern"
      class="absolute w-screen left-0 bottom-0"
      src="/images/samarkand-pattern.svg"
    />
  </div>
</template>

<script lang="ts" setup>
import { inNumbers } from '~/data'
import { useHomeStore } from '~/store'

const loading = ref(true)
const { fetchStats } = useHomeStore()

const stats = computed(() => useHomeStore().stats)
Promise.allSettled([fetchStats()])
  .then(() => (loading.value = false))
  .catch((err) => {
    return new Error(err)
  })
</script>

<style scoped>
.in-number-shadow {
  box-shadow: 0 20px 65px 0 rgba(6, 40, 89, 0.32);
}
</style>
