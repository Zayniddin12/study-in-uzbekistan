<template>
  <div class="flex flex-col gap-5">
    <FormGroup :label="$t('breakfast')">
      <FormRange v-model="values.breakfast" max="7" step="1" />
      <template #opposite>
        <p
          v-if="values.breakfast"
          class="text-sm leading-5 font-medium text-dark"
        >
          {{ $t('day_count', { count: values.breakfast }) }}
        </p>
      </template>
    </FormGroup>
    <FormGroup :label="$t('lunch')">
      <FormRange v-model="values.lunch" max="7" step="1" />
      <template #opposite>
        <p v-if="values.lunch" class="text-sm leading-5 font-medium text-dark">
          {{ $t('day_count', { count: values.lunch }) }}
        </p>
      </template>
    </FormGroup>
    <FormGroup :label="$t('dinner')">
      <FormRange v-model="values.dinner" max="7" step="1" />
      <template #opposite>
        <p v-if="values.dinner" class="text-sm leading-5 font-medium text-dark">
          {{ $t('day_count', { count: values.dinner }) }}
        </p>
      </template>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()
const { form } = unref(props)
const { values } = form
</script>
