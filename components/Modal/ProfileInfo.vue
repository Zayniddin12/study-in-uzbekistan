<template>
  <Modal
    v-bind="{ show }"
    :title="t('profile.modal.title')"
    body-class="!max-w-[378px]"
    has-close-icon
    @close="$emit('close')"
  >
    <div class="p-5">
      <h2 class="mb-3 text-dark text-sm font-medium leading-[132%]">
        {{ t('profile.modal.sub_title') }}
      </h2>

      <div class="flex items-center gap-3 px-3 py-2 mb-5 rounded-lg bg-white">
        <img
          :src="
            universityName?.logo
              ? universityName.logo
              : '/images/svg/building.svg'
          "
          alt="Building Image Logo"
          class="w-12 h-12"
        />
        <p class="text-black text-[12px] font-bold leading-[140%]">
          {{ universityName?.name }}
        </p>
      </div>
      <p
        class="px-3 py-[10px] mb-5 text-black text-sm font-medium leading-[132%] bg-gray-200 rounded-lg gap-[10px]"
      >
        {{ t('profile.modal.message') }}
      </p>

      <UIButton
        :text="t('profile.modal.btn')"
        class="w-full"
        @click="$emit('close')"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface IUniversity {
  name: string
  logo: string
}

interface Props {
  show?: boolean
  universityName: IUniversity | undefined
}

defineProps<Props>()
defineEmits(['close'])

const { t } = useI18n()
</script>
