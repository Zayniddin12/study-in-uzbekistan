<template>
  <div>
    <p class="mb-3 text-sm leading-132 font-medium text-dark">
      {{ $t('we_send_code') }}
    </p>
    <button
      class="inline-flex items-center gap-2.5 px-2 py-1.5 text-sm font-medium leading-132 text-dark bg-gray-200 rounded-md group mb-6"
      @click="$emit('back')"
    >
      {{ value }}
      <i
        class="icon-edit text-base text-gray group-hover:text-blue transition-300"
      />
    </button>
    <FormGroup :label="$t('confirm_code')" for-id="confirm_code">
      <FormOtp
        v-model="values.code"
        :error="form.$v.value.code.$error || responseError"
        @complete="submit"
      />
    </FormGroup>
    <UIButton
      class="mt-5 w-full"
      :text="$t('reset')"
      :disabled="values?.code?.length < 6"
      :loading="buttonLoading"
      @click="submit"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useAuthStore } from '~/store/auth'

interface Props {
  value: string
  form: TForm<any>
}

const store = useAuthStore()
const props = defineProps<Props>()
const { form } = unref(props)
const { values, $v } = form

const emit = defineEmits(['next', 'back'])
const { showToast } = useCustomToast()
const { t } = useI18n()

const buttonLoading = ref(false)
const responseError = ref(false)

async function submit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    try {
      buttonLoading.value = true
      const data = await store.submitOtp(values.code)
      buttonLoading.value = false
      emit('next')
    } catch (e) {
      responseError.value = true
      buttonLoading.value = false
    }
  } else {
    showToast(t('error_code'), 'error')
  }
}
watch(
  () => form.values,
  () => {
    responseError.value = false
  },
  {
    deep: true,
  }
)
</script>
