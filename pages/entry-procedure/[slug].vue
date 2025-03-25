<template>
  <div>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />
    <div class="max-w-[982px] w-full container pt-6">
      <div class="aspect-video">
        <img
          :src="data?.image"
          alt="news-why"
          class="w-full object-cover h-full rounded-[20px]"
        />
      </div>
      <UISectionTitle
        :title="data?.title"
        class="!text-left !text-2.5xl max-w-[982px] mx-auto my-8"
      />
      <div class="static-text" v-html="data?.content" />
      <div
        class="single-footer container mt-8 pt-6 pb-16 border-t border-gray-200 flex-center-between max-md:flex-col max-md:items-start gap-3"
      >
        <div
          class="flex-y-center max-md:flex-col max-md:items-start gap-3 md:gap-8"
        >
          <UIButtonShare :link="getFullLink" :title="data?.title" />
          <UIButtonCopy />
        </div>
        <UIButtonPrint />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const getFullLink = computed(() => {
  if (process.client) {
    return window.location.href
  }
})

const data = {
  published_date: '23-Iyul, 2005',
  published_date_hour: '19:00',
  image: 'https://picsum.photos/339/191',
  title:
    'Abdusattorov yana bir turnirda ishtirok etadi - unga kimlar raqiblik qilishi mumkin?',
  short_description:
    'Oʻzbekiston shaxmat federatsiyasiga Yevropaning shaxmat sovrinini frantsiyalik mashhur grossmeyster topshirgan.',
  content: `<p>Oʻzbekistonlik Humoyun Bekmurodov dunyoning 576 nafar kuchli shaxmatchilar orasida 3-oʻrinni egalladi. Bu haqda Yoshlar ishlari agentligi direktori Alisher Saʼdullayev maʼlum qildi.<br />Kuni kecha Chess.com da dunyo miqyosida 576 nafar kuchli shaxmatchi oʻrtasida &ldquo;Titled Tuesday&rdquo; onlayn turniri boʻlib oʻtdi. Unda ishtirok etgan Bekmurodov 3-oʻrinni qoʻlga kiritdi.</p><p>Maʼlumot uchun, Humoyun 6 yoshidayoq shaxmat boʻyicha avvaliga mamlakat, soʻngra Osiyo chempionligini qoʻlga kiritgan.<br />2020 yilda Humoyun shaxmat boʻyicha havaskorlar oʻrtasida Oʻzbekiston chempionatida gʻolib chiqdi va &ldquo;Spark&rdquo; avtomashinasi bilan taqdirlandi.<br />U oʻtgan yil fevralida Xalqaro shaxmat federatsiyasi (FIDE) sport ustasi unvoniga sazovor boʻlgan.</p><p>Shuningdek, u Gretsiyadagi shaxmat boʻyicha yoshlar oʻrtasidagi jahon chempionatida &quot;Open12&quot; guruhida ham rapid, ham blits boʻyicha kumush medal sohibiga aylangan.<br />Bu yil rapid va blits boʻyicha Olmaotada (Qozogʻiston) boʻlib oʻtgan jahon chempionatida Bekmurodov hammani hayratga soldi. U Uels vakili Elijah Everettga qarshi oʻyinda chiroyli gʻalabasi bilan yakun yasashga muvaffaq boʻldi.</p><p></p><blockquote><p>Maʼlumot uchun, Humoyun 6 yoshidayoq shaxmat boʻyicha avvaliga mamlakat, soʻngra Osiyo chempionligini qoʻlga kiritgan.<br />2020 yilda Humoyun shaxmat boʻyicha havaskorlar oʻrtasida Oʻzbekiston chempionatida gʻolib chiqdi va &ldquo;Spark&rdquo; avtomashinasi bilan taqdirlandi.<br />U oʻtgan yil fevralida Xalqaro shaxmat federatsiyasi (FIDE) sport ustasi unvoniga sazovor boʻlgan.</p></blockquote><p></p><ul><li>Maʼlumot uchun, Humoyun 6 yoshidayoq shaxmat boʻyicha avvaliga mamlakat, soʻngra Osiyo chempionligini qoʻlga kiritgan.</li><li>2020 yilda Humoyun shaxmat boʻyicha havaskorlar oʻrtasida Oʻzbekiston chempionatida gʻolib chiqdi va &ldquo;Spark&rdquo; avtomashinasi bilan taqdirlandi.</li><li>U oʻtgan yil fevralida Xalqaro shaxmat federatsiyasi (FIDE) sport ustasi unvoniga sazovor boʻlgan.</li><li>Shuningdek, u Gretsiyadagi shaxmat boʻyicha yoshlar oʻrtasidagi jahon chempionatida &quot;Open12&quot; guruhida ham rapid, ham blits boʻyicha kumush medal sohibiga aylangan.</li><li>Bu yil rapid va blits boʻyicha Olmaotada (Qozogʻiston) boʻlib oʻtgan jahon chempionatida Bekmurodov hammani hayratga soldi. U Uels vakili Elijah Everettga qarshi oʻyinda chiroyli gʻalabasi bilan yakun yasashga muvaffaq boʻldi.</li></ul><img alt=\\"Cristiano Ronaldo Profile | PlanetSport\\" src="https://www.planetsport.com/image-library/square/1200/c/cristiano-ronaldo-portugal-5-june-2022.jpg" /><ol><li>Oʻzbekistonlik Humoyun Bekmurodov dunyoning 576 nafar kuchli shaxmatchilar orasida 3-oʻrinni egalladi. Bu haqda Yoshlar ishlari agentligi direktori Alisher Saʼdullayev maʼlum qildi.</li><li>Kuni kecha Chess.com da dunyo miqyosida 576 nafar kuchli shaxmatchi oʻrtasida &ldquo;Titled Tuesday&rdquo; onlayn turniri boʻlib oʻtdi. Unda ishtirok etgan Bekmurodov 3-oʻrinni qoʻlga kiritdi.</li></ol>`,
}

const breadcrumbRoutes = computed(() => [
  {
    title: t('why_uzbekistan'),
    link: '/why-uzbekistan',
  },
  {
    title: 'Узбекских университеты в мировых рейтингах',
    link: '/',
  },
])
</script>
