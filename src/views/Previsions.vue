<template>
<div class="main-block dark-theme">
    <h1 class="white-text" style="text-align: center; margin-top: 4%;">Prévisions des 7 prochains jours</h1>
    <div class="row row-cols-1 row-cols-md-3">
        <div
            class="col mb-4 mobile"
                style="max-width: 400px; min-width: 360px; margin-left: 4rem; margin-top: 2rem;"
            v-for="meteo of weather"
            v-bind:key="meteo.nom">
            <div
                class="card rounded my-3 shadow-lg back-card overflow-hidden"
                :class="meteo.couleur">
                <div class="card-content white-text">
                    <div id="jour1">
                        <span class="card-title">Météo pour le {{meteo.date}}</span>
                        <div class="parent">
                            <div class="child">
                                <p id="description">{{meteo.description}}
                                    <i :class="meteo.icon"></i>
                                </p>
                            </div>
                            <div class="child">
                                <p id="temperature_min">Min: {{meteo.temperatureMin}}</p>
                            </div>
                            <div class="child">
                                <p id="temperature_max">Max: {{meteo.temperatureMax}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import M from 'materialize-css';
export default {
    name: 'PrevisionsView',
    props: ["ville"],
    data() {
        return {
            nom: '',
            weather: [],
        };
    },
    async mounted() {
        M.AutoInit();
        var listeVilles = JSON.parse(localStorage.getItem('listeDesVilles')) || [];
        for (const nomVille of listeVilles) {
            if (nomVille == this.ville) {
                this.nom = nomVille;
            }
        }
        for (let j = 0; j < 7; j++) {
            await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.nom}&appid=ee07e2bf337034f905cde0bdedae3db8&lang=FR&units=metric`).then(response => {
                var jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
                var mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
                this.weather.push({
                    "nom": response.data.city.name,
                    "date": jours[new Date(response.data.list[j].dt * 1000).getDay()] + ' ' + new Date(response.data.list[j].dt * 1000).getDate() + ' ' + mois[new Date(response.data.list[j].dt * 1000).getMonth()] + ' ' + new Date(response.data.list[j].dt * 1000).getFullYear(),
                    "icon": 'wi wi-owm-' + response.data.list[j].weather[0].id,
                    "description": (response.data.list[j].weather[0].description).charAt(0).toUpperCase() + (response.data.list[j].weather[0].description).slice(1),
                    "temperatureMin": Math.round(response.data.list[j].temp.min) + " °C",
                    "temperatureMax": Math.round(response.data.list[j].temp.max) + " °C",
                    "couleur": response.data.list[j].weather[0].main,
                });
            });
        }
    }
}
</script>

<style scoped>
.dark-theme {
  position: absolute !important;
  background: linear-gradient(to bottom left, #4854a2, #3d3d3d);
  width: 100%;
  height: calc(100% - 93px);
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

.Thunderstorm {
  background: linear-gradient(to top right, #4b9cc2 0%, #9adbd9 100%);
}

.Rain {
  background: linear-gradient(to top right, #4b9cc2 0%, #9adbd9 100%);
}

.Clear {
  background: linear-gradient(to top right, #fc5830 0%, #f98c24 65%);
}

.Snow {
  background: linear-gradient(to top right, #758595 0%, #2c4a77 90%);
}

.dark-theme {
  background: linear-gradient(to bottom left, #4854a2, #3d3d3d);
  color: white;
}

.n {
  background: linear-gradient(to top right, #4054b2 0%, #1b2038 65%) !important;
}

@media screen and (max-width: 767px) {
    .dark-theme {
        height: initial;
    }
    .mobile {
        margin-left: 1.25rem !important;
        max-width: 75vw !important;
    }

    .card .card-title {
        font-size: 14px;
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