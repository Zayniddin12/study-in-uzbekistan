<template>
  <div class="grid lg:grid-cols-2 gap-6 pb-10">
    <div class="w-full bg-white rounded-2xl py-6">
      <div class="px-6 mb-5">
        <p class="text-2xl font-medium font-mts leading-112 text-dark">
          {{ $t('total_price_live', { region: data?.region }) }}
        </p>
        <p class="text-[32px] text-blue font-bold leading-112 mb-5 mt-4">
          {{ formatNumberSpace(data?.total) }} {{ filter.currency }}
        </p>
        <div class="grid md:grid-cols-2 gap-x-5 gap-y-4 mt-5">
          <FormGroup :label="$t('currency')">
            <FormSelect
              v-model="filter.currency"
              :options="currencies"
              label-key="label"
              value-key="value"
              :placeholder="$t('choose_currency')"
              selected-option-styles="!border-white-100"
            />
          </FormGroup>
          <FormGroup :label="$t('stay_length')">
            <FormSelect
              v-model="filter.stay"
              :options="durationChoices"
              label-key="label"
              value-key="value"
              :placeholder="$t('choose_stay_length')"
              selected-option-styles="!border-white-100"
            />
          </FormGroup>
          <FormGroup
            :key="regions?.length"
            :label="$t('city')"
            class="md:col-span-2"
          >
            <FormSelect
              v-model="filter.city"
              :options="regions"
              label-key="name"
              value-key="id"
              :placeholder="$t('choose_city')"
              selected-option-styles="!border-white-100"
            />
          </FormGroup>
        </div>
        <div></div>
      </div>
      <UITable :head="headData" :data="byRegions" type="filled">
        <template #region="{ data: tableData }">
          <p>{{ tableData?.region }}</p>
        </template>
        <template #outcome="{ data: tableData }">
          <p>{{ formatNumberSpace(tableData?.total) }} {{ filter.currency }}</p>
        </template>
        <template #difference="{ data: tableData }">
          <div class="flex-y-center gap-2">
            <i
              v-if="tableData.total === data.total"
              class="icon-equal text-xl text-gray"
            />
            <i
              v-if="tableData.total > data.total"
              class="icon-chevron text-xl text-green rotate-180 block"
            />
            <i
              v-if="tableData.total < data.total"
              class="icon-chevron text-xl text-red block"
            />
            <p>
              {{ formatNumberSpace(tableData?.diff) }} {{ filter.currency }}
            </p>
          </div>
        </template>
      </UITable>
      <div
        class="flex max-sm:flex-col justify-end items-center gap-5 mx-6 pt-5 mt-5 border-t border-gray-200"
      >
        <UIButton
          variant="secondary"
          :text="$t('start_again')"
          class="max-sm:w-full"
          @click="$emit('back')"
        />
        <UIButton
          :text="$t('get_exel')"
          v-bind="{ loading }"
          class="max-sm:w-full"
          @click="getExel"
        />
      </div>
    </div>

    <div>
      <div class="bg-white rounded-2xl p-6">
        <p class="text-2xl leading-112 text-dark font-medium">
          {{ $t('costs_by_sections') }}
        </p>
        <div class="mt-4 flex flex-col gap-5">
          <FormGroup :label="$t('eating')">
            <template #opposite>
              <p class="text-sm leading-5 font-medium text-dark">
                {{ formatNumberSpace(data?.summary_by_category?.eating) }}
                {{ filter.currency }}
              </p>
            </template>
            <SectionsCalculationProgressValue
              :max="+data?.total"
              :value="data?.summary_by_category?.eating"
            />
          </FormGroup>
          <FormGroup :label="$t('services')">
            <template #opposite>
              <p class="text-sm leading-5 font-medium text-dark">
                {{ formatNumberSpace(data?.summary_by_category?.services) }}
                {{ filter.currency }}
              </p>
            </template>
            <SectionsCalculationProgressValue
              :max="+data?.total"
              :value="data?.summary_by_category?.services"
            />
          </FormGroup>
          <FormGroup :label="$t('shopping')">
            <template #opposite>
              <p class="text-sm leading-5 font-medium text-dark">
                {{ formatNumberSpace(data?.summary_by_category?.shopping) }}
                {{ filter.currency }}
              </p>
            </template>
            <SectionsCalculationProgressValue
              :max="+data?.total"
              :value="data?.summary_by_category?.shopping"
            />
          </FormGroup>
          <FormGroup :label="$t('entertainment')">
            <template #opposite>
              <p class="text-sm leading-5 font-medium text-dark">
                {{
                  formatNumberSpace(data?.summary_by_category?.entertainment)
                }}
                {{ filter.currency }}
              </p>
            </template>
            <SectionsCalculationProgressValue
              :max="+data?.total"
              :value="data?.summary_by_category?.entertainment"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  loading?: boolean
  values: any
  regions: any[]
  byRegions: any[]
  data: {
    region: string
    total: number
    summary_by_category: {
      eating: number
      services: number
      entertainment: number
      shopping: number
    }
  }
}

