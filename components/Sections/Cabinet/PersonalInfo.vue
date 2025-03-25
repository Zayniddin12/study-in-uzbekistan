<template>
  <div>
    <FormGroup :label="$t('photo')" class="mb-5" is-required>
      <UIAvatarUploader
        :default-image="values.photo"
        @update:image="values.photo = $event"
        @remove-image="values.photo = $event"
      />
    </FormGroup>
    <div class="grid grid-cols-12 gap-5">
      <FormGroup
        :label="$t('last_name')"
        class="col-span-12 lg:col-span-6"
        for-id="last_name"
        is-required
      >
        <FormInput
          v-model="values.last_name"
          :error="form.$v.value.last_name.$error"
          :placeholder="$t('enter_last_name')"
          input-id="last_name"
        />
      </FormGroup>
      <FormGroup
        :label="$t('name')"
        class="col-span-12 lg:col-span-6"
        for-id="name"
        is-required
      >
        <FormInput
          v-model="values.first_name"
          :error="form.$v.value.first_name.$error"
          :placeholder="$t('enter_name')"
          input-id="name"
        />
      </FormGroup>
      <FormGroup
        :label="$t('third_name')"
        class="col-span-12 lg:col-span-6"
        for-id="middle_name"
        is-required
      >
        <FormInput
          v-model="values.middle_name"
          :error="form.$v.value.middle_name.$error"
          :placeholder="$t('enter_your_third_name')"
          input-id="middle_name"
        />
      </FormGroup>
      <FormGroup
        :label="$t('birth_date')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormDatePicker
          v-model="values.birth_date"
          :error="form.$v.value.birth_date.$error"
          :min-date="new Date(1920, 0, 1)"
          :max-date="new Date()"
          :placeholder="$t('enter_birth_date')"
        />
      </FormGroup>
      <FormGroup
        :label="$t('gender')"
        class="col-span-12 lg:col-span-6 flex"
        is-required
      >
        <div class="flex gap-4">
          <FormRadio
            v-model="values.gender"
            :class="{ '!border-red': form.$v.value.gender.$error }"
            btn-styles="!mr-0"
            class="h-10 border-white-100 border-solid border rounded-md flex flex-row-reverse px-3 py-2.5 w-full justify-between"
            name="male"
            value="male"
          >
            <template #label>
              <label class="flex items-center gap-1 font-medium">
                <i class="icon-Men text-xl text-blue" />
                <span class="text-sm text-dark"> {{ $t('male') }}</span>
              </label>
            </template>
          </FormRadio>
          <FormRadio
            v-model="values.gender"
            :class="{ '!border-red': form.$v.value.gender.$error }"
            btn-styles="!mr-0"
            class="h-10 border-white-100 border-solid border rounded-md flex flex-row-reverse px-3 py-2.5 w-full justify-between"
            name="female"
            value="female"
          >
            <template #label>
              <label class="flex items-center gap-1 font-medium">
                <i class="icon-women text-xl text-pink" />
                <span class="text-sm text-dark"> {{ $t('female') }}</span>
              </label>
            </template>
          </FormRadio>
        </div>
      </FormGroup>
      <FormGroup
        :label="$t('citizenship')"
        class="col-span-12 lg:col-span-6"
        is-required
      >
        <FormSelect
          v-model="values.country"
          :error="form.$v.value.country.$error"
          :options="countries"
          :pagination="pagination"
          :loading="loading"
          :placeholder="$t('select_country')"
          infinite-scroll
          selected-option-styles="!p-0 !border-none"
          @load="store.moreCountries"
          @on-select="onSelect"
        >
          <template #selectedOption="data">
            <FormInput
              v-model="countrySearch"
              :error="form.$v.value.country.$error"
              :placeholder="countryName ? countryName : $t('select_country')"
              :input-class="countryName ? 'placeholder:!text-dark' : ''"
              class="w-full"
              type="text"
            >
              <template #suffix>
                <div class="px-3 h-full flex-center">
                  <span
                    :class="{ '-rotate-180': data.toggleSelect }"
                    class="icon-chevron transition-all duration-200 inline-block text-blue"
                  ></span>
                </div>
              </template>
            </FormInput>
          </template>
        </FormSelect>
      </FormGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'
import { useProfileStore } from '~/store/profile'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()

const { form } = unref(props)
const { values } = form

const store = useCommonStore()
const profileStore = useProfileStore()

const countries = computed(() => store.countries.list)
const loading = computed(() => store.countries.loading)
const pagination = computed(() => store.countries.pagination)

const countryName = computed(() => form.values.countryName)

const countrySearch = ref('')
watch(
  () => countrySearch.value,
  (newValue) => {
    debounce('searchCountry', () => {
      store.countries.params.offset = 0
      store.countries.params.search = newValue
      store.fetchCountries(true, false)
    })
  }
)

watch(
  () => values.photo,
  (newValue) => {
    if (typeof newValue === 'string' || !newValue) return

    profileStore.uploadProfileImage(newValue).then((imageObject) => {
      profileStore.imageId = imageObject.id
      values.photo = imageObject.file
    })
  },
  {
    deep: true,
  }
)

store.fetchCountries(true, false)

function onSelect(option: any) {
  countrySearch.value = option.name
  form.values.countryName = option.name
}
</script>
