<template>
  <div class="grid items-start gap-x-4">
    <div
      v-for="(item, index) in faq"
      :key="index"
      class="group transition-300 border-b last:border-b-[0px] border-white-400"
    >
      <div
        class="flex items-center justify-between cursor-pointer transition-300 rounded-2xl"
        :class="[
          selectedItem === item.id ? '' : '',
          isDormitory ? 'py-4' : 'py-5',
        ]"
        @click="openItem(item.id)"
      >
        <h4
          class="font-medium text-base md:text-xl text-dark !leading-130 transition-colors duration-300 group-hover:text-blue"
        >
          {{ item.question }}
        </h4>
        <div
          class="plusminus flex-shrink-0 ml-1"
          :class="{ active: selectedItem === item.id }"
        ></div>
      </div>
      <CollapseTransition>
        <div
          v-if="selectedItem === item.id"
          :class="isDormitory ? 'pb-4' : 'pb-5'"
        >
          <p
            class="!leading-130 text-dark max-w-[800px] html-content"
            :class="answerClass"
            v-html="formatRichText(item.answer)"
          ></p>
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { ref } from 'vue'

import { formatRichText } from '~/utils'

const selectedItem = ref(0)

interface IFaq {
  id: number
  question: string
  answer: string
}

interface Props {
  faq: IFaq[]
  questionClass?: string
  answerClass?: string
  isDormitory?: boolean
}

defineProps<Props>()

const openItem = (id: number) => {
  if (selectedItem.value === id) {
    selectedItem.value = 0
    return
  }
  selectedItem.value = id
}
</script>

<style scoped>
.plusminus {
  position: relative;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.plusminus.active::before {
  transform: translatey(-50%) rotate(-90deg);
  opacity: 0;
}

.plusminus.active::after {
  transform: translatey(-50%) rotate(0);
}

.plusminus::before,
.plusminus::after {
  content: '';
  display: block;
  background-color: #0067ff;
  position: absolute;
  top: 50%;
  left: 0;
  transition: 0.35s;
  width: 100%;
  height: 2px;
}

.plusminus::after {
  transform: translatey(-50%) rotate(90deg);
}

.plusminus::before {
  transform: translatey(-50%);
}

.html-content >>> pre {
  white-space: normal !important;
}
</style>
