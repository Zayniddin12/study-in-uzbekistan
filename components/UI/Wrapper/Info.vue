<template>
  <div class="flex flex-col gap-2">
    <div class="flex-y-center info-label" :class="labelClass">
      <div v-if="prefixLabel" v-html="prefixLabel" />
      {{ $t(label) }}
      <div v-if="suffixLabel" v-html="suffixLabel" />
    </div>
    <slot>
      <div class="flex-y-center info-value" :class="valueClass">
        <div v-if="prefixValue" v-html="prefixValue" />
        {{ value }}
        <div v-if="suffixValue" v-html="suffixValue" />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { IInfo } from '~/types/components/info'
defineProps<IInfo>()
</script>
