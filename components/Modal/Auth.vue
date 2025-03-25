<template>
  <Modal
    :title="titles?.[innerState]"
    body-class="!max-w-[378px]"
    disable-outer-close
    v-bind="{ show }"
    @close="
      () => {
        $emit('close')
        innerState = 'login'
        clearLogin()
        clearRegister()
      }
    "
  >
    <div class="p-5 pt-4">
      <SectionsAuthLogin
        v-if="innerState === ESTATE.login"
        :form="loginForm"
        :loading="loginBtnLoading"
        @password="toReset"
        @register="innerState = ESTATE.register"
        @on-submit="onLogin"
      />
      <SectionsAuthRegister
        v-if="innerState === ESTATE.register"
        :form="registerForm"
        :loading="regLoading"
        @login="innerState = ESTATE.login"
        @on-register="onRegister"
      />
      <SectionsAuthResetPassword
        v-if="innerState === ESTATE.password"
        @login="resetDone"
      />
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { email, minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '~/store/auth'

const { showToast } = useCustomToast()
const store = useAuthStore()

interface Props {
  show?: boolean
  state?: 'login' | 'register' | 'password'
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])
const { t } = useI18n()

const innerState = ref(props.state)
const regLoading = ref(false)
const loginBtnLoading = ref(false)

enum ESTATE {
  login = 'login',
  register = 'register',
  password = 'password',
}

const titles = {
  login: t('login'),
  register: t('registration'),
  password: t('reset_password'),
}

const loginForm = useForm(
  {
    email: '',
    password: '',
  },
  {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  }
)

const registerForm = useForm(
  {
    last_name: '',
    first_name: '',
    email: '',
    country: '',
    password: '',
    confirm_password: '',
    checked: false,
  },
  {
    last_name: {
      required,
    },

    first_name: {
      required,
    },
    email: {
      required,
      email,
    },
    country: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirm_password: {
      required,
      sameAs: (val: string) => {
        return val === registerForm.values.password
      },
      minLength: minLength(8),
    },
    checked: {
      sameAs: (val: boolean) => {
        return val
      },
    },
  }
)

function toReset() {
  clearLogin()
  innerState.value = ESTATE.password
}

async function onLogin() {
  try {
    loginBtnLoading.value = true
    await store.login(loginForm.values)
    emit('close')
    clearLogin()
    showToast(t('success_messages.login'), 'success')
    loginBtnLoading.value = false
  } catch (err) {
    loginBtnLoading.value = false
    showToast(err?._data?.[0]?.error?.message, 'error')
  }
}

function onRegister() {
  const obj = { ...registerForm.values }
  delete obj.confirm_password
  delete obj.checked
  regLoading.value = true
  useApi()
    .$post(`/common/auth/registration/`, {
      body: {
        ...obj,
      },
    })
    .then(() => {
      clearRegister()
      showToast(t('success_messages.registration'), 'success')
      loginForm.values.email = obj.email
      loginForm.values.password = obj.password
      innerState.value = ESTATE.login
    })
    .finally(() => {
      regLoading.value = false
    })
}

function clearRegister() {
  for (const key in registerForm.values) {
    registerForm.values[key] = ''
  }
  registerForm.values.checked = false
  registerForm.$v.value.$reset()
}

function clearLogin() {
  loginForm.values.email = ''
  loginForm.values.password = ''
  loginForm.$v.value.$reset()
}

function resetDone(e: { email: string; password: string }) {
  loginForm.values.email = e.email
  loginForm.values.password = e.password
  innerState.value = ESTATE.login
}

// watch(
//   () => props.show,
//   () => {
//     if (!props.show) {
//       // state.value = ESTATE.login
//       state.value = null
//     }
//     clearLogin()
//     clearRegister()
//   }
// )

// watch(
//   () => props.state,
//   () => {
//     innerState.value = 'login'
//   }
// )
</script>
