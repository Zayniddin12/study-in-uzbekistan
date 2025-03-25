<template>
  <div class="py-7 md:py-16 bg-white-200">
    <div class="container">
      <div class="flex justify-between items-end">
        <UISectionTitle :title="$t('news')" />

        <NuxtLink
          to="/news"
          class="max-md:hidden group flex-y-center gap-2 text-base leading-normal font-medium text-dark hover:text-blue transition-300"
        >
          {{ $t('all_news') }}
          <i
            class="icon-arrow-right text-gray text-xl group-hover:text-blue transition-300"
          />
        </NuxtLink>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 mt-5 md:mt-8">
        <template v-if="false">
          <CardMainNews
            v-for="(i, index) in 4"
            :key="i"
            :class="{ 'max-lg:!border-r-0': index === 1 }"
          />
        </template>

        <template v-if="!loading && list?.length">
          <CardMainNews
            v-for="(card, index) in list.slice(0, 4)"
            :key="card?.id"
            :news="card"
          />
        </template>
      </div>
      <NuxtLink
        to="/news"
        class="md:hidden group flex-center-between gap-2 text-base leading-normal font-medium text-dark hover:text-blue transition-300 mt-4"
      >
        {{ $t('all_news') }}
        <i
          class="icon-arrow-right text-gray text-xl group-hover:text-blue transition-300"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~/types/common'

const route = useRoute()

const list = ref()
const loading = ref(true)

function getList() {
  loading.value = true
  useApi()
    .$get(`/common/news/`, {})
    .then((res: IResponse<any>) => {
      res?.count
      list.value = res?.results
    })
    .finally(() => (loading.value = false))
}
getList()
</script>
