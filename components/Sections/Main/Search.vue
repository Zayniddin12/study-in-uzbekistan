limit
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import Highlighter from 'vue-highlight-words'

import type { ResultArray } from '~/types/search'
import { useGlobalSearch } from '~/utils/globalSearch'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const search = ref('')
const showSearch = ref(false)
const results = ref<ResultArray>()
const loading = ref(false)
const showModal = ref()

const clearSearch = () => {
  search.value = ''
  emit('close')
}

const getResults = computed(() => {
  return loading.value ? 10 : results.value
})
watch(
  search,
  (value) => {
    showSearch.value = value.length > 0

    debounce(
      'search-university',
      () => {
        searchUniversity()
      },
      500
    )
  },
  { deep: true, immediate: true }
)

onClickOutside(showModal, () => {
  showSearch.value = false
  clearSearch()
})

const searchUniversity = () => {
  loading.value = true

  useApi()
    .$get('/common/global-search/', {
      params: {
        search: search.value,
      },
    })
    .then((res) => {
      // @ts-ignore
      results.value = useGlobalSearch(res)
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => router.currentRoute.value,
  () => {
    showSearch.value = false
    clearSearch()
  },
  { deep: true }
)

const passFaq = (categoryName: string) => {
  if (categoryName !== 'Faqs') return

  if (process.client) {
    window.scrollTo({
      top: document.body.scrollHeight - 500,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <teleport to="body">
    <section
      class="w-screen h-screen fixed bg-dark/80 flex justify-center z-[100] top-0 left-0"
    >
      <div
        ref="showModal"
        class="w-[90%] mx-auto md:w-[520px] max-h-[320px] mt-[128px] p-3 border border-white-100 bg-white rounded-xl"
      >
        <form
          class="flex items-center px-3 py-[9.5px] bg-white rounded-md group focus-within:border-blue ml-0 group"
          @submit.prevent
        >
          <img
            alt="Search Icon"
            class="cursor-pointer"
            src="/images/svg/search.svg"
          />
          <input
            v-model="search"
            :placeholder="$t('search')"
            class="w-full ml-2 mr-4 outline-none border-none"
            type="text"
          />

          <svg
            class="inline-block ml-auto cursor-pointer scale-[1.2] transition-300"
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            @click="clearSearch"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#A0ABB8"
              stroke-width="1.5"
            />
            <path
              d="M14.4999 9.50002L9.49997 14.5M9.49995 9.5L14.4999 14.5"
              stroke="#A0ABB8"
              stroke-linecap="round"
              stroke-width="1.5"
            />
          </svg>
        </form>

        <Transition v-if="showSearch">
          <div
            class="w-full max-h-[250px] my-2 rounded-md py-2.5 overflow-scroll"
          >
            <div class="flex flex-col">
              <UIShimmer
                v-for="(result, idx) in getResults"
                :key="idx"
                :loading="loading"
                class="!mb-1.5"
                height="36px"
              >
                <template #default>
                  <div class="py-2 last:pb-0 first:pt-0">
                    <div class="flex items-center justify-between flex-wrap">
                      <NuxtLink
                        :to="result?.slug"
                        class="max-w-[70%] hover:underline transition-300"
                        @click="passFaq(result.categoryName)"
                      >
                        <Highlighter
                          :search-words="[search ?? '']"
                          :text-to-highlight="result?.title"
                          class="text-sm font-medium text-dark leading-5 cursor-pointer"
                          highlight-class-name="bg-[#FFCD55] rounded"
                        />
                      </NuxtLink>
                      <p
                        class="text-blue text-sm font-medium leading-normal capitalize"
                      >
                        {{ $t(result?.originalCategoryName) }}
                      </p>
                    </div>
                  </div>
                </template>
              </UIShimmer>
            </div>
            <div
              v-show="!loading && results && results.length === 0"
              class="flex flex-col items-center py-6"
            >
              <img alt="Not Found svg" src="/images/svg/not-found.svg" />
              <h5 class="mt-4 mb-2 text-base font-medium leading-112 text-dark">
                {{ $t('not_found_title') }}
              </h5>
              <p
                class="max-w-[205px] text-xs leading-140 text-gray text-center font-normal"
              >
                {{ $t('not_found_info') }}
              </p>
            </div>
          </div>
        </Transition>

        <div v-else class="w-full h-full flex items-center justify-center">
          {{ $t('no_search') }}
        </div>
      </div>
    </section>
  </teleport>
</template>

<style scoped>
form {
  width: 100%;
  height: 43px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid var(--Blue, #0067ff);
  box-shadow: 0px 8px 40px 0px rgba(52, 52, 52, 0.06);
  backdrop-filter: blur(12.5px);
}

svg:hover path,
svg:hover circle {
  stroke: #f5382c;
}

input {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  background: none; /* 142.857% */
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
