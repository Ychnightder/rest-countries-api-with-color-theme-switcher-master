<script setup lang="ts">
import {ref } from 'vue';
import worldSvg from '/homeIcon/globe.svg';
import squareSvg from '/homeIcon/square.svg';
import { showGlobe, toggleGlobe } from '../../composables/useViewStore';



</script>

<template>
    <label for="check" class="label w-[70px] h-[30px]  dark:bg-blueC-950 bg-greyC-950 rounded-full cursor-pointer relative flex items-center justify-center">
        <input type="checkbox" id="check" :checked="showGlobe" @click="toggleGlobe" >
        <div class="container dark:bg-blueC-950 bg-greyC-950 rounded-full transition-all duration-300 ease-in-out">
            <img v-if="showGlobe" :src="squareSvg" alt="Square Icon" class="w-4 h-4">
            <img v-else :src="worldSvg" alt="Globe Icon" class="w-4 h-4">
        </div>
    </label>
</template>
<style scoped>

#check {
    display: none;
}


.label .container{
    width: 20px;
    height: 20px;
    background: hsl(0, 0%, 99%);
    border-radius: 50%;
    position: absolute;
    top: 5px;
    left: 4px;
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;

}
input:checked ~ .container {
    position: absolute;
    left: 65%;
    top: 5px;
    background: hsl(0, 0%, 99%);
} 
</style>