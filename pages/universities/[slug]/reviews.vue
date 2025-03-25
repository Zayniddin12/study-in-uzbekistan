<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div>
      <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">
        {{ $t('reviews') }}
      </h2>
      <Transition name="fade" mode="out-in">
        <div :key="loading" class="grid grid-cols-3 gap-4">
          <template v-if="loading">
            <CardUniversityReview
              v-for="(item, index) in 9"
              :key="index"
              class="!bg-white"
              :card="item"
              loading
            />
          </template>
          <template v-if="!loading && list?.length">
            <CardUniversityReview
              v-for="(item, index) in list"
              :key="index"
              :card="item"
            />
          </template>

          <template v-if="!loading && !list?.length">
            <EmptyRates class="col-span-3" />
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
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)
const paginationData = reactive({
  total: 0,
  limit: 9,
  offset: 0,
  currentPage: route.query.page ? +route.query.page : 1,
})
const list = ref()
const loading = ref(true)

function getList() {
  useApi()
    .$get(`/university/universities/${route.params.slug}/reviews/`, {
      params: {
        page_size: paginationData.limit,
        page: paginationData.currentPage,
      },
    })
    .then((res: IResponse<any>) => {
      paginationData.total = res?.count
      list.value = res?.results
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
    title: t('programs_and_universities'),
    link: '/programs-and-universities',
  },
  {
    title: single.value.name,
    link: `/universities/${single.value.id}/`,
  },
  {
    title: t('reviews'),
    link: '',
  },
])
</script>
