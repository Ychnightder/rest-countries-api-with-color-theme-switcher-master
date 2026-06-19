<script setup lang="ts">
import { ref } from 'vue';
import searchIcon from "/homeIcon/baseline-search.svg"

const searchText = ref("");
let timeoutId: any = null; 

const emit = defineEmits<{
  (e: 'event', text: string): void
}>()

const onInputChange = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    // console.log("Recherche lancée pour :", searchText.value);
    emit("event", searchText.value);
  }, 300); 
}
</script>

<template>
  <div class="w-[300px] md:w-[426px] lg:w-[480px] h-[59px] lg:h-[56px] bg-whiteC dark:bg-blueC-900 text-greyC-950 dark:text-whiteC shadow-xl rounded-md flex flex-row items-center">
      <img :src="searchIcon" alt="searchIcon" class="w-7 h-7 dark:invert ml-5">
      <input 
        v-model="searchText" 
        @input="onInputChange" 
        type="text" 
        placeholder="Search for a country..."  
        class="w-full h-full outline-none px-5"
      >
  </div>
</template>