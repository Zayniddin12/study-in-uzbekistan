<template>
  <div>
    <div class="flex flex-col gap-4">
      <FormGroup :label="$t('new_password')" for-id="new-password">
        <FormInputPassword
          v-model="values.new_password"
          input-id="new-password"
          :placeholder="$t('enter_new_password')"
          v-bind="{ type }"
          :error="form.$v.value.new_password.$error"
          @change="type = $event"
        />
      </FormGroup>
      <FormGroup :label="$t('confirm_password')" for-id="confirm">
        <FormInputPassword
          v-model="values.confirm_password"
          input-id="confirm"
          :placeholder="$t('enter_confirm_password')"
          v-bind="{ type }"
          :error="form.$v.value.confirm_password.$error"
          @change="type = $event"
        />
      </FormGroup>
    </div>

    <UIButton
      class="w-full mt-5"
      :text="$t('reset')"
      :disabled="
        !values.new_password?.length || !values.confirm_password?.length
      "
      v-bind="{ loading }"
      @click="submit"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useAuthStore } from '~/store/auth'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()
const store = useAuthStore()
const { form } = unref(props)
const { values, $v } = form

const emit = defineEmits(['next'])
const { showToast } = useCustomToast()
const { t } = useI18n()

const type = ref('password')
const loading = ref(false)

async function submit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    try {
      loading.value = true
      const data = await store.resetPassword(values.new_password)
      showToast(t('successfully_changed_password'), 'success')
      emit('next')
      loading.value = false
    } catch (e) {
      loading.value = false
    }
  }
}
</script>
