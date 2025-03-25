<template>
  <div class="py-7 md:py-16 container">
    <div class="flex justify-between items-end">
      <UISectionTitle :title="$t(title)" />

      <NuxtLink
        to="/universities"
        class="max-md:hidden group flex-y-center gap-2 text-base leading-normal font-medium text-dark hover:text-blue transition-300"
      >
        {{ $t('all_universities') }}
        <i
          class="icon-arrow-right text-gray text-xl group-hover:text-blue transition-300"
        />
      </NuxtLink>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 md:mt-8">
      <CardUniversity v-for="i in 3" :key="i" />
    </div>
    <NuxtLink
      to="/"
      class="md:hidden group flex-center-between gap-2 text-base leading-normal font-medium text-dark hover:text-blue transition-300 mt-4"
    >
      {{ $t('all_news') }}
      <i
        class="icon-arrow-right text-gray text-xl group-hover:text-blue transition-300"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}
withDefaults(defineProps<Props>(), {
  title: 'universities_current_country',
})
</script>
