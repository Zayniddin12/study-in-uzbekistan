<template>
  <div :class="mainClasses" class="flex flex-col gap-2">
    <div class="flex-center-between">
      <label
        :class="labelClass"
        :for="forId"
        class="text-sm leading-5 font-medium text-dark cursor-pointer capitalize"
      >
        {{ label }}
        <span v-if="isRequired" class="text-red">*</span>
      </label>
      <slot name="opposite" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  label: string
  labelClass?: string
  forId: string
  isRequired?: boolean
  mainClasses?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Label',
  labelClass: '',
  mainClasses: '',
})
</script>
