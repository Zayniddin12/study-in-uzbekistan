<template>
  <div class="container mt-6">
    <h2 class="heading-1 !text-2xl">{{ $t('choose_univer_programm') }}</h2>
    <p class="mt-4 text-dark font-medium leading-140 text-base">
      {{ $t('applicants_russia') }}
    </p>
    <div class="mt-3 py-5 px-6 rounded-2xl bg-gray-200">
      <ul class="list-disc marker:text-blue space-y-2">
        <li v-for="n of 3" :key="n" class="text-base text-dark leading-140">
          {{ $t('access_variety') }}
        </li>
      </ul>
    </div>
    <p class="mt-4 text-sm text-dark leading-140">
      {{ $t('applicat_choose') }}
    </p>
  </div>
</template>
