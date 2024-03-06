<template>
  <div>
    <ul>
      <li v-for="personnage in personnages" :key="personnage.name">
        {{ personnage.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'PagePersonnages',
  data() {
    return {
      personnages: [],
    };
  },
  methods: {
    async getPersonnages() {
      try {
        const response = await axios.get('https://api.potterdb.com/v1/characters');
        this.personnages = response.data.results;
      } catch (error) {
        console.error('Erreur lors de la récupération des personnages :', error);
      }
    },
  },
  mounted() {
    this.getPersonnages();
  },
});
</script>
