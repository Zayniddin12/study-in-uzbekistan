<template>
  <label
    class="transition group inline-flex items-center relative select-none min-h-[20px]"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    :style="{ minHeight: computedSize, '--btn-size': computedBtnSize }"
  >
    <input
      type="radio"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      :checked="modelValue == value"
      v-bind="{ name, value, disabled }"
      @change="handleChange"
    />
    <span
      class="before:w-2.5 before:h-2.5 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-3 before:opacity-0 relative border-2 rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-100 peer-disabled:before:bg-gray-100 before:bg-blue group-hover:border-blue peer-checked:border-blue peer-checked:before:!bg-blue"
      :class="[computedBtnStyles]"
      :style="{ width: computedSize, height: computedSize }"
    />
    <slot name="label">
      <span
        class="font-normal text-sm !leading-130"
        :class="[
          labelStyles,
          modelValue === value ? 'text-blue' : 'text-gray-700',
        ]"
      >
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number | object
  value?: string | number | object
  label: string | number | object
  name?: string | number
  disabled?: boolean
  size?: string | number
  btnStyles?: string
  labelStyles?: string
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 20,
  btnStyles: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | object | boolean): void
}>()

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', props.value ? target.value : target.checked)
}

const computedSize = computed(() => props.size + 'px')

const computedBtnSize = computed(() => +props.size * 0.5 + 'px')

const computedBtnStyles = computed(() =>
  !props.disabled ? props.btnStyles : 'peer-checked:before:!bg-gray-100'
)
</script>
