<template>
  <div class="flex flex-col gap-6">
    <div class="grid lg:grid-cols-3 gap-5 p-6 pt-5 bg-gray-200 rounded-2xl">
      <FormGroup :label="$t('currency')">
        <FormSelect
          v-model="filter.currency"
          :options="currencies"
          label-key="label"
          value-key="value"
          :placeholder="$t('choose_currency')"
        />
      </FormGroup>
      <FormGroup :label="$t('stay_length')">
        <FormSelect
          v-model="filter.stay"
          :options="durationChoices"
          label-key="label"
          value-key="value"
          :placeholder="$t('choose_stay_length')"
        />
      </FormGroup>
      <FormGroup :key="regions?.length" :label="$t('city')">
        <FormSelect
          v-model="filter.city"
          :options="regions"
          label-key="name"
          value-key="id"
          :placeholder="$t('choose_city')"
        />
      </FormGroup>
    </div>
    <SectionsCalculationWrapper
      :title="text?.title"
      :subtitle="text?.subtitle"
      :price="text?.price"
      :currency="filter.currency"
      v-bind="{ step, data }"
    >
      <SectionsCalculationWhereToLive
        :active="activeType"
        @change="activeType = $event"
      />
    </SectionsCalculationWrapper>
    <div
      class="flex-center-between max-lg:flex-col max-lg:items-start gap-4 p-5 pl-8 rounded-2xl bg-gray-200"
    >
      <div class="flex-y-center gap-2">
        <i class="icon-warning-bold text-blue" />
        <p class="text-sm leading-132 font-medium text-dark">
          {{ $t('price_will_be_displayed') }}
        </p>
      </div>

      <div class="flex max-sm:flex-col sm:items-center gap-2 sm:gap-5">
        <NuxtLink
          :to="{
            path: '/calculation',
            query: { active: activeType, currency: filter.currency, stay: filter.stay, city: filter.city },
          }"
        >
          <UIButton :text="$t('next')" class="max-sm:w-full max-sm:py-2.5"
        /></NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  loading?: boolean
  regions?: any
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

const { t } = useI18n()
const emit = defineEmits(['next', 'get', 'loading'])
const step = ref(2)

// Values Start
const activeType = ref('city')

const filter = reactive({
  currency: 'UZS',
  stay: 'monthly',
  city: 10,
  modelValue: '',
})
// Values End

const text = computed(() => {
  if (step.value === 2) {
    return {
      title: t('nutrition'),
      subtitle: t('how_you_eat_while_week'),
      price: props?.data?.summary_by_category.eating,
    }
  }
})

const nutritionForm = useForm(
  {
    breakfast: 1,
    lunch: 1,
    dinner: 1,
  },
  {}
)

const productForm = useForm(
  {
    when_home: 'cheap',
    away_home: 'cheap',
  },
  {}
)

const servicesForm = useForm(
  {
    gym: 'cheap',
    barber: 'cheap',
    cosmetic: 'cheap',
    mobile: 'cheap',
  },
  {}
)

const shoppingForm = useForm(
  {
    shopping: 'cheap',
    count: 1,
  },
  {}
)

const entertainmentForm = useForm(
  {
    cinema: 'never',
    musics: 'never',
    matches: 'never',
    events: 'never',
  },
  {}
)

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

function watchChange(data: any) {
  emit('get', data)
}

watchEffect(() => {
  const data = {
    input: {
      currency: filter.currency,
      duration: filter.stay,
      region: filter.city,
      living_place_type: activeType.value,
      eating_breakfast_count: nutritionForm.values.breakfast,
      eating_lunch_count: nutritionForm.values.lunch,
      eating_dinner_count: nutritionForm.values.dinner,
      eating_home_price: productForm.values.when_home,
      eating_out_price: productForm.values.away_home,
      services_gym_price: servicesForm.values.gym,
      services_salon_price: servicesForm.values.barber,
      services_beauty_price: servicesForm.values.cosmetic,
      services_mobile_price: servicesForm.values.mobile,
      shopping_price: shoppingForm.values.shopping,
      shopping_count_per_month: shoppingForm.values.count,
      entertainment_cinema_frequency: entertainmentForm.values.cinema,
      entertainment_cmg_frequency: entertainmentForm.values.musics,
      entertainment_sport_frequency: entertainmentForm.values.matches,
      entertainment_night_out_frequency: entertainmentForm.values.events,
    },
    output: 'json',
  }
  emit('loading')
  debounce('price', () => watchChange(data))
})
</script>
