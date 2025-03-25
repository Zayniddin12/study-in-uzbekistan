<template>
  <div class="flex justify-center items-center flex-col h-auto">
    <UIAvatar
      :image="students?.photo"
      default-image="/images/profile/building-default.svg"
      size="lg"
      no-border
      class="rounded-full w-[104px] h-[104px] ml-1/2"
    />
    <div
      class="border border-gray-200 text-center flex-col ga-1 rounded-xl px-3 pb-[22px] min-h-[198px] w-full pt-[66px] mt-[-50px] h-full"
    >
      <p class="text-black font-bold text-base leading-130 mb-2">
        {{ students.name }}
      </p>
      <p class="text-xs text-gray leading-130 font-normal text-center">
        {{ students.about }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  students: {
    id: number
    name: string
    about: string
    photo: string
  }
}

withDefaults(defineProps<Props>(), {})
</script>
