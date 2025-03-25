<template>
  <div>
    <UIWrapperPage :title="$t('personal_info')">
      <UIAvatar
        :image="cabinetList?.photo?.file"
        class="w-[92px] h-[92px] mb-6"
      />
      <div class="grid grid-cols-2 gap-5">
        <UIWrapperInfo
          v-for="(item, index) in personalInfo(cabinetList)"
          :key="index"
          v-bind="item"
        />
      </div>
    </UIWrapperPage>
    <UIWrapperEdit class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { personalInfo } from '~/data/profile'
import { cabinetStore } from '~/store/cabinet'

const loading = ref(true)
const { fetchCabinet } = cabinetStore()
const store = cabinetStore()

const cabinetList = computed(() => cabinetStore().cabinetList)

Promise.allSettled([fetchCabinet()]).then(() => (loading.value = false))

onMounted(() => {
  store.step = 0
})
</script>
