<template>
  <FormInput
    v-model="value"
    :placeholder="placeholderSearch"
    v-bind="{ type, error, inputId }"
  >
    <template #suffix>
      <div
        class="px-3 h-max flex-center cursor-pointer transition-300"
        @click="type = type === 'password' ? 'text' : 'password'"
      >
        <span
          v-if="type === 'password'"
          class="icon-eye-slash text-xl text-gray font-bold"
        ></span>
        <span v-else class="icon-eye text-xl text-gray font-bold"></span>
      </div>
    </template>
  </FormInput>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

interface Props {
  error?: boolean
  type?: 'password' | 'text'
  inputId?: string
}
const props = defineProps<Props>()
interface Emits {
  (e: 'update:modelValue', v: string): void
  (e: 'change', v: string): void
}
const $emit = defineEmits<Emits>()

const { t } = useI18n()

const placeholderSearch = computed(() => t('enter_search'))

const value = ref<string>('')
const type = ref<string>('password')

watch(
  () => value.value,
  (v) => {
    value.value = value.value.replace(/\s+/g, '')
    $emit('update:modelValue', v)
  }
)

watch(
  () => props.type,
  () => {
    type.value = props.type
  }
)

watch(
  () => type.value,
  () => {
    $emit('change', type.value)
  }
)
</script>
