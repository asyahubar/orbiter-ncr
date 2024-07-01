<template>
  <div 
    v-show="diameter > 200 && diameter < initialWidth"
    class="orbit-wrapper w-full flex justify-center items-center"
  >
    <div 
      ref="orbit"
      class="orbit-container relative"
      :style="`width: ${diameter}px; height: ${diameter}px;`"
    >
      <div 
        class="orbit absolute rounded-full w-full h-full"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  diameter: {
    type: Number,
    default: 80
  }
});

// DATA
const orbit = ref();
const initialWidth = window.innerWidth;

</script>

<style scoped>
.orbit-wrapper {
  width: 100%;
  height: 100vw;
}
.dot {
  left: calc(50% - 1.75rem);
  bottom: calc(50% - 1.75rem);
}
.orbit-container {
  transform: translate(0, 30px);
}
.orbit {
  position: relative;
  border: 1px solid transparent;
  background-image: linear-gradient(#0a0a0a, #0a0a0a), radial-gradient(ellipse at top, rgb(181, 181, 181) 45%, rgb(44, 44, 44));
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-sizing: border-box;
}
.orbit::after {
  content: "";
  position: absolute;
  z-index: 10;
  bottom: 0;
  display: block;
  width: 110%;
  height: 55%;
  background: linear-gradient(to top, #0a0a0a 90%, transparent 100%);
  transform: translate(-5%, 0);
}
</style>