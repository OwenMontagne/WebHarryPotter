<template>
  <div>
    <h1>Encyclopédie Harry Potter</h1>
    <p>Bienvenue dans l'encyclopédie interactive de l'univers de Harry Potter. Explorez les différentes sections :</p>
    <router-link to="/potions">Potions</router-link>
    <router-link to="/sorts">Sorts</router-link>
    <router-link to="/livres">Livres</router-link>
    <router-link to="/personnages">Personnages</router-link>
  </div>
</template>

<script>
export default {
  name: 'AccueilView'
}
</script>

<style scoped>
/* Vos styles ici */
</style>