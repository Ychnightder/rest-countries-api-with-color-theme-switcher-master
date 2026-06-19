import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CountriePage from '../pages/CountriePage.vue';


const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: "/:id",
		name: 'Countrie',
		component : CountriePage
	}
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
