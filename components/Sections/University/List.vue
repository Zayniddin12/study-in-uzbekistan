<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div :key="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <template v-if="loading">
          <CardUniversity
            v-for="(card, i) in 6"
            :key="i"
            v-bind="{ card }"
            loading
          />
        </template>
        <template v-if="!loading">
          <CardUniversity
            v-for="(card, i) in universities"
            :key="i"
            v-bind="{ card }"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  universities: any[]
  loading?: boolean
}

defineProps<Props>()
</script>
