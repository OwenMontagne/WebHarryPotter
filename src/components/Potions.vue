<template>
  <div>
    <h1>Potions</h1>
    <p>Bienvenue sur notre site dédié à l'univers d'Harry Potter.</p>
    <input v-model="searchQuery" placeholder="Rechercher une potion" />
    <div>
      <p>
        Page {{ currentPage }} / {{ totalPages }}
        <label for="pageInput">Aller à la page :</label>
        <input v-model.number="desiredPage" type="number" id="pageInput" min="1" :max="totalPages" />
        <button @click="goToPage" :disabled="!isValidPage">Aller</button>
      </p>
      <button @click="loadPreviousPage" :disabled="currentPage === 1">Charger la page précédente</button>
      <button @click="loadNextPage" :disabled="currentPage === totalPages">Charger la page suivante</button>
      <ul class="potions-list">
        <li v-for="potion in filteredPotions" :key="potion.id" class="potion-item">
          <h3>{{ potion.attributes.name }}</h3>
          <img v-if="potion.attributes.image" :src="potion.attributes.image" :alt="potion.attributes.name">
          <p><strong>Type:</strong> {{ potion.attributes.type }}</p>
          <p><strong>Ingrédients:</strong> {{ potion.attributes.ingredients ? potion.attributes.ingredients.split(',').join(', ') : 'N/A' }}</p>
          <p><strong>Effets:</strong> {{ potion.attributes.effects?.join(', ') }}</p>
          <p><strong>Difficulté de préparation:</strong> {{ potion.attributes.difficulty }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListePotions',
  data() {
    return {
      potions: [],
      currentPage: 1,
      ItemsPerPage: 30,
      totalPages: 1,
      desiredPage: 1,
      loading: false,
      searchQuery: '',
    };
  },
  computed: {
    filteredPotions() {
      return this.potions.filter(potion => {
        return potion.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  mounted() {
    this.fetchPage(this.currentPage);
  },
  methods: {
    fetchPage(pageNumber) {
      this.loading = true;
      
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        axios.get(`https://api.potterdb.com/v1/potions?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.potions = response.data.data;
            this.currentPage = pageNumber;

            const linkHeader = response.headers.link;
            if (linkHeader) {
              const totalPagesMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
              if (totalPagesMatch) {
                this.totalPages = parseInt(totalPagesMatch[1]);
              }
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des potions:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    search() {
      this.loading = true;
      this.potions = [];
      
      axios.get('https://api.potterdb.com/v1/potions', {
        params: {
          'filter[name_cont]': this.searchQuery,
        }
      })
      .then(response => {
        console.log('Résultats de la recherche:', response.data);
        this.potions = response.data.data;
      })
      .catch(error => {
        console.error('Erreur lors de la recherche des potions:', error);
      })
      .finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>


<style>
body {
  background-color: rgba(28, 28, 28, 0.814);
}

.potions-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.potion-item {
  width: calc(25% - 20px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #000000;
  text-align: center;
  background-color: rgb(192, 157, 136);
}
</style>

<style scoped>
/* Styles spécifiques à ce composant */
</style>