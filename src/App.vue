<template>
  <div id="app">
    <Personnages />
  </div>
</template>

<script>
import Personnages from './components/Personnages.vue'

export default {
  name: 'App',
  components: {
    Personnages
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
