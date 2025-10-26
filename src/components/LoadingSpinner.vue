<script setup>
defineProps({
  fullscreen: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div :class="['loading-container', { 'fullscreen': fullscreen }]">
    <div class="spinner"></div>
    <p>Chargement...</p>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #000010;
  z-index: 999;
  color: whitesmoke;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #B06AB3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>