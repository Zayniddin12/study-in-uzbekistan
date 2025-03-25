<template>
  <div
    class="border-[0.5px] border-gray-200 rounded-xl bg-white-200 p-4 hover:border-blue hover:bg-white transition-300 cursor-pointer"
  >
    <div class="flex-y-center gap-3">
      <UIAvatar
        :image="item?.photo.file"
        default-image="/images/profile/building-default.svg"
        size="sm"
        class="border border-gray-200 before:hidden"
      />
      <div class="flex flex-col justify-center gap-1">
        <h3 class="text-sm font-medium text-dark leading-[14px] line-clamp-2">
          {{ item?.study_plan_univer?.name }}
        </h3>
        <p class="text-xs text-blue leading-normal font-normal">
          ID {{ item?.id }}
        </p>
      </div>
    </div>
    <div class="mt-3 flex-center-between">
      <p class="text-gray text-xs leading-normal">
        {{ $t('sent_date') + dayjs(item?.created_at).format('DD.MM.YYYY') }}
      </p>
      <UIBadgeStatus
        :status="item?.status?.toLowerCase() ?? 'in_moderation'"
        :status-display="item?.status_display ?? $t('in_moderation')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { IApplication } from '~/types/application'

interface Props {
  item?: IApplication
}
defineProps<Props>()
</script>
