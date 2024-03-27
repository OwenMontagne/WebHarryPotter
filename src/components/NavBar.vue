<template>
  <div class="navbar">
    <router-link to="/" class="nav-link">Accueil</router-link>
    <router-link to="/livres" class="nav-link">Livres</router-link>
    <router-link to="/personnages" class="nav-link">Personnages</router-link>
    <router-link to="/potions" class="nav-link">Potions</router-link>
    <router-link to="/sorts" class="nav-link">Sorts</router-link>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background-color: #a1a1a1;
  width: 100%;
  top: 0; left: 0;
  padding: 20px;
  
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 20px 40px;
  border-radius: 5px;
  margin-right: 20px;
  background-color: #084600d0; /* Couleur de fond */
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
