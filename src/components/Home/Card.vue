<script setup lang="ts">
import { toRef } from 'vue';
const props = defineProps<{ data: any }>();
const data = toRef(props, 'data');

</script>

<template>
  <router-link 
  :to="{ 
      name: 'Countrie', 
      params: { id: data.name.toLowerCase().replace(/\s+/g, '-') },
    }"
  >
	<div class="w-[300px] lg:w-[266px] h-[376px] lg:h-[336px] bg-whiteC dark:bg-blueC-900 rounded-md text-greyC-950 dark:text-whiteC shadow-md" to="">
		<div class="lg:h-[161px] h-[197px] w-full overflow-hidden">
      <img class="rounded-t-md w-full h-full object-cover object-center" :src="data.flags?.svg || data.flags?.png" :alt="`flags-${data.name || ''}`" />
    </div>

		<div class=" h-2/5 flex flex-col ml-10 mt-5">
			<h1 class="font-extrabold my-4">{{ data.name }}</h1>
			<p><span class="font-semibold">Population: </span> {{ data.population.toLocaleString() }}</p>
			<p><span class="font-semibold">Region: </span> {{ data.region }}</p>
			<p><span class="font-semibold">Capital: </span> {{ data.capital ? data.capital : 'No capital'}}</p>
      {{ }}
		</div>
	</div>
  </router-link>
</template>
