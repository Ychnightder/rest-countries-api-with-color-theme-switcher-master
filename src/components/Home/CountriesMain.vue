<script lang="ts" setup>
import Card from './Card.vue';
import { useCountryFilter } from '../../composables/useCountryFilter';
import { useFetchCountry } from '../../composables/useFetchCountry.ts'
import Loading from '../shared/Loading.vue';

const { countries, isLoading } = useFetchCountry();

const props = defineProps<{
  selectedRegion: string;
  searchResult: string;
}>();


const { filteredCountries } = useCountryFilter(
  countries, 
  () => props.searchResult,
  () => props.selectedRegion
);

</script>
<template>
  
  <Loading v-if="isLoading" :isLoading="isLoading" />

  <div v-else class="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-10 p-5 md:p-10 justify-items-center ">
    <Card v-for="(country, index) in filteredCountries" :key="index" :data="country" /> 
   <div v-if="filteredCountries.length === 0" class="col-span-full text-center text-gray-500 mt-10">
      No countries found...
    </div>
  </div>
</template>