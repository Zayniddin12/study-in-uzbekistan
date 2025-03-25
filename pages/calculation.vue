<template>
  <div class="min-h-[calc(100vh-108px)] mb-10 bg-white-200">
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container pt-8">
      <UIPageTitle :title="$t('accommodation_calculator')" />
      <Transition name="fade" mode="out-in">
        <div :key="step" class="mt-8">
          <SectionsCalculation
            v-if="step === 1"
            :data="selectedData"
            v-bind="{ loading, regions }"
            @next="step = 2"
            @get="getData"
            @loading="loading = true"
          />
          <SectionsCalculationInfo
            v-if="step === 2"
            :data="selectedData"
            v-bind="{ regions, loading }"
            :by-regions="byRegions"
            :values="dataValues"
            @get="getData"
            @back="step = 1"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IResponse } from '~/types/common'

const { t } = useI18n()

const step = ref(1)
const selectedData = ref()
const dataValues = ref()
const loading = ref(true)
const regions = ref<any>([])
const byRegions = ref<any>([])

function getData(data: any) {
  dataValues.value = data
  loading.value = true
  if (data?.output === 'json') {
    useApi()
      .$post(`/common/calculator/`, {
        body: data,
      })
      .then((res: any) => {
        selectedData.value = res.by_selected_region
        byRegions.value = res?.by_other_regions
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    useApi()
      .$post(`/common/calculator/`, {
        body: data,
      })
      .then((res: any) => {
        downloadFile(res, 'calculator.xlsx')
      })
      .finally(() => {
        loading.value = false
      })
  }
}

function downloadFile(file: string, filename: string) {
  const url = window.URL.createObjectURL(new Blob([file]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  link.click()
  link.remove()
}

function getRegions() {
  return useApi()
    .$get('/common/regions/', {
      params: {
        limit: 20,
      },
    })
    .then((res: IResponse) => {
      regions.value = res.results
    })
}

getRegions()

const breadcrumbRoutes = computed(() => [
  {
    title: t('accommodation_calculator'),
    link: '/',
  },
])
</script>
