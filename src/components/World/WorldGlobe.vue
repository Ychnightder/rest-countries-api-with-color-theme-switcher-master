<script setup  lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Globe from 'globe.gl';

const router = useRouter();
const globeContainer = ref<HTMLElement | null>(null);
let myGlobe: any = null;


onMounted(async () => {
  if (!globeContainer.value) return;

  // 1. URL d'un fichier GeoJSON fiable contenant les polygones des pays du monde
  const geoJsonUrl = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';

  try {
    const response = await fetch(geoJsonUrl);
    const geoJsonData = await response.json();

    // 2. Initialisation du Globe 3D
    myGlobe = new Globe(globeContainer.value)
      // Images de texture de la terre (fournies par un CDN public)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      
      // Configuration des polygones (les pays)
      .polygonsData(geoJsonData.features)
      .polygonCapColor(() => 'rgba(59, 130, 246, 0.3)') // Couleur transparente pour les pays (Bleu Tailwind)
      .polygonStrokeColor(() => '#ffffff') // Contour blanc des pays
      .polygonSideColor(() => 'rgba(0, 0, 0, 1)')
      
      // Effet de surbrillance (Hover) quand la souris passe sur un pays
      .polygonAltitude(0.01)
      .onPolygonHover((hoverObj: any) => {
        myGlobe.polygonCapColor((d: any) => 
          d === hoverObj ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.3)'
        );
      })
      
      // 3. Événement au clic : Redirection vers la page de détails !
      .onPolygonClick((polygon: any) => {
        // Dans ce jeu de données GeoJSON, le nom est souvent dans .properties.NAME
        const countryName = polygon.properties.NAME || polygon.properties.ADMIN;
        
        if (countryName) {
          router.push({
            name: 'Countrie',
            params: { id: countryName.toLowerCase().replace(/\s+/g, '-') }
          });
        }
      })
      .polygonLabel((d: any) => `<b>${d.properties.ADMIN}</b>`);

    // Optionnel : Activer la rotation automatique du globe
    myGlobe.controls().autoRotate = true;
    myGlobe.controls().autoRotateSpeed = 0.4;

    // Ajuster la taille du globe au démarrage
    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);

  } catch (error) {
    console.error("Erreur lors de l'initialisation du globe 3D :", error);
  }
});

// Ajuster dynamiquement la taille du globe si l'écran change de dimension
const resizeGlobe = () => {
  if (myGlobe && globeContainer.value) {
    myGlobe.width(globeContainer.value.clientWidth);
    myGlobe.height(globeContainer.value.clientHeight || 500);
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeGlobe);
  if (myGlobe) {
    // Nettoyage de l'instance pour éviter les fuites de mémoire 3D
    myGlobe._destructor?.(); 
  }
});
</script>

<template>
    <div class="w-full flex flex-col items-center ">
    <h2 class="text-2xl font-bold mb-4 text-greyC-950 dark:text-whiteC">Explorez le monde en 3D</h2>
    
    <div 
      ref="globeContainer" 
      class="w-full max-w-[1300px] h-[700px] bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-blueC-900"
    ></div>
  </div>
</template>