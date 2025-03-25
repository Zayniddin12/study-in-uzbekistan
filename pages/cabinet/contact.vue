<template>
  <div>
    <UIWrapperPage :title="$t('contact_info')">
      <client-only>

      <div class="grid grid-cols-2 gap-5">
        <UIWrapperInfo v-for="(item, index) in  contactInfo(cabinetList)" :key="index" v-bind="item" />
      </div>
      </client-only>
    </UIWrapperPage>
    <UIWrapperEdit class="mt-5" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { cabinetStore } from "~/store/cabinet";
import {contactInfo} from "~/data/profile";


const loading = ref(true);
const { fetchCabinet } = cabinetStore();
const cabinetList = computed(() => cabinetStore().cabinetList);

Promise.allSettled([fetchCabinet()]).then(() => (loading.value = false));

const store = cabinetStore()
onMounted(() => {
  store.step = 1
})
</script>