const props = defineProps<Props>()
const emit = defineEmits(['get'])
const { t } = useI18n()

const filter = reactive({
  currency: props.values?.input?.currency,
  stay: props.values?.input?.duration,
  city: props.values?.input?.region,
})

const headData = [
  {
    title: t('other_region'),
    key: 'region',
  },
  {
    title: t('outcome'),
    key: 'outcome',
  },
  {
    title: t('difference'),
    key: 'difference',
  },
]

const currencies = [
  {
    label: 'UZS',
    value: 'UZS',
  },
  {
    label: 'USD',
    value: 'USD',
  },
  {
    label: 'EUR',
    value: 'EUR',
  },
  {
    label: 'RUB',
    value: 'RUB',
  },
]

const durationChoices = [
  {
    label: t('weekly'),
    value: 'weekly',
  },
  {
    label: t('monthly'),
    value: 'monthly',
  },
  {
    label: t('yearly'),
    value: 'yearly',
  },
]

const selectedData = computed(() => props.values)

watch(
  () => filter,
  () => {
    const data = {
      input: {
        currency: filter.currency,
        duration: filter.stay,
        region: filter.city,
        living_place_type: selectedData.value.input.living_place_type,
        eating_breakfast_count: selectedData.value.input.eating_breakfast_count,
        eating_lunch_count: selectedData.value.input.eating_lunch_count,
        eating_dinner_count: selectedData.value.input.eating_dinner_count,
        eating_home_price: selectedData.value.input.eating_home_price,
        eating_out_price: selectedData.value.input.eating_out_price,
        services_gym_price: selectedData.value.input.services_gym_price,
        services_salon_price: selectedData.value.input.services_salon_price,
        services_beauty_price: selectedData.value.input.services_beauty_price,
        services_mobile_price: selectedData.value.input.services_mobile_price,
        shopping_price: selectedData.value.input.shopping_price,
        shopping_count_per_month:
          selectedData.value.input.shopping_count_per_month,
        entertainment_cinema_frequency:
          selectedData.value.input.entertainment_cinema_frequency,
        entertainment_cmg_frequency:
          selectedData.value.input.entertainment_cmg_frequency,
        entertainment_sport_frequency:
          selectedData.value.input.entertainment_sport_frequency,
        entertainment_night_out_frequency:
          selectedData.value.input.entertainment_night_out_frequency,
      },
      output: 'json',
    }

    debounce('get-data', () => emit('get', data))
  },
  {
    deep: true,
  }
)

function getExel() {
  const data = {
    input: {
      currency: filter.currency,
      duration: filter.stay,
      region: filter.city,
      living_place_type: selectedData.value.input.living_place_type,
      eating_breakfast_count: selectedData.value.input.eating_breakfast_count,
      eating_lunch_count: selectedData.value.input.eating_lunch_count,
      eating_dinner_count: selectedData.value.input.eating_dinner_count,
      eating_home_price: selectedData.value.input.eating_home_price,
      eating_out_price: selectedData.value.input.eating_out_price,
      services_gym_price: selectedData.value.input.services_gym_price,
      services_salon_price: selectedData.value.input.services_salon_price,
      services_beauty_price: selectedData.value.input.services_beauty_price,
      services_mobile_price: selectedData.value.input.services_mobile_price,
      shopping_price: selectedData.value.input.shopping_price,
      shopping_count_per_month:
        selectedData.value.input.shopping_count_per_month,
      entertainment_cinema_frequency:
        selectedData.value.input.entertainment_cinema_frequency,
      entertainment_cmg_frequency:
        selectedData.value.input.entertainment_cmg_frequency,
      entertainment_sport_frequency:
        selectedData.value.input.entertainment_sport_frequency,
      entertainment_night_out_frequency:
        selectedData.value.input.entertainment_night_out_frequency,
    },
    output: 'excel',
  }

  emit('get', data)
}

// watchEffect(() => {

// })
</script>
