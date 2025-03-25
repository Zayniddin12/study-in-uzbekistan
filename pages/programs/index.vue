<template>
  <div
    class="relative w-full h-full min-h-[calc(100vh-108px)] bg-white-200 pb-16"
  >
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container mt-4 md:mt-8">
      <div class="flex-center-between !z-50">
        <UIPageTitle :title="$t('programs')" />
        <i
          class="icon-filter text-2xl lg:hidden"
          @click="showFilter = !showFilter"
        />
      </div>

      <div class="w-full lg:grid lg:grid-cols-12 gap-6 mt-8">
        <div v-if="width > 1024" class="col-span-3 max-lg:hidden">
          <SectionsProgramsSidebar @get="filterGetData" />
        </div>
        <div class="lg:col-span-9">
          <Transition mode="out-in" name="fade">
            <div
              :key="loading"
              :class="{ 'h-full': !list.length }"
              class="flex flex-col gap-4"
            >
              <template v-if="loading && !list.length">
                <CardProgram
                  v-for="i in 5"
                  :key="i"
                  loading
                  v-bind="{ card: cardExample }"
                />
              </template>
              <template v-if="!loading && list.length">
                <CardProgram
                  v-for="(card, i) in list"
                  :key="i"
                  is-extra
                  v-bind="{ card }"
                />
              </template>

              <template v-if="!loading && !list.length">
                <EmptyProgram class="absolute -bottom-5 lg:relative" />
              </template>
            </div>
          </Transition>
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
    </div>

    <Transition name="fade">
      <div
        v-if="showFilter && width < 1024"
        class="absolute top-0 left-0 w-full p-4 bg-white-200 h-[calc(100vh-144px)] overflow-y-auto pb-[144px] sm:pb-4 z-[51]"
      >
        <button class="flex-y-center gap-2 mb-5" @click="showFilter = false">
          <i class="icon-chevron text-2xl block rotate-90" />
          <p class="text-sm leading-112 font-medium text-dark">
            {{ $t('back') }}
          </p>
        </button>
        <SectionsProgramsSidebar
          @get="filterGetData"
          @close-modal="closeAdnReload"
        />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const { width } = useWindowSize()

const list = ref<any>([])
const loading = ref<boolean>(false)
const showFilter = ref<boolean>(false)
const paginationData = reactive({
  limit: 5,
  offset: route.query.page ? +route.query.page * 5 - 5 : 0,
  currentPage: route.query.page ? +route.query.page : 1,
  total: 0,
})

const closeAdnReload = () => {
  showFilter.value = false
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}

function getData() {
  loading.value = true
  useApi()
    .$get('university/programs/', {
      params: {
        limit: paginationData.limit,
        offset: paginationData.offset,
        is_extra: !!route.query.is_extra,
        ...route.query,
      },
    })
    .then((res: IResponse<any>) => {
      paginationData.total = res?.count
      list.value = res.results
    })
    .finally(() => (loading.value = false))
}

getData()

function filterGetData() {
  console.log('test')
  showFilter.value = false
  paginationData.currentPage = 1
  paginationData.offset = 0
  useUpdateRouteQuery('page', undefined)
  getData()
}

function pageChange(page: number) {
  paginationData.currentPage = page
  paginationData.offset = page * paginationData.limit - paginationData.limit
  useUpdateRouteQuery('page', '' + page)
  getData()
  if (process.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

watch(
  () => showFilter.value,
  () => {
    if (showFilter.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
)

const breadcrumbRoutes = computed(() => [
  {
    title: t('programs'),
    link: '/',
  },
])

const cardExample = {
  title: 'Digital Marketing',
  avatar: '/images/fake/image-fake.png',
  city: 'Ташкент',
  direction: 'Маркетинг',
  level: 'Бакалавриат',
  language: 'Английский',
  duration: '4 года',
  form_of_study: 'Очная',
  free_training_opportunity: 'Есть',
  where_does_the_training_take_place: 'Ташкент',
  amount: 17457094,
}
</script>
