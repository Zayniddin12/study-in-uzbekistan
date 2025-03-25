<template>
  <div class="container mt-6 md:mt-8">
    <h2 class="heading-1 !text-2xl">{{ $t('visa_application') }}</h2>
    <div class="text-sm leading-140 text-dark font-normal my-4">
      <p>{{ $t('application_countries') }}</p>
      <p class="mt-2.5">{{ $t('apply_study_russia') }}</p>
      <p class="mt-2.5">{{ $t('apply_invitation') }}</p>
    </div>

    <div
      class="md:rounded-xl bg-gray-200 p-4 text-dark font-normal leading-140"
    >
      <p>{{ $t('invitation_foreigners') }}</p>
      <p class="mt-2.5">{{ $t('invitation_second_title') }}</p>
      <p class="mt-2.5">{{ $t('invitation_third_title') }}</p>
    </div>

    <div
      class="p-3 md:p-4 flex gap-3 items-center bg-white rounded-2xl border-[0.5px] border-[#1ad9394d] mt-4"
    >
      <i class="icon-info text-green text-2xl"></i>
      <span
        class="font-medium text-xs md:text-sm text-dark !leading-130 md:leading-112"
        ><NuxtLink class="text-blue cursor-pointer" @click="login">{{
          $t('register_website')
        }}</NuxtLink>
        {{ $t('register_admis') }}</span
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/store/auth'

const { showToast } = useCustomToast()
const { t } = useI18n()
const store = useAuthStore()

const login = () => {
  if (!Object.keys(store.user).length) {
    return $event('open-auth', 'login')
  } else {
    showToast(t('already_registered'), 'success')
  }
}
const { $event } = useNuxtApp()
</script>

<style></style>
