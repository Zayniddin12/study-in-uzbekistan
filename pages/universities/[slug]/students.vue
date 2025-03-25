<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>

    <div>
<!--      <div class="mb-6">-->
<!--        <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">-->
<!--          {{ $t('student_success') }}-->
<!--        </h2>-->
<!--        <p>{{ $t('about_student_success') }}</p>-->
<!--      </div>-->
      <div>
        <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">
          {{ $t('famous_graduates') }}
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-5"
        >
          <CardStudents
            v-for="(card, i) of list"
            :key="i"
            v-bind="{ students: card }"
          />

          <template v-if="list && list.length === 0">
            <CNoData class="col-span-3" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CNoData from '~/components/CNoData.vue'
import { useUniversityStore } from '~/store/university'

const { t } = useI18n()
const route = useRoute()
const universityStore = useUniversityStore()
const single = computed(() => universityStore.single)

const list = ref<any[]>()
function getList() {
  useApi()
    .$get(`/university/universities/${route.params.slug}/graduates/`)
    .then((res) => {
      list.value = res
    })
}

getList()

const breadcrumbRoutes = computed(() => [
  {
    title: t('programs_and_universities'),
    link: '/programs-and-universities',
  },
  {
    title: single?.value?.name,
    link: `/universities/${single?.value?.id}`,
  },
  {
    title: t('graduates_students'),
    link: '/',
  },
])
</script>
