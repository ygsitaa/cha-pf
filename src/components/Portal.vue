<template>
    <Teleport to=".right-container">
        <div class="portal-container">
            <div role="button" tabindex="0" @click="handleCloseModal" class="portal-underlay"></div>
            <div class="portal-content">
                <slot/>
            </div>
        </div>
    </Teleport>
    
</template>

<script setup>
defineProps ({
    hello: String,
    handleCloseModal: Function
})

</script>

<style scoped>
.portal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
}

.portal-underlay {
    position: absolute;
    inset: 0;
    background: #383838;
    opacity: 0.7;
    z-index: 999;
    border: none;
    padding: none;
}

.portal-content {
    width: 90%;
    height: 90%;
    position: absolute;
    z-index: 1000;
    background: #000010;
    border-radius: 10px;
    padding: 1rem;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
}

@media (max-width: 600px) {
  .portal-underlay {
    height: 100vh;
  }
  .portal-container {
    height: 100%;
    position: fixed;
  }
  .portal-content {
    height: 85%;
  }
}

@media (max-width: 850px) {
  .portal-container {
    position: fixed;
  }
}

@media (orientation: portrait) and (min-height: 1000px) and (max-width: 1400px) {
  .portal-container {
    position: fixed;
  }
}
</style>
