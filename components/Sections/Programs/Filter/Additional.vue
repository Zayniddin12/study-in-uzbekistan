<template>
  <div class="flex flex-col gap-4">
    <FormGroup
      :label="$t('additional_program')"
      label-class="text-xs !font-bold"
    >
      <FormSelect
        v-model="values.additional"
        :options="programsType"
        label-key="name"
        value-key="id"
        label-class="!text-xs"
        :placeholder="$t('choose_additional_program')"
      />
    </FormGroup>
    <FormGroup :label="$t('education_form')" label-class="text-xs !font-bold">
      <FormSelect
        v-model="values.form_of_study"
        :options="formType"
        value-key="value"
        label-class="!text-xs"
        label-key="label"
        :placeholder="$t('choose_form_of_study')"
      />
    </FormGroup>
    <FormGroup
      :label="$t('language_instruction')"
      label-class="text-xs !font-bold"
    >
      <FormSelect
        v-model="values.language"
        :options="languages"
        label-key="name"
        value-key="code"
        label-class="!text-xs"
        :placeholder="$t('choose_language_instruction')"
      />
    </FormGroup>
    <FormGroup :label="$t('city')" label-class="text-xs !font-bold">
      <FormSelect
        v-model="values.region"
        :options="regions"
        label-key="name"
        value-key="id"
        label-class="!text-xs"
        :placeholder="$t('choose_city')"
      />
    </FormGroup>
    <div class="w-full h-px bg-[#D9E0E8]" />
    <FormGroup :label="$t('sum_contracts')" label-class="text-xs !font-bold">
      <div class="flex-center-between">
        <p class="text-xs leading-normal font-normal text-dark">
          {{ formatNumberSpace(calculateValueInRange(+min, +max, minValue)) }}
          UZS
        </p>
        <p class="text-xs leading-normal font-normal text-dark">
          {{ formatNumberSpace(calculateValueInRange(+min, +max, maxValue)) }}
          UZS
        </p>
      </div>
      <FormDoubleRange
        v-model:minValue="minValue"
        v-model:maxValue="maxValue"
        :min="0"
        :max="100"
        :step="1"
      />
    </FormGroup>
    <FormCheckbox
      v-model="values.checkbox"
      :checked="values.checkbox"
      checkbox-styles="w-5 h-5"
      :label="$t('sum_not_given')"
      label-styles="text-sm font-medium text-dark"
    />
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
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import type { IResponse } from '~/types/common'
import { calculatePercentInRange, calculateValueInRange } from '~/utils'

const { t } = useI18n()

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

const props = defineProps<Props>()
const { form } = unref(props)
const { values } = form

const min = ref(6000000)
const max = ref(50000000)

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

// watch min and max values in form values and get percent
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

const programsType = ref<{ id: string; name: string }[]>([])

const getProgramsType = () => {
  useApi()
    .$get<IResponse<{ id: string; name: string }>>('/common/program_type/')
    .then(
      (res) =>
        (programsType.value = [
          {
            name: t('all_programs'),
            id: '',
          },
          ...res.results,
        ])
    )
}

getProgramsType()
</script>
