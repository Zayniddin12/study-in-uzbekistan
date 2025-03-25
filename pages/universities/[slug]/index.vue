<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div>
      <SectionsUniversityStatistics v-bind="{ single }" />
      <SectionsUniversityInfo v-bind="{ single }" class="mt-6" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useUniversityStore } from '~/store/university'

const { t } = useI18n()

const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)

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
    title: t('about_university'),
    link: '',
  },
])
</script>
<style scoped>
.static-text {
  word-break: break-word;
}
</style>
