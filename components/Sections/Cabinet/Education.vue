<template>
  <div>
    <div class="grid grid-cols-12 gap-5">
      <FormGroup
        :label="$t('level_education_available')"
        class="col-span-12 lg:col-span-6"
        for-id="educationDegrees"
        is-required
      >
        <FormSelect
          v-model="values.edu_degree"
          :error="form.$v.value.edu_degree.$error"
          :loading="{ list: loading }"
          :options="educationDegrees"
          :placeholder="$t('profile.education.education_degree')"
          @on-toggle="onToggleEducationDegree"
        />
      </FormGroup>
      <FormGroup
        :label="$t('country_graduated_education')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormSelect
          v-model="values.edu_country"
          :error="form.$v.value.edu_country.$error"
          :options="countries.list"
          :pagination="countries.pagination"
          :loading="countries.loading"
          :placeholder="$t('profile.education.country')"
          infinite-scroll
          @load="loadMore"
        />
      </FormGroup>
      <FormGroup
        :label="$t('name_education_block')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormInput
          v-model="values.edu_place"
          :error="form.$v.value.edu_place.$error"
          :placeholder="$t('profile.education.university_name')"
          class="relative"
        />
      </FormGroup>

      <FormGroup
        :label="$t('start_of_end')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormDatePicker
          v-model="values.edu_started_year"
          :error="form.$v.value.edu_started_year.$error"
          min-date="1920"
          :max-date="new Date()"
          is-year
          placeholder="profile.education.graduated_date"
        />
      </FormGroup>
      <FormGroup
        :label="$t('date_of_end')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormDatePicker
          v-model="values.edu_finished_year"
          :error="form.$v.value.edu_finished_year.$error"
          min-date="1995"
          is-year
          placeholder="profile.education.graduated_date"
        />
      </FormGroup>
    </div>
    <hr class="my-5" />
    <div class="grid grid-cols-12 gap-5">
      <FormGroup
        :label="$t('mother_language')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormSelect
          v-model="values.native_lang"
          :error="form.$v.value.native_lang.$error"
          :options="languages"
          :placeholder="$t('profile.education.lang')"
          label-key="name"
          value-key="code"
        >
        </FormSelect>
      </FormGroup>
      <FormGroup
        :label="$t('english_level')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormSelect
          v-model="values.english_level"
          :error="form.$v.value.english_level.$error"
          :options="ENGLISH_LEVELS"
          :placeholder="$t('profile.education.english_level')"
        />
      </FormGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'
import { useProfileStore } from '~/store/profile'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()
const { t } = useI18n()

const { form } = unref(props)
const { values } = form
const profileStore = useProfileStore()
const { fetchUniversities, fetchLanguages, fetchCountries } = useCommonStore()
const { languages, countries } = storeToRefs(useCommonStore())

const loading = computed(() => profileStore.educationDegreesLoading)
const educationDegrees = computed(() => profileStore.educationDegrees)

const onToggleEducationDegree = () => {
  profileStore.fetchEducationDegrees()
}

const get = () => {
  fetchLanguages()
  fetchCountries()
}
get()

const ENGLISH_LEVELS = [
  {
    id: 1,
    name: t('english_levels.basic'),
  },
  {
    id: 2,
    name: t('english_levels.intermediate'),
  },
  {
    id: 3,
    name: t('english_levels.advanced'),
  },
]

const loadMore = () => {
  useCommonStore().moreCountries()
}

// watch university
watch(
  () => values.edu_place,
  (name: string) => {
    const params = {
      search: name,
      limit: 10,
      offset: 0,
      country: values.edu_country?.id,
    }

    debounce(
      'fetchUniversities',
      () => {
        fetchUniversities(params)
      },
      500
    )
  },
  { deep: true }
)
</script>

<style scoped>
.univer__lists {
  border-radius: 6px;
  border: 1px solid #f7f9fa;
  background: white;
  box-shadow: 0 4px 28px 0 rgba(24, 24, 24, 0.03);
}
</style>

<!--commit -->
