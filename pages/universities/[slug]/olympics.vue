<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div>
      <!-- <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">
        {{ $t('olympics') }}
      </h2> -->
      <Transition name="fade" mode="out-in">
        <div :key="loading" class="mt-6 grid md:grid-cols-2 gap-6">
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

          <template v-if="!loading && !list?.length">
            <CNoData class="col-span-3" />
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

import CNoData from '~/components/CNoData.vue'
import useUpdateRouteQuery from '~/composables/useQueryChange'
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const universityStore = useUniversityStore()
const single = computed(() => universityStore.single)

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
        university: route.params.slug,
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
    title: t('programs_and_universities'),
    link: '/programs-and-universities',
  },
  {
    title: single?.value?.name,
    link: `/universities/${single?.value?.id}`,
  },
  // {
  //   title: t('olympics'),
  //   link: '/',
  // },
])
</script>
