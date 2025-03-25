<template>
  <UIDropdown
    ref="languageSelect"
    :above="showDropdown"
    list-style="!top-[calc(100%_+_12px)] max-h-[200px] !h-fit overflow-y-auto"
    class="bg-white rounded-lg px-3 py-2.5 cursor-pointer border border-white-100 flex items-center justify-between transition-300"
    :class="{ '!border-red': error }"
    @change="handleToggle"
  >
    <template #head>
      <div class="flex-center-between w-full">
        <div
          v-if="!names?.length"
          class="text-dark font-medium text-sm !leading-130"
        >
          {{ placeholder }}
        </div>
        <span
          v-else
          class="text-dark font-medium text-sm !leading-130 line-clamp-1 text-left"
        >
          {{ names?.join(', ') }}
        </span>

        <slot name="chevron">
          <span
            :class="{ '-rotate-180': showDropdown }"
            class="icon-chevron transition-all duration-200 inline-block text-blue"
          ></span>
        </slot>
      </div>
    </template>
    <div v-if="loading.list" class="h-[100px] flex-center">
      <UILoader class="mx-auto" />
    </div>
    <template v-else-if="options?.length">
      <div
        v-for="(item, idx) in options"
        :key="idx"
        class="transition-all px-3 py-2.5 hover:bg-[#FAFBFC] cursor-pointer flex-y-center"
        @click.stop="select(item[valueKey])"
      >
        <FormCheckbox
          :value="item[valueKey]"
          :checked="modelv.includes(item[valueKey])"
        />
        <p class="text-dark-100 text-xs !leading-130">
          {{ item[labelKey] }}
        </p>
      </div>
    </template>

    <div v-else class="text-center py-2 text-sm text-dark">
      {{ $t('no_data') }}
    </div>
    <div v-if="loading.more" class="flex-center">
      <UILoader />
    </div>
    <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full"></div>
  </UIDropdown>
</template>
<script lang="ts" setup>
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'

interface Props {
  modelValue: string[]
  options: any[]
  labelKey?: string
  valueKey?: string
  placeholder?: string
  error?: boolean
  infiniteScroll?: boolean
  loading?: {
    list: boolean
    more: boolean
  }
  pagination?: {
    next?: string | null
    count: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  placeholder: 'Select an option',
  loading: () => ({
    list: false,
    more: false,
  }),
  pagination: () => ({
    next: undefined,
    count: 0,
  }),
})

interface Emits {
  (e: 'update:modelValue', val: string[]): void
  (e: 'load'): void
}
const emit = defineEmits<Emits>()

const showDropdown = ref(false)

let modelv = reactive<string[]>([...props?.modelValue])

const fullValues = computed(() => {
  return props.options?.filter((item) => modelv?.includes(item[props.valueKey]))
})

const names = computed(() =>
  fullValues.value?.map((item) => item[props.labelKey])
)

watch(
  () => props.modelValue,
  () => {
    modelv = props.modelValue
  }
)

function handleToggle(val: boolean) {
  showDropdown.value = val
}
const showX = ref(false)
function select(item: string) {
  if (modelv.includes(item)) {
    modelv.splice(modelv.indexOf(item), 1)
    showX.value = false
  } else {
    modelv.push(item)
  }
  emit('update:modelValue', modelv)
  showX.value = true
}

function clear() {
  showDropdown.value = false
  modelv = []
  emit('update:modelValue', modelv)
  showX.value = false
}

const languageSelect = ref<HTMLElement | null>(null)
onClickOutside(languageSelect, () => {
  showDropdown.value = false
})

const target = ref(null)
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (
    isIntersecting &&
    (props.pagination.next || props.pagination?.next === undefined) &&
    !props.loading.list &&
    !props.loading.more
  ) {
    emit('load')
  }
})
</script>
