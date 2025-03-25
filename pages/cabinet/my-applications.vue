<template>
  <div>
    <UIWrapperPage :title="$t('my_applications')">
      <Transition name="fade" mode="out-in">
        <div v-if="loading" class="grid grid-cols-2 gap-5">
          <CardApplicationLoading v-for="i in 10" :key="i" />
        </div>
        <div
          v-else-if="cabinetApplication.length > 0"
          class="grid grid-cols-2 gap-5"
        >
          <CardApplication
            v-for="(item, i) in cabinetApplication"
            :key="i"
            v-bind="{ item }"
            @click="showApplicationModal(item)"
          />
        </div>
        <LazyEmptyProgram v-else class="w-fit mx-auto" />
      </Transition>
      <div v-if="count > 10" class="flex justify-end mt-6">
        <UIPagination
          :current-page="+queries.page"
          :total="count"
          :limit="10"
          pagination-buttons
          @input="handleChange"
        />
      </div>
    </UIWrapperPage>
    <ModalApplication
      :item="currentApplication"
      :show="applicationModal"
      @close="applicationModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { cabinetStore } from '~/store/cabinet'
import type { IApplication } from '~/types/application'

const applicationModal = ref(false)
const currentApplication = ref<IApplication>()
const showApplicationModal = (item: IApplication) => {
  applicationModal.value = true
  currentApplication.value = item
}

const { fetchCabinetApplication } = cabinetStore()

const {
  cabinetApplication,
  cabinetApplicationCount: count,
  cabinetApplicationLoading: loading,
} = storeToRefs(cabinetStore())

fetchCabinetApplication(1)
const store = cabinetStore()
onMounted(() => {
  store.step = 5
})
const route = useRoute()
const router = useRouter()
const queries = reactive({
  page: 1,
  ...route.query,
})

const handleChange = (page: number) => {
  queries.page = page
  router.push({ query: queries })
  window.scroll({ behavior: 'smooth', top: 0 })
}

watchEffect(() => {
  fetchCabinetApplication(queries.page)
})
</script>
