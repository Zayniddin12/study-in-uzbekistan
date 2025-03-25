<template>
  <div>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>

    <div>
      <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">
        {{ $t('faculties') }}
      </h2>
      <Transition mode="out-in" name="fade">
        <div
          v-if="list?.length"
          :key="loading"
          class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5"
        >
          <template v-if="loading">
            <CardFaculty
              v-for="(card, i) in 6"
              :key="i"
              class="!bg-white"
              loading
              @click="openModal(card)"
            />
          </template>
          <template v-if="!loading && list?.length">
            <CardFaculty
              v-for="(card, i) in list"
              :key="i"
              :faculty="card"
              class="cursor-pointer"
              @click="openModal(card)"
            />
          </template>
        </div>
        <div v-else class="text-center">
          <CNoData class="col-span-3" />
        </div>
      </Transition>
    </div>

    <Modal :title="t('info_faculty')" v-bind="{ show }" @close="close">
      <div class="p-5 pt-4">
        <h3 class="text-lg font-medium text-dark mb-2">
          {{ selectedCard.name }}
        </h3>
        <p
          class="text-sm text-dark break-all"
          v-html="formatRichText(selectedCard?.about)"
        />
      </div>

      <template #footer>
        <div class="m-5 mt-0">
          <UIButton
            :text="$t('clear')"
            class="px-8 py-3 w-full text-sm"
            variant="primary"
            @click="show = false"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CNoData from '~/components/CNoData.vue'
import { useUniversityStore } from '~/store/university'
import { formatRichText } from '~/utils'

const { t } = useI18n()
const show = ref(false)
const universityStore = useUniversityStore()
const route = useRoute()

const single = computed(() => universityStore.single)
const list = ref<any>([])
const selectedCard = ref()
const loading = ref(true)

function getList() {
  useApi()
    .$get(`/university/universities/${route.params.slug}/faculties/`)
    .then((res) => {
      list.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

getList()

function openModal(card: { name: string; about: string }) {
  selectedCard.value = card
  show.value = true
}

const breadcrumbRoutes = computed(() => [
  {
    title: t('programs_and_universities'),
    link: '/programs-and-universities',
  },
  {
    title: single.value.name,
    link: `/universities/${single.value.id}/`,
  },
  {
    title: t('faculties'),
    link: '',
  },
])

const close = () => {
  show.value = false
}
</script>
