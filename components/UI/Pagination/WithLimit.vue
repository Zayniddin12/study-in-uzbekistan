<template>
  <div class="flex-y-center">
    <UIPaginationPageLimit v-if="total > 12" v-model="size" />
    <UIPagination
      :total="total"
      :limit="limit || 10"
      :current-page="currentPage"
      class="ml-2.5"
      @input="(e: number) => page = e"
    />
  </div>
</template>
<script setup lang="ts">
interface Props {
  limitValue: number
  currentPage: number
  total: number
  limit?: number
}
const props = withDefaults(defineProps<Props>(), {
  limit: 12,
})
const emits = defineEmits<{
  (e: 'on-page-change', value: number): void
  (e: 'on-limit-change', value: number): void
}>()
const page = ref(1)
const size = ref(12)
watch(
  () => props.limitValue,
  (val) => {
    size.value = val
  },
  {
    immediate: true,
  }
)
watch(
  () => props.currentPage,
  (val) => {
    page.value = val
  },
  {
    immediate: true,
  }
)
watch(
  () => page.value,
  (val) => emits('on-page-change', val)
)
watch(
  () => size.value,
  (val) => emits('on-limit-change', val)
)
</script>
