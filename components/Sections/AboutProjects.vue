<template>
  <div
    v-if="getHeaderTitles.about_project_icon"
    class="container pt-8 flex-center-between gap-10 md:gap-[125px] max-md:flex-col-reverse"
  >
    <div>
      <UIPageTitle
        :title="getHeaderTitles.about_project_title"
        class="mb-2 md:mb-4"
      />
      <p class="text-dark text-lg md:text-xl leading-140">
        {{ getHeaderTitles.about_project_description }}
      </p>
    </div>
    <img
      :src="getHeaderTitles.about_project_icon"
      alt="About Project"
      class="max-w-[278px]"
    />
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '~/store/common'

const commonStore = useCommonStore()
const getHeaderTitles = computed(() => {
  return {
    about_project_title: commonStore.headerTitles.about.about_project_title,
    about_project_description:
      commonStore.headerTitles.about.about_project_description,
    about_project_icon: commonStore.headerTitles.about.about_project_icon,
  }
})
</script>
