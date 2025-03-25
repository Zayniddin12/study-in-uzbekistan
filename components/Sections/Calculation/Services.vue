<template>
  <div class="flex flex-col gap-5">
    <FormRadioWithLabel
      icon="icon-dumbbell"
      :label="$t('gym')"
      v-bind="{ choices }"
      :active="values.gym"
      @change="values.gym = $event"
    />
    <FormRadioWithLabel
      icon="icon-scissors"
      :label="$t('barber')"
      v-bind="{ choices }"
      :active="values.barber"
      @change="values.barber = $event"
    />
    <FormRadioWithLabel
      icon="icon-cosmetic"
      :label="$t('cosmetics')"
      v-bind="{ choices }"
      :active="values.cosmetic"
      @change="values.cosmetic = $event"
    />
    <FormRadioWithLabel
      icon="icon-iphone"
      :label="$t('mobile_plan')"
      v-bind="{ choices }"
      :active="values.mobile"
      @change="values.mobile = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()
const { form } = unref(props)
const { values } = form

const { t } = useI18n()

const choices = [
  {
    label: t('cheap'),
    value: 'cheap',
  },
  {
    label: t('average'),
    value: 'average',
  },
  {
    label: t('expensive'),
    value: 'expensive',
  },
]
</script>
