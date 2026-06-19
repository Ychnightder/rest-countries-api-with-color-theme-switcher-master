<script setup lang="ts">
import cheveronDown from '/homeIcon/chevron-down.svg';
import { ref  } from 'vue';

const regions = ref<string[]>([  'Africa','Americas','Asia','Europe','Oceania',]);

let isOpen = ref(false);

const handlerOpen = () => {
	isOpen.value = !isOpen.value;
}

const selectedRegion = ref<string>('');
const emit = defineEmits<{ (e: 'event', region: string): void }>();

const getRegion = (r : string) => {
	selectedRegion.value = r.trim();
	emit('event', selectedRegion.value);
	handlerOpen();
}
const clear = () => {
	emit('event', selectedRegion.value = "");
 	handlerOpen();
}
</script>

<template>
	<!-- bg-whiteC dark:bg-blueC-900 -->
<!-- shadow-[0px_0px_10px_0px_#000000] dark:shadow-[0px_0px_20px_14px_hsl(200, 15%, 8%)] -->

	<div class="text-greyC-950 dark:text-whiteC w-[247px] lg:w-[200px] h-[242px] lg:h-[224px] relative">
		<div class="w-61.75 lg:w-50 h-60.75 lg:h-56 flex flex-col lg:items-center">
			<button @click="handlerOpen"
				class="w-full h-13.5 bg-whiteC dark:bg-blueC-900 text-greyC-950 dark:text-whiteC shadow-xl rounded-md flex items-center justify-around cursor-pointer ">
				Filter by Region <img :src="cheveronDown" alt="cheveron-Down" class="w-5 h-5 dark:invert" :class="isOpen ? 'rotate-180' : ''" />
			</button>
		</div> 

		<div v-if="isOpen" class="w-full bg-whiteC dark:bg-blueC-900 text-greyC-950 dark:text-whiteC shadow-xl  absolute top-17 flex flex-col 
		 rounded-md py-2" >
		 	<a  class="cursor-pointer ml-5 my-2 " @click="clear">
				All
			</a>
			<a v-for="(region, index) in regions" :key="index" class="cursor-pointer ml-5 my-2 " @click="getRegion(region)">
				{{ region }}
			</a>
		</div>
	</div>
</template>

<style scoped></style>
