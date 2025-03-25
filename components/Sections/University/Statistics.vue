<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <template v-for="(item, index) in universityStatistics" :key="index">
        <div class="flex items-center">
          <i class="text-2xl !text-blue statistics" :class="item.icon"></i>
          <div class="ml-3">
            <p class="text-gray text-xs mb-1">{{ $t(item.label) }}</p>
            <p v-if="item.type !== 'array'" class="text-dark font-bold text-sm">{{ item.value }}</p>
            <p v-else class="flex flex-wrap gap-1">
              <p v-for="type in item.value" :key="type.id" class="text-dark font-bold text-sm">{{ type.name }}</p>
            </p>
          </div>
        </div>
      </template>
    </div>
    <div
      class="rounded-lg border-[0.5px] border-gray-200 py-2.5 px-3 mt-3 bg-white-200 grid grid-cols-2 sm:grid-cols-5 max-sm:gap-3"
    >
      <template
        v-for="(item, indpex) in universityStatisticsDiplomas"
        :key="index"
      >
        <div>
          <p class="text-gray text-xs font-normal">{{ $t(item.label) }}</p>
          <p class="text-dark text-sm font-bold mt-1">{{ item.value }}</p>
        </div>
      </template>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-3">
      <div class="flex items-center">
        <i class="text-2xl !text-blue statistics icon-book" />
        <div class="ml-3">
          <p class="text-gray text-xs mb-1">
            {{ $t('main_programs_for_international') }}
          </p>
          <p class="text-dark font-bold text-sm">
            {{ single?.main_programs?.count }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="rounded-lg border-[0.5px] border-gray-200 py-2.5 px-3 mt-3 bg-white-200 grid grid-cols-2 sm:grid-cols-4 max-sm:gap-3"
    >
      <template
        v-for="(item, index) in single?.main_programs?.by_degree.slice(0, 2)"
        :key="index"
      >
        <div>
          <p class="text-gray text-xs font-normal">{{ $t(item?.degree) }}</p>
          <p class="text-dark text-sm font-bold mt-1">{{ item?.count }}</p>
        </div>
      </template>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-3">
      <div class="flex items-center">
        <i class="text-2xl !text-blue statistics icon-book" />
        <div class="ml-3">
          <p class="text-gray text-xs mb-1">
            {{ $t('extra_programs_for_international') }}
          </p>
          <p class="text-dark font-bold text-sm">
            {{ single?.extra_programs?.count }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="rounded-lg border-[0.5px] border-gray-200 py-2.5 px-3 mt-3 bg-white-200 grid grid-cols-2 sm:grid-cols-4 max-sm:gap-3"
    >
      <template
        v-for="(item, index) in single?.extra_programs?.by_type"
        :key="index"
      >
        <div>
          <p class="text-gray text-xs font-normal">{{ item?.type }}</p>
          <p class="text-dark text-sm font-bold mt-1">{{ item?.count }}</p>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IUniversity } from '~/types/common'

interface Props {
  single: IUniversity
}

const props = defineProps<Props>()

const { t } = useI18n()

const universityStatistics = computed(() => [
  {
    label: 'founded_year',
    value: props.single?.foundation_year,
    icon: 'icon-day-calendar',
  },
  {
    label: 'all_students',
    value: props?.single?.students_count,
    icon: 'icon-group-users',
  },
  {
    label: 'international_students',
    value: props.single?.migrant_students_count,
    icon: 'icon-group-users',
  },
  {
    label: 'faculties_count',
    value: props.single?.faculties_count,
    icon: 'icon-faculties',
  },
  {
    label: 'sections_count',
    value: props.single?.departments_count,
    icon: 'icon-faculties',
  },
  {
    label: 'study_type',
    value: props.single?.study_forms,
    icon: 'icon-faculties',
    type: 'array',
  },
  {
    label: 'teachers_count',
    value: props.single?.teachers_count,
    icon: 'icon-users-group',
  },
])

const universityStatisticsDiplomas = computed(() => [
  {
    label: 'professors',
    value: props.single?.professors_count,
  },
  {
    label: 'docents',
    value: props.single?.associate_professors_count,
  },
  {
    label: 'doctor_of_science',
    value: props.single?.science_doctors_count,
  },
  {
    label: 'candidate_of_science',
    value: props?.single?.science_candidates_count,
  },
  {
    label: 'international_teachers',
    value: props.single?.foreign_teachers_count,
  },
])
</script>
<style>
.statistics:before {
  color: #0067ff;
}
</style>
