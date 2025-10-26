<script setup>
import { videos } from './utils/videos';
</script>

<template>
    <div class="grid-scroll">
        <div class="grid">
            <div class="grid-element" v-for="(video, videoIdx) in videos" :key="videoIdx">
                <img :src="video.img"></img>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid-scroll {
    height: 100vh;
    overflow-y: auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
}

.grid-element {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.grid-element img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
    display: block;
}
</style>