<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <SectionsUniversityAbout />
    <ClientOnly>
      <UIMap class="relative" v-bind="{ locations }" />
    </ClientOnly>
    <div class="container my-16">
      <SectionsUniversityList :universities="list" v-bind="{ loading }" />
      <div
        v-if="paginationData.total > paginationData.limit"
        class="mt-6 flex justify-end"
      >
        <UIPagination
          :current-page="paginationData.currentPage"
          :limit="paginationData.limit"
          :total="paginationData.total"
          pagination-buttons
          @input="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import type { IBreadcrumb } from '~/types/components/breadcrumb'
import type { IUniversityMap } from '~/types/university'

const { t } = useI18n()
const route = useRoute()
const paginationData = reactive({
  total: 0,
  limit: 6,
  offset: 0,
  currentPage: route.query.page ? +route.query.page : 1,
})
const loading = ref(true)
const list = ref<any>([])
const locations = ref<IUniversityMap[]>([])

function getList() {
  loading.value = true
  useApi()
    .$get('/university/universities/', {
      params: {
        page_size: paginationData.limit,
        page: paginationData.currentPage,
        region: route.query.region ?? undefined,
      },
    })
    .then((res: any) => {
      list.value = res?.results
      paginationData.total = res?.count
    })
    .finally(() => (loading.value = false))
}

function getLocations() {
  useApi()
    .$get('/university/universities/map/')
    .then((res: IUniversityMap[]) => {
      locations.value = res.map((item) => {
        return {
          id: item.id,
          latitude: +item.location?.split(',')[0],
          longitude: +item.location?.split(',')[1],
          name: item.name,
          logo: item.logo,
        }
      })
    })
}

onMounted(() => {
  getLocations()
  getList()
})

function pageChange(page: number) {
  paginationData.currentPage = page
  useUpdateRouteQuery('page', '' + page)
  getList()
}

const breadcrumbRoutes = [
  {
    title: t('programs_and_universities'),
    link: '/programs-and-universities',
  },
  {
    title: t('universities'),
    link: '',
  },
] as IBreadcrumb[]
</script>
