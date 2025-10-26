<script setup>
import LoadingSpinner from './components/LoadingSpinner.vue';
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { fetchPaintings, fetchAboutContent, fetchContactInfo } from './services/api';

const About = defineAsyncComponent({
  loader: () => import('./components/About.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 20000
});

const Contact = defineAsyncComponent({
  loader: () => import('./components/Contact.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 20000
});

const Paintings = defineAsyncComponent({
  loader: () => import('./components/Paintings.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 20000
});

const display = ref(2);
const selectedPainting = ref(null);

// Preload components on mount
onMounted(async () => {
  // Preload all components in background
  Promise.all([
    import('./components/About.vue'),
    import('./components/Contact.vue'),
    import('./components/Paintings.vue')
  ]).then(() => {
    console.log('All components preloaded');
  }).catch(err => {
    console.error('Error preloading components:', err);
  });
});

function clearSelectedPainting() {
  selectedPainting.value = null;
}

function setSelectedPainting(painting) {
  selectedPainting.value = painting;
}
</script>

<template>
  <div class="left-container">
    <div class="logo-div">
      <img src="/logo.webp" alt="logo">
    </div>
    <div class="buttons-box">
      <button 
        @click="display = 2; clearSelectedPainting()"
        :class="{ active: display === 2 }">
        <span class="text">A propos</span>
      </button>
      <button 
        @click="display = 1; clearSelectedPainting()"
        :class="{ active: display === 1 }">
        <span class="text">Réalisations</span>
      </button>
      <button 
        @click="display = 3; clearSelectedPainting()"
        :class="{ active: display === 3 }">
        <span class="text">Contact</span>
      </button>
    </div>
  </div>
  
  <div class="right-container">
    <Paintings 
      v-if="display === 1" 
      :selectedPainting="selectedPainting"
      @update:selectedPainting="setSelectedPainting"
      @clearSelectedPainting="clearSelectedPainting"
    />
    <About v-else-if="display === 2" />
    <Contact v-else-if="display === 3" />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #000010;
  overflow: hidden;
}

#app {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: whitesmoke;
  background-color: #000010;
  scrollbar-color: #B06AB3 transparent;
}

.left-container {
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 100vh;
  background-color: #000010;
  align-items: center;
  justify-content: space-evenly;
}

.right-container {
  background-color: #000010;
  width: 60vw;
  height: 100vh;
  position: relative;
}

.logo-div {
  width: 60%;
}

.logo-div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.buttons-box {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

/* .draw-border {
  box-shadow: inset 0 0 0 4px #58afd1;
  color: #58afd1;
  transition: color 0.25s 0.0833333333s;
  position: relative; }
  .draw-border::before, .draw-border::after {
    border: 0 solid transparent;
    box-sizing: border-box;
    content: '';
    pointer-events: none;
    position: absolute;
    width: 0;
    height: 0;
    bottom: 0;
    right: 0; }
  .draw-border::before {
    border-bottom-width: 4px;
    border-left-width: 4px; }
  .draw-border::after {
    border-top-width: 4px;
    border-right-width: 4px; }
  .draw-border:hover {
    color: #ffe593; }
    .draw-border:hover::before, .draw-border:hover::after {
      border-color: #ffe593;
      transition: border-color 0s, width 0.25s, height 0.25s;
      width: 100%;
      height: 100%; }
    .draw-border:hover::before {
      transition-delay: 0s, 0s, 0.25s; }
    .draw-border:hover::after {
      transition-delay: 0s, 0.25s, 0s; }

.btn {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem 'Roboto Slab', sans-serif;
  padding: 1em 2em;
  letter-spacing: 0.05rem; }
  .btn:focus {
    outline: 2px dotted #55d7dc; } */

.buttons-box button {
  width: 35%;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  outline: none;
  font-family: 'Roboto Mono', monospace;
  font-size: 18px;
  transform: translate(0);
  background-image: linear-gradient(45deg, #4568DC, #B06AB3);
  padding: 20px 40px;
  border-radius: 5px;
  /* box-shadow: 0 22px 44px rgba(128, 128, 128, 0.1); */
  transition: box-shadow .25s; 
}

.buttons-box button .text {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(45deg, #4568DC, #B06AB3); 
}

.buttons-box button:after {
  content: '';
  border-radius: 4px;
  position: absolute;
  margin: 1px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background: white; 
}

.buttons-box button:hover {
  background-image: linear-gradient(-45deg, #4568DC, #B06AB3);
  box-shadow: 0 12px 24px rgba(128, 128, 128, 0.1); 
}

.buttons-box button:hover .text {
  background-image: linear-gradient(-45deg, #4568DC, #B06AB3); 
}

.buttons-box button.active {
  outline: 2px solid #4568DC;
}

.footer-box {
  background-color: darkred;
  border: 1px whitesmoke solid;
  padding: 3px;
  position: fixed;
  bottom: 0;
  left: 0;
}

@media (max-width: 600px) {
  #app {
    flex-direction: column;
  }
  .left-container, .right-container {
    width: 100vw;
  }
  .left-container {
    height: 40vh;
    justify-content: start;
  }
  .right-container {
    height: 60vh;
  }
  .logo-div {
    margin-top: 30px;
  }
  .buttons-box button {
    width: 50%;
    padding: 5px 40px;
  }
}
@media (orientation: portrait) and (max-width: 850px) {
  #app {
    flex-direction: column;
  }
  .left-container {
    width: 100vw;
    height: 35vh;
  }
  .right-container {
    width: 100vw;
    height: 65vh;
  }
  .buttons-box {
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .buttons-box button {
    width: 45%;
  }
}

@media (orientation: landscape) and (max-width: 1380px) {
  .buttons-box button {
    width: 50%;
  }
}

@media (orientation: portrait) and (min-height: 1000px) and (max-width: 1400px) {
  #app {
    flex-direction: column;
    font-size: 20px;
  }
  .left-container {
    width: 100vw;
    height: 35vh;
  }
  .right-container {
    width: 100vw;
    height: 65vh;
  }
  .buttons-box {
    flex-direction: row;
    justify-content: space-evenly;
  }
  .buttons-box button {
    width: 25%;
  }
}
</style>
