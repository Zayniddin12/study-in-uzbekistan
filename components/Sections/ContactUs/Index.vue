<script lang="ts" setup>
import { email, maxLength, minLength, required } from '@vuelidate/validators'

import { useAuthStore } from '~/store/auth'

interface Emits {
  (event: 'close'): void
}

defineProps({
  show: Boolean,
})

const emits = defineEmits<Emits>()

const authStore = useAuthStore()
const fullName = computed(() => {
  if (Object.keys(authStore.user).length > 0) {
    return authStore?.user?.first_name + ' ' + authStore?.user?.last_name
  }
  return ''
})
const userEmail = computed(() => {
  if (Object.keys(authStore.user).length > 0) {
    return authStore?.user?.contact_email
  }
  return ''
})
const loading = ref(false)

const isSuccessful = ref(false)
const contactForm = useForm(
  {
    name: '',
    email: '',
    about: '',
    message: '',
  },
  {
    name: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    about: {
      required,
      minLength: minLength(3),
    },
    message: {
      required,
      minLength: minLength(3),
      maxlength: maxLength(500),
    },
  }
)

// onMounted(() => {
//   if (fullName.value || userEmail.value) {
//     contactForm.values.name = fullName.value
//     contactForm.values.email = userEmail.value
//   }
// })

const submit = async () => {
  contactForm.$v.value.$touch()
  if (!contactForm.$v.value.$invalid) {
    loading.value = true

    const data = contactForm.values
    data.subject = data.about
    delete data.about

    await useApi()
      .$post('/common/contact-us/', {
        body: data,
      })
      .then(() => {
        isSuccessful.value = true
      })
      .finally(() => (loading.value = false))
  }
}

const clearForm = () => {
  isSuccessful.value = false
  contactForm.$v.value.$reset()

  contactForm.values.name = ''
  contactForm.values.email = ''
  contactForm.values.about = ''
  contactForm.values.message = ''

  if (fullName.value || userEmail.value) {
    contactForm.values.name = fullName.value
    contactForm.values.email = userEmail.value
  }
}

const closeModal = () => {
  emits('close')
  clearForm()
}

watch(
  () => authStore.user,
  () => {
    if (fullName.value || userEmail.value) {
      contactForm.values.name = fullName.value
      contactForm.values.email = userEmail.value
    }
  }
)
</script>

<template>
  <Modal
    :header-style="isSuccessful ? '!pb-0 border-none' : ''"
    :show="show"
    :title="!isSuccessful ? $t('contact_us_title') : ''"
    @close="closeModal"
    @outer-click="closeModal"
  >
    <section :class="{ '!pt-0 !-mt-2': isSuccessful }" class="px-5 pb-5 pt-4">
      <form v-if="!isSuccessful" class="grid grid-cols-1 gap-5" @submit.prevent>
        <FormGroup :label="$t('contact_form.name')" for-id="name" is-required>
          <FormInput
            v-model="contactForm.values.name"
            :disabled="!!fullName"
            :error="contactForm.$v.value.name.$error"
            :placeholder="$t('contact_form.placeholder.name')"
            input-id="name"
          />
        </FormGroup>
        <FormGroup :label="$t('contact_form.email')" for-id="email" is-required>
          <FormInput
            v-model="contactForm.values.email"
            :disabled="!!userEmail"
            :error="contactForm.$v.value.email.$error"
            :placeholder="$t('contact_form.placeholder.email')"
            input-id="email"
          />
        </FormGroup>
        <FormGroup :label="$t('contact_form.about')" for-id="about">
          <FormInput
            v-model="contactForm.values.about"
            :error="contactForm.$v.value.about.$error"
            :placeholder="$t('contact_form.placeholder.about')"
            input-id="about"
          />
        </FormGroup>
        <FormGroup :label="$t('contact_form.message')" for-id="message">
          <FormTextarea
            v-model="contactForm.values.message"
            :error="contactForm.$v.value.message.$error"
            :placeholder="$t('contact_form.placeholder.message')"
            class="h-[140px] overflow-scroll"
            input-id="message"
            maxlength="500"
            remove-resize
          />
        </FormGroup>

        <UIButton
          :disabled="contactForm.$v.value.$invalid"
          :loading="loading"
          :text="$t('contact_form.submit')"
          class="w-full mt-1"
          @click="submit"
        />
      </form>
      <SectionsContactUsSuccess v-else @close="closeModal" />
    </section>
  </Modal>
</template>

<style scoped></style>
