<script setup>
import { ref, onMounted } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue'; // Add this import
import { fetchAboutContent } from '../services/api';

const aboutContent = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await fetchAboutContent();
    aboutContent.value = data;
  } catch (err) {
    error.value = 'Failed to load about content';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="about-container">
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else class="about-content" v-html="aboutContent?.content">
    </div>
  </div>
</template>

<style scoped>
.about-container { 
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.about-content {
    width: 90%;
}

@media (max-width: 600px) {
  .about-container {
    height: 100%;
    overflow-y: auto;
    flex-direction: column;
  }
  .about-content {
    height: 100%;
  }
}

@media (orientation: portrait) and (min-height: 1000px) and (max-width: 1400px) {
  .about-container {
    justify-content: start;
    padding-top: 50px;
  }
}
</style>