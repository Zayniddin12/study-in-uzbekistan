<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <div>
      <h2 class="text-xl md:text-xl text-dark mb-4 font-medium">
        {{ $t('foreign_student_services') }}
      </h2>
      <div
        class="static-text no-margin small-content"
        v-html="
          formatRichText(single?.conditions_for_foreign_students_editorjs_html)
        "
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
    title: t('foreign_student_services'),
    link: '',
  },
])
</script>
<style scoped>
.static-text {
  word-break: break-word;
}

.static-text >>> pre {
  white-space: normal;
  max-width: 834px;
  font-family: sans-serif;
}
</style>
