<template>
  <div id="app">
    <PageNavBar />
    <router-view /> <!-- Cette balise affichera le composant correspondant à la route active -->
  </div>
</template>

<script>
import PageNavBar from './components/NavBar.vue'; // Importez votre composant NavBar
import router from './router'; // Importez votre configuration de routeur

export default {
  name: 'App',
  components: {
    PageNavBar
  },
  router
}
</script>

<style>
/* Vos styles */
</style>
