<template>
  <div>
    <h1>sort</h1>
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
      <ul class="sort-list">
        <li v-for="sort in filteredSorts" :key="sort.id" class="sort-item">
          <h3>{{ sort.attributes.name }}</h3>
          <img v-if="sort.attributes.image" :src="sort.attributes.image" :alt="sort.attributes.name">
          <p><strong>Catégorie:</strong> {{ sort.attributes.category }}</p>
          <p><strong>Créateur:</strong> {{ sort.attributes.creator }}</p>
          <p><strong>Effet:</strong> {{ sort.attributes.effect }}</p>
          <p><strong>Mouvement de la main:</strong> {{ sort.attributes.hand }}</p>
          <p><strong>Incantation:</strong> {{ sort.attributes.incantation }}</p>
          <p><strong>Lumière:</strong> {{ sort.attributes.light }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListeSorts',
  data() {
    return {
      sorts: [],
      currentPage: 1,
      itemsPerPage: 30,
      totalPages: 1, // Mettez à jour avec le nombre total de pages
      desiredPage: 1,
      loading: false,
      searchQuery: '',
    };
  },
  computed: {
    filteredSorts() {
      return this.sorts.filter(sort => {
        return sort.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase());
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
        axios.get(`https://api.potterdb.com/v1/spells?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.sorts = response.data.data;
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
            console.error('Erreur lors de la récupération des sorts:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    search() {
      this.loading = true;
      this.sorts = []; // Clear existing data
      
      axios.get('https://api.potterdb.com/v1/spells', {
        params: {
          'filter[name_cont]': this.searchQuery,
        }
      })
      .then(response => {
        console.log('Résultats de la recherche:', response.data);
        this.sorts = response.data.data;
      })
      .catch(error => {
        console.error('Erreur lors de la recherche des sorts:', error);
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
  body {
    background-color: rgba(28, 28, 28, 0.814);
  }

  .sort-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .sort-item {
    width: calc(25% - 20px);
    margin: 10px;
    padding: 10px;
    border: 1px solid #000000;
    text-align: center;
    background-color: rgb(192, 157, 136);
  }
</style>