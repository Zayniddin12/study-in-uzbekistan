<template>
  <ul class="pagination flex-y-center gap-2">
    <li
      v-if="paginationButtons"
      :class="[`${itemClass}`, { 'pointer-events-none': hasFirst }]"
      class="group cursor-pointer"
      @click="first"
    >
      <button :disabled="hasFirst">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="group-hover:stroke-white transition-300"
            d="M8.66602 12.6667L4.66602 8.00004L8.66602 3.33337"
            stroke="#181818"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="group-hover:stroke-white transition-300"
            d="M11.334 12.6666L7.33398 7.99992L11.334 3.33325"
            stroke="#181818"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
    <li
      v-if="paginationButtons"
      :class="`${itemClass} ${hasFirst ? 'pointer-events-none' : ''}`"
      class="group cursor-pointer"
      @click="prev"
    >
      <button :disabled="hasFirst">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="group-hover:stroke-white transition-300"
            d="M10 3.33337L6 8.00004L10 12.6667"
            stroke="#181818"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
    <li
      v-for="page in items"
      :key="page.label"
      class="transition-300 transition"
      :class="`${itemClass} ${page.active ? activeClass : ''} ${
        page.disable ? disableClass : ''
      }`"
    >
      <span v-if="page.disable" class="w-full h-full flex-center"> ... </span>
      <button v-else class="w-full h-full" @click="goto(page.label)">
        {{ page.label }}
      </button>
    </li>
    <li
      v-if="paginationButtons"
      :class="`${itemClass} ${hasLast ? disableClass : ''}`"
      class="group cursor-pointer"
      @click="next"
    >
      <button :class="{ 'pointer-events-none': hasLast }" :disabled="hasLast">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="group-hover:stroke-white transition-300"
            d="M6 3.33337L10 8.00004L6 12.6667"
            stroke="#181818"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
    <li
      v-if="paginationButtons"
      :class="`${itemClass} ${hasLast ? disableClass : ''}`"
      class="group cursor-pointer"
      @click="last"
    >
      <button :class="{ 'pointer-events-none': hasLast }" :disabled="hasLast">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="group-hover:stroke-white transition-300"
            d="M7.33398 12.6667L11.334 8.00004L7.33398 3.33337"
            stroke="#181818"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="group-hover:stroke-white transition-300"
            d="M4.66602 12.6666L8.66602 7.99992L4.66602 3.33325"
            stroke="#181818"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  total: number
  limit: number
  itemClass?: string
  activeClass?: string
  disableClass?: string
  paginationButtons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemClass:
    'text-dark text-sm font-bold border border-gray-200 rounded-lg w-10 h-10 flex-center transition-300 hover:!bg-blue hover:!border-blue hover:!text-white bg-white',
  activeClass: '!bg-blue !border-transparent !text-white',
  disableClass: 'pointer-events-none',
})
const emit = defineEmits(['change', 'input'])
const pageCount = computed(() => Math.ceil(props.total / props.limit))
const items = computed(() => {
  const valPrev = props.currentPage > 1 ? props.currentPage - 1 : 1 // for easier navigation - gives one previous page
  const valNext =
    props.currentPage < pageCount.value
      ? props.currentPage + 1
      : pageCount.value // one next page
  const extraPrev = valPrev === 3 ? 2 : null
  const extraNext = valNext === pageCount.value - 2 ? pageCount.value - 1 : null
  const dotsBefore = valPrev > 3 ? 2 : null
  const dotsAfter = valNext < pageCount.value - 2 ? pageCount.value - 1 : null
  const output = []
  for (let i = 1; i <= pageCount.value; i += 1) {
    if (
      [
        1,
        pageCount.value,
        props.currentPage,
        valPrev,
        valNext,
        extraPrev,
        extraNext,
        dotsBefore,
        dotsAfter,
      ].includes(i)
    ) {
      output.push({
        label: i,
        active: props.currentPage === i,
        disable: [dotsBefore, dotsAfter].includes(i),
      })
    }
  }
  return output
})
const hasFirst = computed(() => props.currentPage === 1)
const hasLast = computed(() => props.currentPage === pageCount.value)
watch(
  () => props.currentPage,
  () => {
    emit('change')
  }
)

function first() {
  if (!hasFirst.value) {
    emit('input', 1)
  }
}
function prev() {
  if (!hasFirst.value) {
    emit('input', props.currentPage - 1)
  }
}
function goto(page: number) {
  emit('input', page)
}
function next() {
  if (!hasLast.value) {
    emit('input', props.currentPage + 1)
  }
}
function last() {
  if (!hasLast.value) {
    emit('input', pageCount.value)
  }
}
onMounted(() => {
  if (props.currentPage > pageCount.value) {
    emit('change')
  }
})
</script>
