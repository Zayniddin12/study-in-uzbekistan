<template>
  <footer class="bg-blue">
    <div class="pt-8 container">
      <div class="flex md:flex-row flex-col md:space-x-8 max-md:gap-4">
        <div class="md:max-w-[235px] w-full">
          <div class="flex gap-2 items-center mb-3 sm:mb-4">
            <NuxtLink to="/">
              <img
                alt="logo"
                class="w-[147px] h-16"
                src="/images/logo-dark.webp"
              />
            </NuxtLink>
            <div class="h-12 w-px bg-white/50 flex-shrink-0"></div>
            <a href="https://edu.uz" target="_blank">
              <img
                width="64"
                height="64"
                src="/images/ministry-logo.webp"
                alt=""
              />
            </a>
          </div>
          <p
            class="footer-site-info text-white font-medium text-sm leading-20 whitespace-nowrap"
            v-html="formatRichText(footerInfo)"
          />
          <!--          <p class="mt-2 sm:mt-4 text-white font-medium text-sm leading-20">-->
          <!--            {{ $t('offical_year') }}-->
          <!--          </p>-->
          <UIButton
            :text="$t('contact_us_btn')"
            class="mt-4 h-11 w-[177px] !bg-[#FFFFFF29] hover:!bg-[#FFFFFF1F]"
            size="large"
            type="button"
            @click="contactFormShow = true"
          />

          <SectionsContactUs
            :show="contactFormShow"
            @close="contactFormShow = false"
          />
        </div>
        <div
          :class="{ 'lg:!grid-cols-3': footer.at(0)?.links?.length === 0 }"
          class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10"
        >
          <template v-for="(item, index) of footer" :key="item.id">
            <div
              v-if="item?.links?.length > 0"
              class="max-sm:border-b last:border-b-0 border-white/[16%] max-sm:pb-4"
            >
              <h3
                class="text-lg lg:text-xl flex items-center justify-between text-white leading-20 font-bold cursor-pointer"
                @click="activeIndex = activeIndex === index ? null : index"
              >
                {{ item.title }}

                <i
                  :class="{ '!rotate-0': activeIndex === index }"
                  class="icon-arrow-up2 sm:hidden ml-auto text-2xl transition-300 rotate-180"
                ></i>
              </h3>
              <CollapseTransition>
                <ul
                  v-if="width > 640 || index === activeIndex"
                  class="pt-4 space-y-2"
                >
                  <li v-for="link of item?.links" :key="link.id" class="group">
                    <NuxtLink :to="link?.url" class="inline">
                      <span
                        class="footer-link text-gray-200 text-base leading-120 font-normal transition-400 group-hover:text-white inline-block group-hover:underline"
                        v-html="formatRichText(link.title)"
                      ></span>
                    </NuxtLink>
                  </li>
                </ul>
              </CollapseTransition>
            </div>
          </template>
        </div>
      </div>

      <div class="py-4 md:py-5 border-t border-blue-100/60 mt-8 sm:mt-[60px]">
        <div
          class="flex items-center relative text-xs justify-between text-white gap-3"
        >
          <p class="font-bold text-sm text-white">
            © Study in Uzbekistan {{ new Date().getFullYear() }}
          </p>

          <UISVG class="sm:hidden" />
          <UILOGO class="max-sm:hidden" />

          <div class="hidden sm:flex items-center space-x-3">
            <button
              v-for="(item, index) of socials"
              :key="index"
              v-tooltip="item.name"
            >
              <a :href="item.link" target="_blank"
                ><i
                  :class="[
                    item.icon,
                    { 'text-base': item.icon === 'icon-twitter' },
                  ]"
                  class="text-2.5xl"
                ></i
              ></a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useWindowSize } from '@vueuse/core'

import UILOGO from '~/components/UI/UIC/Logo.vue'
import UISVG from '~/components/UI/UIC/SVG.vue'
import { useHomeStore } from '~/store'
import { formatRichText } from '~/utils'

const { width } = useWindowSize()
const activeIndex = ref<null | number>(null) // Add ref here
const loading = ref(true)
const { fetchFooter } = useHomeStore()

const footer = computed(() => useHomeStore().footer)
Promise.allSettled([fetchFooter()]).then(() => (loading.value = false))

const contactFormShow = ref(false)
const footerInfo = ref<string>('')

const socials = reactive([
  {
    name: 'Facebook',
    link: '',
    icon: 'icon-facebook',
  },
  {
    name: 'YouTube',
    link: '',
    icon: 'icon-youtube',
  },
  {
    name: 'Instagram',
    link: '',
    icon: 'icon-instagram',
  },
  {
    name: 'Telegram',
    link: '',
    icon: 'icon-telegram',
  },
  {
    name: 'Twitter',
    link: '',
    icon: 'icon-twitter',
  },
])

const getSocialLinks = () => {
  useApi()
    .$get<{
      facebook: string
      youtube: string
      twitter: string
      telegram: string
      instagram: string
    }>('/common/config/')
    .then((res) => {
      socials[0].link = res.facebook
      socials[1].link = res.youtube
      socials[2].link = res.instagram
      socials[3].link = res.telegram
      socials[4].link = res.twitter
      footerInfo.value = res?.footer_site_info
    })
}

onMounted(() => {
  getSocialLinks()
})
</script>

<style scoped>
footer {
  background-image: url('/images/amblemDark.png');
  background-repeat: no-repeat;
  background-position: right;
}

.footer-link > p {
  display: inline !important;
}

.footer-site-info > p {
  display: inline;
  white-space: break-spaces;
  word-break: break-word;
}
</style>
