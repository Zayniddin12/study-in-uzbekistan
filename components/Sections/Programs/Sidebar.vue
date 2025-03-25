<template>
  <div class="flex flex-col gap-4">
    <div class="rounded-xl border border-gray-200 relative bg-white pt-2.5">
      <UITab
        v-model="tab"
        :list="tabList"
        class="w-full -mb-px"
        item-class="w-full flex-center pb-3"
        @change="changeTab"
      />
      <div :key="trigger" class="p-4 bg-gray-200 rounded-b-lg">
        <Transition mode="out-in" name="fade">
          <SectionsProgramsFilterBasic
            v-if="tab === 'basic'"
            :form="filter"
            v-bind="{
              degrees,
              directions,
              items,
              languages,
              regions,
              formType,
              studyPeriod,
            }"
            @load="getDirections"
            @load-more="loadMore"
            @search="getDirectionsBySearch"
            @load-items="getItems"
          />
          <SectionsProgramsFilterAdditional
            v-else
            :form="filter"
            v-bind="{ languages, regions, formType, studyPeriod }"
            @load-more="loadMore"
          />
        </Transition>
      </div>
    </div>
    <UIButton :text="$t('search_program')" class="w-full" @click="submit" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import useUpdateRouteQuery from '~/composables/useQueryChange'
import { useHomeStore } from '~/store'
import type { IResponse } from '~/types/common'

const { t } = useI18n()
const route = useRoute()
const trigger = ref(false)
const emit = defineEmits(['get'])

const nextPage = ref()
const degrees = ref<any>([])
const directions = ref<any>([])
const items = ref<any>([])
const languages = ref<any>([])
const regions = ref<any>([])
const searchDirection = ref<string>('')

// Filter Start
const filter = useForm(
  {
    additional: '',
    region: '',
    direction: '',
    level: '',
    language: '',
    item: '',
    checkbox: false,
    duration: '',
    form_of_study: '',
    free_training_opportunity: '',
    where_does_the_training_take_place: '',
    minValue: 0,
    maxValue: 100000000,
    formType: [],
    studyPeriod: [],
  },
  {}
)

// Filter End

const studyParams = reactive({
  limit: 10,
  offset: 0,
})
const store = useHomeStore()
const studyPeriod = computed(() => [
  {
    id: '',
    name: t('all_periods'),
  },
  ...store.studyPeriod,
])
store.fetchStudyPeriod(studyParams, false, false)
const studyPeriodCount = computed(() => store.studyPeriodCount)

const loadMore = () => {
  if (studyPeriod.value.length < studyPeriodCount.value) {
    studyParams.offset = studyParams.limit + studyParams.offset
    store.fetchStudyPeriod(studyParams, true, true)
  }
}

const formType = computed(() => [
  {
    id: '',
    name: t('all_forms'),
  },
  ...store.studyTypes,
])
store.fetchStudyType()

function getDegrees() {
  return useApi()
    .$get('/common/education-degrees/')
    .then((res: IResponse) => {
      degrees.value = [
        {
          name: t('all_degrees'),
          id: '',
          is_main: true,
        },
        ...res.results,
      ]
    })
}

const limit = ref(0)
const count = ref(10)
const limit1 = ref(0)
const count1 = ref(10)
const page2 = ref(1)
function getDirections(next = 10, merge = false) {
  if (count.value > limit.value) {
    limit.value += next
  }
  return useApi()
    .$get('/common/school_program_directions/', {
      params: {
        limit: limit.value,
      },
    })
    .then((res: IResponse) => {
      if (res.results.length === 0) {
        directions.value = null
      }
      if (merge) {
        directions.value = res.results
      } else {
        directions.value = [
          {
            name: t('all_directions'),
            id: '',
          },
          ...res.results,
        ]
      }
      count.value = res.count
    })
    .catch((err) => {
      return new Error(err)
    })
}

function getDirectionsBySearch(e: string) {
  searchDirection.value = e
  limit.value = 0
  count.value = 10
  limit1.value = 0
  page2.value = 0
  count1.value = 10
  getDirections(10)
  getItems(10)
}

