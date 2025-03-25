<template>
  <div class="container py-7 md:py-16">
    <UISectionTitle :title="$t('accommodation_calculator')" />
    <CalculationsCalculatoinIndex
      class="mt-4 md:mt-8"
      :data="selectedData"
      v-bind="{ loading, regions }"
      @next="step = 3"
      @get="getData"
      @loading="loading = true"
    />
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~/types/common'

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
      .catch((err) => {
        selectedData.value = null
        // byRegions.value = null
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
</script>
