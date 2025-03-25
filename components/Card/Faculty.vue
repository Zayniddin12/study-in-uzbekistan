<template>
  <div
    class="flex flex-col gap-3 bg-white-200 justify-between p-4 rounded-xl border-[0.5px] border-gray-200 h-auto"
  >
    <div class="flex gap-3">
      <UIShimmer width="24px" height="24px" v-bind="{ loading }">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2H22"
            stroke="#A0ABB8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M12 21L12 17"
            stroke="#A0ABB8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M10 22L12 21"
            stroke="#A0ABB8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M14 22L12 21"
            stroke="#A0ABB8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M20 2V10.5C20 13.5641 20 15.0962 18.9958 16.0481C17.9916 17 16.3753 17 13.1429 17H10.8571C7.62465 17 6.00841 17 5.00421 16.0481C4 15.0962 4 13.5641 4 10.5V2"
            stroke="#A0ABB8"
            stroke-width="1.5"
          />
        </svg>
      </UIShimmer>
      <UIShimmer
        width="100%"
        height="20px"
        v-bind="{ loading }"
        preloader-class="shrink"
      >
        <p class="text-dark text-sm font-medium line-clamp-2">
          {{ faculty.name }}
        </p>
      </UIShimmer>
    </div>
    <UIShimmer v-bind="{ loading }" width="140px" height="24px">
      <p
        class="text-blue flex items-center ml-9 font-medium text-xs gap-[5px] group transition-all cursor-pointer"
      >
        {{ $t('more') }}
        <span
          class="icon-arrow-right-up font-medium text-base text-blue group-hover:ml-0.5 group-hover:-translate-y-0.5 transition-all"
        ></span>
      </p>
    </UIShimmer>
  </div>
</template>
<script setup lang="ts">
interface Props {
  faculty: {
    name: string
    link: string
  }
  loading?: boolean
}

withDefaults(defineProps<Props>(), {})
</script>
