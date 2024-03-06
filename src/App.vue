<template>
  <div id="app">
    <div>
      <NavBar />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
