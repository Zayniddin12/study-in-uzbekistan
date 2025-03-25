<template>
  <div class="bg-white-200">
    <Breadcrumb :breadcrumb="breadcrumbMenus" />
    <div class="pt-8 pb-8 md:pb-[131px]">
      <div class="container">
        <h1 class="heading-1">{{ $t('scholarship') }}</h1>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <UIShimmer
            v-for="n of 6"
            :key="n"
            :loading="isLoading"
            width="100%"
            height="208px"
          />
          <CardScholarshipCard
            v-for="item of scholarshipList"
            :key="item.id"
            v-bind="{
              ...item,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import Breadcrumb from '~/components/UI/Breadcrumb.vue'
import { useScholarshipStore } from '~/store/scholarship'

const { fetchScholarshipList } = useScholarshipStore()
const { scholarshipList, isLoading } = storeToRefs(useScholarshipStore())

fetchScholarshipList()
const { t } = useI18n()

const breadcrumbMenus = [
  {
    title: t('scholarship'),
    link: '/news',
  },
]
</script>

<style scoped></style>
