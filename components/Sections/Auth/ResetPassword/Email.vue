<template>
  <div>
    <FormGroup :label="$t('email')" for-id="email">
      <FormInput
        v-model="values.email"
        input-id="email"
        :placeholder="$t('enter_email')"
        :error="form.$v.value.email.$error"
      />
    </FormGroup>

    <UIButton
      class="w-full mt-5"
      :disabled="!values.email"
      v-bind="{ loading }"
      :text="$t('reset')"
      @click="submit"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useCustomToast } from '~/composables/useCustomToast'
import type { TForm } from '~/composables/useForm'
import { useAuthStore } from '~/store/auth'
import type { TCheckEmailData, TRequestOtpData } from '~/types/auth'

interface Props {
  form: TForm<any>
}

const { t } = useI18n()
const { showToast } = useCustomToast()
const props = defineProps<Props>()

const { form } = unref(props)
const { values, $v } = form
const store = useAuthStore()
const emit = defineEmits(['next'])
const loading = ref(false)
async function submit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    try {
      loading.value = true
      const data: TCheckEmailData = await store.checkAccount(values.email)
      if (data?.exists) {
        const result: TRequestOtpData = await store.requestOtp(values.email)
        store.requestOtpData = result
        emit('next')
      } else {
        showToast(t('email_not_available_in_system'), 'error')
      }
      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }
}
</script>
