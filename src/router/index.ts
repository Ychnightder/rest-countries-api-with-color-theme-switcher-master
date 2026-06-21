import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CountriePage from '../pages/CountriePage.vue';
import Quiz from '../pages/Quiz.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/:id',
		name: 'Countrie',
		component: CountriePage,
	},
	{
		path: '/quiz',
		name: 'Quiz',
		component: Quiz,
	},
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
