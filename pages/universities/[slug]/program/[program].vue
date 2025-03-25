<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>
    <NuxtLink class="flex-y-center cursor-pointer gap-2 group" @click="goBack">
      <i
        class="icon-chevron block rotate-90 text-[28px] leading-7 group-hover:-translate-x-1 transition-300"
      />
      <p
        class="text-xl leading-130 font-medium text-dark group-hover:-translate-x-1 group-hover:underline transition-300"
      >
        {{ $t('back') }}
      </p>
    </NuxtLink>

    <div v-if="pending" class="mt-6">
      <ClientOnly>
        <CardProgram class="!p-0 !border-[0px]" no-university loading />
      </ClientOnly>
      <div class="static-text mt-6">
        <UIShimmer height="20px" width="100%" />
        <UIShimmer height="20px" width="90%" />
        <UIShimmer height="20px" width="80%" />
      </div>
    </div>

    <div v-else-if="single" class="mt-6">
      <ClientOnly>
        <CardProgram :card="single" class="!p-0 !border-[0px]" no-university />
      </ClientOnly>
      <div v-if="single?.id" class="static-text mt-6" v-html="formatRichText(single?.body_html)" />
    </div>

    <div v-else class="mt-6 text-center">
      <p>{{ $t('loading') }}...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from 'nuxt/app'
import { formatRichText } from '~/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const { data: single, pending } = await useAsyncData(
  `fetchSingleProgram-${route.params.program}`,
  () => useApi().$get(`/university/programs/${route.params.program}/`),
  { lazy: true, immediate: true }
)

onBeforeRouteUpdate((to, from) => {
  if (to.params.program !== from.params.program) {
    single.value = null;
    pending.value = true;
    useApi()
      .$get(`/university/programs/${to.params.program}/`)
      .then((res) => {
        single.value = res;
        pending.value = false;
      })
      .catch(() => {
        pending.value = false;
      })
  }
})

const goBack = () => {
  router.go(-1)
}

useSeoMeta({
  title: computed(() => single.value?.title || 'Default Title'),
  ogTitle: computed(() => single.value?.title || 'Default Title'),
})

const breadcrumbRoutes = computed(() => [
  {
    title: t('programs_and_universities'),
    link: '/programs-and-universities',
  },
  {
    title: single.value?.university?.name,
    link: `/universities/${single.value?.university?.id}/`,
  },
  {
    title: t('programs'),
    link: '',
  },
])
</script>
<style>
ol {
  position: relative;
}

li {
  position: relative;
}
</style>
