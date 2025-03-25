<template>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-12 flex gap-4">
      <div class="w-full grid grid-cols-12 gap-4">
        <FormRadio
          v-for="(item, idx) in studyForm"
          :key="idx"
          v-model.number="values.study_plan_form"
          :class="{ '!border-red': form.$v.value.study_plan_form.$error }"
          :value="item.id"
          btn-styles="!mr-0"
          class="w-full sm:w-auto col-span-12 sm:col-span-6 lg:col-span-3 h-10 border-white-100 border-solid border rounded-md flex flex-row-reverse px-3 py-2.5 justify-between"
          name="full_time"
        >
          <template #label>
            <label class="flex items-center gap-1 font-medium">
              <span class="text-sm text-dark font-medium">
                {{ item?.name }}</span
              >
            </label>
          </template>
        </FormRadio>
      </div>
    </div>
    <FormGroup
      :label="$t('direction_of_study')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelect
        v-model="values.study_plan_univer_direction"
        class="w-full"
        :options="directions"
        :pagination="pagination"
        :loading="loading"
        :placeholder="$t('education_sector')"
        infinite-scroll
        selected-option-styles="h-11 !px-0"
        @load="profileStore.moreDirections"
      >
      </FormSelect>
    </FormGroup>
    <FormGroup
      :label="$t('which_university_would_you_like_to_study')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormSelectMultiple
        v-model="values.study_plan_universities"
        :error="form.$v.value.study_plan_universities.$error"
        :options="universityBrief"
        :placeholder="$t('select_a_university')"
        :loading="universityBriefLoading"
        :pagination="universityBriefPagination"
        infinite-scroll
        label-key="name"
        value-key="id"
        @load="universityStore.fetchMoreBrief(params)"
      />
    </FormGroup>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useProfileStore } from '~/store/profile'
import { useUniversityStore } from '~/store/university'
import type { IResponse } from '~/types/common'

const { t } = useI18n()

interface Props {
  form: TForm<any>
  wantStudyForm: any
}

const props = defineProps<Props>()
const profileStore = useProfileStore()
const universityStore = useUniversityStore()

const { form } = unref(props)
const { values } = form

const studyForm = ref<{ id: string; name: string }[]>()
const getStudyForm = () => {
  useApi()
    .$get<IResponse<{ id: string; name: string }>>('/common/study_form/')
    .then((res) => (studyForm.value = res.results))
}
getStudyForm()

const directions = computed(() => [
  {
    name: t('all_directions'),
    id: '',
  },
  ...profileStore.directions.list,
])
const loading = computed(() => profileStore.directions.loading)
const pagination = computed(() => profileStore.directions.pagination)

profileStore.fetchEducationDirections(true, false)

const universityBrief = computed(() => universityStore.brief)
const universityBriefLoading = computed(() => universityStore.briefLoading)
const universityBriefPagination = computed(
  () => universityStore.briefPagination
)

// direction:  || undefined,
const params = computed(() => {
  return {
    extra_program: props.wantStudyForm.study_plan_degree_extra || undefined,
    degree: props.wantStudyForm.study_plan_degree || undefined,
    program: values.study_plan_univer_direction || undefined,
    study_form: values.study_plan_form || undefined,
  }
})
// watch university value
watch(
  () => params.value,
  (val) => {
    universityStore.briefParams.offset = 0
    universityStore.fetchBrief(val)
  },
  { deep: true, immediate: true }
)
</script>
