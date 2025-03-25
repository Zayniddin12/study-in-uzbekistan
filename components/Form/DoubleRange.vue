<template>
  <div class="container-range">
    <div class="values w-0 h-0 opacity-0">
      <span ref="displayValOne"> 0 </span>
      <span> &dash; </span>
      <span ref="displayValTwo"> 100 </span>
    </div>
    <div ref="sliderTrack" class="slider-track !h-5"></div>
    <input
      ref="sliderOne"
      v-model="minSliderValue"
      type="range"
      :min="min"
      :max="max"
      @input="slideOne()"
    />
    <input
      ref="sliderTwo"
      v-model="maxSliderValue"
      type="range"
      :min="min"
      :max="max"
      @input="slideTwo()"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  min: number
  max: number
  step: number
  minValue: number
  maxValue: number
  minusValue?: number
  plusValue?: number
}

const props = withDefaults(defineProps<Props>(), {
  minusValue: 4,
  plusValue: 3,
})
const emit = defineEmits(['update:minValue', 'update:maxValue'])

const sliderOne = ref<HTMLInputElement>()
const sliderTwo = ref<HTMLInputElement>()
const displayValOne = ref<HTMLDivElement>()
const displayValTwo = ref<HTMLDivElement>()
const minGap = 0
const sliderTrack = ref<HTMLDivElement>()
const minSliderValue = ref(props.minValue)
const maxSliderValue = ref(props.maxValue)

function slideOne() {
  if (
    parseInt(sliderTwo.value.value) - parseInt(sliderOne.value.value) <=
    minGap
  ) {
    sliderOne.value.value = parseInt(sliderTwo.value.value) - minGap
  }
  displayValOne.value.textContent = sliderOne.value.value
  fillColor()
}
function slideTwo() {
  if (
    parseInt(sliderTwo.value.value) - parseInt(sliderOne.value.value) <=
    minGap
  ) {
    sliderTwo.value.value = parseInt(sliderOne.value.value) + minGap
  }
  displayValTwo.value.textContent = sliderTwo.value.value
  fillColor()
}
function fillColor() {
  const percent1 = (sliderOne.value.value / sliderOne.value.max) * 100
  const percent2 = (sliderTwo.value.value / sliderOne.value.max) * 100
  sliderTrack.value.style.background = `linear-gradient(to right, #fff ${
    percent1 < 16 ? percent1 + props.plusValue : percent1
  }% , #0266FB ${percent1}% , #0266FB ${
    percent2 > 84 ? percent2 - props.minusValue : percent2
  }%, #fff ${percent2}%)`
}

onMounted(() => {
  if (process.client) {
    fillColor()
  }
})

// watch min and max value and emit it to parent component
watch([() => minSliderValue.value, () => maxSliderValue.value], () => {
  emit('update:minValue', minSliderValue.value)
  emit('update:maxValue', maxSliderValue.value)
})
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body {
  height: 100vh;
  display: -ms-grid;
  display: grid;
  background-color: #0266fb;
  place-items: center;
}
.wrapper {
  position: relative;
  width: 80%;
  background-color: #ffffff;
  padding: 50px 40px 20px 40px;
  border-radius: 10px;
}
.container-range {
  position: relative;
  width: 100%;
}
input[type='range'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
}
.slider-track {
  width: 100%;
  height: 5px;
  position: absolute;
  margin: auto;
  border-radius: 99px;
  top: 3px;
  bottom: 0;
}
input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 5px;
}
input[type='range']::-moz-range-track {
  -moz-appearance: none;
  height: 5px;
}
input[type='range']::-ms-track {
  appearance: none;
  height: 5px;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 28px;
  width: 28px;
  background-color: #fff;
  cursor: pointer;
  margin-top: -9px;
  pointer-events: auto;
  border-radius: 50%;
}
input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  height: 28px;
  width: 28px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #fff;
  pointer-events: auto;
  border: none;
}
input[type='range']::-ms-thumb {
  appearance: none;
  height: 28px;
  width: 28px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #fff;
  pointer-events: auto;
}
input[type='range']::-webkit-slider-thumb {
  background-color: #ffffff;
  border: 3px solid #69a4f9;
}
.values {
  background-color: #0266fb;
  width: 32%;
  position: relative;
  margin: auto;
  padding: 10px 0;
  border-radius: 99px;
  text-align: center;
  font-weight: 500;
  font-size: 25px;
  color: #ffffff;
}
.values:before {
  content: '';
  position: absolute;
  height: 0;
  width: 0;
  border-top: 15px solid #0266fb;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  margin: auto;
  bottom: -14px;
  left: 0;
  right: 0;
}
</style>
