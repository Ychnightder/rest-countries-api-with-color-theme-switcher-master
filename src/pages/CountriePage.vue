<script setup lang="ts">
import { useRoute } from 'vue-router';
import {  computed } from 'vue';
import { useFetchCountry } from '../composables/useFetchCountry';
import chevronLeft from '/homeIcon/chevron-down.svg';
import Loading from '../components/Shared/Loading.vue';

const route = useRoute();
const MAX_BORDER_COUNTRIES = 3; // Limite le nombre de pays frontaliers affichés
const { countries, isLoading } = useFetchCountry();

// 2. On cherche le pays spécifique correspondant à l'ID de l'URL
const country = computed(() => {
	const routeId = route.params.id as string;
	if (!routeId || countries.value.length === 0) return null;

	return countries.value.find(c => {
		// On transforme le nom réel du pays au même format que l'URL pour comparer (minuscules, sans espaces replaced par des tirets)
		const formattedCountryName = c.name.toLowerCase().replace(/\s+/g, '-');
		return formattedCountryName === routeId.toLowerCase();
	});
});

const borderCountries = computed(() => {
	// Si le pays n'a pas de frontières ou si la liste des pays n'est pas encore chargée
	if (!country.value || !country.value.borders || countries.value.length === 0) {
		return [];
	}

	// On transforme chaque code (ex: "FRA") en un objet avec le vrai nom et le slug pour l'URL
	return country.value.borders.map((borderCode: string) => {
		// On cherche dans TOUS les pays celui qui a cet alpha3Code
		const foundCountry = countries.value.find(c => c.alpha3Code === borderCode);

		return {
			code: borderCode,
			// Si on trouve le pays, on prend son vrai nom (ex: "France"), sinon on laisse le code par défaut ("FRA")
			name: foundCountry ? foundCountry.name : borderCode,
			// On crée le slug pour l'URL (ex: "france" ou "united-states")
			slug: foundCountry ? foundCountry.name.toLowerCase().replace(/\s+/g, '-') : borderCode.toLowerCase(),
		};
	});
});
</script>

<template>
	<div class="p-10 bg-whiteC dark:bg-blueC-950 text-greyC-950 dark:text-whiteC ">
		<div class="flex flex-col lg:flex-row lg:items-center justify-between ">
			<router-link to="/" class="pl-2 pr-5 py-2 bg-whiteC dark:bg-blueC-900 shadow-md rounded-md shadown-md inline-block mb-10 lg:ml-[40px]">
			<img :src="chevronLeft" alt="Back" class="ml-0 inline-block w-4 h-4 rotate-90 dark:invert" />
			Back
		</router-link>

		<router-link to="/Quiz" class="pl-2 pr-5 py-2  bg-whiteC dark:bg-blueC-900 shadow-md rounded-md shadown-md inline-block mb-10 lg:ml-[40px]">
			Quizz
		</router-link>
		</div>

		<div v-if="country" class="flex flex-col lg:flex-row lg:gap-20 lg:items-center">
			<img :src="country.flags?.svg" :alt="country.name" class="w-full max-w-[660px] lg:ml-[40px]" />

			<div class="flex flex-col gap-10 w-full">
				<div>
					<h1 class="text-3xl font-extrabold mb-5 mt-10">{{ country.name }}</h1>

					<div class="flex flex-col lg:flex-row lg:gap-40 gap-10">
						<div class="flex flex-col gap-2">
							<p class="font-thin"><span class="font-semibold">Native Name:</span> {{ country.nativeName }}</p>
							<p class="font-thin"><span class="font-semibold">Population:</span> {{ country.population?.toLocaleString() }}</p>
							<p class="font-thin"><span class="font-semibold">Region:</span> {{ country.region }}</p>
							<p class="font-thin"><span class="font-semibold">Sub Region:</span> {{ country.subregion }}</p>
							<p class="font-thin"><span class="font-semibold">Capital:</span> {{ country.capital }}</p>
						</div>

						<div class="flex flex-col gap-2">
							<p class="font-thin"><span class="font-semibold">Top Level Domain:</span> {{ country.topLevelDomain?.join(', ') }}</p>
							<p class="font-thin"><span class="font-semibold">Currencies:</span> {{ country.currencies?.map(c => c.name).join(', ') }}</p>
							<p class="font-thin"><span class="font-semibold">Languages:</span> {{ country.languages?.map(l => l.name).join(', ') }}</p>
						</div>
					</div>
					<div v-if="country.borders && country.borders.length > 0" class="flex flex-col lg:flex-row lg:items-center gap-4 mt-5">
						<h2 class="font-semibold shrink-0">Border Countries:</h2>

						<div class="flex flex-wrap lg:gap-2 w-full  ">
							<router-link
								v-for="border in borderCountries.slice(0, MAX_BORDER_COUNTRIES)"
								:key="border.code"
								:to="{ name: 'Countrie', params: { id: border.slug } }"
								class="lg:px-6 lg:py-1.5 	 bg-whiteC dark:bg-blueC-900 shadow-md rounded-sm text-sm text-greyC-950 dark:text-whiteC border border-gray-100 dark:border-transparent transition-transform hover:scale-105 mx-1">
								{{ border.name }}
							</router-link>
						</div>
					</div>
					<div v-else>
						<Loading :isLoading="isLoading" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
