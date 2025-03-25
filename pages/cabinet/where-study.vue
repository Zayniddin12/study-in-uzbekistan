<template>
  <div>
    <UIWrapperPage :title="$t('where_study')">
      <client-only>
        <div class="grid grid-cols-2 gap-5">
          <UIWrapperInfo v-for="(item, index) in whereStudy(cabinetList)" :key="index" v-bind="item" />
        </div>
      </client-only>
    </UIWrapperPage>
    <UIWrapperEdit class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { whereStudy } from "~/data/profile";
import { ref, computed } from 'vue';
import { cabinetStore } from "~/store/cabinet";


const loading = ref(true);
const { fetchCabinet } = cabinetStore();
const cabinetList = computed(() => cabinetStore().cabinetList);

Promise.allSettled([fetchCabinet()]).then(() => (loading.value = false));
const store = cabinetStore()
onMounted(() => {
  store.step = 3
})
</script>
