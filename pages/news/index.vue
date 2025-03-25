<template>
  <div class="bg-white-200">
    <Breadcrumb :breadcrumb="breadcrumbMenus" />
    <div class="md:pt-8 py-7 md:pb-16">
      <div class="container">
        <div class="flex justify-between items-end">
          <UISectionTitle
            :title="$t('news')"
            class="!text-2.5xl !leading-112"
          />
        </div>
        <div class="grid gap-y-6 md:grid-cols-2 lg:grid-cols-4 mt-5 md:mt-8">
          <template v-if="isLoading">
            <UIShimmer
              v-for="n of 4"
              :key="n"
              loading
              width="100%"
              height="308px"
            />
          </template>

          <CardMainNews
            v-for="item of newsList"
            v-else
            :key="item.id"
            :news="item"
            :class="{ 'max-lg:!border-r-0': item.id === 1 }"
          />
        </div>
        <div class="flex justify-end mt-6">
          <Pagination
            v-if="count > 15"
            :total="count"
            limit="16"
            :current-page="queries.page"
            @input="handleChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import Breadcrumb from '~/components/UI/Breadcrumb.vue'
import Pagination from '~/components/UI/Pagination/Pagination.vue'
import { useNewsStore } from '~/store/news'

const { fetchNewsList } = useNewsStore()
const { newsList, count, isLoading } = storeToRefs(useNewsStore())
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const queries = reactive({
  page: 1,
  ...route.query,
})

const breadcrumbMenus = [
  {
    title: t('news'),
    link: '/news',
  },
]

const handleChange = (page: number) => {
  queries.page = page
  router.push({ query: queries })
}

watchEffect(() => {
  fetchNewsList(queries.page)
})
</script>
