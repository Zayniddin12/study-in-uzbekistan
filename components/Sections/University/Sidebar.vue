<template>
  <div class="bg-white lg:rounded-2xl p-4">
    <p class="text-xl leading-112 font-medium text-dark">
      {{ $t('contact_info') }}
    </p>
    <div class="flex flex-col gap-4 mt-3">
      <div v-for="item in list" :key="item?.card?.title">
        <CardContactInfo
          v-if="item?.card?.value"
          :card="item?.card"
          :is-hover="item?.isHover"
          :target-blank="item?.targetBlank"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IUniversity } from '~/types/common'

const { t } = useI18n()

interface Props {
  single: IUniversity
}

const { single } = defineProps<Props>()

const list = computed(() => [
  {
    card: {
      link: `tel:${single?.phone}`,
      icon: 'icon-phone',
      title: t('phone'),
      value: phoneNumberFormatter(single?.phone),
    },
    isHover: true,
    targetBlank: false,
  },
  {
    card: {
      link: `tel:${single?.tg_whatsapp_phone}`,
      icon: 'icon-phone',
      title: 'Telegram / WhatsApp',
      value: phoneNumberFormatter(single?.tg_whatsapp_phone),
    },
    isHover: true,
    targetBlank: false,
  },
  {
    card: {
      link: `mailto:${single?.email}`,
      icon: 'icon-sms',
      title: t('email'),
      value: single?.email,
    },
    isHover: true,
    targetBlank: false,
  },
  {
    card: {
      link: single?.website,
      icon: 'icon-global',
      title: t('site'),
      value: single?.website,
    },
    isHover: true,
    targetBlank: true,
  },
  {
    card: {
      icon: 'icon-building',
      title: t('university'),
      value: single?.type_display,
    },
    isHover: false,
    targetBlank: false,
  },
  {
    card: {
      icon: 'icon-location',
      title: t('city'),
      value: single?.region?.name,
    },
    isHover: false,
    targetBlank: false,
  },
  {
    card: {
      icon: 'icon-routing',
      title: t('address'),
      value: single?.address,
    },
    isHover: false,
    targetBlank: false,
  },
])
</script>
