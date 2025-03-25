<template>
  <div class="relative overflow-hidden -mt-[112px]">
    <SectionsMain />
    <SectionsMainWhyUzbekistan />
    <SectionsMainEducationInNumbers />
    <SectionsMainVideo />
    <div class="bg-white-200">
      <SectionsMainSteps />
      <template v-if="isVisibleCalculation">
        <SectionsMainCalculations />
      </template>
    </div>
    <SectionsMainLivingConditions />
    <SectionsMainMoveToUzbekistan :title="titles.uzbekistan_text" :subtitle="titles.uzbekistan_subtext" />
    <SectionsMainNews />
    <SectionsMainReviews />
    <SectionsMainExplore :title="titles.uzbekistan_learning"/>
    <SectionsMainFAQ />
    <LayoutsLoader />
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '~/store/common'
import {useHomeStore} from "~/store";

const store = useHomeStore()
const titles = computed(() => store.fetchTitles )
store.getTitles()

interface SiteInfo {
  main_page_photo: string
  about_uzbekistan_vid_link: string
  main_page_title: string
  main_page_subtitle: string
  telegram: string | null
  whatsapp: string | null
  instagram: string | null
  facebook: string | null
  youtube: string | null
  twitter: string | null
  calculator_visible: boolean
  footer_site_info: string
  why_uzbekistan_title: string
  why_uzbekistan_description: string
  about_project_title: string
  about_project_description: string
  about_project_icon: string
}

const route = useRoute()
const isVisibleCalculation = ref(false)
const commonStore = useCommonStore()

const visibleCalculation = () => {
  useApi()
    .$get<SiteInfo>('/common/config/')
    .then((res: SiteInfo) => {
      isVisibleCalculation.value = res.calculator_visible
      commonStore.headerTitles.about.about_project_title =
        res.about_project_title
      commonStore.headerTitles.about.about_project_description =
        res.about_project_description
      commonStore.headerTitles.about.about_project_icon = res.about_project_icon
      commonStore.headerTitles.why_uzbekistan.why_uzbekistan_title =
        res.why_uzbekistan_title
      commonStore.headerTitles.why_uzbekistan.why_uzbekistan_description =
        res.why_uzbekistan_description
    })
}

visibleCalculation()

onMounted(() => {
  if (route.query?.section) {
    setTimeout(() => {
      const section = document.getElementById(route.query.section as string)
      section?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 100)
  }
})
</script>

<style scoped>
.swiper {
  overflow: unset;
}
</style>
