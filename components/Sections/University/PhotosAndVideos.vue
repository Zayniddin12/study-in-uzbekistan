<script setup lang="ts">
defineProps<{
  show: boolean
  item: {
    type: string
    image?: string
    vid_link?: string
  }
}>()

const emits = defineEmits<{
  (event: 'close'): void
}>()
</script>

<template>
  <Modal
    v-bind="{ show }"
    no-header
    body-class="!bg-transparent !max-w-[784px] !overflow-visible"
    has-close-icon
    @close="emits('close')"
    @outer-click="emits('close')"
  >
    <div class="aspect-video overflow-hidden relative rounded-lg">
      <img
        v-if="item?.type === 'image'"
        :src="item.image"
        alt="images"
        class="w-full h-full object-cover"
      />
      <div v-if="item?.type === 'video'" class="w-full h-full">
        <iframe
          :key="activeIndex"
          class="w-full h-full"
          :src="`https://www.youtube.com/embed/${convertToEmbed(
            item.vid_link
          )}?rel=0`"
          allowfullscreen
        />
      </div>
    </div>
  </Modal>
</template>

<style scoped></style>
