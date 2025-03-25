<template>
  <div>
    <div class="border border-gray-200 rounded-xl">
      <UITab
        v-model="activeTab"
        :list="tabList"
        class="pt-1.5"
        item-class="!px-4 pb-2.5 text-sm leading-5 font-medium"
      />
      <Transition mode="out-in" name="fade">
        <div :key="activeTab" class="bg-gray-200 p-4 rounded-b-xl">
          <SectionsProgramsFilterMain
            v-if="activeTab === 'main_programs'"
            :key="trigger"
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
          />
          <SectionsProgramsFilterMainAdditional
            v-else
            :key="trigger"
            :form="filter"
            v-bind="{ languages, regions, formType, studyPeriod }"
          />
        </div>
      </Transition>
    </div>
    <div
      class="flex flex-wrap md:justify-end gap-4 py-3.5 px-4 rounded-xl bg-gray-200 mt-4"
    >
      <UIButton
        :text="$t('clear_fields')"
        size="sm"
        variant="secondary"
        @click="clearFilter"
      />
      <UIButton
        :text="$t('search_program')"
        size="sm"
        variant="primary"
        @click="submit"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store'
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

interface Props {
  isProgram?: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['submit'])

const router = useRouter()
const route = useRoute()
const limit1 = ref(0)
const count1 = ref(10)
const store = useUniversityStore()
const single = computed(() => store.single)

const degrees = ref<any>([])
const directions = ref<any>([])
const items = ref<any>([])
const languages = ref<any>([])
const regions = ref<any>([])
const trigger = ref(false)
const searchDirection = ref<string>('')
const filter = useForm(
  {
    additional: '',
    region: '',
    direction: '',
    level: '',
    language: '',
    item: '',
    duration: '',
    form_of_study: '',
    minValue: 6000000,
    maxValue: 15000000,
    formType: [],
  },
  {}
)

const storePeriod = useHomeStore()
const formType = computed(() => [
  {
    id: '',
    name: t('all_forms'),
  },
  ...storePeriod.studyTypes,
])
storePeriod.fetchStudyType()

function getDegrees() {
  return useApi()
    .$get('/common/education-degrees/')
    .then((res: IResponse) => {
      degrees.value = [
        {
          name: t('all_degrees'),
          id: '',
        },
        ...res.results,
      ]
    })
}

const limit = ref(0)
const count = ref(10)
const store2 = useHomeStore()
const studyPeriod = computed(() => [
  {
    id: '',
    name: t('all_periods'),
  },
  ...store2.studyPeriod,
])
const studyParams = reactive({
  limit: 10,
  offset: 0,
})
store2.fetchStudyPeriod(studyParams, false, false)

function getDirections(next: number) {
  if (count.value > limit.value) {
    limit.value += next
  }
  return useApi()
    .$get('/common/school_program_directions/', {
      params: {
        limit: limit.value,
        search: searchDirection.value,
        degrees: filter.values.level || undefined,
      },
    })
    .then((res: IResponse) => {
      if (res.results.length === 0) {
        directions.value = null
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
  getDirections(10)
}

watch(searchDirection, () => {
  debounce(
    'searchable',
    () => {
      getDirectionsBySearch(searchDirection.value)
    },
    500
  )
})
function loadMore() {
  getItems(10, true)
}
watch(filter.values, () => {
  getItems()
})
function getItems(next = 10, merge = false) {
  if (limit1.value > count1.value) {
    limit1.value += next
  }
  return useApi()
    .$get('/university/universities/', {
      params: {
        page_size: limit1.value,
        program: filter.values.direction,
      },
    })
    .then((res: IResponse) => {
      if (res.results.length === 0) {
        items.value = null
      }
      if (merge) {
        items.value = res.results
      } else {
        items.value = [
          {
            name: t('all_subjects'),
            id: '',
          },
          ...res.results,
        ]
      }
      count1.value = res.count
    })
}

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
    getItems(),
    getLanguages(),
    getRegions(),
  ]).finally(() => (trigger.value = !trigger.value))
})

function clearFilter() {
  filter.values.additional = ''
  filter.values.region = ''
  filter.values.direction = ''
  filter.values.level = ''
  filter.values.language = ''
  filter.values.item = ''
  filter.values.duration = ''
  filter.values.form_of_study = ''
  filter.values.minValue = 6000000
  filter.values.maxValue = 15000000
  trigger.value = !trigger.value
  emits('submit', {})
}

function submit() {
  if (props.isProgram) {
    emits('submit', {
      degree: filter.values.level || undefined,
      direction_program: filter.values.direction || undefined,
      university: filter.values.item || undefined,
      study_form: filter.values.form_of_study || undefined,
      lang: filter.values.language || undefined,
      region: filter.values.region || undefined,
      duration_type: filter.values.duration || undefined,
      price__gte: filter.values.minValue || undefined,
      price__lte: filter.values.maxValue || undefined,
      type_as_extra: filter.values.additional || undefined,
      is_extra: activeTab.value === 'extra_programs' ? 'true' : undefined,
    })
    // return router.push({
    //   path: '',
    //   query: {
    //     degree: filter.values.level || undefined,
    //     direction: filter.values.direction || undefined,
    //     subjects: filter.values.item || undefined,
    //     study_form: filter.values.form_of_study || undefined,
    //     lang: filter.values.language || undefined,
    //     region: filter.values.region || undefined,
    //     duration_type:
    //       periodChoices?.[filter.values.duration]?.value || undefined,
    //     price__gte: filter.values.minValue || undefined,
    //     price__lte: filter.values.maxValue || undefined,
    //     type_as_extra: filter.values.additional || undefined,
    //     is_extra: activeTab.value === 'extra_programs' ? 'true' : undefined,
    //   },
    // })
    return
  }
  router.push({
    name: 'programs',
    query: {
      degree: filter.values.level || undefined,
      direction_program: filter.values.direction || undefined,
      university: filter.values.item || undefined,
      lang: filter.values.language || undefined,
      region: filter.values.region || undefined,
      // duration_type:
      //   periodChoices?.[filter.values.duration]?.value || undefined,
      price__gte: filter.values.minValue || undefined,
      price__lte: filter.values.maxValue || undefined,
      type_as_extra: filter.values.additional || undefined,
      is_extra: activeTab.value === 'extra_programs' ? 'true' : undefined,
    },
  })
}

const { t } = useI18n()
const tabList = reactive([
  {
    label: t('main_programs'),
    value: 'main_programs',
    name: 'main_programs',
  },
  {
    label: t('extra_programs'),
    value: 'extra_programs',
    name: 'extra_programs',
  },
])

const activeTab = ref('main_programs')

watch(
  () => activeTab.value,
  () => {
    clearFilter()
  }
)

const periodChoices = [
  {
    label: t('till_month'),
    value: 'till_month',
  },
  {
    label: t('month'),
    value: 'month',
  },
  {
    label: t('semester'),
    value: 'semester',
  },
  {
    label: t('year'),
    value: 'year',
  },
  {
    label: t('2_years'),
    value: '2_years',
  },
  {
    label: t('4_years'),
    value: '4_years',
  },
  {
    label: t('more_than_4_years'),
    value: 'more_than_4_years',
  },
]
</script>
