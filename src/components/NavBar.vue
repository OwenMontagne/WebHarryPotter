<!-- NavBar.vue -->
<template>
  <div>
    <router-link to="/">Accueil</router-link>
    <router-link to="/livres">Livres</router-link>
    <router-link to="/personnages">Personnages</router-link>
    <router-link to="/potions">Potions</router-link>
    <router-link to="/sorts">Sorts</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNavBar'
}
</script>