<template>
  <div class="bg-white-200 py-7 md:py-16 relative">
    <div class="container relative z-10">
      <i18n-t
        keypath="uzbekistan_in_numbers"
        tag="p"
        class="text-2xl md:text-3.5xl text-center text-dark leading-112 font-bold font-mts"
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
          v-for="(card, index) in statsData"
          :key="index"
          v-bind="{ card }"
        />
      </div>
    </div>
    <img
      class="absolute w-screen absolute-x top-4 max-h-[590px]"
      src="/images/full-samarkand-pattern.svg"
      alt="pattern"
    />
  </div>
</template>

<script setup lang="ts">
// import { inNumbers } from '~/data'

import { useI18n } from 'vue-i18n'

interface Props {
  stats: {
    universities_count: null | number
    migrant_students_count: null | number
    universities_with_high_ranking_count: null | number
  }
}

const { t } = useI18n()
const props = defineProps<Props>()

const statsData = computed(() => [
  {
    title: t('universities'),
    description: t('universities_text'),
    count: props?.stats?.universities_count ?? 0,
    icon: 'icon-building-2',
  },
  {
    title: t('migrants'),
    description: t('migrants_text'),
    count: props?.stats?.migrant_students_count ?? 0,
    isK: props?.stats?.migrant_students_count ?? 0 > 1000,
    icon: 'icon-users-group',
  },
  {
    title: t('universities_with_high_ranking'),
    description: t('universities_with_high_ranking_text'),
    count: props.stats?.universities_with_high_ranking_count ?? 0,
    icon: 'icon-ranking',
  },
])
</script>

<style scoped>
.in-number-shadow {
  box-shadow: 0 20px 65px 0 rgba(6, 40, 89, 0.32);
}
</style>
