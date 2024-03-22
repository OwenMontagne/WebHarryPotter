<template>
  <div>
    <input v-model="searchQuery" placeholder="Rechercher un personnage" />
    <div>
      <p>
        Page {{ currentPage }} / {{ totalPages }}
        <label for="pageInput">Aller à la page :</label>
        <input v-model.number="desiredPage" type="number" id="pageInput" min="1" :max="totalPages" />
        <button @click="goToPage" :disabled="!isValidPage">Aller</button>
      </p>
      <button @click="loadPreviousPage" :disabled="currentPage === 1">Charger la page précédente</button>
      <button @click="loadNextPage" :disabled="currentPage === totalPages">Charger la page suivante</button>
      <ul class="personnages-list">
        <li v-for="personnage in filteredPersonnages" :key="personnage.id" class="personnage-item">
          <h3>{{ personnage.attributes.name }}</h3>
          <img v-if="personnage.attributes.image" :src="personnage.attributes.image" alt="Image du personnage" />
          <p><strong>Nom :</strong> {{ personnage.attributes.name }}</p>
          <p><strong>Alias :</strong> {{ personnage.attributes.alias_names.join(', ') }}</p>
          <p><strong>Travail :</strong> {{ formatJobs(personnage.attributes.jobs) }}</p>
          <p><strong>Biographie :</strong> {{ generateBiography(personnage.attributes) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'PagePersonnages',
  data() {
    return {
      allPersonnages: [],
      currentPage: 1,
      itemsPerPage: 30,
      totalPages: 1,
      searchQuery: '',
      desiredPage: 1,
    };
  },
  computed: {
    filteredPersonnages() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      return this.allPersonnages
        .filter(personnage =>
          personnage.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .slice(start, end);
    },
    isValidPage() {
      return this.desiredPage >= 1 && this.desiredPage <= this.totalPages;
    },
  },
  methods: {
    async getAllPersonnages() {
      try {
        const response = await axios.get(`https://api.potterdb.com/v1/characters`);
        this.allPersonnages = response.data.data;
        this.calculateTotalPages();
      } catch (error) {
        console.error('Erreur lors de la récupération de tous les personnages :', error);
      }
    },
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.allPersonnages.length / this.itemsPerPage);
    },
    loadNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    goToPage() {
      if (this.isValidPage) {
        this.currentPage = this.desiredPage;
      }
    },
    generateBiography(attributes) {
      return `Born ${attributes.born}`;
    },
    formatJobs(jobs) {
      return jobs.join(', ');
    },
  },
  mounted() {
    this.getAllPersonnages();
  },
});
</script>

<style>
body {
  background-color: rgba(28, 28, 28, 0.814);
}

.personnages-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.personnage-item {
  width: calc(25% - 20px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #000000;
  text-align: center;
  background-color: rgb(192, 157, 136);
}
</style>
