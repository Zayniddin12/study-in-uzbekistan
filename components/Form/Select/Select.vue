<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      :class="[selectedOptionStyles, { '!border-red': error }]"
      class="bg-white rounded-lg px-3 py-2.5 cursor-pointer border border-dark/[4%] flex items-center justify-between transition-300"
      @click="toggleSelect(!showOptions)"
    >
      <slot :value="value" :toggle-select="showOptions" name="selectedOption">
        <div
          v-if="isSearchable"
          :class="parentInputClasses"
          class="flex items-center"
        >
          <input
            v-model="searchValue"
            :class="inputClasses"
            :placeholder="placeholder"
            class="border-0 outline-none text-dark font-medium text-sm !leading-130 placeholder:text-dark placeholder:font-medium"
            type="text"
          />
        </div>

        <div v-else class="px-3">
          <div
            v-if="!value"
            :class="labelClass"
            class="text-dark font-medium text-sm !leading-130"
          >
            {{ placeholder }}
          </div>
          <div
            v-else
            :class="labelClass"
            class="text-dark text-sm font-medium !leading-130"
          >
            {{
              value[labelKey] || value?.university?.name || value.name || value
            }}
          </div>
        </div>
        <slot name="chevron">
          <span
            :class="{ '-rotate-180': showOptions }"
            class="icon-chevron transition-all duration-200 inline-block text-blue mr-3"
          ></span>
        </slot>
      </slot>
    </div>
    <!--  OPTIONS  -->
    <Transition mode="out-in" name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        class="absolute top-full w-full bg-white border border-white-200 rounded-md z-40 translate-y-3 overflow-hidden max-h-[250px] overflow-y-scroll"
      >
        <slot name="options">
          <div v-if="loading.list" class="h-[100px] flex-center">
            <UILoader class="mx-auto" />
          </div>
          <template v-else-if="options?.length">
            <!--              :class="{ 'bg-gray-300': isActive(option) }"-->
            <div
              v-for="(option, idx) in search(searchValue)"
              :key="idx"
              @click="onSelect(option)"
            >
              <div
                v-if="isMain && option.is_main"
                class="transition-all px-3 py-2.5 hover:bg-[#FAFBFC] cursor-pointer"
              >
                <slot
                  v-if="option.is_main"
                  :index="idx"
                  :option="option"
                  name="option"
                >
                  <div class="flex-y-center gap-2">
                    <p
                      v-if="option[labelKey]"
                      class="text-dark-100 text-xs !leading-130"
                    >
                      {{ option[labelKey] }}
                    </p>
                    <p
                      v-if="option?.university"
                      class="text-dark-100 text-xs !leading-130"
                    >
                      {{ option.university.name }}
                    </p>
                    <p
                      v-else-if="!option[labelKey] && option.name"
                      class="text-dark-100 text-xs !leading-130"
                    >
                      {{ option.name }}
                    </p>
                  </div>
                </slot>
              </div>
              <div
                v-else-if="!isMain"
                class="transition-all px-3 py-2.5 hover:bg-[#FAFBFC] cursor-pointer"
              >
                <slot :index="idx" :option="option" name="option">
                  <div class="flex-y-center gap-2">
                    <p
                      v-if="option[labelKey]"
                      class="text-dark-100 text-xs !leading-130"
                    >
                      {{ option[labelKey] }}
                    </p>
                    <p
                      v-if="option?.university"
                      class="text-dark-100 text-xs !leading-130"
                    >
                      {{ option.university.name }}
                    </p>
                    <p
                      v-else-if="!option[labelKey] && option.name"
                      class="text-dark-100 text-xs !leading-130"
                    >
                      {{ option.name }}
                    </p>
                  </div>
                </slot>
              </div>
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">
            {{ $t('no_data') }}
          </div>
          <UILoader v-if="loading.more" class="mx-auto" />
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full"></div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'

export type TOption = string | number | { [key: string]: string | number }

export interface Props {
  modelValue: TOption
  options: TOption[]
  error?: boolean
  labelKey?: string
  valueKey?: string
  placeholder: string
  infiniteScroll?: boolean
  isSearchable?: boolean
  labelClass?: string
  selectedOptionStyles?: string
  inputClasses?: string
  parentInputClasses?: string
  isMain?: boolean
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
  isMain: false,
  loading: () => ({
    list: false,
    more: false,
  }),
  pagination: () => ({
    next: undefined,
    count: 0,
  }),
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
  (e: 'on-select', value: TOption): void
  (e: 'on-name-select', value: string): void
  (e: 'load'): void
}>()

const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)
const searchValue = ref('')
const value = ref(findOption(props.modelValue))
const searchingResults = ref<TOption[]>([])

const search = (val: string) => {
  if (!props.isSearchable || val.length < 1) return props.options

  searchingResults.value = props.options.filter((option) => {
    return option[props.labelKey].toLowerCase().includes(val.toLowerCase())
  })

  return searchingResults.value
}

watch(
  () => searchValue.value,
  (val) => {
    search(val)
  },
  { deep: true }
)

function toggleSelect(newValue = showOptions.value) {
  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

function findOption(option: TOption) {
  if (option === null) return

  return props.options?.find(
    (o) => o === option || o[props.valueKey] === option
  )
}

function onSelect(option: TOption) {
  value.value = option
  toggleSelect(false)
  emit('update:modelValue', option[props.valueKey])
  emit('on-select', option)
  if (option?.university?.name) {
    emit('on-name-select', option.university.name)
  }
}
const select = ref()
onClickOutside(select, () => toggleSelect(false))

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
  if (
    isIntersecting &&
    (props.pagination.next || props.pagination?.next === undefined) &&
    !props.loading.list &&
    !props.loading.more
  ) {
    emit('load')
  }
})

watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('infinite-scroll')
    }
  }
)
watch(
  () => props.modelValue,
  (val) => {
    if (val?.name && Object.keys(val).length) {
      value.value = val
      searchValue.value = val[props.labelKey]
    } else {
      value.value = findOption(props.modelValue)
    }
  },
  {
    immediate: true,
  }
)

watch(
  () => value.value,
  (val) => {
    if (val) {
      searchValue.value = val[props.labelKey]
    }
  }
)
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
