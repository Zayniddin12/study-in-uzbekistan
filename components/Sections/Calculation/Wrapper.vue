<template>
  <div
    class="p-4 md:px-8 md:pb-7 md:pt-6 bg-gray-200 rounded-2xl grid md:grid-cols-2 gap-2"
  >
    <div class="flex flex-col justify-between gap-16">
      <div>
        <UISectionTitle
          class="text-xl md:text-2.5xl !text-left"
          :title="title"
        />
        <p class="mt-1 text-sm leading-132 text-dark font-normal">
          {{ subtitle }}
        </p>
      </div>
      <div class="hidden md:flex items-center gap-8">
        <div>
          <p class="text-sm leading-132 font-normal text-dark">
            {{ $t('outcome_category') }}
          </p>
          <p class="text-lg leading-6 font-medium text-dark font-mts mt-0.5">
            {{
              price
                ? `${
                    currency === 'USD' || currency === 'EUR'
                      ? price
                      : formatNumberSpace(price)
                  } ${currency}`
                : '-'
            }}
          </p>
        </div>
        <div class="w-px h-8 bg-gray" />
        <div>
          <p class="text-sm leading-132 font-normal text-dark">
            {{ $t('total') }}
          </p>
          <p class="text-lg leading-6 font-medium text-dark font-mts mt-0.5">
            {{
              data?.total
                ? `${
                    currency === 'USD' || currency === 'EUR'
                      ? data?.total
                      : formatNumberSpace(data?.total)
                  } ${currency}`
                : '-'
            }}
          </p>
        </div>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <div :key="step">
        <slot />
      </div>
    </Transition>
    <div class="flex pt-4 mt-5 md:hidden items-center gap-1.5">
      <div class="w-full">
        <p class="text-xs leading-132 font-normal text-dark">
          {{ $t('outcome_category') }}
        </p>
        <p class="text-2xs leading-6 font-medium text-dark font-mts mt-0.5">
          {{
            price
              ? `${
                  currency === 'USD' || currency === 'EUR'
                    ? price
                    : formatNumberSpace(price)
                } ${currency}`
              : '-'
          }}
        </p>
      </div>
      <div class="w-px h-8 bg-gray" />
      <div class="w-full">
        <p class="text-xs leading-132 font-normal text-dark">
          {{ $t('total') }}
        </p>
        <p class="text-2xs leading-6 font-medium text-dark font-mts mt-0.5">
          {{
            data?.total
              ? `${
                  currency === 'USD' || currency === 'EUR'
                    ? data?.total
                    : formatNumberSpace(data?.total)
                } ${currency}`
              : '-'
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currency?: string
  title?: string
  subtitle?: string
  price?: number
  step?: number
  data?: {
    total: number
  }
}

defineProps<Props>()
</script>
