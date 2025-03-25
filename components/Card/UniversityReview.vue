<template>
  <div class="border border-[#EEF2F9] rounded-[20px] p-4 bg-white-200 relative">
    <div class="flex items-center gap-2">
      <UIAvatar
        :image="card?.author_photo"
        default-image="https://picsum.photos/200/200"
        class="!w-[42px] !h-[42px]"
        v-bind="{ loading }"
      />
      <UIShimmer v-bind="{ loading }" width="140px" height="20px">
        <p class="text-[#19192D] text-base font-medium">
          {{ card?.author_name }}
        </p>
      </UIShimmer>
      <i class="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g opacity="0.2" clip-path="url(#clip0_514_25156)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.2804 13.7437L9.2804 11.8212C10.2847 11.8212 11.2197 11.4979 12.0849 10.8513C12.9506 10.2052 13.383 9.43309 13.383 8.53586C13.383 8.0017 13.1696 7.73463 12.7417 7.73463C12.6457 7.73463 12.4533 7.77196 12.1649 7.84663C11.8658 7.91104 11.6254 7.94304 11.4437 7.94304C10.8562 7.94304 10.3032 7.70509 9.78502 7.2296C9.26686 6.75412 9.00799 6.09976 9.00799 5.26653C9.00799 4.45463 9.27507 3.7576 9.80922 3.17545C10.3434 2.59289 11.0753 2.3016 12.0049 2.3016C13.1159 2.3016 14.0131 2.7213 14.697 3.55986C15.3809 4.39842 15.7227 5.56601 15.7227 7.0614C15.7227 9.12335 15.095 10.7393 13.8396 11.9094C12.5842 13.0786 11.0646 13.6903 9.2804 13.7437ZM0.482452 13.7437L0.482453 11.8212C1.43302 11.8212 2.35445 11.5032 3.24676 10.8678C4.13866 10.2319 4.58502 9.45483 4.58502 8.53586C4.58502 8.0017 4.37127 7.73463 3.94379 7.73463C3.84779 7.73463 3.65538 7.77196 3.36697 7.84663C3.06748 7.91104 2.82748 7.94304 2.64573 7.94304C2.02625 7.94304 1.46543 7.69688 0.963274 7.20581C0.46112 6.71432 0.210043 6.06776 0.210043 5.26652C0.210043 4.45463 0.47671 3.7576 1.01127 3.17545C1.54543 2.59288 2.27732 2.3016 3.20656 2.3016C4.31794 2.3016 5.21517 2.7213 5.89907 3.55986C6.58256 4.39842 6.92471 5.56601 6.92471 7.0614C6.92471 9.12335 6.29702 10.7393 5.04163 11.9094C3.78625 13.0786 2.26666 13.6903 0.482452 13.7437Z"
              fill="#189FFF"
            />
          </g>
          <defs>
            <clipPath id="clip0_514_25156">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(16 16) rotate(-180)"
              />
            </clipPath>
          </defs>
        </svg>
      </i>
    </div>
    <hr class="w-full mt-3 mb-2 bg-gray-200" />
    <UIShimmer width="100%" height="16px" v-bind="{ loading }">
      <p class="text-dark text-xs leading-140">
        {{ card?.body }}
      </p>
    </UIShimmer>
    <UIShimmer
      v-for="i in 4"
      width="100%"
      height="16px"
      v-bind="{ loading }"
      preloader-class="mt-0.5"
    />
  </div>
</template>
<script setup lang="ts">
interface Props {
  card: {
    id: number
    author_name: string
    author_photo: string
    body: string
  }
  loading?: boolean
}

defineProps<Props>()
</script>
