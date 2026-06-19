<script lang="ts" setup>
import { ref } from 'vue';
import ThemeToggle from './ThemeToggle.vue';

const logo = ref('Where in the world?');
</script>

<template>
	<header
		class="w-full lg:h-20 h-25 bg-whiteC dark:bg-blueC-900 text-greyC-950 dark:text-whiteC shadow-md flex items-center justify-between lg:px-20 px-5 transition-colors duration-300 mb-7.5 lg:mb-12">
		<h1 class="lg:text-2xl font-extrabold text-greyC-950 dark:text-whiteC">
			<a href="/"> {{ logo }}</a>
		</h1>
		<ThemeToggle />
	</header>
</template>
