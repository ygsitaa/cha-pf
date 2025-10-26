<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import Portal from './Portal.vue';
import LazyImage from './LazyImage.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { fetchPaintings } from '../services/api';

const paintings = ref([]);
const loading = ref(true);
const error = ref(null);

const props = defineProps({
    selectedPainting: {
        type: Object,
        default: null,
        required: false
    }
});

const emit = defineEmits(['clearSelectedPainting', 'update:selectedPainting']);

onMounted(async () => {
  try {
    paintings.value = await fetchPaintings();
  } catch (err) {
    error.value = 'Failed to load paintings';
  } finally {
    loading.value = false;
  }
});

function handleCloseModal() {
    emit('clearSelectedPainting');
}

function handleSelectPainting(painting) {
    emit('update:selectedPainting', painting);
}

watch(
  () => props.selectedPainting,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        const carouselModal = document.getElementById('carouselModal');
        if (carouselModal) {
          new bootstrap.Carousel(carouselModal, {});
        }
      });
    }
  }
);
</script>

<template>
  <div v-if="loading">
    <LoadingSpinner />
  </div>
  <div v-else-if="error" class="error-message">
    {{ error }}
  </div>
  <div v-else>
    <Portal hello="world" :handleCloseModal="handleCloseModal" v-if="props.selectedPainting">
        <div class="painting-header">
            <h4 v-if="props.selectedPainting.name">{{ props.selectedPainting.name }}</h4>
            <button type="button" class="btn-close-portal fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close" @click="handleCloseModal">X</button>
        </div>
        <div class="painting-img">
            <div id="carouselModal" class="carousel slide">
                <div class="carousel-inner">
                    <div 
                        v-for="(img, idx) in props.selectedPainting.images" 
                        :key="img"
                        :class="['carousel-item', { active: idx === 0 }]">
                        <a :href="img" target="_blank"><LazyImage :src="img" class="d-block w-50 mx-auto" :alt="props.selectedPainting.name" /></a>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselModal" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselModal" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="painting-descr" v-if="props.selectedPainting.descr">
            <p>{{ props.selectedPainting.descr }}</p>
        </div>  
    </Portal>

    <div class="grid-scroll">
        <div class="grid">
            <div class="grid-element" v-for="(painting, paintingIdx) in paintings" :key="paintingIdx" @click="handleSelectPainting(painting)">
                <LazyImage :src="painting.smallImg" :alt="painting.name"/>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.grid-scroll {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  min-height: 100%;
}

.grid-element {
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s;
  scroll-snap-align: start;
}

.grid-element:hover {
  transform: scale(1.05);
}

.grid-element img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.painting-header {
    display: flex;
    flex: 0;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
}

.painting-header h4 {
    margin-top: 15px;
}

.painting-header button {
    background: transparent;
    border: 0;
    color: white;
    font-size: 30px;
}

.painting-header h4 {
    text-transform: capitalize;
}

.btn-close-portal {
    margin-left: auto;
}

.painting-img {
    display: flex;
    flex: 3;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 650px;
}

.carousel,
.carousel-inner,
.carousel-item {
    width: 100%;
    height: 100%;
}

.painting-img img,
.carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.painting-descr {
    display: flex;
    flex: 1;
    padding-top: 20px;
    align-self: center;
    max-height: 120px;
    overflow-y: auto;
    background: rgba(255,255,255,0.05);
    border-radius: 8px;
    padding: 1rem;
}

/* WebKit browsers (Chrome, Edge, Safari) */
.painting-descr::-webkit-scrollbar {
    width: 8px;
}

.painting-descr::-webkit-scrollbar-thumb {
    background: #B06AB3;
    border-radius: 8px;
}

.painting-descr::-webkit-scrollbar-track {
    background: transparent;
}

/* Firefox */
.painting-descr {
    scrollbar-width: thin;
    scrollbar-color: #B06AB3 transparent;
}

.carousel-control-prev, .carousel-control-next {
  opacity: 100;
}



@media (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: initial;
  }

  .painting-img {
    min-height: 0;
    max-height: 75%;
  }

  .w-50 {
    width: 100% !important;
  }

  .painting-descr {
    max-height: 142px;
  }

  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000010'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'/%3e%3c/svg%3e");
  }

  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000010'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'/%3e%3c/svg%3e");
  }
} 

@media (max-width: 850px) {
  .w-50 {
    width: 69% !important;
  }
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (orientation: portrait) and (max-width: 850px) {
  .w-50 {
    width: 100% !important;
  }
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (orientation: landscape) and (max-width: 1380px) {
  .w-50 {
    width: 55% !important;
  }
  .painting-img {
    min-height: 0;
  }
}

@media (orientation: portrait) and (min-height: 1000px) and (max-width: 1400px) {
  .w-50 {
    width: 75% !important;
  }
  .painting-descr {
    max-height: 200px;
  }
}
</style>