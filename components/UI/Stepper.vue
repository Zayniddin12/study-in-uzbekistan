<template>
  <div class="step-shadow relative w-full bg-white rounded-2xl p-1.5 space-y-1">
    <div
      v-for="(item, index) in steps"
      :key="index"
      :class="{ 'bg-gray-100/[14%]': item?.check === currentStep }"
      class="flex-shrink-0 rounded-xl select-none transition-300 hover:bg-gray-100/[14%] cursor-pointer"
      @click="$emit('change-step', item?.check)"
    >
      <div class="flex items-center p-3 space-x-2">
        <div
          :class="checkActive(item?.check)"
          class="flex-center flex-shrink-0 w-5 h-5 flex-center transition-300"
        >
          <template v-if="item?.check < currentStep">
            <img
              src="/images/check-circle.svg"
              alt="check icon"
              class="transition-300"
            />
          </template>
          <template v-else>
            <span
              :class="item?.icon"
              class="text-xl leading-20 flex-shrink-0"
            ></span>
          </template>
        </div>
        <div class="">
          <p class="text-sm text-dark font-medium leading-20">
            {{ $t(item?.title) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentStep: number
  steps: {
    title: string
    icon: string
    check: number
  }[]
}
const props = defineProps<Props>()

function checkActive(target: number) {
  if (target === props.currentStep) {
    return 'text-blue'
  } else if (props.currentStep > target) {
    return 'text-white'
  } else {
    return 'text-gray'
  }
}
</script>
<style scoped>
.step-shadow {
  box-shadow: 0px 4px 28px 0px rgba(24, 24, 24, 0.03);
}
</style>
