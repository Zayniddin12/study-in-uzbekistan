<template>
  <div class="container mt-6 md:mt-8">
    <h2 class="heading-1 !text-2xl">{{ $t('required_documents') }}</h2>
    <p class="font-medium text-dark leading-140">
      {{ $t('submit_doucuments') }}
    </p>
    <div class="bg-gray-200 rounded-2xl px-6 py-5 mt-3 mb-6">
      <ul class="marker:text-blue list-disc pl-4 space-y-3">
        <li class="markers font-normal leading-140 text-dark">
          {{ $t('initial_application') }}
        </li>
        <li class="markers font-normal leading-140 text-dark !mt-2">
          {{ $t('official_submission') }}
        </li>
      </ul>
    </div>
    <p class="font-medium text-dark leading-140">{{ $t('submit_initial') }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 mb-4">
      <div
        v-for="application of applications"
        :key="application"
        class="p-4 border border-gray-200 rounded-2xl"
      >
        <i :class="application?.icon" class="text-blue text-5xl"></i>
        <p
          v-if="application?.title"
          class="font-bold leading-112 text-dark mt-5 mb-2"
        >
          {{ application?.title }}
        </p>
        <p
          v-if="application?.subtitle"
          class="text-dark font-normal text-[13px] leading-140"
        >
          {{ application?.subtitle }}
        </p>
      </div>
    </div>
    <!--    info section-->
    <div
      class="p-3 md:p-4 grid grid-cols-1 lg:grid-cols-2 bg-white gap-4 rounded-2xl border-[0.5px] border-[#f5382c4d]"
    >
      <div class="flex items-center gap-3">
        <i class="icon-info text-red text-2xl"></i>
        <span
          class="font-medium text-xs md:text-sm text-dark !leading-130 md:leading-112"
        >
          {{ $t('documents_certificated') }}</span
        >
      </div>
      <div class="flex items-center gap-3">
        <i class="icon-info text-red text-2xl"></i>
        <span
          class="font-medium text-xs md:text-sm text-dark leading-130 md:leading-112"
        >
          {{ $t('complete_documents') }}</span
        >
      </div>
    </div>
    <!--    info section-->
    <p class="font-medium text-dark leading-140 mt-6">
      {{ $t('submit_initial') }}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-3 mb-4">
      <div
        v-for="(document, idx) of documents"
        :key="idx"
        class="p-4 border border-gray-200 rounded-2xl"
      >
        <i :class="document?.icon" class="text-blue text-5xl"></i>
        <p class="font-bold leading-112 text-dark mt-5 mb-2">
          {{ document?.title }}
        </p>
        <p class="text-dark font-normal text-[13px] leading-140">
          {{ document?.subtitle }}
        </p>
      </div>
    </div>

    <div class="text-sm leading-140 text-dark font-normal">
      <p>{{ $t('first_stage_rule') }}</p>
      <p class="mt-4">{{ $t('second_stage_rule') }}</p>
    </div>

    <div class="bg-gray-200 rounded-2xl px-6 py-5 mt-3 mb-6">
      <ul class="marker:text-blue list-disc pl-4 space-y-3">
        <li class="markers font-normal leading-140 text-dark">
          {{ $t('international_universities') }}
        </li>
        <li class="markers font-normal leading-140 text-dark !mt-2">
          {{ $t('repsresentiative_officces') }}
        </li>
      </ul>
    </div>

    <div class="text-sm leading-140 text-dark font-normal">
      <p>{{ $t('documents_legalized') }}</p>
    </div>

    <div
      class="p-3 md:p-4 bg-white gap-4 rounded-2xl border-[0.5px] border-[#f5382c4d] flex items-center mt-4 mb-3"
    >
      <i class="icon-info text-red text-2xl"></i>
      <span
        class="font-medium text-sm md:text-sm text-dark leading-130 md:leading-112"
      >
        {{ $t('obtain_medical_service') }}</span
      >
    </div>

    <div
      class="p-3 md:p-4 flex gap-3 items-center bg-white rounded-2xl border-[0.5px] border-[#1ad9394d]"
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/store/auth'

const { t } = useI18n()


const { showToast } = useCustomToast()
const store = useAuthStore()

const login = () => {
  if (!Object.keys(store.user).length) {
    return $event('open-auth', 'login')
  } else {
    showToast(t('already_registered'), 'success')
  }
}
const { $event } = useNuxtApp()
const applications = ref([
  {
    icon: 'icon-copy',
    title: t('copy_education_document'),
    subtitle: t('copy_education_document_subtitle'),
  },
  {
    icon: 'icon-file-user',
    title: t('copy_id'),
    subtitle: '',
  },
  {
    icon: 'icon-file-border',
    title: t('completed_form'),
    subtitle: t('completed_form_title'),
  },
  {
    icon: 'icon-file-contact',
    title: t('photo_title'),
    subtitle: t('photo_subtitle'),
  },
])

const documents = ref([
  {
    icon: 'icon-file-border',
    title: t('application_admission'),
    subtitle: t('application_admission_subtitle'),
  },
  {
    icon: 'icon-file-user',
    title: t('document_proving'),
    subtitle: t('document_proving_subtitle'),
  },
  {
    icon: 'icon-file-book',
    title: t('education_document'),
    subtitle: t('education_document_subtitle'),
  },
  {
    icon: 'icon-file-diploma',
    title: t('medical_certificate'),
    subtitle: t('medical_certificate_subtitle'),
  },
  {
    icon: 'icon-file-contact',
    title: t('photo_title'),
    subtitle: t('photographs_subtitle'),
  },
])



</script>

<style scoped>
.markers::marker {
  font-size: 1.5em;
}
</style>
