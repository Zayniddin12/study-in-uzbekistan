<template>
  <div
    :class="{ 'router-link-exact-active': card?.link === activeLink }"
    @click="active(card?.link)"
  >
    <div class="h-[213px] flex-y-center gap-3">
      <div v-if="index" class="w-px h-[187px] bg-blue-100/60" />
      <div
        :class="[
          { 'flex-col-reverse': index % 2 !== 0 },
          { 'bg-blue': card?.activeCard },
        ]"
        class="h-full flex flex-col justify-between pt-6 pb-3 px-3 border-y border-blue-100/60 w-full make-me hover:bg-blue transition-300 cursor-pointer group"
      >
        <div>
          <p
            class="text-base leading-130 uppercase font-bold text-dark transition-300 group-hover:text-white line-clamp-3"
          >
            {{ card?.title }}
          </p>
          <p
            class="mt-2 text-sm leading-132 font-normal text-dark line-clamp-3 transition-300 group-hover:text-white line-clamp-4"
            v-html="formatRichText(card?.description ?? '')"
          />
        </div>
        <div class="flex-center-between">
          <p
            class="text-3.5xl leading-40 font-bold text-blue-100 transition-300 group-hover:text-white/60"
          >
            0{{ index + 1 }}
          </p>
          <i
            class="icon-arrow-right text-[48px] text-blue-100 transition-300 group-hover:text-white/60"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatRichText } from '~/utils'

interface Props {
  card?: {
    title: string
    description: string
    link: string
    activeCard?: boolean
  }
  index: number
  activeLink: string
}

defineProps<Props>()

const emits = defineEmits<{
  (event: 'active', link: string): void
}>()

const active = (link: string) => {
  emits('active', link)
}
</script>

<style scoped>
.router-link-exact-active p {
  background: #0067ff;
  color: white !important;
}

.router-link-exact-active .make-me {
  background: #0067ff;
  color: white !important;
}

.router-link-exact-active .make-me:hover i {
  background: #0067ff;
  color: white !important;
}

.router-link-exact-active .make-me:hover .numbers {
  background: #0067ff;
  color: white !important;
}
</style>
