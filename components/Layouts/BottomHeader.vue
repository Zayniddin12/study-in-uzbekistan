<script lang="ts" setup>
import { useMenuStore } from '~/store/menu'

const menuStore = useMenuStore()

const loading = ref(false)
const nameOfActiveMenu = ref('')

const menuCategoriesData = ref([])

const menuCategories = computed(() => menuStore.menuCategory)
const activeCategories = ref([])

const showChildren = ref(true)

const show = (id: number) => {
  showChildren.value = true
  activeCategories.value = menuCategoriesData.value.filter(
    (item) => item?.type === id
  )
}

menuStore.fetchMenu()

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
    if (nameOfActiveMenu.value === 'about') return

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

const hidden = () => {
  showChildren.value = false
}
</script>

<template>
  <nav class="w-fit mx-auto shadow-header" @mouseleave="hidden">
    <ul
      class="hidden items-center lg:flex justify-between transition-300 relative gap-3 ml-4"
    >
      <li
        v-for="item in menuStore.menu"
        :key="item.id"
        class="inline-block"
        @mouseover="show(item.id)"
      >
        <NuxtLink
          :class="{ 'text-blue z-[1000]': showChildren }"
          :to="'/' + item?.slug"
          class="inline-block text-dark font-medium leading-20 transition-colors transition-500 ease-in-out duration-400 hover:text-blue group relative cursor-pointer"
          >{{ item?.name }}
        </NuxtLink>
      </li>
    </ul>

    <TransitionGroup name="fade">
      <div
        v-show="showChildren && activeCategories.length !== 0"
        class="hidden md:block pt-[128px] max-h-[350px] overflow-hidden bg-white pb-5 transition-all transition-300 w-full absolute top-0 left-0 z-1"
      >
        <div class="container">
          <!--        category lists  -->
          <ul class="grid grid-cols-3 pb-5">
            <li
              v-for="(
                { id, title, slug, isStatic, url }, idx
              ) in activeCategories.slice(0, 15)"
              :key="id"
              class="cols-span-1 group h-[45px] pl-4 pr-2.5 hover:bg-[#F7F9FA] transition-300 hover:rounded-md cursor-pointer last:!ml-0 space-x-4"
            >
              <NuxtLink
                :class="{
                  'border-b-0': idx === menuCategories.length - 1,
                }"
                :to="isStatic ? `/pages/${slug}` : url"
                class="w-full block py-3 text-dark text-base font-medium leading-20 transition-colors duration-300 group border-b border-b-[#E1ECFA]"
                >{{ title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </TransitionGroup>
  </nav>
</template>
