<template>
  <div class="flex items-center gap-3">
    <p
      class="text-base leading-normal text-dark font-medium md:truncate md:max-w-[300px] line-clamp-1 overflow-hidden"
    >
      {{ windowLink }}
    </p>
    <button
      class="rounded-lg w-10 h-10 p-4 bg-[#D9E8FC] flex-center hover:bg-blue group transition-300 relative"
      @click="copy(windowLink)"
    >
      <i
        class="icon-copy text-[22px] text-blue group-hover:text-white transition-300"
      />
      <UITooltip v-bind="{ show }" is-top>
        <p>{{ $t('copied') }}</p>
      </UITooltip>
    </button>
  </div>
</template>

<script setup lang="ts">
const show = ref(false)

const windowLink = computed(() => {
  if (process.client) {
    return window.location.href
  }
})

function copy(text: string) {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.value = text
  input.select()
  input.focus()
  document.execCommand('copy')
  input.remove()
  show.value = true

  setTimeout(() => {
    show.value = false
  }, 1500)
}
</script>
