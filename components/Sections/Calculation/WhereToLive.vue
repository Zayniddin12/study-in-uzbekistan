<template>
  <div class="flex-y-center flex-col sm:flex-row gap-6 h-full">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="flex items-center w-full h-full p-2 bg-white flex-center rounded-2xl border border-transparent relative hover:border-blue transition-300 cursor-pointer"
      :class="{ 'border-blue': card.id === active }"
      @click="$emit('change', card.id)"
    >
      <div
        class="w-5 h-5 rounded-full border-2 border-gray absolute top-[40%] md:top-4 left-4 flex-center transition-300"
        :class="{ '!border-blue': card.id === active }"
      >
        <div
          class="w-2.5 h-2.5 rounded-full bg-blue scale-0 transition-300"
          :class="{ 'scale-100': card.id === active }"
        />
      </div>
      <div class="text-center">
        <i :class="card?.icon" class="text-[40px] text-blue" />
        <p class="text-base leading-5 font-bold text-dark mt-2">
          {{ card.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  active?: number
}

defineProps<Props>()

const { t } = useI18n()

const cards = computed(() => [
  {
    id: 'city',
    title: t('city'),
    icon: 'icon-building-city',
  },
  {
    id: 'suburb',
    title: t('village'),
    icon: 'icon-building',
  },
])
</script>
