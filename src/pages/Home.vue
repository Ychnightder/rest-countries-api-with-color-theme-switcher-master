<script lang="ts" setup>
import { ref } from 'vue';
import Searchbar from '../components/Home/Searchbar.vue';
import SelectByRegion from '../components/Home/SelectByRegion.vue';
import countriesMain from '../components/Home/CountriesMain.vue';
import WorldGlobe from '../components/shared/WorldGlobe.vue';
import { getGlobeState } from '../composables/useViewStore';


const selectedRegion = ref("");
const searchResult = ref("");

const handleSearch = (textReceived: string) => {
  console.log("Texte reçu de l'enfant :", textReceived);
  searchResult.value = textReceived;
 
}
const handleRegion = (textReceived: string) => {
  console.log("Texte reçu de l'enfant :", textReceived);
  selectedRegion.value = textReceived;

}


</script>

<template>
  <main class="bg-whiteC dark:bg-blueC-950 w-full "> 
    <div v-if="getGlobeState()"  class=" mx-2 md:mx-4.5 lg:mx-20 h-42 lg:h-14 flex flex-col md:flex-row lg:flex-row justify-between lg:items-center gap-10 ">
        <div class="h-full"><Searchbar @event="handleSearch"/></div>
        <div class="h-full"><SelectByRegion  @event="handleRegion"/></div>
    </div>    
    <section class="bg-whiteC dark:bg-blueC-950  mt-12  md:mx-4.5 lg:mx-20">
      <countriesMain v-if="getGlobeState()" :search-result="searchResult" :selected-region="selectedRegion"/>
      <div v-else class="flex justify-center mb-5">
      <WorldGlobe />
      </div>
    </section>
  </main> 

</template> 