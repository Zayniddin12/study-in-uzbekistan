<template>
  <div class="flex flex-col gap-4">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-5">
      <FormGroup
        :label="$t('additional_program')"
        label-class="!font-bold"
        main-classes="!gap-[6px]"
      >
        <FormSelect
          v-model="values.additional"
          :options="addChoices"
          :placeholder="$t('choose_additional_program')"
          class="h-10"
          label-key="label"
          value-key="value"
        />
      </FormGroup>
      <FormGroup
        :label="$t('education_form')"
        label-class="!font-bold"
        main-classes="!gap-[6px]"
      >
        <FormSelect
          v-model="values.form_of_study"
          :options="formType"
          infinite-scroll
          :placeholder="$t('choose_form_of_study')"
          class="h-10"
          label-key="label"
          value-key="value"
          @load="emits('loadMore', 10)"
        />
      </FormGroup>
      <FormGroup
        :label="$t('language_instruction')"
        label-class="!font-bold"
        main-classes="!gap-[6px]"
      >
        <FormSelect
          v-model="values.language"
          :options="languages"
          :placeholder="$t('choose_language_instruction')"
          class="h-10"
          label-key="name"
          value-key="code"
        />
      </FormGroup>
      <FormGroup
        :label="$t('city')"
        label-class="!font-bold"
        main-classes="!gap-[6px]"
      >
        <FormSelect
          v-model="values.region"
          :options="regions"
          :placeholder="$t('choose_city')"
          class="h-10"
          label-key="name"
          value-key="id"
        />
      </FormGroup>
      <FormGroup
        :label="$t('duration_of_training_upto')"
        label-class="text-xs !font-bold"
      >
        <FormSelect
          v-model="values.duration"
          :options="studyPeriod"
          :placeholder="$t('choose_duration_of_training_upto')"
          infinite-scroll
          label-class="!text-xs"
          label-key="name"
          value-key="id"
          @load="emits('loadMore', 10)"
        />
      </FormGroup>
    </div>
    <FormGroup
      :label="$t('sum_contracts')"
      label-class="!font-bold"
      main-classes="!gap-[6px]"
    >
      <div class="flex-center-between">
        <p class="text-sm leading-normal font-medium text-dark">
          {{ formatNumberSpace(calculateValueInRange(+min, +max, minValue)) }}
          UZS
        </p>
        <p class="text-sm leading-normal font-medium text-dark">
          {{ formatNumberSpace(calculateValueInRange(+min, +max, maxValue)) }}
          UZS
        </p>
      </div>
      <FormDoubleRange
        v-model:maxValue="maxValue"
        v-model:minValue="minValue"
        :max="100"
        :min="0"
        :minus-value="2"
        :plus-value="1"
        :step="1"
      />
    </FormGroup>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import {
  calculatePercentInRange,
  calculateValueInRange,
  formatNumberSpace,
} from '~/utils'

interface Props {
  degrees: any[]
  directions: any[]
  items: any[]
  languages: any[]
  regions: any[]
  form: TForm<any>
  formType: any[]
  studyPeriod: any[]
}
interface Emits {
  (event: 'load', limit: number): void
  (event: 'loadMore', limit: any): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const { form } = unref(props)
const { values } = form

const { t } = useI18n()

const min = ref(6000000)
const max = ref(100000000)

const minValue = ref(20)
const maxValue = ref(60)

watch([() => minValue.value, () => maxValue.value], () => {
  values.minValue = calculateValueInRange(
    +min.value,
    +max.value,
    minValue.value
  )
  values.maxValue = calculateValueInRange(
    +min.value,
    +max.value,
    maxValue.value
  )
})

watch(
  [() => values.minValue, () => values.maxValue],
  () => {
    minValue.value = calculatePercentInRange(
      +min.value,
      +max.value,
      values.minValue
    )
    maxValue.value = calculatePercentInRange(
      +min.value,
      +max.value,
      values.maxValue
    )
  },
  {
    immediate: true,
  }
)

const rangeList = reactive([
  'till_a_month',
  'a_month',
  'period',
  'a_year',
  'two_years',
  'four_years',
])

const studyFormOptions = [
  {
    label: t('all_study_forms'),
    value: '',
  },
  {
    label: t('full_time'),
    value: 1,
  },
  {
    label: t('part_time_part'),
    value: 2,
  },

  {
    label: t('part_time'),
    value: 3,
  },
  {
    label: t('distance'),
    value: 4,
  },
]

const addChoices = [
  {
    label: t('all_programs'),
    value: '',
  },
  {
    label: t('pre_university'),
    value: 1,
  },
  {
    label: t('short_program'),
    value: 2,
  },
  {
    label: t('other'),
    value: 3,
  },
]
</script>
