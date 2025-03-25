<template>
  <div class="container py-7 md:py-16">
    <UIPageTitle :title="$t('ministry_team_photos')" class="mb-11" />
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-9">
      <CardMinistry v-for="(card, i) in cards" :key="i" :item="card" />
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = ref<any>([])

function getFaqs() {
  useApi()
    .$get('common/ministry-members/')
    .then((res) => {
      cards.value = res
    })
}

getFaqs()
</script>
