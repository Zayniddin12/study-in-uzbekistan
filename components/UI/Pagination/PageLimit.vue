<template>
  <div class="flex-center gap-2">
    <p class="text-dark-primary text-xs leading-lg">{{ $t('show') }}</p>
    <FormSelect
      v-model="limit"
      :options="limits"
      label-key="name"
      value-key="value"
      class="w-16 border border-gray-100 rounded-md"
      selected-option-styles="!px-2 !py-1.5 !bg-[#F7FAF8]"
    />
  </div>
</template>
<script setup lang="ts">
interface Props {
  limits: {
    value: number
  }[]
  modelValue: number
}
const props = withDefaults(defineProps<Props>(), {
  limits: () => [
    {
      value: 12,
      name: '12',
    },
    {
      value: 24,
      name: '24',
    },
    {
      value: 48,
      name: '48',
    },
  ],
})

const trigger = ref(false)

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
const limit = ref(12)
watch(
  () => limit.value,
  () => emits('update:modelValue', limit.value)
)
watch(
  () => props.modelValue,
  () => {
    limit.value = props.modelValue
  }
)

onMounted(() => {
  setTimeout(() => {
    trigger.value = !trigger.value
  }, 1000)
})
</script>
