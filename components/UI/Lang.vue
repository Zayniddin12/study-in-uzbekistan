<template>
  <UIDropdown
    v-bind="{ listStyle }"
    list-style="md:!w-[153px]"
    @change="handleChange"
    @outside-click="handleOutsideClick"
  >
    <template #head>
      <span
        class="flex items-center gap-1 text-dark font-medium leading-20 text-sm"
        ><i class="icon-global text-xl"></i>{{ currentLanguage?.name }}
        <i
          class="icon-arrow-up2 text-[14px] rotate-180 text-[#66718E] transition-all duration-300"
          :class="{ '!rotate-0': isShown }"
        ></i
      ></span>
    </template>
    <div
      v-for="item of languagesList"
      :key="item.code"
      class="py-2.5 pl-3 pr-2.5 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl hover:bg-white-200 flex-center-between"
      @click="changeLocale(item?.code)"
    >
      <div class="flex gap-1">
        <img :src="item.flag" :alt="item.flag" />
        <li class="text-sm leading-20 font-medium">
          {{ item.name }}
        </li>
      </div>
      <i
        v-if="currentLanguage?.code === item?.code"
        class="icon-tick-stroke text-xl text-blue"
      />
    </div>
  </UIDropdown>
</template>

<script lang="ts" setup>
import { useLanguageSwitcher } from '~/composables/useLanguageSwitcher'

interface Props {
  listStyle?: string
}
defineProps<Props>()

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

const selectedOpt = ref('')
const isShown = ref(false)
const options = ref([
  {
    id: 1,
    name: 'English',
  },
  {
    id: 2,
    name: 'Русский',
  },
  {
    id: 3,
    name: 'O‘zbek',
  },
  {
    id: 4,
    name: 'Узбек',
  },
])

const handleChange = (val: boolean) => {
  isShown.value = val
}

const handleOutsideClick = () => {
  isShown.value = false
}
</script>

<style lang="scss" scoped></style>
