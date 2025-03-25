<template>
  <div class="flex flex-col gap-4">
    <FormGroup
      :label="$t('level_of_education')"
      label-class="text-xs !font-bold"
    >
      <FormSelect
        v-model="values.level"
        :options="degrees"
        :placeholder="$t('choose_education_level')"
        label-class="!text-xs"
        label-key="name"
        value-key="id"
        is-main
      />
    </FormGroup>
    <FormGroup :label="$t('education_sector')" label-class="text-xs !font-bold">
      <FormSelect
        v-model="values.direction"
        :options="directions"
        :placeholder="$t('choose_direction')"
        infinite-scroll
        label-class="!text-xs"
        label-key="name"
        selected-option-styles="h-[38px] !px-0 placeholder:text-xs"
        value-key="id"
        @load="emits('load', 10)"
        @on-toggle="toggledSelect = $event"
        @on-select="handleSelectDirections"
      >
        <template #selectedOption>
          <FormInput
            v-model="searchableDirections"
            :placeholder="direction ? direction.name : $t('direction_of_study')"
            class="w-full !p-0 !border-none outline-0"
            input-class="!text-xs placeholder:!text-dark placeholder:text-xs truncate"
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
    <FormGroup :label="$t('item')" label-class="text-xs !font-bold">
      <FormSelect
        :options="items"
        :placeholder="$t('select_university')"
        infinite-scroll
        label-class="!text-xs"
        label-key="name"
        value-key="id"
        @on-select="handleSelectItem"
        @load="emits('load-items')"
      />
    </FormGroup>
    <FormGroup :label="$t('education_form')" label-class="text-xs !font-bold">
      <FormSelect
        v-model="values.form_of_study"
        :options="formType"
        infinite-scroll
        :placeholder="$t('choose_form_of_study')"
        label-class="!text-xs"
        label-key="name"
        value-key="id"
      />
    </FormGroup>
    <FormGroup
      :label="$t('language_instruction')"
      label-class="text-xs !font-bold"
    >
      <FormMultipleSelect
        v-model="values.languages"
        :options="languages"
        :placeholder="$t('choose_language_instruction')"
        label-class="!text-xs"
        :active-label-key="langNameRec"
        :model-value="langShortRec"
        label-key="name"
        value-key="code"
        @on-select="handleSelectDirections1"
      />
    </FormGroup>
    <FormGroup :label="$t('city')" label-class="text-xs !font-bold">
      <FormSelect
        v-model="values.region"
        :options="regions"
        :placeholder="$t('choose_city')"
        input-classes="h-4 !text-xs placeholder:!text-dark placeholder:text-xs truncate"
        label-class="!text-xs"
        label-key="name"
        parent-input-classes="h-4"
        value-key="id"
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
        v-model:maxValue="maxValue"
        v-model:minValue="minValue"
        :max="100"
        :min="0"
        :step="1"
      />
    </FormGroup>
    <FormCheckbox
      v-model="values.checkbox"
      :checked="values.checkbox"
      :label="$t('sum_not_given')"
      checkbox-styles="w-5 h-5"
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

<script lang="ts" setup>
import { TArray } from 'ts-interface-checker'
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useHomeStore } from '~/store'
import { calculatePercentInRange, calculateValueInRange } from '~/utils'

interface Props {
  degrees: any[]
  directions: any[]
  items: any[]
  languages: any[]
  regions: any[]
  form: TForm<any>
  studyPeriod: any[]
  formType: any[]
}

interface Emits {
  (event: 'load', limit: number): void
  (event: 'load-items'): void

  (event: 'search', searchableDirections: string): void

  (event: 'search2', searchableDirectionsId: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const { t } = useI18n()

const { form } = unref(props)
const { values } = form

const min = ref(0)
const max = ref(100000000)

const minValue = ref(20)
const maxValue = ref(60)
const searchableDirections = ref(null)
const searchableDirectionsId = ref(null)
const searchableItemsId = ref(null)
const toggledSelect = ref(false)
const direction = ref<{ id: number; name: string }>()
const langNameRec = ref([])
let langName = []
const langShortRec = ref([])
let langShort = []
const handleSelectDirections = (option: { id: number; name: string }) => {
  direction.value = option
  values.direction = option.id
  toggledSelect.value = false
}
const handleSelectDirections1 = (option: { id: number; name: string }) => {
  if (!langName.includes(option.name) && !langShort.includes(option.id)) {
    langName.push(option.name)
    langShort.push(option.code)
    langNameRec.value = langName
    langShortRec.value = langShort
    values.language = langShortRec.value
  } else {
    langName = langName.filter((o) => o !== option.name)
    langShort = langShort.filter((o) => o !== option.code)
    langNameRec.value = langName
    langShortRec.value = langShort
    values.language = langShortRec.value
  }

  toggledSelect.value = false
}

const handleSelectItem = (option: {
  id: number
  name: string
  university: { id: number; name: string }
}) => {
  values.item = option?.id
}

watch(
  () => searchableDirections.value,
  (value) => {
    emits('search', value)
  },
  { deep: true, immediate: true }
)

watch(
  () => searchableDirectionsId.value,
  (value) => {
    emits('search2', value)
  },
  { deep: true, immediate: true }
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
</script>
