<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container mt-8 pb-16">
      <UIPageTitle :title="$t('preparatory_departments')" />

      <Transition name="fade" mode="out-in">
        <div
          :key="loading"
          class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <template v-if="loading">
            <CardColleges v-for="(i, index) in 6" :key="index" loading />
          </template>
          <template v-if="!loading && list?.length">
            <CardColleges
              v-for="(card, index) in list"
              :key="index"
              v-bind="{ card }"
            />
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
    .$get('/common/preparatory-programs/', {
      params: {
        page_size: paginationData.limit,
        page: paginationData.currentPage,
      },
    })
    .then((res: IResponse) => {
      list.value = res.results
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
    title: t('preparatory_departments'),
    link: '/',
  },
])
</script>
