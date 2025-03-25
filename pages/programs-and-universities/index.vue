<template>
  <div class="overflow-hidden">
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container mt-8">
      <UIPageTitle :title="$t('programs')" />
      <SectionsProgramsFilterWithTab class="mt-8" />
      <div class="flex justify-between flex-wrap items-end my-8">
        <UISectionTitle :title="$t('universities')" />
      </div>
      <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
        <CardUniversity
          v-for="(card, index) in universities"
          :key="index"
          v-bind="{ card }"
        />
      </div>

      <NuxtLink
        to="/universities"
        class="group inline-flex items-center justify-center gap-2 text-base leading-normal font-medium text-blue hover:text-blue transition-300 ml-auto text-right"
      >
        <UIButton
          variant="primary-secondary"
          class="min-w-[156px] !h-11 !py-0 !bg-blue/[16%] !border-none hover:!bg-white hover:!border hover:!border-blue hover:text-blue transition-300"
        >
          {{ $t('all_universities') }}
          <i
            class="icon-arrow-right text-blue text-xl group-hover:text-blue transition-300"
          />
        </UIButton>
      </NuxtLink>
      <SectionsMainSteps />
      <SectionsMainFAQ />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IResponse } from '~/types/common'

const { t } = useI18n()

const universities = ref<any>([])
function getUniversities() {
  useApi()
    .$get('/university/universities/', {
      params: {
        page_size: 6,
      },
    })
    .then((res: IResponse<any>) => {
      universities.value = res.results
    })
}

getUniversities()

const breadcrumbRoutes = computed(() => [
  {
    title: t('programs_and_universities'),
    link: '/',
  },
])
</script>
