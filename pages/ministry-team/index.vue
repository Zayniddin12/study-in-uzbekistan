<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="container py-7 md:py-16">
      <UIPageTitle :title="$t('ministry_team_photos')" class="mb-11" />
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-9">
        <CardMinistry v-for="item in cardMinistry" :key="item" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IBreadcrumb } from '~/types/components/breadcrumb'

const { t } = useI18n()
const cardMinistry = ref<any>([])

function getMinistry() {
  useApi()
    .$get('common/ministry-members/')
    .then((res) => {
      cardMinistry.value = res
    })
}
getMinistry()

const breadcrumbRoutes = [
  {
    title: t('about_project'),
    link: '/about-project',
  },
] as IBreadcrumb[]
</script>
