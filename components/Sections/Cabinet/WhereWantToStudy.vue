<template>
  <div class="grid grid-cols-12 gap-5">
    <FormGroup
      :label="$t('level_of_education')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelect
        :key="profileStore.educationDegrees?.length"
        v-model="values.study_plan_degree"
        :error="form.$v.value.study_plan_degree.$error"
        :options="profileStore.educationDegrees"
        :placeholder="$t('profile.where_to_study.degree')"
        is-main
      />
    </FormGroup>
    <FormGroup
      :label="$t('profile.where_to_study.extra_degree_label')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelect
        :key="programsType?.length"
        v-model="values.study_plan_degree_extra"
        :options="programsType"
        :placeholder="$t('profile.where_to_study.degree')"
      />
    </FormGroup>

    <FormGroup
      :label="$t('plan_year_enter')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelect
        v-model="values.study_plan_year"
        :error="form.$v.value.study_plan_year.$error"
        :options="years"
        :placeholder="$t('plan_year_enter')"
      />
    </FormGroup>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useProfileStore } from '~/store/profile'
import type { IResponse } from '~/types/common'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()

const { form } = unref(props)
const { values, $v } = form
const profileStore = useProfileStore()

// getters
const extraEducationDegree = computed(() => {
  return profileStore.educationDegrees.filter(
    (degree) => degree?.id != values?.levelOfEducation
  )
})

const years = computed(() => {
  const CURRENT_YEAR = new Date().getFullYear()
  const years = []
  // init years
  for (let i = 0; i < 5; i++) {
    const yearObj = {
      id: CURRENT_YEAR + i,
      name: CURRENT_YEAR + i,
    }

    years.push(yearObj)
  }

  return years
})

profileStore.fetchEducationDegrees()

const programsType = ref<{ id: string; name: string }[]>([])
const { t } = useI18n()
const getProgramsType = () => {
  useApi()
    .$get<IResponse<{ id: string; name: string }>>('/common/program_type/')
    .then(
      (res) =>
        (programsType.value = [
          {
            id: '',
            name: t('do_not_choose_additional_education'),
          },
          ...res.results,
        ])
    )
}

getProgramsType()

watch(
  () => values.study_plan_degree,
  () => {
    if (values.study_plan_degree) {
      window.localStorage.setItem('program', values.study_plan_degree)
    }
  }
)

watch(
  () => values.study_plan_degree_extra,
  () => {
    if (values.study_plan_degree_extra) {
      window.localStorage.setItem('degree', values.study_plan_degree_extra)
    }
  }
)
</script>
