<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import CNoData from '~/components/CNoData.vue'
import { useUniversityStore } from '~/store/university'

const { t } = useI18n()
const universityStore = useUniversityStore()

const single = computed(() => universityStore.single)
const breadcrumbRoutes = computed(() => [
  {
    title: t('programs_and_universities'),
    link: '/programs-and-universities',
  },
  {
    title: single.value.name,
    link: `/universities/${single.value.id}/`,
  },
  {
    title: t('photos_videos'),
    link: '',
  },
])

const media = computed(() => universityStore.single?.media)
//
// const activeItem = ref({
//   id: 0,
//   type: '',
//   image: '',
//   vid_link: '',
// })
const show = ref(false)
const activeIndex = ref(0)
const openModal = (itemId: number) => {
  show.value = true
  activeIndex.value = itemId
  // activeItem.value = media.value.find((item) => item.id === itemId)
}
const closeModal = () => {
  show.value = false
  activeIndex.value = 0
}
</script>

<template>
  <section>
    <ClientOnly>
      <Teleport to="#otm_breadcrumb">
        <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
      </Teleport>
    </ClientOnly>

    <div>
      <h2 class="text-lg md:text-xl text-dark mb-4 font-medium">
        {{ $t('photos_videos') }}
      </h2>

      <ul class="grid gap-4">
        <li
          v-for="({ id, type, image, vid_link }, idx) in media"
          :key="id"
          :class="[
            { 'video-card': type === 'video' },
            `image-${idx + 1}`,
            { 'flex items-center justify-center': !image },
          ]"
          class="rounded-xl overflow-hidden"
          @click="openModal(idx)"
        >
          <img
            v-if="image"
            :src="image"
            alt="Image of University"
            class="w-full h-full object-cover cursor-pointer relative"
          />
          <img
            v-else
            src="/images/logo.webp"
            alt="Image of University"
            class="w-full object-contain cursor-pointer relative p-3"
          />
        </li>
      </ul>

      <div v-if="media && media.length === 0">
        <CNoData class="col-span-3" />
      </div>
      <UILightBox
        :active="activeIndex"
        :images="media"
        v-bind="{ show }"
        @close="closeModal"
      />
      <!--      <SectionsUniversityPhotosAndVideos-->
      <!--        v-bind="{ show: show, item: activeItem }"-->
      <!--        @close="show = false"-->
      <!--      />-->
    </div>
  </section>
</template>

<style scoped>
.video-card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.video-card::before {
  content: '';
  width: 100%;
  height: 100%;
  background: #19192d33;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.video-card::after {
  content: '';
  width: 100%;
  height: 100%;
  background: url('/images/svg/play.svg') no-repeat center center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transform: translate(0%, 5%);
}

.image-1,
.image-2 {
  height: 133px;
}
.image-3 {
  height: 133px;
  grid-column: 1 / span 2;
}
.image-4 {
  grid-column: 3 / span 3;
  grid-row: 1 / span 2;
  height: 282px;
  margin-left: 8px;
}
.image-5,
.image-6 {
  height: 174px;
}
.image-7 {
  grid-column: 3 / span 3;
  height: 174px;
  margin-left: 8px;
}

.image-8,
.image-9 {
  height: 174px;
}
.image-10 {
  grid-column: 3 / span 3;
  height: 174px;
  margin-left: 8px;
}

@media (max-width: 400px) {
  .image-1,
  .image-2,
  .image-3,
  .image-4,
  .image-5,
  .image-6,
  .image-7,
  .image-8,
  .image-9,
  .image-10 {
    height: 100%;
    max-height: 174px;
    margin-left: 0;
    grid-column: auto;
    grid-row: auto;
  }
}

@media (max-width: 768px) and (min-width: 401px) {
  .image-1,
  .image-2,
  .image-3,
  .image-4,
  .image-5,
  .image-6,
  .image-7,
  .image-8,
  .image-9,
  .image-10 {
    height: 100%;
    max-height: 174px;
    margin-left: 0;
    grid-column: auto;
    grid-row: auto;
  }

  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
