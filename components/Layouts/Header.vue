<template>
  <header
    :class="y > 150 ? 'bg-white header-shadow' : 'backdrop-blur-[10px]'"
    class="sticky top-8 left-0 w-full z-50 py-3 lg:py-7 transition-300"
  >
    <nav class="container flex items-center">
      <div class="cursor-pointer mr-3 lg:hidden" @click="showMobileHeader">
        <i class="icon-hamburger-menu text-[28px]"></i>
      </div>
      <NuxtLink to="/">
        <img
          alt="logo"
          class="w-[92px] h-10 md:w-[119px] md:h-[52px] relative z-10"
          src="/images/logo.webp"
        />
      </NuxtLink>

      <LayoutsBottomHeader />

      <SectionsMainSearch
        v-if="showSearch"
        class="w-full md:w-auto"
        @close="showSearch = !showSearch"
      />

      <div class="ml-auto flex items-center">
        <div
          class="search-btn cursor-pointer ml-auto md:space-x-4 md:border-r md:border-r-[#E1ECFA] md:pr-5 relative z-1"
          @click="showSearch = !showSearch"
        >
          <img alt="Search Icon" src="/images/svg/search.svg" />
        </div>

        <div class="md:ml-5 flex items-center space-x-5">
          <UILang class="hidden lg:block" />
          <div class="bg-gray-50 h-7 w-[1px] hidden lg:block"></div>
          <UIDropdown
            v-if="Object.keys(store.user).length"
            list-style="!min-w-[180px] !min-h-[137px] !top-16 absolute !left-0 !z-[99999999]"
            @change="handleChange"
            @click="handleOutsideClick"
            @outside-click="handleOutsideClick"
          >
            <template #head>
              <div class="flex items-center" @click="showProfileDropdown">
                <img
                  v-if="store?.user?.photo"
                  :src="store?.user?.photo?.file || ''"
                  alt=""
                  class="object cover w-11 h-11 rounded-full"
                />
                <img
                  v-else
                  alt="Default image"
                  class="object cover w-11 h-11 rounded-full border"
                  src="/images/profile/DefaultImage.svg"
                />
                <div class="ml-1 sm:ml-3">
                  <p
                    class="text-dark text-sm md:text-base font-bold leading-5 text-left"
                  >
                    {{ store.user?.first_name }}
                  </p>
                  <p
                    class="text-dark text-sm md:text-base font-bold leading-5 text-left"
                  >
                    {{ store.user?.last_name }}
                  </p>
                </div>
              </div>
            </template>

            <div
              v-for="item of profileLinks"
              :key="item.id"
              class="py-2.5 pl-3 pr-2.5 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl hover:bg-white-200 flex-center-between"
              @click="handleOutsideClick"
            >
              <div class="flex items-center gap-2">
                <i :class="item.icon" class="text-xl text-gray"></i>
                <div
                  class="text-sm leading-20 font-medium text-dark"
                  @click="$router.push(item.url)"
                >
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div
              class="py-2.5 pl-3 pr-2.5 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl hover:bg-white-200 flex-center-between"
            >
              <div
                class="flex items-center gap-2"
                @click="showLogoutModal = true"
              >
                <i class="text-xl icon-logout text-red"></i>
                <span class="text-sm leading-20 font-medium text-dark">
                  {{ $t('log_out') }}</span
                >
              </div>
            </div>
          </UIDropdown>
          <div v-else class="flex items-center md:space-x-6">
            <span
              class="hidden lg:block text-dark text-sm font-bold leading-20 underline cursor-pointer relative z-1"
              @click="login"
              >{{ $t('login') }}</span
            >
            <UIButton
              :text="$t('online_application')"
              class="max-sm:text-sm max-w-[161px] w-full max-sm:py-2.5"
              @click="loginToApplication"
            />
          </div>
        </div>
      </div>
    </nav>

    <Transition name="from-left">
      <LayoutsMobileHeader
        v-if="isShown && !showSearch"
        :links="menuLinks()"
        @close-mobile-header="onCloseMobileHeader"
      />
    </Transition>

    <Modal
      v-if="!showSearch"
      :show="showLogoutModal"
      :title="$t('log_out')"
      body-class="!max-w-[378px] !overflow-visible"
      class="logOut !w-[378px]"
      title-style="logout_title"
      @close="close"
    >
      <div class="p-5">
        <div class="gap-3">
          <p class="logout_subtitle">{{ $t('confirm_log_out') }}</p>
          <div class="flex gap-4">
            <UIButton
              :text="$t('cancel')"
              class="w-full"
              variant="secondary"
              @click="showLogoutModal = false"
            />
            <UIButton
              :text="$t('log_out')"
              class="w-full"
              variant="danger"
              @click="handleLogout"
            />
          </div>
        </div>
      </div>
    </Modal>
  </header>
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import { menuLinks } from '~/data/menu'
import { useAuthStore } from '~/store/auth'

const { y } = useWindowScroll()
const store = useAuthStore()
const { t } = useI18n()
const isActive = ref(false)
const isShown = ref(false)
const showLogoutModal = ref(false)
const router = useRouter()
const isClicked = ref(false)
const showSearch = ref(false)

const handleLogout = () => {
  showLogoutModal.value = false // Close the modal
  store.logOut() // Call the logout function from your store
}

const profileLinks = [
  {
    id: 1,
    url: '/cabinet',
    title: t('profile_link'),
    icon: 'icon-user-circle',
  },
  {
    id: 2,
    url: '/profile/edit',
    title: t('submit_your_application'),
    icon: 'icon-libboy',
  },
  {
    id: 2,
    url: '/cabinet/my-applications',
    title: t('my_applications'),
    icon: 'icon-documents',
  },
]

const showMobileHeader = () => {
  document.body.style.overflow = 'hidden'
  isShown.value = true
}

const onCloseMobileHeader = () => {
  document.body.style.overflow = 'auto'
  isShown.value = false
}
const login = () => {
  $event('open-auth', 'login')
}

const loginToApplication = () => {
  isClicked.value = true
  if (!Object.keys(store.user).length) {
    return $event('open-auth', 'login')
  }
  router.push({ path: '/profile/edit' })
}
const { $event } = useNuxtApp()

const handleChange = () => {
  isActive.value = true
}

const showProfileDropdown = () => {}
const close = () => {
  showLogoutModal.value = false
}
const handleOutsideClick = () => {
  isShown.value = false
}

// watch user
watch(
  () => store.user,
  () => {
    if (Object.keys(store.user).length && isClicked.value) {
      router.push({ path: '/profile/edit' })
    }
  }
)
</script>

<style scoped>
.router-link-active {
  color: #0067ff;
}

.from-left-enter-active {
  animation: from-left 300ms ease-out;
}

.from-left-leave-active {
  animation: from-left 300ms ease-in reverse;
}

@keyframes from-left {
  0% {
    opacity: 0;
    transform: translateX(-100%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.header-shadow {
  box-shadow: 0 4px 20px 0 rgba(21, 21, 21, 0.15);
}

.logout_title {
  color: #181818;
  font-family: 'MTS';
  font-size: 18px;
  font-style: normal;
  font-weight: 700 !important;
  line-height: 24px;
}

.logout_subtitle {
  color: #181818;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 132%;
  margin-bottom: 20px;
}

.expanding-div {
}
</style>
