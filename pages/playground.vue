<template>
<div class="bg-white-200 min-h-screen">
  <div class="container pt-8 ">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-3">
        <SectionsProgramsSidebar />
      </div>
      <div class="col-span-9">
        <SectionsProgramsHeader :list="tabList" :active="'label'" v-bind="{card}" />
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">



const card = {
  title: 'Университет Узбекский государственный университет мировых языков',
  background: '/images/fake/image-fake.png'
}

const tabList = [
  {
    label: 'Label lasjkdjlk ajsd',
    value: 'label',
  },
  {
    label: 'Option laksdm ;aksdm;',
    value: 'options'
  },
  {
    label: 'Label lasjkdjlk ajsd',
    value: 'label1',
  },
  {
    label: 'Option laksdm ;aksdm;',
    value: 'options1'
  },
  {
    label: 'Label lasjkdjlk ajsd',
    value: 'label2',
  },
  {
    label: 'Option laksdm ;aksdm;',
    value: 'options2'
  },
  {
    label: 'Label lasjkdjlk ajsd',
    value: 'label3',
  },
  {
    label: 'Option laksdm ;aksdm;',
    value: 'options3'
  },
  {
    label: 'Label lasjkdjlk ajsd',
    value: 'label4',
  },
  {
    label: 'Option laksdm ;aksdm;',
    value: 'options4'
  },
  {
    label: 'Label lasjkdjlk ajsd',
    value: 'label5',
  },
  {
    label: 'Option laksdm ;aksdm;',
    value: 'options5'
  },
]
</script>