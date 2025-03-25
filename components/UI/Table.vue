<template>
  <div class="relative w-full max-w-full overflow-x-auto" :class="wrapperClass">
    <Transition name="fade" mode="out-in">
      <table v-if="!loading" class="w-full c-table">
        <thead>
          <tr>
            <th
              v-for="(h, index) in head"
              :key="index"
              class="p-3 bg-gray text-xs text-left first:pl-6 first:pr-3 text-white font-medium"
              :class="[{ 'w-[5%]': h.key === '_index' }, thClass]"
            >
              {{ h.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(d, index) in data"
            :key="index"
            class="relative border-b border-gray-200"
            :class="[bodyTrClass, { 'even:bg-[#F5F7FA]': type === 'filled' }]"
          >
            <td
              v-for="(h, idx) in head"
              :key="idx"
              class="py-5 px-4 font-bold text-xs text-dark first:pl-5 first:pr-0"
              :class="[tdClass]"
            >
              <div v-if="idx === 0" class="w-1 h-10 absolute left-0 top-2" />
              <slot :name="h.key" :data="{ ...d, _index: getIndex(index) }">
                {{ h.key === '_index' ? getIndex(index) : d[h.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="w-full h-[500px] flex items-center justify-center">
        <div class="spinner"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'filled' | 'transparent'

  head: any[]

  thClass?: string
  bodyTrClass?: string
  tdClass?: string
  wrapperClass?: string

  data: Record<string, any>[]

  limit: number
  currentPage: number

  loading?: boolean
  statusKey?: string
  statusColors?: any
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

function getIndex(index: number) {
  return (props?.currentPage - 1) * props?.limit + index + 1
}
</script>
<style>
.spinner {
  width: 56px;
  height: 56px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #52618f 41%);
  background: linear-gradient(0deg, #52618f 50%, #52618f 0) center/4.5px 100%,
    linear-gradient(90deg, #52618f 50%, #52618f 0) center/100% 4.5px;
  background-repeat: no-repeat;
  animation: spinner-d3o0rx 1.5s infinite steps(12);
}
.spinner::before,
.spinner::after {
  content: '';
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}
.spinner::after {
  opacity: 0.83;
  transform: rotate(60deg);
}
@keyframes spinner-d3o0rx {
  100% {
    transform: rotate(1turn);
  }
}
</style>
