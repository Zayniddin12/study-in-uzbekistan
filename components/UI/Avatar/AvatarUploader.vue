<template>
  <div>
    <div class="avatar-upload relative h-20 w-20 group !cursor-pointer">
      <input
        ref="fileInput"
        class="absolute top-0 right-0 left-0 bottom-0 z-20 opacity-0 cursor-pointer"
        type="file"
        accept=".jpg, .jpeg, .png"
        @change="previewImage"
      />

      <div class="avatar-upload__blur absolute-center w-full h-full"></div>

      <div class="relative">
        <UIAvatar
          :key="image"
          v-bind="{ image }"
          class="absolute top-0 right-0 left-0 bottom-0 cursor-pointer"
        />

        <div
          class="bg-black-100/50 absolute top-0 right-0 left-0 bottom-0 flex-center rounded-full opacity-0 group-hover:opacity-100 transition-300 transition-all cursor-pointer"
        >
          <i class="icon-pencil-edit text-white"></i>
        </div>
      </div>
    </div>
    <button
      v-if="image"
      class="text-red-300 mt-2 hover:text-red transition-all transition-300"
      @click="removeImage"
    >
      {{ $t('delete_avatar_image') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  defaultImage?: string
}
const props = defineProps<Props>()

interface Emits {
  (event: 'update:image', image?: Blob | string): void
  (event: 'remove-image'): void
}
const emit = defineEmits<Emits>()

const image = ref<string | undefined>(props.defaultImage)

const previewImage = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]

  const reader = new FileReader()

  reader.onload = (e) => {
    image.value = e?.target?.result as string
  }

  if (file) {
    reader.readAsDataURL(file)
  }
  emit('update:image', file)
}
const removeImage = () => {
  image.value = undefined
  emit('remove-image')
}

watch(
  () => props.defaultImage,
  (newValue) => {
    if (newValue !== image.value) {
      image.value = newValue
    }
  }
)
const fileInput = ref()
</script>
