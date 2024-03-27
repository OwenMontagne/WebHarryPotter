<template>
  <div>
    <h1>Personnages</h1>
    <p>Bienvenue sur notre site dédié à l'univers d'Harry Potter.</p>
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
          <p><strong>Maison:</strong> {{ personnage.attributes.house }}</p>
          <p><strong>Genre:</strong> {{ personnage.attributes.gender }}</p>
          <p><strong>Né en:</strong> {{ personnage.attributes.born }}</p>
          <p><strong>Métiers:</strong> {{ personnage.attributes.jobs?.join(', ') }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListePersonnages',
  data() {
    return {
      personnages: [],
      currentPage: 1,
      desiredPage: 1,
      totalPages: 47,
      loading: false,
      searchQuery: '',
    };
  },
  computed: {
    filteredPersonnages() {
      return this.personnages.filter(personnage => {
        return personnage.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
      isValidPage() {
      return this.desiredPage >= 1 && this.desiredPage <= this.totalPages;
    },
  },
  mounted() {
    this.fetchPage(this.currentPage);
  },
    methods: {
      fetchPage(pageNumber) {
      this.loading = true;
      
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        axios.get(`https://api.potterdb.com/v1/characters?page[number]=${pageNumber}`)
          .then(response => {
            console.log('Données de l\'API:', response.data);
            this.personnages = response.data.data;
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
            console.error('Erreur lors de la récupération des personnages:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.fetchPage(this.currentPage - 1);
      }
    },
    loadNextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchPage(this.currentPage + 1);
      }
    },
    goToPage() {
      if (this.isValidPage) {
        this.fetchPage(this.desiredPage);
      }
    },
    search() {
      this.loading = true;
      this.personnages = []; // Clear existing data

      let pageNumber = 1;
      const fetchPage = () => {
        axios.get('https://api.potterdb.com/v1/characters', {
          params: {
            'filter[name_cont]': this.searchQuery,
            'page[number]': pageNumber,
          }
        })
        .then(response => {
          console.log('Résultats de la recherche:', response.data);
          this.personnages = this.personnages.concat(response.data.data);

          const linkHeader = response.headers.link;
          if (linkHeader && linkHeader.includes('rel="next"')) {
            // There is a next page, fetch it
            pageNumber++;
            fetchPage();
          } else {
            // No next page, done loading
            this.loading = false;
          }
        })
        .catch(error => {
          console.error('Erreur lors de la recherche des personnages:', error);
          this.loading = false;
        });
      };

      fetchPage();
    },
  },
};
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


<style scoped>
/* Styles spécifiques à ce composant */
</style>
