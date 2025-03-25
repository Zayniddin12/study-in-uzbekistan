<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>

    <div>
      <h2 class="text-lg md:text-xl text-dark font-medium">
        {{ $t('dormitory') }}
      </h2>
      <!--      accordion-->
      <div class="flex flex-col gap-4 mb-6">
        <SectionsFaq
          v-bind="{ faq: list }"
          question-class="!text-base !font-medium"
          is-dormitory
          answer-class="!font-normal !text-sm md:!text-base"
        />

        <div v-if="list && list.length === 0">{{ $t('no_data') }}</div>
      </div>

      <!--      media materials-->
      <h2 v-if="media" class="text-lg md:text-xl text-dark mb-3 font-medium">
        {{ $t('media_materials') }}
      </h2>
      <CardMediaMaterials v-bind="{ images: media }" @handle-img="handleImg" />
      <div v-if="media && media.length === 0">
        <CNoData class="col-span-3" />
      </div>
    </div>
    <UILightBox
      v-bind="{ show }"
      :images="media"
      :active="activeIndex"
      @close="closeModal"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CNoData from '~/components/CNoData.vue'
import { useUniversityStore } from '~/store/university'

const { t } = useI18n()
const route = useRoute()
const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)
const list = ref()
const media = ref()
const activeIndex = ref(0)
const show = ref(false)

function getList() {
  useApi()
    .$get(`/university/universities/${route.params.slug}/dormitory-info/`)
    .then((res: any) => {
      list.value = res?.faqs
      media.value = res?.media
    })
}

getList()

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
    title: t('dormitory'),
    link: '',
  },
])

const handleImg = (id: number) => {
  show.value = true
  activeIndex.value = id
}

function closeModal() {
  activeIndex.value = 0
  show.value = false
}
</script>
