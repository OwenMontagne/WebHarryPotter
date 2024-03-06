// router.js
import Vue from 'vue';
import Router from 'vue-router';
import Accueil from './components/Accueil.vue'; // Chemin ajusté pour refléter la structure de dossiers
import Livres from './components/Livres.vue';
import Personnages from './components/Personnages.vue';
import Potions from './components/Potions.vue';
import Sorts from './components/Sorts.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageAccueil',
      component: Accueil
    },
    {
      path: '/livres',
      name: 'PageLivres',
      component: Livres
    },
    {
      path: '/personnages',
      name: 'PagePersonnages',
      component: Personnages
    },
    {
      path: '/potions',
      name: 'PagePotions',
      component: Potions
    },
    {
      path: '/sorts',
      name: 'PageSorts',
      component: Sorts
    }
  ]
});
