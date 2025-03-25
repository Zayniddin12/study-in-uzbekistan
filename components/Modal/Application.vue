<script setup lang="ts">
import dayjs from 'dayjs'

import type { IApplication } from '~/types/application'

interface Props {
  show: boolean
  item?: IApplication
}
defineProps<Props>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Modal v-bind="{ show }" :title="`ID ${item?.id}`" @close="$emit('close')">
    <div class="p-5 pt-4">
      <div class="flex-y-center gap-3">
        <UIAvatar
          :image="item?.photo.file"
          default-image="/images/profile/building-default.svg"
          size="sm"
          class="border border-gray-200 before:hidden"
        />
        <div class="flex flex-col justify-center gap-1">
          <h3 class="text-sm font-medium text-dark leading-[14px]">
            {{ item?.study_plan_univer?.name }}
          </h3>
        </div>
      </div>
      <div class="grid grid-cols-2 mt-4 mb-5">
        <UIWrapperInfo
          :label="$t('sent_date')"
          :value="dayjs(item?.date).format('DD.MM.YYYY')"
        />
        <UIWrapperInfo :label="$t('application_status')">
          <UIBadgeStatus
            :status="item?.status?.toLowerCase() ?? 'in_moderation'"
            :status-display="item?.status_display ?? $t('in_moderation')"
          />
        </UIWrapperInfo>
      </div>
    </div>
  </Modal>
</template>
