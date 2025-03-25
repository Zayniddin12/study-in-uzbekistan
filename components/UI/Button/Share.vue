<template>
  <UIDropdown list-style="!w-[200px] left-0 !right-[unset] !top-12">
   <template #head>
     <div class="flex items-center gap-3">
       <p class="text-base leading-normal text-dark font-medium">{{$t('share')}}</p>
       <button class="rounded-lg w-10 h-10 bg-[#D9E8FC] flex-center hover:bg-blue group transition-300">
         <i class="icon-share text-[22px] text-blue group-hover:text-white transition-300" />
       </button>
     </div>
   </template>

    <div class="min-w-[200px] flex flex-col p-1.5">
      <button v-for="(social, index) in socials" :key="index" class="p-3 rounded-[10px] hover:bg-gray/[14%] transition-300" @click="share(social?.type)">
        <div class="flex-y-center gap-2">
          <i :class="social?.icon" class="text-xl text-gray" />
          <p class="text-sm leading-20 font-medium text-dark">{{social?.name}}</p>
        </div>
      </button>
    </div>
  </UIDropdown>
</template>

<script setup lang="ts">

interface Props {
  link?: string
  title?: string
}

const props = defineProps<Props>()


const socials = [
  {
    name: 'Facebook',
    type: 'facebook',
    icon: 'icon-social-facebook'
  },
  // {
  //   name: 'Instagram',
  //   type: 'instagram',
  //   icon: 'icon-social-instagram'
  // },
  {
    name: 'Telegram',
    type: 'telegram',
    icon: 'icon-social-telegram'
  },
]

const share = (network: string) => {
  if (process.client) {
    switch (network) {
      case 'telegram':
        window.open(`https://t.me/share/url?url=${props.link}`, '_blank')
        break
      case 'twitter':
        window.open(
            `https://twitter.com/intent/tweet?text=${props.title}\n\n+${props.link}`,
            '_blank'
        )
        break
      case 'facebook':
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${props.link}`,
            '_blank'
        )
        break
      case 'whatsapp':
        window.open(
            `https://api.whatsapp.com/send?text=${props.title}\n${props.link}`,
            '_blank'
        )
        break
    }
  }
}
</script>
