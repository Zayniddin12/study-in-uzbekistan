<template>
  <div class="flex flex-col gap-5">
    <FormRadioWithLabel
      icon="icon-t-shirt"
      :label="$t('price_range')"
      v-bind="{ choices }"
      :active="values.shopping"
      @change="values.shopping = $event"
    />

    <FormGroup :label="$t('how_many_products_per_month')">
      <FormRange v-model="values.count" max="7" step="1" />
      <template #opposite>
        <p v-if="values.count" class="text-sm leading-5 font-medium text-dark">
          {{ values.count }}
        </p>
      </template>
    </FormGroup>
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
