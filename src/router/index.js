import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Villes from '../views/Villes.vue';
import Previsions from '../views/Previsions.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/villes',
    name: 'villes',
    component: Villes,
  },
  {
    path: '/previsions',
    name: 'previsions',
    props: true,
    component: Previsions,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
