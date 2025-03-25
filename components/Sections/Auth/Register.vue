<template>
  <div>
    <div class="flex flex-col gap-4 mb-5">
      <FormGroup :label="$t('last_name')" for-id="last_name">
        <FormInput
          v-model="values.last_name"
          input-id="last_name"
          :placeholder="$t('enter_last_name')"
          :error="form.$v.value.last_name.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('name')" for-id="name">
        <FormInput
          v-model="values.first_name"
          input-id="name"
          :placeholder="$t('enter_name')"
          :error="form.$v.value.first_name.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('email')" for-id="email">
        <FormInput
          v-model="values.email"
          input-id="email"
          :placeholder="$t('enter_email')"
          :error="form.$v.value.email.$error"
        />
      </FormGroup>
      <FormGroup :label="$t('country')" for-id="country">
        <FormSelect
          v-model="values.country"
          :error="form.$v.value.country.$error"
          :options="countries"
          :pagination="pagination"
          :loading="countriesLoading"
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
              selected-option-styles="border-gray/40 !p-0 !border-none"
              class="w-full"
              input-id="country"
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
      <FormGroup :label="$t('password')" for-id="password">
        <FormInputPassword
          v-model="values.password"
          input-id="password"
          :placeholder="$t('enter_password')"
          v-bind="{ type }"
          :error="form.$v.value.password.$error"
          @change="type = $event"
        />
      </FormGroup>
      <FormGroup :label="$t('confirm_password')" for-id="confirm_password">
        <FormInputPassword
          v-model="values.confirm_password"
          input-id="confirm_password"
          :placeholder="$t('enter_confirm_password')"
          v-bind="{ type }"
          :error="form.$v.value.confirm_password.$error"
          @change="type = $event"
        />
      </FormGroup>
    </div>

    <div class="flex-y-center">
      <FormCheckbox
        v-model="values.checked"
        :error="form.$v.value.checked.$error"
        :checked="values.checked"
      />
      <i18n-t
        keypath="by_pressing_this_you_will_allow_rules"
        class="cursor-pointer text-2xs leading-[124%] text-dark font-normal"
        tag="p"
        for="terms_of_use"
        @click="values.checked = !values.checked"
      >
        <template #rules>
          <NuxtLink
            to="/pages/privacy-policy"
            target="_blank"
            class="underline hover:text-blue transition-300"
            >{{ $t('terms_of_use') }}</NuxtLink
          >
        </template>
      </i18n-t>
    </div>

    <UIButton
      class="w-full mt-5"
      v-bind="{ loading }"
      :text="$t('register')"
      @click="submit"
    />
    <div class="flex-center gap-2 mt-3">
      <p class="text-dark/50 leading-20 text-sm font-medium">
        {{ $t('already_has_account') }}
      </p>
      <button
        class="text-sm leading-20 font-medium text-dark hover:text-blue transition-300"
        @click="$emit('login')"
      >
        {{ $t('login') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'
import { debounce } from '~/utils'

interface Props {
  form: TForm<any>
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['on-register', 'load-more', 'login'])
const { form } = unref(props)
const { values, $v } = form
const { showToast } = useCustomToast()
const store = useCommonStore()
const { t } = useI18n()

const type = ref('password')

function submit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    emit('on-register')
  } else {
    if ($v.value?.password.$invalid) {
      return showToast(t('password_errors.length'), 'error')
    }
    if ($v.value?.confirm_password.$invalid) {
      return showToast(t('confirm_password_errors.match'), 'error')
    }

    showToast(t('no_validation'), 'error')
  }
}

const countries = computed(() => store.countries.list)
const countriesLoading = computed(() => store.countries.loading)
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

store.fetchCountries(true, false)

function onSelect(option: any) {
  countrySearch.value = option.name
  form.values.countryName = option.name
}
</script>
