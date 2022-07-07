<template>
<div class="main-block dark-theme" id="main">
  <div class="row row-cols-1 row-cols-md-3">
    <div
      class="col mb-4 mobile"
      style="max-width: 400px; min-width: 360px; margin-left: 4rem; margin-top: 2rem;"
      v-for="meteo of weather"
      v-bind:key="meteo.nom">
      <div
        class="card rounded my-3 shadow-lg back-card overflow-hidden"
        :class="[meteo.couleur, meteo.heure]">
        <div class="card-top text-center" style="margin-bottom: 12rem">
          <div class="city-name my-3">
            <p>{{ meteo.nom }}</p>
            <p class="">{{ meteo.pays }}
              <span :class="meteo.drapeau"></span>
            </p>
          </div>
        </div>
        <div class="card-body">
          <div class="card-mid">
            <div class="row">
              <div class="col-12 text-center temp">
                <span>{{ meteo.temperature }}&deg;C</span>
                <p class="my-4">{{ meteo.description }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-between px-5 mx-5">
                <p>
                  <img src="@/assets/down.svg" alt=""/>
                  {{ meteo.temperatureMin }}&deg;C
                </p>
                <p>
                  <img src="@/assets/up.svg" alt=""/>
                  {{ meteo.temperatureMax }}&deg;C
                </p>
              </div>
            </div>
          </div>
          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>{{ meteo.ressenti }}&deg;C</p>
              <span>Ressenti</span>
            </div>
            <div class="col text-center">
              <p>{{ meteo.humidite }}%</p>
              <span>Humidité</span>
            </div>
          </div>
        </div>
      </div>
      <button @click="previsions(meteo.nom)"
        class="morebtn btn-floating waves-effect waves-light red">
        <i class="material-icons">add</i>
      </button>
      <button @click="removeVille(meteo.nom)"
        class="removebtn btn-floating waves-effect waves-light red">
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import M from 'materialize-css';

/* eslint-disable */
export default {
  name: 'HomeView',
  data() {
    return {
      villes: [],
      weather: [],
    };
  },
  async mounted() {
    M.AutoInit();
    this.villes = JSON.parse(localStorage.getItem('listeDesVilles'));
    if (this.villes === null || this.villes.length === 0) {
      this.$router.push({path: '/villes'});
    } else {
      for (const nomVille of this.villes) {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${nomVille}&appid=ee07e2bf337034f905cde0bdedae3db8&lang=FR&units=metric`).then(response => {
            this.weather.push({
              "nom": nomVille,
              "pays": response.data.sys.country,
              "drapeau" : "fi fi-" + response.data.sys.country.toLowerCase() + " fis",
              "temperature": Math.round(response.data.main.temp),
              "description": (response.data.weather[0].description).charAt(0).toUpperCase() + (response.data.weather[0].description).slice(1),
              "temperatureMin": Math.round(response.data.main.temp_min),
              "temperatureMax": Math.round(response.data.main.temp_max),
              "ressenti": Math.round(response.data.main.feels_like),
              "humidite": Math.round(response.data.main.humidity),
              "couleur": response.data.weather[0].main,
              "heure": response.data.weather[0].icon.substring(2),
            });
        });
      }
    }
  },
  methods:{
    removeVille(ville) {
      this.villes.splice(this.villes.indexOf(ville), 1);
      localStorage.setItem('listeDesVilles', JSON.stringify(this.villes));
      location.reload();
    },
    previsions(ville) {
      this.$router.push({name: 'previsions', params: {ville: (ville).charAt(0).toUpperCase() + (ville).slice(1)}});
    }
  },
};
</script>
<style scoped>

.row {
  margin-bottom: 0px !important;
}

.back-card {
  border-radius: 40px !important;
  color: white;
  text-shadow: 2px 2px 2px #707070;
  border: 1px solid black;
}

.Clouds {
  background: linear-gradient(to top right, #1b9ce2 0%, #e0e2e5 90%);
}

.Rain {
  background: linear-gradient(to top right, #4b9cc2 0%, #9adbd9 100%);
}

.Thunderstorm {
  background: linear-gradient(to top right, #4b9cc2 0%, #9adbd9 100%);
}

.Clear {
  background: linear-gradient(to top right, #fc5830 0%, #f98c24 65%);
}

.Snow {
  background: linear-gradient(to top right, #758595 0%, #2c4a77 90%);
}

.dark-theme {
  position: absolute !important;
  background: linear-gradient(to bottom left, #4854a2, #3d3d3d);
  width: 100%;
  height: calc(100% - 93px);
}

.n {
  background: linear-gradient(to top right, #4054b2 0%, #1b2038 65%) !important;
}

.city-name {
  position: absolute;
  width: 100%;
}

.city-name p {
  font-weight: 400;
  font-size: 16pt;
}

.city-name span {
  font-weight: 400;
  font-size: 16pt;
}

.temp span {
  font-weight: 100;
  font-size: 5em;
  letter-spacing: -5px;
  white-space: nowrap;
}
.card-mid {
  line-height: 0.5;
}

.high .low {
  font-size: 15px;
}

.card-bottom p {
  font-size: 50px;
  font-weight: 100;
  letter-spacing: -3px;
}
.card-bottom {
  line-height: 0.5;
}

.card-bottom span {
  font-size: 12px;
}

.removebtn {
  position: relative;
  right: -20%;
  bottom: 6%;
}

.morebtn {
  position: relative;
  left: -20%;
  bottom: 6%;
}

@media screen and (max-width: 767px) {
  .mobile {
    margin-left: 1.25rem !important;
    max-width: 75vw !important;
  }
  .temp span {
    font-size: 3em;
    letter-spacing: inherit;
  }

  .card-bottom p {
    font-size: 30px;
  }
}
</style>

