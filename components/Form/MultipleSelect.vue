<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      :class="[
        selectedOptionStyles,
        { '!border-red': error },
        { 'cursor-not-allowed': disabled },
      ]"
      class="bg-white rounded-lg px-3 py-2.5 cursor-pointer border border-dark/[4%] flex items-center justify-between transition-300"
      @click="toggleSelect(!showOptions)"
    >
      <slot :value="value" name="selectedOption">
        <div>
          <div
            v-if="props.activeLabelKey?.length == 0"
            :class="labelClass"
            class="text-dark font-medium text-sm !leading-130"
          >
            {{ placeholder }}
          </div>
          <div v-else :class="labelClass">
            <div
              v-if="props.activeLabelKey && profile"
              class="flex gap-1 flex-wrap"
            >
              <div class="text-dark text-sm font-medium !leading-130">
                {{
                  props.activeLabelKey.length < 1
                    ? props.activeLabelKey[0]
                    : `${props.activeLabelKey[0]}...`
                }}
              </div>
            </div>
            <div
              v-if="props.activeLabelKey && !profile"
              class="flex gap-1 flex-wrap"
            >
              <div
                v-for="(item, index) in props.activeLabelKey"
                :key="index"
                class="text-dark text-sm font-medium !leading-130"
              >
                {{ item }}
              </div>
            </div>
            <div v-else>
              {{ value }}
            </div>
          </div>
        </div>
        <slot name="chevron">
          <span
            :class="{ '-rotate-180': showOptions }"
            class="icon-chevron transition-all duration-200 inline-block text-blue"
          ></span>
        </slot>
      </slot>
    </div>
    <!--  OPTIONS  -->
    <Transition mode="out-in" name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        :class="{ 'pb-2': optionsSearch }"
        class="absolute top-full w-full bg-white border border-white-200 rounded-md z-40 translate-y-3 overflow-hidden max-h-[250px] overflow-y-scroll shadow-md"
      >
        <FormInput
          v-if="searchInput && options?.length > 5"
          v-model.trim="optionsSearch"
          :placeholder="$t('search')"
          class="border-0 outline-none w-full mb-2.5 border-b border-primary rounded-b-none"
          @update:model-value="emit('searchOptions', $event)"
        />

        <slot name="options">
          <template v-if="options?.length">
            <div
              v-for="(option, idx) in search(searchValue)"
              :key="idx"
              :class="{
                'bg-gray-300': props.activeLabelKey.includes(option.name),
              }"
              class="transition-all px-3 py-2.5 hover:bg-[#FAFBFC] cursor-pointer"
              @click="onSelect(option)"
            >
              <slot>
                <div class="flex-y-center gap-2">
                  <p class="text-dark-100 text-xs !leading-130">
                    {{ option.name }}
                  </p>
                </div>
              </slot>
            </div>
          </template>
          <div
            v-if="options?.length === 0"
            class="text-center py-2 text-sm text-dark"
          >
            {{ $t('no_data') }}
          </div>
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full"></div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'

export type TOption = string | number | { [key: string]: string | number }[]

export interface Props {
  error?: boolean
  modelValue: TOption[]
  options: TOption[]
  labelKey: any
  activeLabelKey: any
  valueKey: any
  labelClass?: string
  selectedOptionStyles?: string
  placeholder: string
  infiniteScroll?: boolean
  isSearchable?: boolean
  inputClasses?: string
  parentInputClasses?: string
  disabled?: boolean
  searchInput?: boolean
  isTextEnabled?: boolean
  disabled?: boolean
  profile: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  placeholder: 'Select an option',
  profile: false,
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
  (e: 'on-select', value: []): void
  (e: 'load'): void
}>()

const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)
const searchValue = ref('')
const value = ref(findOption(props.modelValue))
const searchingResults = ref<TOption[]>([])
const optionsSearch = ref('')

const search = (val: any) => {
  if (!props.isSearchable || val?.length < 1) {
    return props.options
  }

  return (searchingResults.value = props.options.filter((option) => {
    return option[props.modelValue].toLowerCase().includes(val.toLowerCase())
  }))
}
function toggleSelect(newValue = showOptions.value) {
  if (props.disabled) return

  showOptions.value = newValue
}

function findOption(option: TOption) {
  if (option === null) return
  return props.options?.filter(
    (o) => o === option || o[props.valueKey] === option
  )
}

function onSelect(option: TOption) {
  toggleSelect(false)
  emit('on-select', option)
  emit('update:modelValue', option[props.valueKey])
}

const select = ref()
onClickOutside(select, () => toggleSelect(false))
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
<style>
.item-first:first-child {
  display: block !important;
}
.item-first {
  display: none !important;
}
</style>
