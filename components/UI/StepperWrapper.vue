<template>
  <div>
    <div class="step-shadow w-full rounded-2xl bg-white">
      <div class="py-5 px-6 border-b border-gray-50">
        <Transition name="dropdown" mode="out-in">
          <h2
            :key="title"
            class="text-xl text-dark leading-112 font-bold font-mts"
          >
            {{ title }}
          </h2>
        </Transition>
      </div>
      <div class="py-5 px-6">
        <Transition name="dropdown" mode="out-in">
          <div :key="currentStep">
            <slot />
          </div>
        </Transition>
      </div>
    </div>
    <div
      class="step-shadow w-full rounded-2xl bg-white px-4 lg:px-6 py-3 lg:py-4 mt-5 flex flex-col md:flex-row sm:justify-end"
      :class="{ '!justify-between': currentStep === 5 }"
    >
      <UIButton
        v-if="currentStep === 5"
        variant="secondary"
        :text="$t('prev')"
        class="mb-2 md:mb-0"
        @click="handleStep('prev')"
      />
      <div
        class="w-full sm:w-auto flex items-center sm:justify-end flex-col sm:flex-row sm:space-x-5 space-y-2 sm:space-y-0"
      >
        <template v-if="currentStep < 5">
          <Transition name="fade" mode="out-in">
            <UIButton
              v-if="currentStep !== 0"
              variant="secondary"
              :text="$t('prev')"
              :disabled="secondaryButtonDisabled"
              class="w-full sm:w-auto"
              @click="handleStep('prev')"
            />
          </Transition>
          <UIButton
            :disabled="nextButtonDisabled"
            :text="$t('continue')"
            class="w-full sm:w-auto"
            @click="handleStep('next')"
          />
        </template>
        <template v-else>
          <UIButton
            :text="$t('save')"
            variant="secondary"
            class="w-full lg:w-auto"
            @click="handleSave"
          />
          <UIButton
            :text="$t('send_to_edu')"
            class="w-full lg:w-auto"
            :disabled="submitButtonDisabled"
            :loading="submitButtonLoading"
            @click="handleSumbitProfile"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  currentStep?: number
  nextButtonDisabled?: boolean
  secondaryButtonDisabled?: boolean
  submitButtonDisabled?: boolean
  submitButtonLoading?: boolean
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'handleStep', value: string): void
  (e: 'saveProfile'): void
  (e: 'submitProfile'): void
}>()

const handleStep = (value: string) => {
  emit('handleStep', value)
}

const handleSave = () => {
  emit('saveProfile')
  location.reload()
}

const handleSumbitProfile = () => {
  emit('submitProfile')
}
</script>

<style scoped>
.step-shadow {
  box-shadow: 0 4px 28px 0 rgba(24, 24, 24, 0.03);
}
</style>
