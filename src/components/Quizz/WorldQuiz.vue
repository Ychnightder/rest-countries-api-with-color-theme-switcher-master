<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFetchCountry } from '../../composables/useFetchCountry';
import type { Country } from '../../types/country';

// 1. Récupération des données globales grâce à ton composable
const { countries, isLoading } = useFetchCountry();

// 2. États réactifs du Quiz
const currentQuestion = ref(1);
const score = ref(0);
const quizOver = ref(false);

const correctCountry = ref<Country | null>(null);
const options = ref<Country[]>([]);
const selectedAnswer = ref<string | null>(null);
const isCorrect = ref<boolean | null>(null);

// 3. Fonction pour générer une nouvelle question
function generateQuestion() {
  if (!countries.value || countries.value.length < 4) return;

  // Réinitialiser l'état de la question précédente
  selectedAnswer.value = null;
  isCorrect.value = null;

  // Choisir le pays cible (la bonne réponse)
  const randomIndex = Math.floor(Math.random() * countries.value.length);
  correctCountry.value = countries.value[randomIndex];

  // Si le pays choisi n'a pas de capitale, on relance la génération
  if (!correctCountry.value.capital) {
    generateQuestion();
    return;
  }

  // Choisir 3 faux pays (les pièges)
  const wrongChoices: Country[] = [];
  while (wrongChoices.length < 3) {
    const randomWrong = countries.value[Math.floor(Math.random() * countries.value.length)];
    
    // Sécurités : pas le pays correct, pas de doublons dans les pièges, et le pays doit avoir une capitale
    if (
      randomWrong.alpha3Code !== correctCountry.value.alpha3Code && 
      !wrongChoices.some(c => c.alpha3Code === randomWrong.alpha3Code) &&
      randomWrong.capital
    ) {
      wrongChoices.push(randomWrong);
    }
  }

  // Fusionner et mélanger aléatoirement les 4 propositions
  options.value = [correctCountry.value, ...wrongChoices].sort(() => Math.random() - 0.5);
}

// 4. Attendre que les pays soient chargés pour lancer la première question
watch(countries, (newCountries) => {
  if (newCountries && newCountries.length > 0) {
    generateQuestion();
  }
}, { immediate: true });

// 5. Vérifier la réponse de l'utilisateur
function handleAnswer(answerCapital: string) {
  if (selectedAnswer.value !== null) return; // Empêche de recliquer

  selectedAnswer.value = answerCapital;
  isCorrect.value = answerCapital === correctCountry.value?.capital;

  if (isCorrect.value) {
    score.value++;
  }
}

// 6. Passer à la question suivante ou terminer le jeu
function nextQuestion() {
  if (currentQuestion.value >= 10) {
    quizOver.value = true;
  } else {
    currentQuestion.value++;
    generateQuestion();
  }
}

// 7. Recommencer le quiz à zéro
function restartQuiz() {
  score.value = 0;
  currentQuestion.value = 1;
  quizOver.value = false;
  generateQuestion();
}
</script>

<template>
  <div class="w-full max-w-xl mx-auto p-6 bg-whiteC dark:bg-blueC-900 rounded-xl shadow-lg border border-gray-100 dark:border-transparent text-greyC-950 dark:text-whiteC mt-10">
    
    <div v-if="isLoading" class="text-center py-10">
      <p class="animate-pulse">Chargement du dictionnaire des pays...</p>
    </div>

    <div v-else-if="quizOver" class="text-center py-8">
      <h2 class="text-3xl font-extrabold mb-4">🏆 Quiz Terminé !</h2>
      <p class="text-xl mb-6">Votre score est de : <span class="font-bold text-blue-500 dark:text-blue-400">{{ score }} / 10</span></p>
      
      <button 
        @click="restartQuiz"
        class="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow transition-colors"
      >
        Rejouer
      </button>
    </div>

    <div v-else-if="correctCountry">
      <div class="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-blueC-950 pb-3">
        <span class="text-sm font-semibold opacity-70">Question {{ currentQuestion }} / 10</span>
        <span class="text-sm font-semibold text-green-600 dark:text-green-400">Score: {{ score }}</span>
      </div>

      <div class="text-center mb-8">
        <h3 class="text-xl font-bold mb-2">Quelle est la capitale de ce pays ?</h3>
        <p class="text-2xl font-extrabold tracking-wide text-blue-500 dark:text-blue-400">{{ correctCountry.name }}</p>
      </div>

      <div class="grid grid-cols-1 gap-4 mb-6">
        <button
          v-for="option in options"
          :key="option.alpha3Code"
          @click="handleAnswer(option.capital!)"
          :disabled="selectedAnswer !== null"
          :class="[
            'w-full p-4 text-left rounded-lg font-medium border text-base transition-all duration-200',
            // Style de base (quand on n'a pas encore répondu)
            selectedAnswer === null 
              ? 'bg-gray-50 dark:bg-blueC-950 border-gray-200 dark:border-transparent hover:bg-gray-100 dark:hover:bg-blueC-950/80 hover:translate-x-1'
              : '',
            // Si c'est la bonne réponse (s'affiche en vert dès qu'on a cliqué)
            selectedAnswer !== null && option.capital === correctCountry.capital
              ? 'bg-green-100 dark:bg-green-950/50 border-green-500 text-green-700 dark:text-green-400 font-bold'
              : '',
            // Si l'utilisateur s'est trompé, sa mauvaise réponse s'affiche en rouge
            selectedAnswer === option.capital && option.capital !== correctCountry.capital
              ? 'bg-red-100 dark:bg-red-950/50 border-red-500 text-red-700 dark:text-red-400 font-bold'
              : '',
            // Style des boutons neutres désactivés après le clic
            selectedAnswer !== null && option.capital !== correctCountry.capital && selectedAnswer !== option.capital
              ? 'opacity-50 border-gray-200 dark:border-transparent bg-gray-50 dark:bg-blueC-950 cursor-not-allowed'
              : ''
          ]"
        >
          {{ option.capital }}
        </button>
      </div>

      <div class="flex justify-end h-12">
        <button
          v-if="selectedAnswer !== null"
          @click="nextQuestion"
          class="px-6 py-2 bg-greyC-950 dark:bg-whiteC dark:text-greyC-950 text-white font-bold rounded-md shadow hover:opacity-90 transition-opacity"
        >
          {{ currentQuestion === 10 ? 'Voir le score' : 'Question suivante →' }}
        </button>
      </div>
    </div>
  </div>
</template>