watch(
  searchDirection,
  () => {
    debounce(
      'searchable',
      () => {
        getDirectionsBySearch(searchDirection.value)
      },
      500
    )
  },
  { deep: true, immediate: true }
)
function getItems(force = false) {
  console.log('getItems', force, items.value?.length, count1.value)
  if (items.value?.length < count1.value || force) {
    page2.value += 1
    return useApi()
      .$get('/university/universities/', {
        params: {
          page_size: 10,
          program: filter.values.direction,
          page: page2.value,
        },
      })
      .then((res: IResponse) => {
        nextPage.value = res.next
        if (page2.value > 1) {
          items.value.push(...res.results)
        } else {
          items.value = [
            {
              name: t('all_universities'),
              id: '',
            },
            ...res.results,
          ]
        }
        count1.value = res.count
      })
  }
}

watch(
  () => filter.values.direction,
  () => {
    console.log('filter.values.direction', filter.values.direction)
    page2.value = 0
    getItems()
  }
)

function getLanguages() {
  return useApi()
    .$get('/common/languages/')
    .then((res: IResponse) => {
      languages.value = [
        {
          name: t('all_languages'),
          code: '',
        },
        ...res.results,
      ]
    })
}

function getRegions() {
  return useApi()
    .$get('/common/regions/', {
      params: {
        limit: 20,
      },
    })
    .then((res: IResponse) => {
      regions.value = [
        {
          name: t('all_regions'),
          id: '',
        },
        ...res.results,
      ]
    })
}

onMounted(() => {
  Promise.all([
    getDegrees(),
    getDirections(5),
    // getItems(),
    getLanguages(),
    getRegions(),
  ]).finally(() => (trigger.value = !trigger.value))
  const query = route.query
  if (query.degree) {
    filter.values.level = +query.degree
  }
  if (query.direction_program) {
    filter.values.direction_program = +query.direction_program
  }
  if (query.university) {
    filter.values.item = +query.university
  }
  if (query.study_form) {
    filter.values.form_of_study = +query.study_form
  }
  if (query.lang) {
    filter.values.language = query.lang
  }
  if (query.region) {
    filter.values.region = +query.region
  }
  if (query.duration_type) {
    filter.values.duration = query.duration_type
  }
  if (query.price__gte) {
    filter.values.minValue = +query.price__gte
  }
  if (query.price__lte) {
    filter.values.maxValue = +query.price__lte
  }
  if (query.include_price_null) {
    filter.values.checkbox = query.include_price_null === 'true'
  }
  if (query.type_as_extra) {
    filter.values.additional = +query.type_as_extra
  }

  trigger.value = !trigger.value
})

function submit() {
  if (tab.value === 'basic') {
    filterMain()
  } else {
    filterMain()
  }
  emit('close-modal')
}

async function filterMain() {
  await useUpdateRouteQuery('degree', filter.values.level ?? undefined)
  await useUpdateRouteQuery(
    'direction_program',
    filter.values.direction ?? undefined
  )
  await useUpdateRouteQuery('university', filter.values.item ?? undefined)
  await useUpdateRouteQuery(
    'study_form',
    filter.values.form_of_study ?? undefined
  )
  await useUpdateRouteQuery('langs', filter.values.language ?? undefined)
  await useUpdateRouteQuery('region', filter.values.region ?? undefined)
  await useUpdateRouteQuery(
    'type_as_extra',
    filter.values.additional ?? undefined
  )
  await useUpdateRouteQuery(
    'duration_type',
    filter.values.duration ?? undefined
  )
  await useUpdateRouteQuery('price__gte', filter.values.minValue ?? undefined)
  await useUpdateRouteQuery('price__lte', filter.values.maxValue ?? undefined)
  await useUpdateRouteQuery(
    'include_price_null',
    filter.values.checkbox ?? undefined
  )

  debounce('filterProgram', () => emit('get'))
}

// Tab Start
const tab = ref('basic')

async function changeTab(e: string) {
  await clearFilter()
  await useUpdateRouteQuery('is_extra', e === 'additional' ? 'true' : undefined)
}

function clearFilter() {
  filter.values.checkbox = false
  filter.values.minValue = 0
  filter.values.maxValue = 100000000
  filter.values.duration = ''
  filter.values.form_of_study = ''
  filter.values.language = ''
  filter.values.region = ''
  filter.values.direction = ''
  filter.values.level = ''
  filter.values.item = ''
  filter.values.additional = ''
}

const tabList = computed(() => [
  {
    label: t('basic'),
    value: 'basic',
  },
  {
    label: t('additional'),
    value: 'additional',
  },
])
// Tab End
</script>
