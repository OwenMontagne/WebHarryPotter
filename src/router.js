import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '@/components/Accueil.vue';
import Potions from '@/components/Potions.vue';
import Sorts from '@/components/Sorts.vue';
import Livres from '@/components/Livres.vue';
import Personnages from '@/components/Personnages.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/potions',
      name: 'Potions',
      component: Potions
    },
    {
      path: '/sorts',
      name: 'Sorts',
      component: Sorts
    },
    {
      path: '/livres',
      name: 'Livres',
      component: Livres
    },
    {
      path: '/personnages',
      name: 'Personnages',
      component: Personnages
    }
  ]
});

export default router;