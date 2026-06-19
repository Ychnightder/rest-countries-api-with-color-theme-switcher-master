import { computed, type Ref } from "vue";
import type { Country } from '../types/country';


export function useCountryFilter(
	countries: Ref<Country[]>, // Typage propre ici
	searchResult: Ref<string> | (() => string),
	selectedRegion: Ref<string> | (() => string)
) {
	// Tu peux enlever <Country[]> ici, Vue le devine tout seul
	const filteredCountries = computed(() => {
        const search = typeof searchResult === 'function' ? searchResult() : searchResult.value;
        const region = typeof selectedRegion === 'function' ? selectedRegion() : selectedRegion.value;

        // 2. On ajoute ".value" sur countries pour filtrer le VRAI tableau qui est dedans
        return countries.value.filter((country) => {
            const matchesSearch = country.name.toLowerCase().includes(search.toLowerCase().trim());
            const matchesRegion = region ? country.region.toLowerCase() === region.toLowerCase() : true;

            return matchesSearch && matchesRegion;
        });
    });

    return {
        filteredCountries,
    };
}
