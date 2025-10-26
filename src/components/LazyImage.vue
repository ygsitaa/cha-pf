<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
});

const loaded = ref(false);
const error = ref(false);

function handleLoad() {
  loaded.value = true;
}

function handleError() {
  error.value = true;
}
</script>

<template>
  <div class="image-container">
    <div v-if="!loaded && !error" class="loading-placeholder">
      <div class="spinner"></div>
    </div>
    <img
      :src="src"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
      :class="{ 'image-loaded': loaded }"
    />
  </div>
</template>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000010;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #B06AB3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.image-loaded {
  opacity: 1;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>