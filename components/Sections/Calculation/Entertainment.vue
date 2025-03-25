<template>
  <div class="flex flex-col gap-5">
    <FormRadioWithLabel
      icon="icon-tv"
      :label="$t('cinema')"
      v-bind="{ choices }"
      :active="values.cinema"
      @change="values.cinema = $event"
    />
    <FormRadioWithLabel
      icon="icon-gamepad"
      :label="$t('musics_movies')"
      v-bind="{ choices }"
      :active="values.musics"
      @change="values.musics = $event"
    />
    <FormRadioWithLabel
      icon="icon-football"
      :label="$t('sport_matches')"
      v-bind="{ choices }"
      :active="values.matches"
      @change="values.matches = $event"
    />
    <FormRadioWithLabel
      icon="icon-music"
      :label="$t('evening_events')"
      v-bind="{ choices }"
      :active="values.events"
      @change="values.events = $event"
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
    label: t('never'),
    value: 'never',
  },
  {
    label: t('weekly'),
    value: 'weekly',
  },
  {
    label: t('once_2_weeks'),
    value: 'once_2_weeks',
  },
  {
    label: t('monthly'),
    value: 'monthly',
  },
]
</script>
