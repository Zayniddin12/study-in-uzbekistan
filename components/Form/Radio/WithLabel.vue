<template>
  <div>
    <div class="flex-y-center gap-3">
      <i :class="icon" class="text-[32px] text-blue" />
      <p class="leading-132 text-dark font-bold text-xl">{{ label }}</p>
    </div>

    <div class="flex-y-center flex-wrap gap-3 mt-3">
      <button
        v-for="(choice, index) in choices"
        :key="index"
        class="flex-center gap-2 bg-white py-2 px-4 rounded-full border border-white-100 hover:border-blue transition-300"
        :class="{ '!border-blue': active === choice.value }"
        @click="$emit('change', choice.value)"
      >
        <div
          class="w-5 h-5 rounded-full border-[1.5px] border-gray flex-center transition-300"
          :class="{ '!border-blue': active === choice.value }"
        >
          <div
            class="w-2.5 h-2.5 rounded-full bg-blue transition-300 scale-0"
            :class="{ 'scale-100': active === choice.value }"
          />
        </div>
        <p class="text-sm leading-132 font-medium text-dark">
          {{ choice?.label }}
        </p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  icon: string
  choices: {
    label: string
    value: string
  }[]
  active: string | number
}

defineProps<Props>()
defineEmits(['change'])
</script>
