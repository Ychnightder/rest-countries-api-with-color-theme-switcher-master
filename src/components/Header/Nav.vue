<script lang="ts" setup>
import { ref } from 'vue';
import ThemeToggle from './ThemeToggle.vue';
import Checkout from './Checkout.vue';

const logo = ref('Where in the world?');


</script>

<template>
	<header
  class="w-full lg:h-20 h-24 bg-whiteC dark:bg-blueC-900 text-greyC-950 dark:text-whiteC shadow-md flex items-center justify-between lg:px-20 px-5 transition-colors duration-300 mb-8 lg:mb-12"
>
  <h1 class="lg:text-2xl text-lg font-extrabold text-greyC-950 dark:text-whiteC">
    <router-link to="/">{{ logo }}</router-link>
  </h1>
  
  <div class="flex lg:flex-row gap-4 lg:items-center lg:gap-4 md:gap-6  ">
    <Checkout />
    <ThemeToggle />
  </div>
</header>

</template>
