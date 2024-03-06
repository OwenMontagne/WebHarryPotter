<template>
  <div>
    <ul>
      <li v-for="personnage in personnages" :key="personnage.id">
        <h3>{{ personnage.attributes.name }}</h3>
        <img :src="personnage.attributes.image" alt="Image du personnage" />
        <p><strong>Genre :</strong> {{ personnage.attributes.gender }}</p>
        <p><strong>Alias :</strong> {{ personnage.attributes.alias_names.join(', ') }}</p>
        <p><strong>Blood Status :</strong> {{ personnage.attributes.blood_status }}</p>
        <p><strong>Date de naissance :</strong> {{ personnage.attributes.born }}</p>
        <p><strong>Date de décès :</strong> {{ personnage.attributes.died }}</p>
        <p><strong>Couleur des yeux :</strong> {{ personnage.attributes.eye_color }}</p>
        <p><strong>Couleur des cheveux :</strong> {{ personnage.attributes.hair_color }}</p>
        <p><strong>Hauteur :</strong> {{ personnage.attributes.height }}</p>
        <p><strong>Maison :</strong> {{ personnage.attributes.house }}</p>
        <p><strong>Travail :</strong> {{ personnage.attributes.jobs.join(', ') }}</p>
        <p><strong>Statut marital :</strong> {{ personnage.attributes.marital_status }}</p>
        <p><strong>Nationalité :</strong> {{ personnage.attributes.nationality }}</p>
        <p><strong>Patronus :</strong> {{ personnage.attributes.patronus }}</p>
        <p><strong>Amours :</strong> {{ personnage.attributes.romances.join(', ') }}</p>
        <p><strong>Couleur de peau :</strong> {{ personnage.attributes.skin_color }}</p>
        <p><strong>Espèce :</strong> {{ personnage.attributes.species }}</p>
        <p><strong>Titres :</strong> {{ personnage.attributes.titles.join(', ') }}</p>
        <p><strong>Baguettes :</strong> {{ personnage.attributes.wands.join(', ') }}</p>
        <p><strong>Poids :</strong> {{ personnage.attributes.weight }}</p>
        <p><strong>Wiki :</strong> <a :href="personnage.attributes.wiki" target="_blank">{{ personnage.attributes.wiki }}</a></p>
      </li>
    </ul>
    <button @click="loadPreviousPage" v-if="currentPage > 1">Charger la page précédente</button>
    <button @click="loadNextPage" v-if="hasNextPage">Charger la page suivante</button>
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
      currentPage: 1,
      hasNextPage: false,
    };
  },
  methods: {
    async getPersonnages(pageNumber) {
      try {
        const response = await axios.get(`https://api.potterdb.com/v1/characters?page[size]=40&page[number]=${pageNumber}`);
        this.personnages = response.data.data;
        this.hasNextPage = response.data.links.next ? true : false;
        this.currentPage = pageNumber;
      } catch (error) {
        console.error('Erreur lors de la récupération des personnages :', error);
      }
    },
    async loadNextPage() {
      this.currentPage += 1;
      await this.getPersonnages(this.currentPage);
    },
    async loadPreviousPage() {
      this.currentPage -= 1;
      await this.getPersonnages(this.currentPage);
    },
  },
  mounted() {
    this.getPersonnages(this.currentPage);
  },
});
</script>
