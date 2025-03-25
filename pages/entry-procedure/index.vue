<template>
  <div class="entry-procedure overflow-hidden">
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div
      class="max-w-[818px] px-4 mx-auto text-center py-8 md:pt-[92px] md:pb-[133px]"
    >
      <h1
        class="text-2xl md:text-2.5xl leading-112 font-bold font-mts text-dark mb-4"
      >
        {{ $t('entry_procedure') }}
      </h1>
      <p class="text-lg md:text-xl leading-140 font-normal">
        {{ $t('entry_procedure_description') }}
      </p>
    </div>
    <SectionsMainLivingConditions />
    <SectionsMainMoveToUzbekistan />
    <SectionsMainNews />
    <SectionsMainFAQ class="!bg-white" />
    <SectionsMainReviews />
    <SectionsMainScholarship />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IBreadcrumb } from '~/types/components/breadcrumb'

const { t } = useI18n()

const breadcrumbRoutes = [
  {
    link: '/entry-procedure',
    title: t('entry_procedure'),
  },
] as IBreadcrumb[]
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .entry-procedure {
    background-image: url('/images/pattern/entry-procedure-pattern.webp');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 0;
  }
}
</style>
