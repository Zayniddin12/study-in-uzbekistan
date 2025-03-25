<template>
  <section v-if="faqs.length" class="bg-white-200 py-7 md:py-16">
    <h1
      class="text-center mb-3 heading-1 max-md:text-2xl md:text-[32px] leading-112 font-mts"
    >
      {{ $t('faq') }}
    </h1>
    <SectionsFaq class="container max-w-[782px]" :faq="faqs" />
  </section>
</template>

<script setup lang="ts">
const faqs = ref<any>([])

function getFaqs() {
  useApi()
    .$get('common/faqs/')
    .then((res) => {
      faqs.value = res
    })
    .catch((err) => {
      return new Error(err)
    })
}

getFaqs()
</script>
