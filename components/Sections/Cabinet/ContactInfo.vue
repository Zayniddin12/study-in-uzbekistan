<template>
  <div class="grid grid-cols-12 gap-5">
    <FormGroup
      :label="$t('email')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormInput
        v-model="values.contact_email"
        :placeholder="$t('enter_email')"
        :error="form.$v.value.contact_email.$error"
        disabled
      />
    </FormGroup>
    <FormGroup
      :label="$t('phone')"
      class="col-span-12 lg:col-span-6"
      is-required
    >
      <FormInputPhone
        v-model="values.contact_phone"
        placeholder="+99800 000 00 00"
        :error="form.$v.value.contact_phone.$error"
        @trigger="trigger"
      />
    </FormGroup>
    <FormGroup :label="$t('telegram')" class="col-span-12 lg:col-span-6">
      <FormInput
        v-model="values.contact_telegram"
        :placeholder="$t('t.me/username')"
        :error="form.$v.value.contact_telegram.$error"
      >
        <template #prefix>
          <i class="icon-telegram text-3xl text-blue mx-2"></i>
          <hr class="h-6 border border-solid" />
        </template>
      </FormInput>
    </FormGroup>
    <FormGroup :label="$t('whatsapp')" class="col-span-12 lg:col-span-6">
      <FormInput
        v-model="values.contact_whatsapp"
        :placeholder="$t('wa.me/username')"
        :error="form.$v.value.contact_whatsapp.$error"
      >
        <template #prefix>
          <i class="icon-whatsapp text-xl text-[#00A055] mx-2"></i>
          <hr class="h-6 border border-solid" />
        </template>
      </FormInput>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()

const emit = defineEmits(['trigger'])

// const validateErr=ref(false)
function trigger(item: boolean) {
  emit('trigger', item)
}

const { form } = unref(props)
const { values, $v } = form
</script>
