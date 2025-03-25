<template>
  <div class="flex flex-col gap-4">
    <div class="grid md:grid-cols-3 grid-cols-1 gap-5">
      <FormGroup
        :label="$t('level_of_education')"
        label-class="!font-bold"
        main-classes="!gap-[6px]"
      >
        <FormSelect
          v-model="values.level"
          :options="degrees"
          :placeholder="$t('choose_education_level')"
          class="h-10"
          label-key="name"
          value-key="id"
          is-main
        />
      </FormGroup>
      <FormGroup
        :label="$t('direction_of_study')"
        label-class="!font-bold"
        main-classes="!gap-[6px]"
      >
        <FormSelect
          v-model="values.direction"
          :options="directions"
          :placeholder="$t('choose_direction')"
          class="h-10"
          infinite-scroll
          label-key="name"
          selected-option-styles="h-10 !px-0 placeholder:text-sm placeholder:font-medium"
          value-key="id"
          @load="emits('load', 10)"
          @on-toggle="toggledSelect = $event"
          @on-select="handleSelectDirections"
        >
          <template #selectedOption="slotProps">
            <FormInput
              v-model="searchableDirections"
              :placeholder="
                values.direction ? values.direction : $t('choose_direction')
              "
              class="w-full h-10 !p-0 !border-none outline-0"
              input-class="placeholder:!text-dark placeholder:text-sm placeholder:font-medium"
              type="text"
            >
              <template #suffix>
                <div class="px-3 h-full flex-center">
                  <span
                    :class="{ 'rotate-180': toggledSelect }"
                    class="icon-chevron transition-all duration-200 inline-block text-blue"
                  ></span>
                </div>
              </template>
            </FormInput>
          </template>
        </FormSelect>
      </FormGroup>
      <FormGroup
        :label="$t('education_form')"
        label-class="!font-bold"
        main-classes="!gap-[6px]"
      >
        <FormSelect
          v-model="values.form_of_study"
          infinite-scroll
          :options="formType"
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
        :label="$t('choose_duration_of_training_upto')"
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
        v-model:maxValue="maxValue"
        v-model:minValue="minValue"
        :max="100"
        :min="0"
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
  (event: 'load', page_size: number): void
  (event: 'loadMore', page_size: any): void
  (event: 'search', searchableDirections: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const { form } = unref(props)
const { values } = form

const { t } = useI18n()

const min = ref(6000000) // 6000000
const max = ref(100000000)

const minValue = ref(20)
const maxValue = ref(60)
const searchableDirections = ref('')
const toggledSelect = ref(false)

const handleSelectItem = (option: {
  id: number
  name: string
  university: { id: number; name: string }
}) => {
  values.item = option.university.id
}
const handleSelectDirections = (option: {
  id: number
  name: string | null
}) => {
  searchableDirections.value = option.name
  values.direction = option.id
  toggledSelect.value = false
}

watch(
  () => searchableDirections.value,
  (value) => {
    emits('search', value)
  }
)

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
const rangeList = reactive([
  'till_a_month',
  'a_month',
  'period',
  'a_year',
  'two_years',
  'four_years',
])
</script>
