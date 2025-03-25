<template>
  <div
    ref="target"
    class="relative min-w-fit inline-block"
    @focusout="onClickAway"
  >
    <button
      class="custom-hover text-sm flex-y-center group rounded-lg transition-all duration-150 hover:text-gray-200 !text-dark w-full"
      :class="buttonClass"
      @click="onClick"
    >
      <slot name="head" />
    </button>
    <transition name="dropdown">
      <ul
        v-if="dropDownActive"
        ref="target"
        class="rounded-lg lg:rounded-xl shadow-[0_4px_36px_rgba(56,56,56,0.16)] border border-white-100 right-0 w-full h-auto absolute !z-[70] flex flex-col cursor-pointer bg-white"
        :class="[listStyle, above ? 'bottom-[60px]' : 'top-7']"
        @click="onClickAway"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref, watch } from 'vue'

interface Props {
  title?: string
  listStyle?: string
  buttonClass?: string | [string]
  above?: boolean
  active?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const target = ref(null)
const emit = defineEmits(['change', 'outsideClick'])
const dropDownActive = ref(false)
const route = useRoute()

const onClick = () => {
  dropDownActive.value = !dropDownActive.value
  emit('change', dropDownActive.value)
}

function onClickAway() {
  emit('outsideClick')
}

onClickOutside(target, () => {
  dropDownActive.value = false
})

watch(
  () => props.active,
  () => {
    if (!props.active) {
      dropDownActive.value = false
    }
  }
)
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/cabinet') {
      dropDownActive.value = false
    }
  }
)
</script>

<style>
.dropdown-enter-active {
  transition: all 0.2s ease;
}

.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
