import { ref } from 'vue';

export const showGlobe = ref(true); // Initial state of the globe visibility

export function toggleGlobe() {
	showGlobe.value = !showGlobe.value;
    // console.log('showGlobe.value', showGlobe.value);
}

export function getGlobeState() {
    return showGlobe.value;
}
