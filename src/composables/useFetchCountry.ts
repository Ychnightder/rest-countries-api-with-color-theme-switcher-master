import {onMounted, ref } from 'vue';
import type { Country } from '../types/country';

export function useFetchCountry() {
	const countries = ref<Country[]>([]);
	const isLoading = ref(true);
	onMounted(async () => {
		try {
			const response = await fetch('/data/data.json');
			countries.value = await response.json();
		} catch (error) {
			console.error('Erreur lors du chargement du JSON :', error);
		} finally {
			isLoading.value = false;
		}
	});
	return {
		countries,
		isLoading,
	};
}
