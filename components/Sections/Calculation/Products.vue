<template>
  <div class="flex flex-col gap-5">
    <FormRadioWithLabel
      icon="icon-home"
      :label="$t('when_home')"
      v-bind="{ choices }"
      :active="values.when_home"
      @change="values.when_home = $event"
    />
    <FormRadioWithLabel
      icon="icon-signpost"
      :label="$t('away_home')"
      v-bind="{ choices }"
      :active="values.away_home"
      @change="values.away_home = $event"
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
