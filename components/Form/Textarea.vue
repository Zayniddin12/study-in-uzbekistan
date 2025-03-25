<template>
  <div
    :id="id"
    :class="{ '!border-red ': error }"
    class="bg-white border border-white-100 transition-300 focus-within:border-blue focus-within:bg-white flex items-center rounded-lg"
  >
    <slot name="prefix" />
    <textarea
      :id="inputId"
      ref="Input"
      :class="[inputClass, { 'resize-none': removeResize }]"
      :value="modelValue"
      class="w-full h-full text-base sm:text-sm px-3 pt-2.5 pb-3 text-dark bg-transparent outline-none font-medium leading-5 placeholder:text-gray"
      v-bind="{
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        autocomplete,
      }"
      @blur="$emit('blur')"
      @focus="handleFocus"
      @focusout="$emit('focusout')"
      @input="handleInput"
      @keyup.enter="handleEnter"
    />
    <slot name="suffix" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

export interface Props {
  type?: string
  placeholder?: string
  modelValue: number | string
  disabled?: boolean
  error?: boolean
  focus?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  inputClass?: string | string[]
  prefixClass?: string
  suffixClass?: string
  autocomplete?: string
  inputId?: string
  readonly?: boolean
  removeResize?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 650,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: 'new-password',
})

const handleFocus = () => {
  emit('focus')
}
watch(
  () => props?.focus,
  (value) => {
    if (value) {
      Input?.value?.focus()
    }
  },
  { deep: true, immediate: true }
)
</script>
