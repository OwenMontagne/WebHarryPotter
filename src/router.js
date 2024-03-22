import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('./components/Accueil.vue'),
    },
    {
        path: '/livres',
        component: () => import('./components/Livres.vue'),
    },
    {
        path: '/personnages',
        component: () => import('./components/Personnages.vue'),
    },
    {
        path: '/potions',
        component: () => import('./components/Potions.vue'),
    },
    {
        path: '/sorts',
        component: () => import('./components/Sorts.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp();
app.use(router);

export default router;