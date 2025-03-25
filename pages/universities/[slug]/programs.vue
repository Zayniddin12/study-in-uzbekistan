<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div class="mb-6">
      <SectionsProgramsFilterWithTab
        is-program
        @submit="(data) => getData(data)"
      />
    </div>
    <div>
      <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">
        {{ $t('programs') }}
      </h2>
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <template v-if="loading">
            <CardProgram
              v-for="(card, index) in 6"
              :key="index"
              no-university="false"
              v-bind="{ card }"
              class="mb-4 last:mb-0"
              loading
            />
          </template>
          <template v-if="!loading && list?.length">
            <CardProgram
              v-for="(card, index) in list"
              :key="index"
              :no-university="false"
              v-bind="{ card }"
              is-extra
              class="mb-4 last:mb-0"
            />
          </template>

          <template v-if="!loading && !list?.length">
            <div>
              <EmptyProgram />
            </div>
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
  limit: 3,
  offset: route.query.page ? +route.query.page * 3 - 3 : 0,
  currentPage: route.query.page ? +route.query.page : 1,
  total: 0,
})

const loading = ref(true)
const list = ref()

function clean(obj: any) {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName]
    }
  }
  return obj
}

function getData(filter?: any) {
  loading.value = true
  useApi()
    .$get('university/programs/', {
      params: {
        limit: paginationData.limit,
        offset: paginationData.offset,
        university: route.params.slug,
        ...clean(filter),
      },
    })
    .then((res: IResponse<any>) => {
      paginationData.total = res?.count
      list.value = res.results
    })
    .finally(() => (loading.value = false))
}

getData()

function pageChange(page: number) {
  paginationData.currentPage = page
  paginationData.offset = page * paginationData.limit - paginationData.limit
  useUpdateRouteQuery('page', '' + page)
  getData()
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
    title: t('programs'),
    link: '',
  },
])
</script>

<style scoped>
.router-link-active {
  color: #0067ff;
}
</style>
