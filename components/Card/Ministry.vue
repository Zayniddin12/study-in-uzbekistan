<template>
  <div>
    <div
      class="pr-4 pb-4 rounded-2xl border border-gray-200 bg-white flex items-start gap-4"
    >
      <UIAvatar
        :image="item?.photo"
        class="!rounded-2xl before:!rounded-2xl -ml-3 -mt-3"
        size="lg"
      />
      <div class="pt-4 flex flex-col justify-between gap-3">
        <div>
          <h4 class="text-base !leading-130 font-bold text-dark mb-1">
            {{ item?.full_name }}
          </h4>
          <p class="line-clamp-3 text-gray text-xs !leading-130 font-normal">
            {{ item?.ministry }}
          </p>
        </div>
        <UIButton
          class="w-full"
          :text="$t('more')"
          icon="icon-arrow-right-up text-base leading-4 group-hover/button:rotate-45 transition-300"
          variant="primary-secondary"
          size="sm"
          @click="$router.push(`/ministry-team/${item?.id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IBreadcrumb } from '~/types/components/breadcrumb'
import type { IMinistry } from '~/utils/ministry'

const { t } = useI18n()

interface Props {
  item?: IMinistry
}
defineProps<Props>()

const breadcrumbRoutes = [
  {
    title: t('about_project'),
    link: '/about-project',
  },
] as IBreadcrumb[]
</script>
