<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="relative pb-14">
      <img
        class="absolute pointer-events-none w-screen absolute-x top-4"
        src="/images/full-samarkand-pattern.svg"
        alt="pattern"
      />
      <div class="relative container z-10 pt-[100px]">
        <UISectionTitle
          class="!text-xl md:!text-2.5xl !text-left"
          :title="$t('advantages_of_studying_in_uzbekistan')"
        />
        <p
          class="max-w-[782px] text-base md:text-xl leading-140 font-normal text-dark mt-2 md:mt-4"
        >
          {{ $t('advantages_of_studying_in_uzbekistan_text') }}
        </p>
      </div>

      <div class="container relative z-10">
        <div
          v-if="list?.length"
          class="p-7 bg-gray-200 border-[3px] border-white rounded-2xl in-number-shadow mt-8 grid md:grid-cols-[1fr_1px_1fr_1px_1fr] gap-3"
        >
          <template v-for="(i, index) in list" :key="i">
            <CardCause class="w-full" v-bind="{ index, card: i }" />
            <div
              v-if="index !== 2 && index !== 5"
              class="w-px bg-blue-200 h-[calc(100%-12px)]"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const list = ref()

function getList() {
  useApi()
    .$get('common/study-advantages/')
    .then((res) => {
      list.value = res
    })
}

getList()

const breadcrumbRoutes = computed(() => [
  {
    title: t('why_uzbekistan'),
    link: '/why-uzbekistan',
  },
  {
    title: 'Преимущества обучение в Узб',
    link: '/',
  },
])
</script>

<style scoped>
.in-number-shadow {
  box-shadow: 0 20px 65px 0 rgba(6, 40, 89, 0.32);
}
</style>
