<template>
  <div
    class="rounded-2xl bg-gray-200 relative overflow-hidden flex flex-col justify-between h-auto"
  >
    <div>
      <div class="w-full h-[208px]">
        <UIShimmer
          v-bind="{ loading }"
          width="100%"
          height="100%"
          border-radius="0px"
        >
          <img
            :src="card?.banner"
            class="w-full h-full object-cover"
            alt="image"
          />
        </UIShimmer>
      </div>

      <div class="px-4 pt-0">
        <UIShimmer
          width="100%"
          height="32px"
          v-bind="{ loading }"
          preloader-class="my-[14px]"
        >
          <p class="py-[14px] font-mts text-base leading-6 font-bold text-dark">
            {{ card?.title }}
          </p>
        </UIShimmer>
        <div class="grid grid-cols-2 gap-2 gap-x-7 gap-y-2">
          <div v-for="(i, index) in directions" :key="index">
            <UIShimmer height="15.84px" width="40px" v-bind="{ loading }">
              <p class="text-xs leading-132 text-dark">{{ i?.title }}</p>
            </UIShimmer>
            <UIShimmer
              width="100%"
              height="21px"
              v-bind="{ loading }"
              preloader-class="mt-1"
            >
              <p class="mt-0.5 text-sm leading-normal font-medium text-dark">
                {{ i?.value }}
              </p>
            </UIShimmer>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4">
      <UIShimmer
        width="120px"
        height="24px"
        v-bind="{ loading }"
        preloader-class="mt-[14px]"
      >
        <p class="mt-[14px] text-lg leading-6 font-bold font-mts text-dark">
          {{ formatNumberSpace(card?.price) }} {{ $t('sum') }}
        </p>
      </UIShimmer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  card: {
    id: number
    title: string
    banner: string
    direction: {
      id: number
      name: string
    }
    lang: {
      code: string
      name: string
    }
    study_form: number
    degree: {
      id: number
      name: string
    }
    duration: number
    region: {
      id: number
      name: string
    }
    price: number
  }
  loading?: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()

const directions = computed(() => [
  {
    title: t('direction'),
    value: props.card?.direction?.name,
  },
  {
    title: t('level'),
    value: props.card?.degree?.name,
  },
  {
    title: t('language'),
    value: props.card?.lang?.name,
  },
  {
    title: t('duration'),
    value: props.card?.duration,
  },
  {
    title: t('education_form'),
    value: props.card?.study_form,
  },
  {
    title: t('city'),
    value: props.card?.region?.name,
  },
])
</script>
