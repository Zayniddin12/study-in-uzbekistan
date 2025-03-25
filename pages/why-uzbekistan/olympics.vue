<template>
  <div class="bg-white min-h-[calc(100vh-108px)]">
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container mt-8 pb-16">
      <!-- <UIPageTitle :title="$t('olympics')" /> -->

      <Transition name="fade" mode="out-in">
        <div
          :key="loading"
          class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <template v-if="loading">
            <!-- <CardOlympics
              v-for="(i, index) in 6"
              :key="index"
              loading
              class="!bg-white"
            /> -->
          </template>
          <template v-if="!loading && list?.length">
            <!-- <CardOlympics
              v-for="(card, index) in list"
              :key="index"
              v-bind="{ card }"
              class="bg-white-200"
            /> -->
          </template>
        </div>
      </Transition>

      <div
        v-if="paginationData.total > paginationData.limit"
        class="mt-6 flex justify-end"
      >
        <UIPagination
          :total="paginationData.total"
          :limit="paginationData.limit"
          :current-page="paginationData.currentPage"
          pagination-buttons
          @input="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const list = ref()
const route = useRoute()
const paginationData = reactive({
  total: 0,
  limit: 6,
  offset: 0,
  currentPage: route.query.page ? +route.query.page : 1,
})
const loading = ref(true)

function getList() {
  loading.value = true
  useApi()
    .$get('/common/olympiads/', {
      params: {
        page_size: paginationData.limit,
        page: paginationData.currentPage,
      },
    })
    .then((res: IResponse) => {
      list.value = res?.results
      paginationData.total = res?.count
    })
    .finally(() => (loading.value = false))
}

getList()

function pageChange(page: number) {
  paginationData.currentPage = page
  useUpdateRouteQuery('page', '' + page)
  getList()
}

const breadcrumbRoutes = computed(() => [
  {
    title: t('why_uzbekistan'),
    link: '/why-uzbekistan',
  },
  {
    title: t('olympics'),
    link: '/',
  },
])
</script>
