<template>
  <div id="app">
    <Personnages />
    <div>
      <NavBar />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Personnages from './components/Personnages.vue'
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Personnages
    NavBar
  }
}
</script>
