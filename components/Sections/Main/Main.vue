<template>
  <header ref="scroll" class="md:h-screen relative">
    <main class="relative">
      <Client-Only>
        <Swiper class="swiper" loop v-bind="settings">
          <SwiperSlide
            v-for="(banner, index) in banners"
            :key="index"
            class="relative"
          >
            <Banner :banner="banner" />
          </SwiperSlide>
        </Swiper>
      </Client-Only>

      <section
        class="container w-[90%] mx-auto sm:w-full absolute left-1/2 -translate-x-1/2 bottom-10 md:bottom-[64px] z-10 p-4 bg-white/[70%] md:bg-white/[48%] rounded-2xl border border-white/20 flex-y-center max-md:flex-col gap-3 md:gap-4"
      >
        <FormSelect
          v-model="quires.degree"
          :options="degrees"
          :placeholder="$t('level_of_education')"
          class="w-full"
          label-key="name"
          selected-option-styles="h-11"
          value-key="id"
          is-main
        />
        <FormSelect
          v-model="quires.direction"
          :options="directions"
          :placeholder="$t('education_sector')"
          class="w-full"
          infinite-scroll
          label-key="name"
          selected-option-styles="h-11 !px-0"
          value-key="id"
          @load="getDirections(10)"
          @on-toggle="toggledSelect = $event"
          @on-select="handleSelectDirections"
        >
          <template #selectedOption="slotProps">
            <FormInput
              v-model="searchableDirections"
              :placeholder="
                quires.direction ? quires.direction : $t('direction_of_study')
              "
              class="w-full !p-0 !border-none outline-0"
              input-class="placeholder:!text-dark"
              type="text"
            >
              <template #suffix>
                <div class="px-3 h-full flex-center">
                  <span
                    :class="{ 'rotate-180': toggledSelect }"
                    class="icon-chevron transition-all duration-200 inline-block text-blue"
                  ></span>
                </div>
              </template>
            </FormInput>
          </template>
        </FormSelect>
        <FormSelect
          v-model="quires.region"
          :options="regions"
          :placeholder="$t('city')"
          class="w-full"
          is-searchable
          label-key="name"
          selected-option-styles="h-11"
          value-key="id"
          @on-select="handleSelectedOption"
        />
        <UIButton :text="$t('search')" class="max-md:w-full" @click="submit" />
      </section>
    </main>
  </header>
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/effect-fade'

import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'

import Banner from '~/components/Sections/Main/Banner.vue'
import type { IBanner, IResponse } from '~/types/common'

const { t } = useI18n()
const router = useRouter()

const degrees = ref<any>([])
const directions = ref<any>([])
const regions = ref<any>([])

const settings = {
  slidesPerView: 1,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  modules: [EffectFade, Autoplay],
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
}

const quires = reactive({
  region: '',
  direction_program: '',
  degree: '',
})

const banners = ref<IBanner[]>([])
const getBanners = async () => {
  await useApi()
    .$get('/common/banner/')
    .then((res: Array<IBanner>) => {
      banners.value = res
    })
    .catch((err) => {
      return new Error(err)
    })
}

getBanners()

const limit = ref(0)
const count = ref(10)
const searchableDirections = ref(null)
const toggledSelect = ref(false)

function getDirections(next: number) {
  if (count.value > limit.value) {
    limit.value += next
  }
  return useApi()
    .$get('/common/school_program_directions/', {
      params: {
        search: searchableDirections.value,
        degrees: quires.degree === '' ? undefined : quires.degree,
        limit: limit.value,
      },
    })
    .then((res: IResponse) => {
      directions.value = [
        {
          name: t('all_directions'),
          id: '',
        },
        ...res.results,
      ]
      count.value = res.count
    })
    .catch((err) => {
      return new Error(err)
    })
}

function getRegions() {
  return useApi()
    .$get('/common/regions/', {
      params: {
        limit: 20,
      },
    })
    .then((res: IResponse) => {
      regions.value = [
        {
          name: t('all_regions'),
          id: '',
        },
        ...res.results,
      ]
    })
}

// watch
watch(
  () => quires.degree,
  () => {
    limit.value = 0
    getDirections(limit.value)
  }
)

watch(searchableDirections, () => {
  limit.value = 10
  debounce(
    'searchable',
    () => {
      getDirections(limit.value)
    },
    500
  )
})

const handleSelectDirections = (option: {
  id: number
  name: string | null
}) => {
  searchableDirections.value = option.name
  quires.direction = option.id
  toggledSelect.value = false
}

function getDegrees() {
  return useApi()
    .$get('/common/education-degrees/')
    .then((res: IResponse) => {
      degrees.value = [
        {
          name: t('all_degrees'),
          id: '',
        },
        ...res.results,
      ]
    })
    .catch((err) => {
      return new Error(err)
    })
}

getDirections(5)
getDegrees()
getRegions()
async function submit() {
  await router.push({
    name: 'programs',
    query: {
      degree: quires.degree,
      direction_program: quires?.direction,
      region: quires.region,
    },
  })
}
</script>

<style scoped></style>
