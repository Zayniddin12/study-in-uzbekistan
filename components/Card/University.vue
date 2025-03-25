<template>
  <div class="p-6 rounded-2xl bg-white flex flex-col justify-between">
    <div>
      <UIAvatar
        :image="card?.logo"
        class="before:!border-gray-200"
        default-image="/images/profile/building-default.svg"
        size="md"
        v-bind="{ loading }"
      />
      <UIShimmer
        height="20px"
        preloader-class="my-4"
        v-bind="{ loading }"
        width="100%"
      >
        <h2
          class="my-4 font-mts text-dark font-medium leading-112 text-lg line-clamp-3"
        >
          {{ card?.name }}
        </h2>
      </UIShimmer>
    </div>
    <div class="flex flex-col justify-between">
      <ul class="">
        <li
          v-for="(item, index) in infoList"
          :key="index"
          class="flex-y-center gap-3 mb-3 last:mb-0"
        >
          <template v-if="item.value">
            <UIShimmer height="24px" v-bind="{ loading }" width="24px">
              <i :class="`${item?.icon} text-2xl leading-6 text-blue`" />
            </UIShimmer>
            <div>
              <UIShimmer
                height="16px"
                preloader-class="mb-1"
                v-bind="{ loading }"
                width="80px"
              >
                <p class="info-label mb-1">
                  {{ $t(item?.label) }}
                </p>
              </UIShimmer>
              <UIShimmer height="18px" v-bind="{ loading }" width="180px">
                <a
                  :class="{ 'hover:text-blue': item?.link }"
                  :href="item?.link"
                  class="info-value transition-300"
                  target="_blank"
                >
                  {{ item?.value }}
                </a>
              </UIShimmer>
            </div>
          </template>
        </li>
      </ul>
      <div class="flex-y-center gap-5 mt-6">
        <UIShimmer
          border-radius="8px"
          height="36px"
          preloader-class="!shrink"
          v-bind="{ loading }"
          width="100%"
        >
          <NuxtLink :to="`/universities/${card?.id}`" class="w-full">
            <UIButton
              :text="$t('about_universities')"
              class="w-full h-auto py-3"
              size="sm"
              variant="secondary"
            />
          </NuxtLink>
        </UIShimmer>
        <UIShimmer
          border-radius="8px"
          height="36px"
          preloader-class="!shrink"
          v-bind="{ loading }"
          width="100%"
        >
          <NuxtLink :to="`/universities/${card?.id}/programs`" class="w-full">
            <UIButton
              :text="$t('programs_universities')"
              class="w-full h-auto py-3"
              size="sm"
            />
          </NuxtLink>
        </UIShimmer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  card?: {
    id: number
    name: string
    logo: string
    type: string
    type_display: string
    region: {
      id: number
      name: string
    }
    website?: string
    address?: string
  }
  loading?: boolean
}

const props = defineProps<Props>()

const infoList = [
  {
    icon: 'icon-building-2',
    label: 'university',
    value: props.card?.type_display,
  },
  {
    icon: 'icon-location',
    label: 'city',
    value: props.card?.region?.name,
  },
  {
    icon: 'icon-global',
    label: 'site',
    link: props.card?.website,
    value: props.card?.website,
  },
  {
    icon: 'icon-routing',
    label: 'address',
    value: props.card?.address,
  },
]
</script>
