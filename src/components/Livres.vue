<template>
  <div>
    <h1>Livres</h1>
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
      <ul class="livres-list">
        <li v-for="livre in filteredLivres" :key="livre.id" class="livre-card">
          <h3>{{ livre.attributes.title }}</h3>
          <img v-if="livre.attributes.cover" :src="livre.attributes.cover" :alt="livre.attributes.title">
          <p><strong>Auteur:</strong> {{ livre.attributes.author }}</p>
          <p><strong>Pages:</strong> {{ livre.attributes.pages }}</p>
          <p><strong>Date de sortie:</strong> {{ livre.attributes.release_date }}</p>
          <p><strong>Résumé:</strong> {{ livre.attributes.summary }}</p>
          <p><strong>Dédicace:</strong> {{ livre.attributes.dedication }}</p>
          <p><a :href="livre.attributes.wiki" target="_blank">Wiki</a></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Liste-livres',
  data() {
    return {
      livres: [],
      currentPage: 1,
      ItemsPerPage: 30,
      desiredPage: 1,
      totalPages: 1,
      loading: false,
      searchQuery: '',
    };
  },
  computed: {
    filteredLivres() {
      return this.livres.filter(livre => {
        return livre.attributes.title.toLowerCase().includes(this.searchQuery.toLowerCase());
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
        axios.get(`https://api.potterdb.com/v1/books?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.livres = response.data.data;
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
            console.error('Erreur lors de la récupération des livres:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    search() {
      this.loading = true;
      this.livres = []; // Clear existing data
      
      axios.get('https://api.potterdb.com/v1/books', {
        params: {
          'filter[title_cont]': this.searchQuery,
        }
      })
      .then(response => {
        console.log('Résultats de la recherche:', response.data);
        this.livres = response.data.data;
      })
      .catch(error => {
        console.error('Erreur lors de la recherche des livres:', error);
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

.livres-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.livre-card {
  width: calc(25% - 20px);
  margin: 10px;
  padding: 10px;
  border: 1px solid #000000;
  text-align: center;
  background-color: rgb(192, 157, 136);
}
.livre-card img {
  max-width: 100%;
  height: auto;
}
</style>

<style scoped>
/* Styles spécifiques à ce composant */
</style>