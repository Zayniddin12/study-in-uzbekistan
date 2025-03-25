<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="md:pt-8 md:pb-16 container">
      <UISectionTitle
        :title="$t('living_condition')"
        class="!text-left !text-2.5xl leading-112 font-bold text-dark"
      />
      <div class="mt-6 md:mt-8 grid grid-cols-3 gap-6">
        <UIShimmer
          v-for="n of 6"
          :key="n"
          :loading="isLoading"
          height="347px"
          width="100%"
        />
        <CardMainLiving
          v-for="item of livingConditions"
          :key="item.id"
          :card="item"
        />
      </div>
      <div v-if="count > 12" class="flex justify-end mt-6">
        <UIPagination
          :current-page="queries.page"
          :total="count"
          limit="12"
          pagination-buttons
          @input="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useLivingConditionStore } from '~/store/condition'

const { fetchConditionList } = useLivingConditionStore()
const { livingConditions, isLoading, count } = storeToRefs(
  useLivingConditionStore()
)
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    title: t('living_conditions'),
    link: '/living_conditions',
  },
])

const queries = reactive({
  page: 1,
  ...route.query,
})

const handleChange = (page: number) => {
  queries.page = page
  router.push({ query: queries })
  window.scroll({ behavior: 'smooth', top: 0 })
}

watchEffect(() => {
  fetchConditionList(queries.page)
})
</script>
