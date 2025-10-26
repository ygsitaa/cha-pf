<script setup>
import { defineAsyncComponent, h } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';

const AsyncApp = defineAsyncComponent({
  loader: () => import('../App.vue'),
  loadingComponent: () => h(LoadingSpinner, { fullscreen: true }),
  delay: 200,
  timeout: 20000
});
</script>

<template>
  <AsyncApp />
</template>