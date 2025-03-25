<template>
  <nuxt-link
    :to="card?.url"
    class="move-card group backdrop-filter-[14px] hover:cursor-pointer transition-300 hover:bg-active group hover:shadow-md"
  >
    <div
      v-if="card?.icon"
      class="flex-center bg-white w-12 h-12 rounded-[10px]"
    >
      <img :alt="card?.title ?? 'icon'" :src="card?.icon" />
    </div>

    <div class="mt-4">
      <p
        class="text-lg font-bold text-white leading-custom-normal line-clamp-2 group-hover:text-primary transition-300 group-hover:underline"
      >
        {{ card?.title }}
      </p>
      <p
        class="text-xs leading-custom-normal text-white font-normal mt-1 line-clamp-4"
      >
        {{ card?.short_description }}
      </p>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
  card: {
    title: string
    icon: string
    short_description: string
    url: string
  }
}

defineProps<Props>()
</script>

<style scoped>
.move-card {
  padding: 20px;
  border-radius: 16px;
  border: 2px solid #046aff;
  background: #207aff;
  backdrop-filter: blur(14px);
}

.fix-leading {
  line-height: normal;
}
</style>
