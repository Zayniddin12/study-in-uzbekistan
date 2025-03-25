<template>
  <div class="relative max-md:overflow-hidden">
    <Transition mode="out-in" name="fade">
      <div
        :key="loading"
        :class="{ 'mini-x-scroll': !loading }"
        class="flex-y-center gap-2 max-md:overflow-y-auto"
        @scroll="handleScroll"
      >
        <template v-for="(tab, idx) in list" :key="idx">
          <button
            :id="`item_${tab.value}`"
            :class="[itemClass]"
            class="py-2 transition-300 leading-4 text-[13px] font-medium z-10 flex-y-center gap-1 px-3 text-dark"
            @click="changeActive(tab.value, $event)"
          >
            {{ $t(tab.label) }}
          </button>
        </template>
      </div>
    </Transition>
    <div
      :class="[activeClass, { 'transition-all duration-200': !isScrolling }]"
      :style="{ width: `${active.width}px`, left: `${active.left}px` }"
      class="absolute h-0.5 bg-blue -translate-y-1/2 -bottom-px rounded-t-lg"
    />
  </div>
</template>

<script lang="ts" setup>
import { debounce } from '~/utils'

interface INavs {
  label: string
  value: string | number
  name?: string
}

interface Props {
  modelValue?: any
  list: INavs[]
  itemClass?: string
  activeClass?: string
  loading?: boolean
}

const props = defineProps<Props>()

const isScrolling = ref(false)

interface Emits {
  (e: 'update:modelValue', value: string | number): void

  (e: 'change', value: string | number): void
}

const emit = defineEmits<Emits>()

const active = ref({ left: 0, width: 0 })

function moveActive() {
  const item = document.getElementById(
    `item_${props.modelValue}`
  ) as HTMLButtonElement
  active.value = {
    left:
      item?.getBoundingClientRect().x -
        item?.parentElement?.getBoundingClientRect().x || 0,
    width: item?.offsetWidth || 0,
  }
}

function changeActive(tab: string | number, e: { target: HTMLButtonElement }) {
  pick(tab, e)
  emit('change', tab)
}

const pick = (tab: string | number, e: { target: HTMLButtonElement }) => {
  moveActive()
  emit('update:modelValue', tab)
}

onMounted(() => {
  setTimeout(() => {
    const item = document.getElementById(
      `item_${props.modelValue}`
    ) as HTMLButtonElement
    pick(props.modelValue, { target: item })
  }, 300)
})

function handleScroll() {
  isScrolling.value = true
  debounce('scroll', () => (isScrolling.value = false))
  moveActive()
}

watch(
  () => props.modelValue,
  () => {
    setTimeout(() => {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      pick(props.modelValue, { target: item })
    }, 100)
  },
  { immediate: true, deep: true }
)

watch(
  () => props.loading,
  () => {
    setTimeout(() => {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      pick(props.modelValue, { target: item })
    }, 500)
  }
)
</script>

<style scoped>
.mini-x-scroll::-webkit-scrollbar {
  height: 0;
}

.mini-x-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.mini-x-scroll::-webkit-scrollbar-thumb {
  background: #888;
}

.linear-bg-tab {
  background: linear-gradient(
    180deg,
    rgba(0, 103, 255, 0) 0%,
    rgba(0, 103, 255, 0.1) 100%
  );
}
</style>
