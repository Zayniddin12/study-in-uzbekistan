<template>
  <div>
    <FormGroup :label="$t('profile.mover_letters.label')" is-required>
      <Textarea
        v-model="values.motivational_letter"
        :placeholder="$t('profile.mover_letters.placeholder')"
        class="relative h-[196px] gap-[90px]"
        :error="form.$v.value.motivational_letter.$error"
      >
        <template #suffix>
          <div
            class="absolute left-3 bottom-3 h-5 flex-center text-[#A0ABB8] text-[12px] leading-5 font-medium bg-[#F7F9FA] px-[6px] rounded-md"
            :class="{ '!bg-red !text-white': countOfLetters >= 650 }"
          >
            {{ countOfLetters }}/650
          </div>
        </template>
      </Textarea>
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import Textarea from '~/components/Form/Textarea.vue'
import type { TForm } from '~/composables/useForm'

interface Props {
  form: TForm<any>
}

const props = defineProps<Props>()
const { form } = unref(props)
const { values, $v } = form

const countOfLetters = ref(values?.motivational_letter?.length || 0)

watch(
  () => values.motivational_letter,
  (val) => {
    countOfLetters.value = val.length
  },
  { deep: true }
)
</script>
