<template>
  <div>
    <UIWrapperPage :title="$t('motivation_text')">
      <UIWrapperInfo v-bind="motiveLetter(cabinetList)" />
    </UIWrapperPage>
    <UIWrapperEdit class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { motiveLetter } from '~/data/profile'
import { cabinetStore } from '~/store/cabinet'

const loading = ref(true)
const { fetchCabinet } = cabinetStore()
const cabinetList = computed(() => cabinetStore().cabinetList)
const store = cabinetStore()
Promise.allSettled([fetchCabinet()]).then(() => (loading.value = false))

onMounted(() => {
  store.step = 5
})
</script>
