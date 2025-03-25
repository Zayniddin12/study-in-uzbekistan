<template>
  <UITest />
  <LayoutsHeader />
  <div class="min-h-[calc(100vh-108px)] bg-white-200">
    <slot></slot>
  </div>
  <ClientOnly>
    <LayoutsFooter />
  </ClientOnly>
</template>
<script setup lang="ts"></script>
