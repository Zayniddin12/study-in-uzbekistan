<template>
  <div
    class="relative rounded-full overflow-hidden shrink-0"
    :class="[
      { 'w-[100px] h-[100px]': size === 'lg' },
      { 'w-[72px] h-[72px]': size === 'md' },
      { 'w-[52px] h-[52px]': size === 'sm' },
      { 'w-10 h-10': size === 'xsl' },
      { 'w-8 h-8': size === 'xs' },
      avatarClass,
      {
        'before:rounded-full before:absolute before:inset-0 before:border-2 before:border-[rgba(255,255,255,0.4)]':
          !noBorder,
      },
    ]"
  >
    <UIShimmer v-bind="{ loading }" width="100%" height="100%">
      <img
        v-if="!isError && !!image"
        :src="image"
        :class="imageClass"
        alt="avatar-image"
        class="w-full h-full object-cover"
        @error="isError = true"
      />
      <img
        v-else
        :src="defaultImage"
        :class="imageClass"
        alt="avatar-default-image"
        class="w-full h-full object-cover"
      />
    </UIShimmer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  image?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xsl'
  avatarClass?: string
  imageClass?: string
  loading?: boolean
  defaultImage?: string
  noBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  avatarClass: '',
  imageClass: '',
  defaultImage: '/images/profile/DefaultImage.svg',
})

const isError = ref(false)
</script>
