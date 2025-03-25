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
      :currency="activeCurrency"
      v-bind="{ step, data }"
    >
      <SectionsCalculationWhereToLive
        v-if="step === 1"
        :active="activeType"
        @change="activeType = $event"
      />
      <SectionsCalculationNutrition v-if="step === 2" :form="nutritionForm" />
      <SectionsCalculationProducts v-if="step === 3" :form="productForm" />
      <SectionsCalculationServices v-if="step === 4" :form="servicesForm" />
      <SectionsCalculationShopping v-if="step === 5" :form="shoppingForm" />
      <SectionsCalculationEntertainment
        v-if="step === 6"
        :form="entertainmentForm"
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
      <div class="flex max-sm:flex-col sm:items-center gap-3 sm:gap-5">
        <UIButton
          :disabled="step === 1"
          variant="secondary"
          :text="$t('prev')"
          @click="handleStep('prev')"
        />
        <div class="rounded-lg border border-white bg-white/[28%] px-3 py-3">
          <p class="text-xl leading-112 font-medium text-dark">
            {{ step }} - 6
          </p>
        </div>
        <UIButton
          :text="$t('continue')"
          v-bind="{ loading }"
          @click="handleStep('next')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { IResponse } from '~/types/common'

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
const step = ref(1)
const activeCurrency = ref('UZS')
const route = useRoute()

// Values Start
const activeType = ref(route.query?.active || 'city')

const filter = reactive({
  currency: route.query.currency || 'UZS',
  stay: route.query.stay || 'monthly',
  city: route.query.city ? +route.query.city : 10,
})
// Values End

const handleStep = (state: 'next' | 'prev') => {
  if (state === 'next' && step.value === 6) {
    emit('next')
    return
  }
  if (state === 'next') {
    step.value++
  } else {
    step.value--
  }
}

const text = computed(() => {
  if (step.value === 1) {
    return {
      title: t('where_to_live'),
      subtitle: t('where_to_live_text'),
      price: null,
    }
  } else if (step.value === 2) {
    return {
      title: t('nutrition'),
      subtitle: t('how_you_eat_while_week'),
      price: props.data.summary_by_category.eating,
    }
  } else if (step.value === 3) {
    return {
      title: t('cost_of_products'),
      subtitle: t('cost_of_products_text'),
      price: props.data.summary_by_category.eating,
    }
  } else if (step.value === 4) {
    return {
      title: t('services'),
      subtitle: t('services_text'),
      price: props.data.summary_by_category.services,
    }
  } else if (step.value === 5) {
    return {
      title: t('shopping'),
      subtitle: t('shopping_text'),
      price: props.data.summary_by_category.shopping,
    }
  } else if (step.value === 6) {
    return {
      title: t('entertainment'),
      subtitle: t('entertainment_text'),
      price: props.data.summary_by_category.entertainment,
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
  activeCurrency.value = filter.currency
}

watchEffect(() => {
  // watchChange()
  // watchChange()
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
