<template>
  <section class="container">
    <div class="relative overflow-hidden">
      <img
        src="/images/svg/shape.svg"
        alt="Shape Image"
        class="absolute left-0 top-0 opacity-10"
      />

      <h1 class="mb-1.5 text-white text-[28px] font-bold leading-112 font-mts">
        {{ $t('profile.header_title') }}
      </h1>
      <p class="max-w-[846px] text-white text-xs !leading-130 font-normal">
        {{ $t('profile.header_subtitle') }}
      </p>

      <img
        src="/images/svg/big-flag.svg"
        alt="Flag Image"
        class="absolute right-0 top-0"
      />
    </div>
  </section>
</template>

<style scoped>
div {
  box-shadow: 0 4px 28px 0 rgba(24, 24, 24, 0.03);
  @apply py-7 pl-9 bg-blue rounded-2xl;
}
</style>
