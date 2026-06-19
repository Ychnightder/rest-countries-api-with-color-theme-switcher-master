<script setup lang="ts">
import loadingSvg from '/homeIcon/loading.svg'
const props = defineProps<{
  isLoading: boolean;
}>();

</script>

<template>
  <div v-if="props.isLoading" class="w-full flex justify-center items-center py-20">
    <img :src="loadingSvg" alt="Loading..." class="animate-spin dark:invert" />
  </div>
</template>