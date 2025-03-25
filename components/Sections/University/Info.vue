<template>
  <div>
    <h2 class="text-lg md:text-xl text-dark mb-2 font-medium">
      {{ $t('about_universities') }}
    </h2>
    <div
      class="text-sm static-text leading-140 text-dark whitespace-pre-line"
      v-html="formatRichText(single?.about_html)"
    />
    <div>
      <h2 class="text-lg md:text-xl text-dark mb-3 font-medium">
        {{ $t('media_materials') }}
      </h2>
      <CardMediaMaterials
        class="grid !grid-cols-5 gap-3"
        v-bind="{ images: single?.media }"
        @handle-img="handleImg"
      />
      <UILightBox
        :active="activeIndex"
        :images="single?.media"
        v-bind="{ show }"
        @close="closeModal"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import type { IUniversity } from '~/types/common'
import { formatRichText } from '~/utils'

const activeIndex = ref(0)
const show = ref(false)

interface Props {
  single: IUniversity
}

defineProps<Props>()

const handleImg = (id: number) => {
  show.value = true
  activeIndex.value = id
}

function closeModal() {
  activeIndex.value = 0
  show.value = false
}
</script>

<style>
.static-text > pre {
  white-space: normal !important;
}
</style>
