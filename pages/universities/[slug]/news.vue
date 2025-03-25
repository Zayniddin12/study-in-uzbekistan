<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div>
      <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">
        {{ $t('news') }}
      </h2>
    </div>
    <div
      v-if="list?.length"
      class="grid md:grid-cols-2 lg:grid-cols-4 mt-4 max-md:gap-y-5 lg:gap-y-5"
    >
      <template v-if="loading">
        <CardMainNews
          v-for="(card, index) in 8"
          :key="card?.id"
          :news="card"
          :class="[
            { 'max-lg:!border-r-0': index === 1 },
            { '!border-r-[0px]': (index - 3) % 4 === 0 },
            { 'max-lg:!border-r-[0px]': (index - 1) % 2 === 0 },
          ]"
          loading
        />
      </template>
      <template v-if="!loading && list?.length">
        <CardMainNews
          v-for="(card, index) in list"
          :key="card?.id"
          :news="card"
          :class="[
            { 'max-lg:!border-r-0': index === 1 },
            { '!border-r-[0px]': (index - 3) % 4 === 0 },
            { 'max-lg:!border-r-[0px]': (index - 1) % 2 === 0 },
          ]"
          :is-first="index === 0"
          :is-last="index === list?.length - 1"
        />
      </template>
    </div>
    <template v-if="!loading && !list?.length">
      <CNoData class="col-span-3" />
    </template>

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
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CNoData from '~/components/CNoData.vue'
import useUpdateRouteQuery from '~/composables/useQueryChange'
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)
const paginationData = reactive({
  total: 0,
  limit: 8,
  offset: 0,
  currentPage: route.query.page ? +route.query.page : 1,
})
const list = ref()
const loading = ref(true)

function getList() {
  loading.value = true
  useApi()
    .$get(`/common/news/?university=${route.params.slug}`, {
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
    title: t('news'),
    link: '',
  },
])
</script>
