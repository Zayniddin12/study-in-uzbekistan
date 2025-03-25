<template>
  <div class="c-date-picker relative z-10">
    <VueDatePicker
      v-model="value"
      :flow="['year', 'month', 'calendar']"
      :format="isYear ? 'yyyy' : 'dd.MM.yyyy'"
      :format-locale="formatLocale"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :max-date="maxDate"
      :min-date="minDate"
      :month-change-on-scroll="false"
      :year-picker="isYear"
      :year-range="yearRange"
      auto-apply
    >
      <template #dp-input="{ value }">
        <FormInput
          :model-value="value"
          :placeholder="$t(placeholder || 'dd_mm_yyyy')"
          readonly
          v-bind="{ error }"
        />
      </template>
    </VueDatePicker>

    <i class="icon-calendar text-[18px] absolute-y right-3 text-blue" />
  </div>
</template>

<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import { enUS, ru, uz } from 'date-fns/locale'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue?: string
  error?: boolean
  isYear?: boolean
  placeholder?: string
  minDate?: Date | string
  maxDate?: Date | string
}

const props = defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: string): void
}

const emit = defineEmits<Emits>()

const { locale } = useI18n()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const yearRange = [new Date().getFullYear() - 100, new Date().getFullYear() + 3]

const formatLocale = computed(() => {
  const locales: IObject = {
    uz,
    ru,
    en: enUS,
  }

  return locales[locale.value]
})
</script>

<style>
.c-date-picker .dp__overlay_container {
  height: 288px !important;
}

.c-date-picker .dp__input {
  padding: 8px 12px !important;
}

.c-date-picker .dp__input_wrap svg {
  display: none !important;
}

.c-date-picker .dp--menu-wrapper {
  overflow: hidden !important;
}
.c-date-picker .dp__menu {
  height: 288px;
}
</style>
