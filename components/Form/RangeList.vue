<template>
  <div class="range-slider">
    <input
      class="relative z-10"
      type="range"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @input="handleInput"
    />
    <div class="track -mt-[29px] relative">
      <div
        class="flex-center-between absolute-center w-full z-10 pointer-events-none"
      >
        <div />
        <div
          v-for="(i, idx) in list?.length - 2"
          :key="idx"
          class="w-px h-3 bg-white-100"
          :class="[
            { 'opacity-0': idx === modelValue - 1 },
            { 'opacity-40': idx < modelValue - 1 },
          ]"
        />
        <div />
      </div>
      <div class="fill rounded-full" :style="{ width: fillWidth }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  min: number
  max: number
  step: number
  modelValue?: number
  list: any[] | number
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void
}>()
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', parseFloat(target.value))
}

const fillWidth = computed(() => {
  const range = props.max - props.min
  const percent = ((props.modelValue - props.min) / range) * 100
  return `${percent > 20 ? percent : `${percent > 0 ? percent + 2 : percent}`}%`
})
</script>

<style scoped>
.range-slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input[type='range'] {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  border-radius: 5px;
  background: transparent;
  outline: none;
}

.track {
  width: 100%;
  height: 20px;
  background: #fff;
  border-radius: 99px;
  position: relative;
}

.fill {
  height: 100%;
  background: linear-gradient(to right, #007bff, #007bff);
  border-radius: 99px;
  position: absolute;
  top: 0;
  left: 0;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 32px;
  height: 32px;
  border: 4px solid #5498fb;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

.value-display {
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
}
</style>
