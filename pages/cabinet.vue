<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div
      class="container py-6 pb-16 grid grid-cols-1 lg:grid-cols-4 space-y-6 lg:space-y-0 lg:gap-6 items-start"
    >
      <UISidebarTabs v-bind="{ tabs }" />
      <NuxtPage class="col-span-3"></NuxtPage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tabs = [
  {
    title: 'personal_info',
    icon: 'icon-user-circle',
    link: '/cabinet',
  },
  {
    title: 'contact_info',
    icon: 'icon-clipboard-list',
    link: '/cabinet/contact',
  },
  {
    title: 'edu_skills',
    icon: 'icon-lightbulb',
    link: '/cabinet/edu-skills',
  },
  {
    title: 'where_study',
    icon: 'icon-compass',
    link: '/cabinet/where-study',
  },
  {
    title: 'education_form',
    icon: 'icon-checklist',
    link: '/cabinet/form-education',
  },
  {
    title: 'motivation_text',
    icon: 'icon-messages',
    link: '/cabinet/motive-letter',
  },
  {
    title: 'my_applications',
    icon: 'icon-documents',
    link: '/cabinet/my-applications',
  },
]

const breadcrumbRoutes = computed(() => [
  {
    title: t('personal_account'),
    link: '/cabinet',
  },
])
</script>
