<template>
  <div class="bg-white p-4 rounded-xl border border-gray-200">
    <div class="flex items-center justify-between mb-4">
      <div class="flex-y-center gap-3">
        <UIAvatar
          v-if="!noUniversity"
          :image="card?.university?.logo"
          class="!w-[52px] !h-[52px]"
          v-bind="{ loading }"
        />
        <div>
          <UIShimmer height="21.3px" v-bind="{ loading }" width="200px">
            <NuxtLink
              :key="card?.id"
              :to="`/universities/${card?.university?.id}/program/${card?.id}`"
              prefetch
              class="inline-block max-w-[90%] text-base md:text-lg !leading-130 font-medium text-dark hover:text-blue transition-300"
              @click.prevent="goToProgram(card?.university?.id, card?.id)"
            >
              {{ card?.title }}
            </NuxtLink>
          </UIShimmer>
          <div class="mt-1 flex-y-center gap-2">
            <UIShimmer height="20px" v-bind="{ loading }" width="20px">
              <i class="icon-building text-blue text-lg md:text-xl" />
            </UIShimmer>
            <UIShimmer height="18px" v-bind="{ loading }" width="120px">
              <p class="text-sm md:text-base leading-112 font-medium text-dark">
                {{ card?.region?.name }}
              </p>
            </UIShimmer>
          </div>
        </div>
      </div>

      <NuxtLink
        v-if="isExtra"
        :key="card?.id"
        :to="`/universities/${card?.university?.id}/program/${card?.id}`"
        prefetch
        class="flex items-center gap-1 text-primary text-base font-medium transition-300 cursor-pointer group group-hover:text-underline"
        @click.prevent="goToProgram(card?.university?.id, card?.id)"
      >
        <span class="group-hover:text-blue transition-300 hover:text-blue">{{
          $t('more')
        }}</span>
        <span>
          <i
            class="icon-arrow-right text-xl text-primary group-hover:text-blue transition-300 hover:text-blue"
          />
        </span>
      </NuxtLink>
    </div>

    <div class="grid md:grid-cols-2 gap-4 mb-4">
      <div v-for="(item, index) in cards" :key="index">
        <UIShimmer height="13px" v-bind="{ loading }" width="100px">
          <p class="text-xs font-normal leading-112 text-gray">
            {{ item?.title }}
          </p>
        </UIShimmer>
        <UIShimmer
          height="15px"
          preloader-class="mt-1"
          v-bind="{ loading }"
          width="140px"
        >
          <p class="text-sm leading-112 text-dark font-medium mt-1">
            {{ item?.value }}
          </p>
        </UIShimmer>
      </div>
    </div>
    <div
      class="py-2.5 px-4 rounded-lg bg-white-200 border-[0.5px] border-gra-200 flex-center-between"
    >
      <UIShimmer height="16px" v-bind="{ loading }" width="100px">
        <p class="text-sm leading-112 font-medium text-dark">
          {{ $t('cost_of_education') }}
        </p>
      </UIShimmer>
      <div>
        <UIShimmer height="18px" v-bind="{ loading }" width="130px">
          <p
            v-if="card?.price"
            class="text-base text-blue leading-112 font-bold tracking-[0.64px]"
          >
            {{ formatComma(card?.price) }} UZS
          </p>
          <p
            v-else
            class="text-base text-blue leading-112 font-bold tracking-[0.64px]"
          >
            {{ $t('sum_not_given') }}
          </p>
        </UIShimmer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { formatComma } from '~/utils'

const { t } = useI18n()

interface Props {
  card: {
    id: number
    title: string
    university: {
      id: number
      name: string
      logo: string
    }
    direction: {
      id: number
      name: string
    }
    study_form: number
    study_form_display: string
    degree: {
      id: number
      name: string
    }
    free_training_available: true
    lang: {
      code: string
      name: string
    }
    region: {
      id: number
      name: string
    }
    duration_type: string
    duration_type_display: string
    price: number
  }
  loading?: boolean
  noUniversity?: boolean
  isExtra?: boolean
}

const props = defineProps<Props>()

const cards = computed(() => [
  {
    title: t('university'),
    value: props.card?.university?.name,
  },
  {
    title: t('direction'),
    value: props.card?.direction?.name,
  },
  {
    title: t('education_form'),
    value: props.card?.study_form?.name,
  },
  {
    title: t('level'),
    value: props.card?.degree?.name,
  },
  {
    title: t('free_training_opportunity'),
    value: props.card?.free_training_available ? t('yes') : t('no'),
  },
  {
    title: t('language_instruction'),
    value: props.card?.lang?.name,
  },
  {
    title: t('where_does_the_training_take_place'),
    value: props.card?.region?.name,
  },
  {
    title: t('duration'),
    value: props.card?.duration_type?.name,
  },
  {
    title: t('subjects'),
    value: props?.card?.subjects?.length
      ? props.card?.subjects?.length
      : props.card?.subjects
      ? props.card?.subjects
      : '-',
  },
])
const goToProgram = (universityId: number, programId: number) => {
  router.push(`/universities/${universityId}/program/${programId}`)
}
</script>
