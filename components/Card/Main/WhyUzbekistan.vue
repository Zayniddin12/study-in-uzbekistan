<template>
  <div
    :class="{ 'w-full md:!w-[378px] grow bg-card': active }"
    :style="{ backgroundImage: active ? `url(${card?.banner})` : '' }"
    class="bg-gray-200 w-[178px] h-full min-h-[495px] rounded-2xl cursor-pointer group transition-300 ease-in-out shrink-0 relative overflow-hidden"
  >
    <p
      :class="{ 'opacity-0': active }"
      class="text-3.5xl font-bold text-dark leading-custom-normal sideway-text absolute bottom-9 left-[30px] rotate-180 transition-300 ease-in-out group-hover:underline"
    >
      {{ card?.title }}
    </p>
    <!--    <img-->
    <!--      :src="card?.banner"-->
    <!--      class="w-full h-full object-cover opacity-0 transition-300"-->
    <!--      :class="{ 'opacity-100': active }"-->
    <!--      alt="image"-->
    <!--    />-->
    <div
      :class="{ 'opacity-100': active }"
      class="linear-blue-why absolute inset-0 w-full h-full z-[1] opacity-0 transition-300"
    />
    <div class="absolute w-full h-full flex items-end z-[2] inset-0 p-5 md:p-8">
      <div
        :class="{ 'opacity-100': active }"
        class="transition-300 opacity-0 md:min-w-[320px]"
      >
        <p
          class="text-white text-2xl md:text-3.5xl font-bold leading-custom-normal transition-300 group-hover:underline"
        >
          {{ card?.title }}
        </p>
        <p
          class="text-sm md:text-base !leading-130 font-normal text-white mt-3 mb-5 md:mb-7"
        >
          {{ card?.short_description }}
        </p>
        <a :href="card?.url" class="w-full" target="_blank">
          <UIButton :text="$t('more')" class="w-full" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  card: {
    id: number
    title: string
    short_description: string
    banner: string
    url: string
  }
  active?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.linear-blue-why {
  background: linear-gradient(
    180deg,
    rgba(0, 103, 255, 0) 0%,
    rgba(0, 27, 67, 0.8) 54.17%
  );
}

.sideway-text {
  writing-mode: vertical-rl;
}
</style>
