<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div :key="step">
        <SectionsAuthResetPasswordEmail
          v-if="step === 1"
          :form="emailForm"
          @next="step = 2"
        />
        <SectionsAuthResetPasswordConfirm
          v-if="step === 2"
          :value="emailForm.values.email"
          :form="confirmForm"
          @next="step = 3"
          @back="toOne"
        />
        <SectionsAuthResetPasswordConfirmPassword
          v-if="step === 3"
          :form="passwordForm"
          @next="
            $emit('login', {
              email: emailForm.values.email,
              password: passwordForm.values.new_password,
            })
          "
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { email, minLength, required } from '@vuelidate/validators'

import type { useForm } from '~/composables/useForm'

const step = ref(1)

const emailForm = useForm(
  {
    email: '',
  },
  {
    email: {
      required,
      email,
    },
  }
)

const confirmForm = useForm(
  {
    code: '',
  },
  {
    code: {
      required,
      minLength: minLength(6),
    },
  }
)

const passwordForm = useForm(
  {
    new_password: '',
    confirm_password: '',
  },
  {
    new_password: {
      required,
    },
    confirm_password: {
      required,
      sameAs: (val: string) => {
        return val === passwordForm.values.new_password
      },
    },
  }
)

function toOne() {
  confirmForm.values.code = ''
  confirmForm.$v.value.$reset()
  step.value = 1
}
</script>
