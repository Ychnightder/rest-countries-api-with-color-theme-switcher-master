<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import lightModeIcon from '/theme/light-mode-icon.svg';
import darkModeIcon from '/theme/dark-mode-icon.svg';

const isDark = ref(false);

const toggleDarkMode = () => {
	isDark.value = !isDark.value;

	if (isDark.value) {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
	}
};

onMounted(() => {
	const savedTheme = localStorage.getItem('theme');
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
		isDark.value = true;
		document.documentElement.classList.add('dark');
	}
});
</script>

<template>
	<button @click="toggleDarkMode" class="font-medium transition-all flex items-center   cursor-pointer" >
		<img :src="isDark ? lightModeIcon : darkModeIcon" alt="Toggle Theme" :class=" isDark ? 'lightModeIcon' : 'darkModeIcon' " class="w-5 h-5" />
		<span class="ml-2 hidden lg:block ">{{ isDark ? 'Light' : 'Dark' }} Mode</span>
	</button>
</template>


<style scoped>
  .lightModeIcon {
    filter: invert(1) brightness(1.2);
  }
  .darkModeIcon {
    filter: invert(0) brightness(1.2);
  }
</style>
