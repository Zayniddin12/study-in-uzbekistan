<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <SectionsAboutProjects />
    <SectionsMinistryTeam />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const breadcrumbRoutes = computed(() => [
  {
    title: t('about_project'),
    link: '/about-project',
  },
])
</script>
