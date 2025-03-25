<script setup lang="ts">
defineEmits<{
  (e: 'edit'): void
}>()
</script>

<template>
  <div class="py-4 px-6 rounded-2xl bg-white default-shadow">
    <NuxtLink to="/profile/edit">
      <UIButton :text="$t('edit')" class="!px-8 ml-auto block" type="button" />
    </NuxtLink>
  </div>
</template>

<style scoped></style>
