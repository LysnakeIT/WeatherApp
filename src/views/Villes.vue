<template>
<div id="main">
    <div class="container my-5" style="max-width: 400px; min-width: 360px">
        <h1 class="title text-center" id="weather">Ville à ajouter</h1>
        <form class="search-location" v-on:submit.prevent="ajoutVille">
          <input
            type="text"
            class="form-control text-muted form-rounded p-4 shadow-sm"
            placeholder="Nom de la nouvelle ville"
            v-model="villeAjoutee"
            autocomplete="off"
            aria-labelledby="weather"
            />
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';
/* eslint-disable */
export default {
  name: 'VillesView',
  data() {
    return {
      villeAjoutee: '',
    };
  },
  methods: {
    async ajoutVille() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.villeAjoutee}&appid=ee07e2bf337034f905cde0bdedae3db8&units=metric`).then(response => {
        const liste = JSON.parse(localStorage.getItem('listeDesVilles')) || [];
        if (!liste.includes(this.villeAjoutee)) {
          liste.push(this.villeAjoutee.charAt(0).toUpperCase() + this.villeAjoutee.slice(1).toLowerCase());
          this.$router.push({path: '/'});
        }
        if (response.data !== undefined || response.data !== null) {
          localStorage.setItem('listeDesVilles', JSON.stringify(liste));
        }
      });
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 50px;
  font-weight: 500;
}
.form-control:focus {
  box-shadow: none;
  border-color: inherit;
}
.form-rounded {
  border-radius: 2rem;
}

@media screen and (max-width: 767px) {
  input {
    width: 90% !important;
  }
}
</style>
