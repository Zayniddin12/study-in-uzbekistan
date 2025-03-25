<template>
  <div
    class="w-full absolute top-0 left-0 h-screen z-50 flex flex-col justify-between transition-all duration-300 bg-white pl-4"
  >
    <div>
      <div class="py-2 md:py-4 flex items-center pr-4">
        <div class="flex items-center gap-x-3">
          <div @click="$emit('closeMobileHeader')">
            <i class="icon-close text-blue cursor-pointer"> </i>
          </div>
          <img alt="" class="w-[92px] h-10" src="/images/logo.webp" />
        </div>
        <UIButton
          v-if="!Object.keys(store.user).length"
          id="yourElementId"
          :text="$t('login')"
          class="ml-auto max-w-[140px] w-full text-sm"
          variant="secondary"
          @click="login"
        />
      </div>
      <UILang class="mt-6" list-style="!w-[100px]" />
      <ul class="mt-6">
        <li
          v-for="(item, idx) of menuStore.menu"
          :key="idx"
          @click="openChildMenu(item)"
        >
          <div class="flex items-center justify-between pr-4">
            <NuxtLink
              :to="'/' + item?.slug"
              class="text-dark text-base font-medium !leading-130 transition-colors duration-300 hover:text-blue"
              >{{ item.name }}
            </NuxtLink>
            <span
              :class="{ 'rotate-180': activeMenuId === item.id }"
              class="icon-chevron flex-shrink-0 ml-1 transition-300"
            ></span>
          </div>
          <div class="bg-dark/10 my-4 w-full h-[1px]"></div>
          <template v-if="item.name !== 'about'">
            <UIShimmer
              v-for="(link, id) in loading ? 4 : activeCategories"
              :key="id"
              class="pb-4"
              height="24px"
              width="100%"
            >
              <Transition name="fade">
                <div
                  v-if="activeMenuId === item.id"
                  :class="{ 'mb-0': activeMenuId === item.id }"
                  class="pl-1 py-0"
                >
                  <p class="mb-1 last:mb-0">
                    <NuxtLink
                      :to="link?.isStatic ? `/pages/${link?.slug}` : link?.url"
                      class="text-dark text-sm font-medium !leading-140 transition-colors duration-300 hover:text-blue"
                      >{{ link.title }}
                    </NuxtLink>
                  </p>
                </div>
              </Transition>
            </UIShimmer>

            <p
              v-if="
                activeMenuId === item.id &&
                activeCategories.length === 0 &&
                !loading
              "
              class="mb-4"
            >
              {{ $t('no_data') }}
            </p>
          </template>
        </li>
      </ul>
    </div>
    <div class="pb-[72px] flex-center gap-[14px]">
      <a
        v-for="(social, index) in socials"
        :key="index"
        :href="social?.link"
        class="block w-8 h-8 flex items-center justify-center"
        target="_blank"
      >
        <i :class="social?.icon" class="text-3.5xl text-blue" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

import type { Links } from '~/data/menu'
import { useAuthStore } from '~/store/auth'
import { useMenuStore } from '~/store/menu'

interface Props {
  links: Array<Links>
}

defineProps<Props>()
const emit = defineEmits(['closeMobileHeader'])

const { $event } = useNuxtApp()
const store = useAuthStore()
const menuStore = useMenuStore()
const menuCategoriesData = ref([])
const activeCategories = ref([])

const route = useRoute()

const activeMenuId = ref<number>()
const loading = ref(false)
const nameOfActiveMenu = ref('')
const openChildMenu = (link: Links) => {
  if (activeMenuId.value === link?.id) {
    activeMenuId.value = 0
    return
  }

  activeMenuId.value = link?.id

  activeCategories.value = menuCategoriesData.value.filter(
    (item) => item?.type === link?.id
  )
}

const getMenuCategory = () => {
  try {
    useApi()
      .$get('/common/menu-categories/')
      .then((res) => {
        menuCategoriesData.value = res
      })
  } catch (e) {
    showError(e)
  }
}

getMenuCategory()

watch(
  () => menuStore.activeMenu,
  () => {
    // reset menuArticle
    menuStore.menuArticle = []

    loading.value = true
    menuStore
      .fetchMenuCategory()
      .then((res) => {
        if (res && res.length > 0) {
          menuStore.fetchMenuArticleByCategoryId(res[0].id)
        }
      })
      .finally(() => (loading.value = false))
  },
  { deep: true }
)

const socials = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/sarafscreening/',
    icon: 'icon-facebook',
  },
  {
    name: 'YouTube',
    link: 'https://www.youtube.com/channel/UC01vVZLtkiDaUr5LDPnRWsw',
    icon: 'icon-youtube',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/sarafscreening/',
    icon: 'icon-instagram',
  },
  {
    name: 'Telegram',
    link: 'https://fb.com',
    icon: 'icon-telegram',
  },
]

const login = () => {
  if (!Object.keys(store.user).length) {
    return $event('open-auth', 'login')
  }
}

// watch route
watch(
  () => route.path,
  () => {
    emit('closeMobileHeader')
  }
)
</script>

<style scoped></style>
