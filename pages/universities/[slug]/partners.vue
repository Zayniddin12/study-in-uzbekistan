<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div>
      <h2 class="text-xl md:text-xl text-dark mb-4 font-medium">
        {{ $t('international_partners') }}
      </h2>
      <div
        class="static-text no-margin small-content"
        v-html="formatRichText(single?.international_partnership_editorjs_html)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { convertBlocksToHTML } from '~/helpers'
import { useUniversityStore } from '~/store/university'
import { formatRichText } from '~/utils'

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
    title: t('international_partners'),
    link: '',
  },
])
</script>
<style scoped>
.static-text {
  word-break: break-word;
}
</style>
