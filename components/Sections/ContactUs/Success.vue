<script setup lang="ts">
const router = useRouter()
const route = useRoute()
interface Emits {
  (event: 'close'): void
}

const emits = defineEmits<Emits>()
const goToHome = () => {
  router.push({ path: '/' })
  emits('close')
}
</script>

<template>
  <div>
    <div class="mb-5 flex items-center justify-center">
      <img src="/images/svg/check-circle.svg" alt="Success Image" />
    </div>

    <h1 class="mb-3 text-dark text-lg font-bold font-mts leading-6 text-center">
      {{ $t('contact_form.success_title') }}
    </h1>
    <p class="mb-6 text-dark font-normal text-sm leading-140 text-center">
      {{ $t('contact_form.success_message') }}
    </p>

    <UIButton class="w-full" @click="goToHome">
      {{ $t('contact_form.success_btn') }}
    </UIButton>
  </div>
</template>

<style scoped></style>
